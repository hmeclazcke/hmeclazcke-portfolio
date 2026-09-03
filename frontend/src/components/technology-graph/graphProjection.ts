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
const MAX_VISUAL_NODE_DEGREE = 6;

const contextTypeLabel = (type: string) =>
  ({
    learning: "Learning",
    professional: "Professional",
    portfolio: "Portfolio",
    "personal-project": "Personal project",
  })[type] ?? type;

const edgeKey = (firstId: string, secondId: string) =>
  [firstId, secondId].toSorted().join("\u0000");

class DisjointSet {
  private readonly parents = new Map<string, string>();

  constructor(ids: readonly string[]) {
    for (const id of ids) {
      this.parents.set(id, id);
    }
  }

  find(id: string): string {
    const parent = this.parents.get(id) ?? id;

    if (parent === id) {
      return id;
    }

    const root = this.find(parent);
    this.parents.set(id, root);
    return root;
  }

  union(firstId: string, secondId: string) {
    const firstRoot = this.find(firstId);
    const secondRoot = this.find(secondId);

    if (firstRoot === secondRoot) {
      return false;
    }

    this.parents.set(secondRoot, firstRoot);
    return true;
  }
}

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

    const label = context.name + " — " + contextTypeLabel(context.type);

    if (relationship.meanings.includes("used")) {
      details.usedAt = [...details.usedAt, label].toSorted();
    }
    if (relationship.meanings.includes("learned")) {
      details.learnedAt = [...details.learnedAt, label].toSorted();
    }

    const inContext = relationshipsByContext.get(relationship.contextId) ?? [];
    inContext.push(relationship);
    relationshipsByContext.set(relationship.contextId, inContext);
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
      const specificity = Math.min(
        ...contextIds.map(
          (contextId) => contextSizes.get(contextId) ?? Infinity,
        ),
      );

      return {
        id: sourceId + "--" + targetId,
        sourceId,
        targetId,
        contextIds,
        specificity,
      };
    },
  );

  candidates.sort(
    (first, second) =>
      second.contextIds.length - first.contextIds.length ||
      first.specificity - second.specificity ||
      first.id.localeCompare(second.id),
  );
  const candidateEdges: TechnologyGraphEdge[] = candidates.map((candidate) => ({
    id: candidate.id,
    sourceId: candidate.sourceId,
    targetId: candidate.targetId,
    contextIds: candidate.contextIds,
  }));

  const forest = new DisjointSet(technologies.map(({ id }) => id));
  const selected: TechnologyGraphEdge[] = [];
  const selectedIds = new Set<string>();
  const degrees = new Map<string, number>();
  const addEdge = (candidate: (typeof candidates)[number]) => {
    selected.push({
      id: candidate.id,
      sourceId: candidate.sourceId,
      targetId: candidate.targetId,
      contextIds: candidate.contextIds,
    });
    selectedIds.add(candidate.id);
    degrees.set(candidate.sourceId, (degrees.get(candidate.sourceId) ?? 0) + 1);
    degrees.set(candidate.targetId, (degrees.get(candidate.targetId) ?? 0) + 1);
  };

  for (const candidate of candidates) {
    if (forest.union(candidate.sourceId, candidate.targetId)) {
      addEdge(candidate);
    }
  }

  for (const candidate of candidates) {
    if (
      selected.length >= MAX_VISUAL_EDGE_COUNT ||
      selectedIds.has(candidate.id)
    ) {
      continue;
    }
    if (
      (degrees.get(candidate.sourceId) ?? 0) >= MAX_VISUAL_NODE_DEGREE ||
      (degrees.get(candidate.targetId) ?? 0) >= MAX_VISUAL_NODE_DEGREE
    ) {
      continue;
    }
    addEdge(candidate);
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
