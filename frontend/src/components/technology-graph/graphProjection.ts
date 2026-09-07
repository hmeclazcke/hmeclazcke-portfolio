type TechnologyRecord = {
  id: string;
  name: string;
  category: string;
  relevance?: string;
};

type ContextRecord = {
  id: string;
  name: string;
  type: string;
  graphEdgeEligible?: boolean;
};

type RelationshipRecord = {
  technologyId: string;
  contextId: string;
  meanings: readonly string[];
};

export type TechnologyGraphNode = TechnologyRecord & {
  familyId: TechnologyFamilyId;
};

export type TechnologyGraphEdge = {
  id: string;
  sourceId: string;
  targetId: string;
  contextIds: readonly string[];
  sharedContexts: readonly SharedGraphContext[];
  evidenceScore: number;
};

export type SharedGraphContext = {
  id: string;
  name: string;
  type: string;
};

export const sharedContextHeading = (
  contexts: readonly SharedGraphContext[],
) => (contexts.length === 1 ? "Shared context" : "Shared contexts");

export const compactSharedContextLabel = (
  contexts: readonly SharedGraphContext[],
) => {
  const names = contexts.slice(0, 2).map(({ name }) => name);
  const remainder = contexts.length - names.length;
  return `${names.join(" \u00b7 ")}${remainder > 0 ? ` +${remainder}` : ""}`;
};

type ContextDetails = {
  usedAt: readonly string[];
  learnedAt: readonly string[];
};

export type TechnologyGraphProjection = {
  nodes: readonly TechnologyGraphNode[];
  candidateEdges: readonly TechnologyGraphEdge[];
  edges: readonly TechnologyGraphEdge[];
  contextDetailsByTechnology: Readonly<Record<string, ContextDetails>>;
};

export const MAX_VISUAL_EDGE_COUNT = 96;
const MAX_VISUAL_NODE_DEGREE = 4;

export const contextTypeLabel = (type: string) =>
  ({
    learning: "Learning",
    professional: "Professional",
    portfolio: "Portfolio",
    "personal-project": "Personal project",
  })[type] ?? type;

export const contextLabel = (
  context: Pick<SharedGraphContext, "name" | "type">,
) => `${context.name} \u2014 ${contextTypeLabel(context.type)}`;

const edgeKey = (firstId: string, secondId: string) =>
  [firstId, secondId].toSorted().join("\u0000");

