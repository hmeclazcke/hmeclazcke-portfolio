import { contextLabel, type TechnologyGraphNode } from "./graphProjection";
import { technologyFamilies } from "./technologyFamilies";

type ContextRecord = { id: string; name: string; type: string };
type RelationshipRecord = {
  technologyId: string;
  contextId: string;
  meanings: readonly string[];
};

export type MobileContextGroup = {
  heading: "Used at" | "Learned at" | "Learned & used at";
  contexts: readonly string[];
};

export type MobileTechnology = TechnologyGraphNode & {
  contextGroups: readonly MobileContextGroup[];
};

export type MobileTechnologyFamily = {
  id: string;
  label: string;
  technologies: readonly MobileTechnology[];
};

export const mobileTechnologyFamilies = ({
  nodes,
  contexts,
  relationships,
}: {
  nodes: readonly TechnologyGraphNode[];
  contexts: readonly ContextRecord[];
  relationships: readonly RelationshipRecord[];
}): readonly MobileTechnologyFamily[] => {
  const contextById = new Map(contexts.map((context) => [context.id, context]));
  const meaningsByTechnology = new Map<string, Map<string, Set<string>>>();

  for (const relationship of relationships) {
    if (!contextById.has(relationship.contextId)) continue;
    const byContext =
      meaningsByTechnology.get(relationship.technologyId) ??
      new Map<string, Set<string>>();
    const meanings = byContext.get(relationship.contextId) ?? new Set<string>();
    relationship.meanings.forEach((meaning) => meanings.add(meaning));
    byContext.set(relationship.contextId, meanings);
    meaningsByTechnology.set(relationship.technologyId, byContext);
  }

  const contextGroups = (
    technologyId: string,
  ): readonly MobileContextGroup[] => {
    const groups = new Map<MobileContextGroup["heading"], string[]>([
      ["Used at", []],
      ["Learned at", []],
      ["Learned & used at", []],
    ]);
    for (const [contextId, meanings] of meaningsByTechnology.get(
      technologyId,
    ) ?? []) {
      const context = contextById.get(contextId)!;
      const heading =
        meanings.has("learned") && meanings.has("used")
          ? "Learned & used at"
          : meanings.has("used")
            ? "Used at"
            : "Learned at";
      groups.get(heading)!.push(contextLabel(context));
    }
    return [...groups]
      .filter(([, values]) => values.length)
      .map(([heading, values]) => ({
        heading,
        contexts: values.toSorted(),
      }));
  };

  return technologyFamilies.map(({ id, label }) => ({
    id,
    label,
    technologies: nodes
      .filter((node) => node.familyId === id)
      .map((node) => ({ ...node, contextGroups: contextGroups(node.id) })),
  }));
};
