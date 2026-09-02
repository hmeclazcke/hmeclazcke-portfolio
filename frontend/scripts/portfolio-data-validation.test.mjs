import { describe, expect, test } from "vitest";
import { validatePortfolioData } from "./portfolio-data-validation.mjs";

const validData = () => ({
  technologies: [{ id: "java", name: "Java", category: "language" }],
  contexts: [{ id: "learning", name: "Learning", type: "learning" }],
  relationships: [
    {
      id: "java-learning",
      technologyId: "java",
      contextId: "learning",
      meanings: ["learned"],
    },
  ],
});

const expectInvalid = (data, message) => {
  expect(() => validatePortfolioData(data)).toThrow(message);
};

describe("portfolio data structural validation", () => {
  test("accepts valid relationships with learned, used, or both meanings", () => {
    const learned = validData();
    const used = validData();
    const both = validData();
    used.relationships[0].meanings = ["used"];
    both.relationships[0].meanings = ["learned", "used"];

    expect(() => validatePortfolioData(learned)).not.toThrow();
    expect(() => validatePortfolioData(used)).not.toThrow();
    expect(() => validatePortfolioData(both)).not.toThrow();
  });

  test("rejects malformed technology records", () => {
    const data = validData();
    data.technologies = [{ id: "java", category: "language" }];

    expectInvalid(data, /technologies.*name/i);
  });

  test("rejects malformed context records", () => {
    const data = validData();
    data.contexts = [{ id: "learning", name: "Learning" }];

    expectInvalid(data, /contexts.*type/i);
  });

  test("rejects malformed relationship records", () => {
    const data = validData();
    data.relationships = [{ id: "java-learning", technologyId: "java" }];

    expectInvalid(data, /relationships.*contextId/i);
  });

  test("rejects unsupported controlled values", () => {
    const invalidCategory = validData();
    invalidCategory.technologies[0].category = "unknown";
    expectInvalid(invalidCategory, /technologies.*category/i);

    const invalidRelevance = validData();
    invalidRelevance.technologies[0].relevance = "future";
    expectInvalid(invalidRelevance, /technologies.*relevance/i);

    const invalidContextType = validData();
    invalidContextType.contexts[0].type = "education";
    expectInvalid(invalidContextType, /contexts.*type/i);

    const invalidMeaning = validData();
    invalidMeaning.relationships[0].meanings = ["practiced"];
    expectInvalid(invalidMeaning, /relationships.*meanings/i);
  });

  test("rejects empty or duplicate relationship meanings", () => {
    const empty = validData();
    empty.relationships[0].meanings = [];
    expectInvalid(empty, /relationships.*meanings/i);

    const duplicate = validData();
    duplicate.relationships[0].meanings = ["learned", "learned"];
    expectInvalid(duplicate, /relationships.*meanings/i);
  });
});

describe("portfolio data semantic validation", () => {
  test("accepts a valid canonical-only technology, context, and relationship addition", () => {
    const data = validData();
    data.technologies.push({
      id: "new-tool",
      name: "New Tool",
      category: "tool",
    });
    data.contexts.push({
      id: "new-context",
      name: "New Context",
      type: "learning",
    });
    data.relationships.push({
      id: "new-tool-new-context",
      technologyId: "new-tool",
      contextId: "new-context",
      meanings: ["learned", "used"],
    });

    expect(() => validatePortfolioData(data)).not.toThrow();
  });

  test("rejects duplicate technology IDs", () => {
    const data = validData();
    data.technologies.push({
      id: "java",
      name: "Java 2",
      category: "language",
    });

    expectInvalid(data, /duplicate technology ID.*java/i);
  });

  test("rejects duplicate context IDs", () => {
    const data = validData();
    data.contexts.push({
      id: "learning",
      name: "Learning 2",
      type: "learning",
    });

    expectInvalid(data, /duplicate context ID.*learning/i);
  });

  test("rejects duplicate relationship IDs", () => {
    const data = validData();
    data.contexts.push({
      id: "professional",
      name: "Professional",
      type: "professional",
    });
    data.relationships.push({
      id: "java-learning",
      technologyId: "java",
      contextId: "professional",
      meanings: ["used"],
    });

    expectInvalid(data, /duplicate relationship ID.*java-learning/i);
  });

  test("rejects dangling technology and context references", () => {
    const missingTechnology = validData();
    missingTechnology.relationships[0].technologyId = "missing";
    expectInvalid(missingTechnology, /unknown technology.*missing/i);

    const missingContext = validData();
    missingContext.relationships[0].contextId = "missing";
    expectInvalid(missingContext, /unknown context.*missing/i);
  });

  test("rejects duplicate technology-context pairs", () => {
    const data = validData();
    data.relationships.push({
      id: "java-learning-used",
      technologyId: "java",
      contextId: "learning",
      meanings: ["used"],
    });

    expectInvalid(
      data,
      /duplicate technology-context relationship.*java.*learning/i,
    );
  });

  test("rejects non-canonical ordering of both meanings", () => {
    const data = validData();
    data.relationships[0].meanings = ["used", "learned"];

    expectInvalid(data, /canonical.*learned.*used/i);
  });
});
