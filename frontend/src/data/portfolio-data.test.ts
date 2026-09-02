import { describe, expect, test } from "vitest";
import { contexts, relationships, technologies } from "./portfolio-data";

describe("portfolio data access", () => {
  test("exposes the root canonical collections for static frontend consumers", () => {
    expect(technologies).toHaveLength(7);
    expect(contexts).toHaveLength(7);
    expect(relationships).toHaveLength(12);
    expect(technologies.find(({ id }) => id === "java")?.name).toBe("Java");
    expect(contexts.find(({ id }) => id === "unitech")?.name).toBe("Unitech");
    expect(
      relationships.find(({ id }) => id === "java-unitech")?.meanings,
    ).toEqual(["used"]);
  });
});
