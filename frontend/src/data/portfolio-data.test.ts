import { describe, expect, test } from "vitest";
import { contexts, relationships, technologies } from "./portfolio-data";

describe("portfolio data access", () => {
  test("exposes the root canonical collections for static frontend consumers", () => {
    expect(technologies).toHaveLength(54);
    expect(contexts).toHaveLength(8);
    expect(relationships).toHaveLength(64);
    expect(technologies.find(({ id }) => id === "java")?.name).toBe("Java");
    expect(contexts.find(({ id }) => id === "unitech")?.name).toBe("Unitech");
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
  });
});
