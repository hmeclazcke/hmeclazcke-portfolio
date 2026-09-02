import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { validatePortfolioData } from "./portfolio-data-validation.mjs";

const dataDirectory = new URL("../../data/", import.meta.url);

const readJson = async (fileName) => {
  const file = new URL(fileName, dataDirectory);
  return JSON.parse(await readFile(file, "utf8"));
};

try {
  await Promise.all(
    ["technologies", "contexts", "relationships"].map(async (collection) => [
      collection,
      await readJson(`${collection}.json`),
    ]),
  ).then((collections) =>
    validatePortfolioData(Object.fromEntries(collections)),
  );
  console.log("Canonical portfolio data is valid.");
} catch (error) {
  const location = fileURLToPath(dataDirectory);
  console.error(
    `Canonical portfolio data validation failed (${location}): ${error.message}`,
  );
  process.exitCode = 1;
}
