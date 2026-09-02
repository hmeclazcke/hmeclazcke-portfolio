import Ajv2020 from "ajv/dist/2020.js";
import contextsSchema from "../../data/schema/contexts.schema.json" with { type: "json" };
import relationshipsSchema from "../../data/schema/relationships.schema.json" with { type: "json" };
import technologiesSchema from "../../data/schema/technologies.schema.json" with { type: "json" };

const schemas = {
  technologies: technologiesSchema,
  contexts: contextsSchema,
  relationships: relationshipsSchema,
};

const createValidators = () => {
  const ajv = new Ajv2020({ allErrors: true, strict: true });

  return Object.fromEntries(
    Object.entries(schemas).map(([name, schema]) => [
      name,
      ajv.compile(schema),
    ]),
  );
};

const validators = createValidators();

const assertStructurallyValid = (collectionName, collection) => {
  const validate = validators[collectionName];

  if (!validate(collection)) {
    const errors = validate.errors
      .map(({ instancePath, message }) => `${instancePath || "/"} ${message}`)
      .join("; ");
    throw new Error(`Invalid ${collectionName} data: ${errors}`);
  }
};

const assertUniqueIds = (records, entityName) => {
  const ids = new Set();

  for (const { id } of records) {
    if (ids.has(id)) {
      throw new Error(`Duplicate ${entityName} ID: ${id}`);
    }
    ids.add(id);
  }
};

const assertSemanticIntegrity = ({ technologies, contexts, relationships }) => {
  assertUniqueIds(technologies, "Technology");
  assertUniqueIds(contexts, "Context");
  assertUniqueIds(relationships, "Relationship");

  const technologyIds = new Set(technologies.map(({ id }) => id));
  const contextIds = new Set(contexts.map(({ id }) => id));
  const relationshipPairs = new Set();

  for (const relationship of relationships) {
    const { id, technologyId, contextId, meanings } = relationship;

    if (!technologyIds.has(technologyId)) {
      throw new Error(
        `Relationship ${id} references unknown Technology: ${technologyId}`,
      );
    }
    if (!contextIds.has(contextId)) {
      throw new Error(
        `Relationship ${id} references unknown Context: ${contextId}`,
      );
    }

    const pair = `${technologyId}\u0000${contextId}`;
    if (relationshipPairs.has(pair)) {
      throw new Error(
        `Duplicate Technology-Context relationship: ${technologyId} / ${contextId}`,
      );
    }
    relationshipPairs.add(pair);

    if (
      meanings.length === 2 &&
      (meanings[0] !== "learned" || meanings[1] !== "used")
    ) {
      throw new Error(
        `Relationship ${id} meanings must use canonical order: learned, used`,
      );
    }
  }
};

export const validatePortfolioData = ({
  technologies,
  contexts,
  relationships,
}) => {
  assertStructurallyValid("technologies", technologies);
  assertStructurallyValid("contexts", contexts);
  assertStructurallyValid("relationships", relationships);
  assertSemanticIntegrity({ technologies, contexts, relationships });
};
