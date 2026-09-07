import { expect, test } from "vitest";
import { storyMilestones } from "./storyMilestones";
test("contains only approved real milestones and the restored Slackware copy", () => {
  expect(storyMilestones.map(({ id }) => id)).not.toContain("time-jump");
  expect(storyMilestones).toHaveLength(14);
  expect(storyMilestones.find(({ id }) => id === "slackware")?.lines).toEqual([
    "A teacher told us Slackware was one of the hardest Linux distributions to install at the time. Naturally, I chose that one.",
    "I installed it on a Celeron 300, fought with the sound configuration, and eventually got Sid Meier's Alpha Centauri running on it.",
    "With sound.",
  ]);
  expect(storyMilestones.at(-1)?.lines.at(-1)).toBe(
    "And after all these years, I still have fun programming.",
  );
  expect(Object.isFrozen(storyMilestones)).toBe(true);
});

test("maps the supplied Story media and preserves approved fallback milestones", () => {
  expect(
    storyMilestones.find(({ id }) => id === "learning")?.media[0],
  ).toMatchObject({
    src: expect.stringContaining("pcrepair.webp"),
  });
  expect(
    storyMilestones.find(({ id }) => id === "technical-school")?.title,
  ).toBe("TECHNICAL HIGH SCHOOL");
  expect(
    storyMilestones.find(({ id }) => id === "unicen")?.media[0],
  ).toMatchObject({
    src: expect.stringContaining("Unicen.jpg"),
  });
  expect(
    storyMilestones.find(({ id }) => id === "cpp")?.media[0],
  ).toMatchObject({
    src: expect.stringContaining("c++.png"),
  });
  expect(
    storyMilestones.find(({ id }) => id === "technical-school")?.media[0],
  ).toMatchObject({ src: expect.stringContaining("enet2.webp") });
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
