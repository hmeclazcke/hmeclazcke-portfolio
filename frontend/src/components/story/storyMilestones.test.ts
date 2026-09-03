import { expect, test } from "vitest";
import { storyMilestones } from "./storyMilestones";
test("contains only approved real milestones and the updated Slackware copy", () => {
  expect(storyMilestones.map(({ id }) => id)).not.toContain("time-jump");
  expect(storyMilestones).toHaveLength(14);
  expect(
    storyMilestones.find(({ id }) => id === "slackware")?.lines[0],
  ).toContain("In high school");
  expect(storyMilestones.at(-1)?.lines.at(-1)).toBe(
    "And after all these years, I still have fun programming.",
  );
  expect(Object.isFrozen(storyMilestones)).toBe(true);
});

test("maps only the approved supplied Story media and leaves fallback milestones empty", () => {
  expect(storyMilestones.find(({ id }) => id === "learning")?.media).toEqual(
    [],
  );
  expect(storyMilestones.find(({ id }) => id === "iac")?.media).toHaveLength(2);
  expect(
    storyMilestones.find(({ id }) => id === "visual-basic")?.media,
  ).toHaveLength(2);
  expect(
    storyMilestones.find(({ id }) => id === "slackware")?.media,
  ).toHaveLength(2);
  expect(
    storyMilestones.find(({ id }) => id === "oracle")?.media[0],
  ).toMatchObject({
    src: expect.stringContaining("Me-Circa2007.JPG"),
    alt: "Hernán Meclazcke at a computer, circa 2007.",
  });
  expect(
    storyMilestones
      .flatMap(({ media }) => media)
      .some(({ src }) => src.includes("Pascal.png")),
  ).toBe(false);
});
