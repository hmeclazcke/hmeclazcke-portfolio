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
      "job-search-platform — Portfolio",
    ]);
    expect(graph.contextDetailsByTechnology.java.learnedAt).toEqual([
      "UNICEN — Learning",
    ]);
  });

  test("assigns every owner-confirmed inventory addition to one existing family", () => {
    const graph = projectTechnologyGraph({
      technologies,
      contexts,
      relationships,
    });
    const additions = [
      "ollama",
      "qwen",
      "git",
      "jenkins",
      "github-actions",
      "junit",
      "mockito",
      "testcontainers",
      "postman",
      "selenium",
      "keycloak",
      "docker-compose",
      "kibana",
      "openapi-swagger",
      "resilience4j",
    ];

    expect(
      additions.map(
        (id) => graph.nodes.find((node) => node.id === id)?.familyId,
      ),
    ).toEqual([
      "ai",
      "ai",
      "build",
      "build",
      "build",
      "build",
      "build",
      "build",
      "build",
      "build",
      "enterprise",
      "infrastructure",
      "data",
      "apis",
      "java-frameworks",
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

  test("retains deduplicated shared-context explanations for graph edges", () => {
    const graph = projectTechnologyGraph({
      technologies,
      contexts,
      relationships,
    });
    const javaSmalltalk = graph.candidateEdges.find(
      ({ id }) => id === "java--smalltalk",
    );
    const javaSpringBoot = graph.candidateEdges.find(
      ({ id }) => id === "java--spring-boot",
    );

    expect(javaSmalltalk?.sharedContexts).toEqual([
      { id: "unicen", name: "UNICEN", type: "learning" },
    ]);
    expect(javaSpringBoot?.sharedContexts).toEqual([
      {
        id: "job-search-platform",
        name: "job-search-platform",
        type: "portfolio",
      },
      {
        id: "reactive-rag-document-processor",
        name: "Reactive RAG Document Processor",
        type: "portfolio",
      },
      { id: "unitech", name: "Unitech", type: "professional" },
    ]);
  });

  test("keeps broad personal history out of graph candidates while retaining it in details", () => {
    const graph = projectTechnologyGraph({
      technologies,
      contexts,
      relationships,
    });

    expect(
      graph.candidateEdges.find(({ id }) => id === "basic--c"),
    ).toBeUndefined();
    expect(graph.contextDetailsByTechnology.c.usedAt).toContain(
      "Personal Projects \u2014 Personal project",
    );
  });

  test("builds shared-context metadata from the eligible endpoint intersection only", () => {
    const graph = projectTechnologyGraph({
      technologies,
      contexts,
      relationships,
    });
    const javaSmalltalk = graph.candidateEdges.find(
      ({ id }) => id === "java--smalltalk",
    );

    expect(javaSmalltalk?.sharedContexts).toEqual([
      { id: "unicen", name: "UNICEN", type: "learning" },
    ]);
    expect(javaSmalltalk?.sharedContexts).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: "personal-projects" }),
      ]),
    );
  });

  test("ranks focused multi-context evidence above a single broad context without technology exceptions", () => {
    const graph = projectTechnologyGraph({
      technologies,
      contexts,
      relationships,
    });
    const evidence = new Map(
      graph.candidateEdges.map((edge) => [edge.id, edge]),
    );

    expect(evidence.get("java--spring-boot")?.contextIds).toEqual(
      expect.arrayContaining(["unitech", "reactive-rag-document-processor"]),
    );
    expect(evidence.get("java--spring-boot")?.evidenceScore).toBeGreaterThan(
      evidence.get("angular--spring-framework")?.evidenceScore ?? 0,
    );
    expect(graph.edges).toEqual(expect.any(Array));
    expect(graph.nodes.every((node) => node.familyId)).toBe(true);
    expect(
      graph.nodes.some(
        (node) => node.id === "angular" && "specialCase" in node,
      ),
    ).toBe(false);
  });

  test("uses a degree-balanced visual projection instead of a spanning-tree hub", () => {
    const graph = projectTechnologyGraph({
      technologies,
      contexts,
      relationships,
    });
    const visibleDegrees = new Map<string, number>();
    for (const edge of graph.edges) {
      visibleDegrees.set(
        edge.sourceId,
        (visibleDegrees.get(edge.sourceId) ?? 0) + 1,
      );
      visibleDegrees.set(
        edge.targetId,
        (visibleDegrees.get(edge.targetId) ?? 0) + 1,
      );
    }

    expect(Math.max(...visibleDegrees.values())).toBeLessThanOrEqual(4);
    expect(visibleDegrees.get("angular")).toBeLessThanOrEqual(4);
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
    ).toEqual(["python"]);
    expect(
      graph.edges.every((edge) =>
        graph.candidateEdges.some(({ id }) => id === edge.id),
      ),
    ).toBe(true);
  });

  test("retains broad visual coverage without imposing a spanning-tree shape", () => {
    const graph = projectTechnologyGraph({
      technologies,
      contexts,
      relationships,
    });
    const visibleIds = new Set(
      graph.edges.flatMap((edge) => [edge.sourceId, edge.targetId]),
    );

    expect(visibleIds).toEqual(new Set([...visibleIds]));
  });
});
