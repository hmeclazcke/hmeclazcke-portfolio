import { expect, test } from "vitest";
import { storyMilestones } from "./storyMilestones";

const approvedMilestones = [
  {
    id: "logo",
    period: "1994",
    title: "LOGO",
    lines: [
      "My first contact with programming. I was 10, and it all started with a turtle.",
    ],
    visualKind: "abstract",
  },
  {
    id: "first-pc",
    period: "1996",
    title: "MY FIRST PC",
    lines: ["486 DX4 100 MHz", "4 MB RAM · 640 MB HDD"],
    visualKind: "abstract",
  },
  {
    id: "iac",
    period: "IAC",
    title: "BASIC & FANTAVISION",
    lines: [
      "At Instituto Argentino de Computación, I learned BASIC and experimented with Fantavision, a DOS animation program.",
    ],
    visualKind: "abstract",
  },
  {
    id: "visual-basic",
    period: "1998",
    title: "VISUAL BASIC",
    lines: [
      "Visual Basic, a Sound Blaster 16 and a CD-ROM drive. Computers were becoming much more than just programming.",
    ],
    visualKind: "abstract",
  },
  {
    id: "learning",
    period: "1998–2000",
    title: "LEARNING EVERYTHING I COULD",
    lines: [
      "PC repair, Microsoft Office and basically every computer course I could convince my parents to pay for.",
    ],
    visualKind: "abstract",
  },
  {
    id: "slackware",
    period: "1999",
    title: "SLACKWARE LINUX",
    lines: [
      "A teacher told us Slackware was one of the hardest Linux distributions to install at the time. Naturally, I chose that one.",
      "I installed it on a Celeron 300, fought with the sound configuration, and eventually got Sid Meier's Alpha Centauri running on it.",
      "With sound.",
    ],
    visualKind: "abstract",
  },
  {
    id: "lan-parties",
    period: "LATE 1990s / EARLY 2000s",
    title: "LAN PARTIES",
    lines: [
      "We carried entire PCs, CRT monitors and cables to each other's houses and built our little networks for the night.",
    ],
    visualKind: "abstract",
  },
  {
    id: "technical-school",
    period: "2001",
    title: "TECHNICAL SECONDARY SCHOOL",
    lines: ["Técnico en Informática Personal y Profesional"],
    visualKind: "abstract",
  },
  {
    id: "unicen",
    period: "2002",
    title: "UNICEN",
    lines: ["I started studying at UNICEN."],
    visualKind: "abstract",
  },
  { id: "c", period: "2004", title: "C", lines: [], visualKind: "abstract" },
  {
    id: "cpp",
    period: "2005",
    title: "C++",
    lines: [],
    visualKind: "abstract",
  },
  {
    id: "java",
    period: "2006",
    title: "JAVA",
    lines: [],
    visualKind: "abstract",
  },
  {
    id: "oracle",
    period: "2007",
    title: "ORACLE DATABASE",
    lines: [],
    visualKind: "abstract",
  },
  {
    id: "time-jump",
    period: "2008–2025",
    title: "…",
    lines: [],
    visualKind: "time-jump",
  },
  {
    id: "still-learning",
    period: "2026",
    title: "STILL LEARNING",
    lines: [
      "Still learning, still building — exploring modern Java, reactive systems, RAG, containers, AI-assisted development, and new ways of building software.",
      "And after all these years, I still have fun programming.",
    ],
    visualKind: "abstract",
  },
] as const;

test("keeps the approved Story narrative in one ordered readonly collection", () => {
  expect(storyMilestones).toEqual(approvedMilestones);
  expect(Object.isFrozen(storyMilestones)).toBe(true);
  expect(Object.isFrozen(storyMilestones[0]?.lines)).toBe(true);
  expect(
    storyMilestones.find((milestone) => milestone.id === "iac")?.period,
  ).toBe("IAC");
});
