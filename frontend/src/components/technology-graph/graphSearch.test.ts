import { describe, expect, test } from "vitest";
import {
  filterTechnologyGraph,
  matchesTechnologyPrefix,
  normalizeTechnologyQuery,
} from "./graphSearch";
import { projectTechnologyGraph } from "./graphProjection";
import {
  contexts,
  relationships,
  technologies,
} from "../../data/portfolio-data";

const graph = projectTechnologyGraph({ technologies, contexts, relationships });

describe("technology graph search", () => {
  test("normalizes case and surrounding whitespace for literal prefixes", () => {
    expect(normalizeTechnologyQuery("  SpRiNg  ")).toBe("spring");
    expect(matchesTechnologyPrefix("Spring Boot", "SPRING")).toBe(true);
    expect(matchesTechnologyPrefix("Spring Boot", "ring")).toBe(false);
  });

  test("handles empty, special-character, and very long literal queries safely", () => {
    expect(filterTechnologyGraph(graph, "   ").nodes).toEqual(graph.nodes);
    expect(matchesTechnologyPrefix("C++", "C++")).toBe(true);
    for (const query of ["PL/SQL", ".", "[", "*", "\\", "😀"]) {
      expect(() => filterTechnologyGraph(graph, query)).not.toThrow();
    }
    expect(filterTechnologyGraph(graph, "x".repeat(10_000)).nodes).toEqual([]);
  });

  test("derives matching nodes and endpoint-valid links without mutating source data", () => {
    const originalNodeIds = graph.nodes.map(({ id }) => id);
    const originalEdgeIds = graph.edges.map(({ id }) => id);
    const filtered = filterTechnologyGraph(graph, "spr");
    const visibleIds = new Set(filtered.nodes.map(({ id }) => id));

    expect(filtered.nodes).not.toHaveLength(0);
    expect(
      filtered.nodes.every(({ name }) => name.toLowerCase().startsWith("spr")),
    ).toBe(true);
    expect(
      filtered.edges.every(
        (edge) =>
          visibleIds.has(edge.sourceId) && visibleIds.has(edge.targetId),
      ),
    ).toBe(true);
    expect(graph.nodes.map(({ id }) => id)).toEqual(originalNodeIds);
    expect(graph.edges.map(({ id }) => id)).toEqual(originalEdgeIds);
    expect(filterTechnologyGraph(graph, "")).toEqual(graph);
  });

  test("supports a single literal result without inventing links", () => {
    const filtered = filterTechnologyGraph(graph, "qdr");

    expect(filtered.nodes.map(({ name }) => name)).toEqual(["Qdrant"]);
    expect(filtered.edges).toEqual([]);
  });
});