const stablePairTieBreaker = (value: string) => {
  let hash = 2166136261;
  for (const character of value) {
    hash ^= character.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
};

export const projectTechnologyGraph = ({
  technologies,
  contexts,
  relationships,
}: {
  technologies: readonly TechnologyRecord[];
  contexts: readonly ContextRecord[];
  relationships: readonly RelationshipRecord[];
}): TechnologyGraphProjection => {
  const contextById = new Map(contexts.map((context) => [context.id, context]));
  const relationshipsByContext = new Map<string, RelationshipRecord[]>();
  const contextDetailsByTechnology: Record<string, ContextDetails> = {};

  for (const technology of technologies) {
    contextDetailsByTechnology[technology.id] = { usedAt: [], learnedAt: [] };
  }

  for (const relationship of relationships) {
    const context = contextById.get(relationship.contextId);
    const details = contextDetailsByTechnology[relationship.technologyId];

    if (!context || !details) {
      continue;
    }

    const label = contextLabel(context);

    if (relationship.meanings.includes("used")) {
      details.usedAt = [...details.usedAt, label].toSorted();
    }
    if (relationship.meanings.includes("learned")) {
      details.learnedAt = [...details.learnedAt, label].toSorted();
    }

    if (context.graphEdgeEligible !== false) {
      const inContext =
        relationshipsByContext.get(relationship.contextId) ?? [];
      inContext.push(relationship);
      relationshipsByContext.set(relationship.contextId, inContext);
    }
  }

  const candidateContextIdsByEdge = new Map<string, Set<string>>();
  const contextSizes = new Map<string, number>();

  for (const [contextId, inContext] of relationshipsByContext) {
    contextSizes.set(contextId, inContext.length);

    for (let index = 0; index < inContext.length; index += 1) {
      for (
        let otherIndex = index + 1;
        otherIndex < inContext.length;
        otherIndex += 1
      ) {
        const firstId = inContext[index]!.technologyId;
        const secondId = inContext[otherIndex]!.technologyId;
        const key = edgeKey(firstId, secondId);
        const contextIds =
          candidateContextIdsByEdge.get(key) ?? new Set<string>();

        contextIds.add(contextId);
        candidateContextIdsByEdge.set(key, contextIds);
      }
    }
  }

  const candidates = [...candidateContextIdsByEdge].map(
    ([key, contextIdSet]) => {
      const [sourceId, targetId] = key.split("\u0000") as [string, string];
      const contextIds = [...contextIdSet].toSorted();
      const sharedContexts = contextIds.map((contextId) => {
        const context = contextById.get(contextId)!;
        return { id: context.id, name: context.name, type: context.type };
      });
      const evidenceScore = contextIds.reduce(
        (score, contextId) =>
          score + 1 / Math.max(1, (contextSizes.get(contextId) ?? 1) - 1),
        0,
      );

      return {
        id: sourceId + "--" + targetId,
        sourceId,
        targetId,
        contextIds,
        sharedContexts,
        evidenceScore,
        tieBreaker: stablePairTieBreaker(key),
      };
    },
  );

  candidates.sort(
    (first, second) =>
      second.evidenceScore - first.evidenceScore ||
      first.tieBreaker - second.tieBreaker,
  );
  const candidateEdges: TechnologyGraphEdge[] = candidates.map((candidate) => ({
    id: candidate.id,
    sourceId: candidate.sourceId,
    targetId: candidate.targetId,
    contextIds: candidate.contextIds,
    sharedContexts: candidate.sharedContexts,
    evidenceScore: candidate.evidenceScore,
  }));

  const selected: TechnologyGraphEdge[] = [];
  const selectedIds = new Set<string>();
  const degrees = new Map<string, number>();
  const addEdge = (candidate: (typeof candidates)[number]) => {
    selected.push({
      id: candidate.id,
      sourceId: candidate.sourceId,
      targetId: candidate.targetId,
      contextIds: candidate.contextIds,
      sharedContexts: candidate.sharedContexts,
      evidenceScore: candidate.evidenceScore,
    });
    selectedIds.add(candidate.id);
    degrees.set(candidate.sourceId, (degrees.get(candidate.sourceId) ?? 0) + 1);
    degrees.set(candidate.targetId, (degrees.get(candidate.targetId) ?? 0) + 1);
  };

  while (selected.length < MAX_VISUAL_EDGE_COUNT) {
    const available = candidates.filter(
      (candidate) =>
        !selectedIds.has(candidate.id) &&
        (degrees.get(candidate.sourceId) ?? 0) < MAX_VISUAL_NODE_DEGREE &&
        (degrees.get(candidate.targetId) ?? 0) < MAX_VISUAL_NODE_DEGREE,
    );
    if (!available.length) break;

    const next = available.toSorted((first, second) => {
      const priority = (candidate: (typeof candidates)[number]) => {
        const sourceDegree = degrees.get(candidate.sourceId) ?? 0;
        const targetDegree = degrees.get(candidate.targetId) ?? 0;
        const uncoveredCount =
          Number(sourceDegree === 0) + Number(targetDegree === 0);
        const coverageWeight =
          uncoveredCount === 2 ? 2.5 : uncoveredCount ? 1.5 : 1;
        return (
          (candidate.evidenceScore * coverageWeight) /
          Math.pow((1 + sourceDegree) * (1 + targetDegree), 1.15)
        );
      };

      return (
        priority(second) - priority(first) ||
        second.evidenceScore - first.evidenceScore ||
        first.tieBreaker - second.tieBreaker
      );
    })[0]!;
    addEdge(next);
  }

  while (true) {
    const coverageCandidates = candidates.filter(
      (candidate) =>
        !selectedIds.has(candidate.id) &&
        ((degrees.get(candidate.sourceId) ?? 0) === 0 ||
          (degrees.get(candidate.targetId) ?? 0) === 0),
    );
    if (!coverageCandidates.length) break;

    const next = coverageCandidates.toSorted((first, second) => {
      const degreeTotal = (candidate: (typeof candidates)[number]) =>
        (degrees.get(candidate.sourceId) ?? 0) +
        (degrees.get(candidate.targetId) ?? 0);

      return (
        second.evidenceScore - first.evidenceScore ||
        degreeTotal(first) - degreeTotal(second) ||
        first.tieBreaker - second.tieBreaker
      );
    })[0]!;
    addEdge(next);
  }

  const nodes = technologies.map((technology) => ({
    ...technology,
    familyId: technologyFamilyById[technology.id]!,
  }));
  return {
    nodes,
    candidateEdges,
    edges: selected,
    contextDetailsByTechnology,
  };
};
import {
  technologyFamilyById,
  type TechnologyFamilyId,
} from "./technologyFamilies";
