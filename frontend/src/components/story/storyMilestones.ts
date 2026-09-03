export type StoryVisualKind = "abstract";
export type StoryMedia = Readonly<{
  src: string;
  alt: string;
  fit?: "contain" | "cover";
}>;
export type StoryMilestone = Readonly<{
  id: string;
  period: string;
  title: string;
  lines: readonly string[];
  visualKind: StoryVisualKind;
  media: readonly StoryMedia[];
}>;
const storyAsset = (filename: string) =>
  `${import.meta.env.BASE_URL}story/${filename}`;
const milestone = (
  id: string,
  period: string,
  title: string,
  lines: readonly string[],
  media: readonly StoryMedia[] = [],
): StoryMilestone =>
  Object.freeze({
    id,
    period,
    title,
    lines: Object.freeze([...lines]),
    media: Object.freeze([...media]),
    visualKind: "abstract",
  });
export const storyMilestones: readonly StoryMilestone[] = Object.freeze([
  milestone(
    "logo",
    "1994",
    "LOGO",
    [
      "My first contact with programming. I was 10, and it all started with a turtle.",
    ],
    [
      {
        src: storyAsset("logo.gif"),
        alt: "LOGO turtle graphics programming environment.",
      },
    ],
  ),
  milestone(
    "first-pc",
    "1996",
    "MY FIRST PC",
    ["486 DX4 100 MHz", "4 MB RAM · 640 MB HDD"],
    [
      {
        src: storyAsset("486.jpg"),
        alt: "486-era desktop computer.",
        fit: "cover",
      },
    ],
  ),
  milestone(
    "iac",
    "IAC",
    "BASIC & FANTAVISION",
    [
      "At Instituto Argentino de Computación, I learned BASIC and experimented with Fantavision, a DOS animation program.",
    ],
    [
      {
        src: storyAsset("Basic.png"),
        alt: "BASIC programming environment in DOS.",
      },
      {
        src: storyAsset("5732-4-fanta-vision.jpg"),
        alt: "Fantavision animation software in DOS.",
      },
    ],
  ),
  milestone(
    "visual-basic",
    "1998",
    "VISUAL BASIC",
    [
      "Visual Basic, a Sound Blaster 16 and a CD-ROM drive. Computers were becoming much more than just programming.",
    ],
    [
      {
        src: storyAsset("VisualBasic.png"),
        alt: "Microsoft Visual Basic development environment.",
      },
      {
        src: storyAsset("SoundBlaster16.jpg"),
        alt: "Sound Blaster 16 multimedia hardware packaging.",
        fit: "cover",
      },
    ],
  ),
  milestone("learning", "1998–2000", "LEARNING EVERYTHING I COULD", [
    "PC repair, Microsoft Office and basically every computer course I could convince my parents to pay for.",
  ]),
  milestone(
    "slackware",
    "1999",
    "SLACKWARE LINUX",
    [
      "In high school, a teacher told us Slackware was one of the hardest Linux distributions to install at the time. Naturally, I chose that one.",
      "I installed it on a Celeron 300, fought with the sound configuration, and eventually got Sid Meier's Alpha Centauri running on it.",
      "With sound.",
    ],
    [
      {
        src: storyAsset("Slackware.webp"),
        alt: "Slackware Linux desktop environment.",
      },
      {
        src: storyAsset("AlphaCentauri.webp"),
        alt: "Sid Meier's Alpha Centauri running on a computer.",
      },
    ],
  ),
  milestone(
    "lan-parties",
    "LATE 1990s / EARLY 2000s",
    "LAN PARTIES",
    [
      "We carried entire PCs, CRT monitors and cables to each other's houses and built our little networks for the night.",
    ],
    [
      {
        src: storyAsset("LAN Party.webp"),
        alt: "A home LAN party with desktop PCs and CRT monitors.",
        fit: "cover",
      },
    ],
  ),
  milestone("technical-school", "2001", "TECHNICAL SECONDARY SCHOOL", [
    "Técnico en Informática Personal y Profesional",
  ]),
  milestone("unicen", "2002", "UNICEN", ["I started studying at UNICEN."]),
  milestone(
    "c",
    "2004",
    "C",
    [],
    [
      {
        src: storyAsset("C-Book.jpg"),
        alt: "The C Programming Language book.",
      },
    ],
  ),
  milestone("cpp", "2005", "C++", []),
  milestone(
    "java",
    "2006",
    "JAVA",
    [],
    [
      {
        src: storyAsset("JavaEclipseEuropaSplashScreen.png"),
        alt: "Eclipse Europa splash screen.",
      },
    ],
  ),
  milestone(
    "oracle",
    "2007",
    "ORACLE DATABASE",
    [],
    [
      {
        src: storyAsset("Me-Circa2007.JPG"),
        alt: "Hernán Meclazcke at a computer, circa 2007.",
        fit: "cover",
      },
    ],
  ),
  milestone(
    "still-learning",
    "2026",
    "STILL LEARNING",
    [
      "Still learning, still building — exploring modern Java, reactive systems, RAG, containers, AI-assisted development, and new ways of building software.",
      "And after all these years, I still have fun programming.",
    ],
    [
      {
        src: storyAsset("IntelliJ-SDD-2026.png"),
        alt: "IntelliJ IDEA during an AI-assisted software development workflow in 2026.",
      },
    ],
  ),
]);
