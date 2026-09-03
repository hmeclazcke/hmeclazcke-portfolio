export type StoryVisualKind = "abstract" | "time-jump";

export type StoryMilestone = Readonly<{
  id: string;
  period: string;
  title: string;
  lines: readonly string[];
  visualKind: StoryVisualKind;
}>;

const milestone = (
  id: string,
  period: string,
  title: string,
  lines: readonly string[],
  visualKind: StoryVisualKind = "abstract",
): StoryMilestone =>
  Object.freeze({
    id,
    period,
    title,
    lines: Object.freeze([...lines]),
    visualKind,
  });

export const storyMilestones: readonly StoryMilestone[] = Object.freeze([
  milestone("logo", "1994", "LOGO", [
    "My first contact with programming. I was 10, and it all started with a turtle.",
  ]),
  milestone("first-pc", "1996", "MY FIRST PC", [
    "486 DX4 100 MHz",
    "4 MB RAM · 640 MB HDD",
  ]),
  milestone("iac", "IAC", "BASIC & FANTAVISION", [
    "At Instituto Argentino de Computación, I learned BASIC and experimented with Fantavision, a DOS animation program.",
  ]),
  milestone("visual-basic", "1998", "VISUAL BASIC", [
    "Visual Basic, a Sound Blaster 16 and a CD-ROM drive. Computers were becoming much more than just programming.",
  ]),
  milestone("learning", "1998–2000", "LEARNING EVERYTHING I COULD", [
    "PC repair, Microsoft Office and basically every computer course I could convince my parents to pay for.",
  ]),
  milestone("slackware", "1999", "SLACKWARE LINUX", [
    "A teacher told us Slackware was one of the hardest Linux distributions to install at the time. Naturally, I chose that one.",
    "I installed it on a Celeron 300, fought with the sound configuration, and eventually got Sid Meier's Alpha Centauri running on it.",
    "With sound.",
  ]),
  milestone("lan-parties", "LATE 1990s / EARLY 2000s", "LAN PARTIES", [
    "We carried entire PCs, CRT monitors and cables to each other's houses and built our little networks for the night.",
  ]),
  milestone("technical-school", "2001", "TECHNICAL SECONDARY SCHOOL", [
    "Técnico en Informática Personal y Profesional",
  ]),
  milestone("unicen", "2002", "UNICEN", ["I started studying at UNICEN."]),
  milestone("c", "2004", "C", []),
  milestone("cpp", "2005", "C++", []),
  milestone("java", "2006", "JAVA", []),
  milestone("oracle", "2007", "ORACLE DATABASE", []),
  milestone("time-jump", "2008–2025", "…", [], "time-jump"),
  milestone("still-learning", "2026", "STILL LEARNING", [
    "Still learning, still building — exploring modern Java, reactive systems, RAG, containers, AI-assisted development, and new ways of building software.",
    "And after all these years, I still have fun programming.",
  ]),
]);
