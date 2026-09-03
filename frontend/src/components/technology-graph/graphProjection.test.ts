import { describe, expect, test } from "vitest";
import {
  MAX_VISUAL_EDGE_COUNT,
  projectTechnologyGraph,
} from "./graphProjection";
import {
  contexts,
  relationships,
  technologies,
} from "../../data/portfolio-data";

describe("technology graph projection", () => {
  test("uses technologies only as visible nodes and retains all context evidence", () => {
    const graph = projectTechnologyGraph({
      technologies,
      contexts,
      relationships,
    });

    expect(graph.nodes).toHaveLength(technologies.length);
    expect(graph.nodes.every(({ familyId }) => Boolean(familyId))).toBe(true);
    expect(graph.nodes.map(({ id }) => id)).toContain("nodejs");
    expect(graph.nodes.map(({ id }) => id)).not.toContain("unitech");
    expect(graph.contextDetailsByTechnology.java.usedAt).toEqual([
      "Reactive RAG Document Processor — Portfolio",
      "TeraCode — Professional",
      "UNICEN — Learning",
      "Unitech — Professional",
    ]);
    expect(graph.contextDetailsByTechnology.java.learnedAt).toEqual([
      "UNICEN — Learning",
    ]);
  });

  test("derives truthful co-context edges deterministically without a broad clique", () => {
    const first = projectTechnologyGraph({
      technologies,
      contexts,
      relationships,
    });
    const second = projectTechnologyGraph({
      technologies,
      contexts,
      relationships,
    });

    expect(first.edges).toEqual(second.edges);
    expect(first.edges.length).toBeLessThanOrEqual(MAX_VISUAL_EDGE_COUNT);
    expect(
      first.candidateEdges.find(
        ({ sourceId, targetId }) => sourceId === "java" && targetId === "react",
      )?.contextIds,
    ).toEqual(["teracode"]);
    expect(
      first.edges.every(({ contextIds }) =>
        contextIds.every((contextId) =>
          relationships.some(
            (relationship) => relationship.contextId === contextId,
          ),
        ),
      ),
    ).toBe(true);
  });

  test("keeps every connectable technology visibly connected after pruning", () => {
    const graph = projectTechnologyGraph({
      technologies,
      contexts,
      relationships,
    });
    const candidateDegree = new Map<string, number>();
    const visibleDegree = new Map<string, number>();

    for (const edge of graph.candidateEdges) {
      candidateDegree.set(
        edge.sourceId,
        (candidateDegree.get(edge.sourceId) ?? 0) + 1,
      );
      candidateDegree.set(
        edge.targetId,
        (candidateDegree.get(edge.targetId) ?? 0) + 1,
      );
    }
    for (const edge of graph.edges) {
      visibleDegree.set(
        edge.sourceId,
        (visibleDegree.get(edge.sourceId) ?? 0) + 1,
      );
      visibleDegree.set(
        edge.targetId,
        (visibleDegree.get(edge.targetId) ?? 0) + 1,
      );
    }

    for (const [technologyId, degree] of candidateDegree) {
      expect(degree).toBeGreaterThan(0);
      expect(visibleDegree.get(technologyId) ?? 0).toBeGreaterThan(0);
    }

    expect(
      graph.nodes
        .filter(({ id }) => !candidateDegree.has(id))
        .map(({ id }) => id),
    ).toEqual(["maven", "gradle"]);
  });

  test("keeps a visible spanning structure for every candidate component", () => {
    const graph = projectTechnologyGraph({
      technologies,
      contexts,
      relationships,
    });
    const reachableIds = (
      edges: readonly { sourceId: string; targetId: string }[],
      originId: string,
    ) => {
      const reached = new Set([originId]);
      const pending = [originId];

      while (pending.length) {
        const currentId = pending.pop()!;
        for (const edge of edges) {
          const nextId =
            edge.sourceId === currentId
              ? edge.targetId
              : edge.targetId === currentId
                ? edge.sourceId
                : null;

          if (nextId && !reached.has(nextId)) {
            reached.add(nextId);
            pending.push(nextId);
          }
        }
      }

      return reached;
    };

    for (const node of graph.nodes) {
      const candidateComponent = reachableIds(graph.candidateEdges, node.id);

      if (candidateComponent.size > 1) {
        expect(reachableIds(graph.edges, node.id)).toEqual(candidateComponent);
      }
    }
  });
});
