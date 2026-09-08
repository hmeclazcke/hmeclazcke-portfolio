import type { TechnologyGraphProjection } from "./graphProjection";

export const normalizeTechnologyQuery = (query: string) =>
  query.trim().toLowerCase();

export const matchesTechnologyPrefix = (name: string, query: string) => {
  const normalizedQuery = normalizeTechnologyQuery(query);
  return !normalizedQuery || name.toLowerCase().startsWith(normalizedQuery);
};

export const filterTechnologyGraph = (
  graph: TechnologyGraphProjection,
  query: string,
): TechnologyGraphProjection => {
  if (!normalizeTechnologyQuery(query)) return graph;

  const nodes = graph.nodes.filter(({ name }) =>
    matchesTechnologyPrefix(name, query),
  );
  const visibleIds = new Set(nodes.map(({ id }) => id));
  const hasVisibleEndpoints = ({
    sourceId,
    targetId,
  }: {
    sourceId: string;
    targetId: string;
  }) => visibleIds.has(sourceId) && visibleIds.has(targetId);

  return {
    ...graph,
    nodes,
    candidateEdges: graph.candidateEdges.filter(hasVisibleEndpoints),
    edges: graph.edges.filter(hasVisibleEndpoints),
  };
};
