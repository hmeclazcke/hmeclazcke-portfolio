import { describe, expect, test } from "vitest";
import { contexts, relationships, technologies } from "./portfolio-data";

describe("portfolio data access", () => {
  test("exposes the root canonical collections for static frontend consumers", () => {
    expect(technologies).toHaveLength(69);
    expect(contexts).toHaveLength(9);
    expect(relationships).toHaveLength(103);
    expect(technologies.find(({ id }) => id === "java")?.name).toBe("Java");
    expect(contexts.find(({ id }) => id === "unitech")?.name).toBe("Unitech");
    expect(
      contexts.find(({ id }) => id === "technical-secondary-school")?.name,
    ).toBe("Technical High School");
    expect(
      relationships.find(({ id }) => id === "java-unitech")?.meanings,
    ).toEqual(["used"]);
    expect(technologies.find(({ id }) => id === "nodejs")?.name).toBe(
      "Node.js",
    );
    expect(
      relationships.find(({ id }) => id === "cplusplus-unicen")?.meanings,
    ).toEqual(["learned", "used"]);
    expect(
      relationships.find(({ id }) => id === "opengl-unicen")?.meanings,
    ).toEqual(["learned", "used"]);
    expect(
      relationships.find(({ id }) => id === "visual-basic-iac")?.meanings,
    ).toEqual(["learned", "used"]);
    expect(
      relationships.find(({ id }) => id === "linux-technical-secondary-school")
        ?.meanings,
    ).toEqual(["learned", "used"]);
    expect(
      relationships.find(({ id }) => id === "nodejs-hmeclazcke-portfolio")
        ?.meanings,
    ).toEqual(["used"]);
    expect(
      relationships.find(({ id }) => id === "spring-boot-unitech")?.meanings,
    ).toEqual(["used"]);
    expect(
      relationships.find(
        ({ id }) => id === "spring-ai-reactive-rag-document-processor",
      )?.meanings,
    ).toEqual(["used"]);
    expect(technologies.find(({ id }) => id === "maven")?.name).toBe("Maven");
    expect(technologies.find(({ id }) => id === "gradle")?.name).toBe("Gradle");
    expect(
      relationships.find(({ id }) => id === "linux-teracode")?.meanings,
    ).toEqual(["used"]);
    expect(technologies.map(({ name }) => name)).toEqual(
      expect.arrayContaining([
        "Ollama",
        "Qwen",
        "Git",
        "Jenkins",
        "GitHub Actions",
        "JUnit",
        "Mockito",
        "Testcontainers",
        "Postman",
        "Selenium",
        "Keycloak",
        "Docker Compose",
        "Kibana",
        "OpenAPI / Swagger",
        "Resilience4j",
      ]),
    );
    expect(
      relationships.find(
        ({ id }) => id === "ollama-reactive-rag-document-processor",
      )?.meanings,
    ).toEqual(["used"]);
    expect(
      relationships.find(
        ({ id }) => id === "qwen-reactive-rag-document-processor",
      )?.meanings,
    ).toEqual(["used"]);
    expect(
      relationships.find(({ id }) => id === "jenkins-unitech")?.meanings,
    ).toEqual(["used"]);
    expect(
      relationships.find(({ id }) => id === "selenium-unitech")?.meanings,
    ).toEqual(["used"]);
    expect(
      relationships.find(
        ({ id }) => id === "github-actions-hmeclazcke-portfolio",
      )?.meanings,
    ).toEqual(["used"]);
    expect(
      contexts.find(({ id }) => id === "personal-projects")?.graphEdgeEligible,
    ).toBe(false);
    expect(contexts.find(({ id }) => id === "job-search-platform")?.type).toBe(
      "portfolio",
    );
    expect(
      relationships
        .filter(({ contextId }) => contextId === "job-search-platform")
        .map(({ technologyId }) => technologyId),
    ).toEqual(
      expect.arrayContaining([
        "java",
        "spring-boot",
        "apache-kafka",
        "redis",
        "mongodb",
        "docker",
        "docker-compose",
        "openapi-swagger",
        "resilience4j",
      ]),
    );
    expect(
      relationships.find(({ id }) => id === "microsoft-sql-server-teracode")
        ?.meanings,
    ).toEqual(["used"]);
    expect(
      relationships.some(
        ({ technologyId, contextId }) =>
          technologyId === "microsoft-sql-server" &&
          contextId === "personal-projects",
      ),
    ).toBe(false);
    expect(
      relationships.some(
        ({ technologyId, contextId }) =>
          technologyId === "rest-apis" && contextId === "personal-projects",
      ),
    ).toBe(false);

    const contextIdsFor = (technologyId: string) =>
      relationships
        .filter((relationship) => relationship.technologyId === technologyId)
        .map((relationship) => relationship.contextId);

    expect(contextIdsFor("keycloak")).toContain("unitech");
    expect(contextIdsFor("maven")).toEqual(
      expect.arrayContaining(["unitech", "teracode", "job-search-platform"]),
    );
    expect(contextIdsFor("maven")).not.toContain(
      "reactive-rag-document-processor",
    );
    expect(contextIdsFor("gradle")).toEqual(
      expect.arrayContaining(["unitech", "reactive-rag-document-processor"]),
    );
    expect(contextIdsFor("junit")).toEqual(
      expect.arrayContaining([
        "unitech",
        "teracode",
        "job-search-platform",
        "reactive-rag-document-processor",
      ]),
    );
    expect(contextIdsFor("mockito")).toEqual(
      expect.arrayContaining([
        "job-search-platform",
        "reactive-rag-document-processor",
      ]),
    );
    expect(contextIdsFor("testcontainers")).toContain(
      "reactive-rag-document-processor",
    );
    expect(contextIdsFor("selenium")).toContain("unitech");
    expect(contextIdsFor("postman")).toEqual(
      expect.arrayContaining([
        "unitech",
        "teracode",
        "job-search-platform",
        "reactive-rag-document-processor",
      ]),
    );
    expect(contextIdsFor("kibana")).toContain("unitech");
    expect(contextIdsFor("git")).toEqual(
      expect.arrayContaining([
        "unitech",
        "teracode",
        "hmeclazcke-portfolio",
        "job-search-platform",
        "reactive-rag-document-processor",
      ]),
    );
    expect(contextIdsFor("jenkins")).toEqual(
      expect.arrayContaining(["unitech", "teracode"]),
    );
  });
});
