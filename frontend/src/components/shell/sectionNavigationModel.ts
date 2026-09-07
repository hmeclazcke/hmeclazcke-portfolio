export const majorSectionIds = ["home", "about", "technology-graph"] as const;

export type MajorSectionId = (typeof majorSectionIds)[number];
export type MajorSectionStarts = Readonly<Record<MajorSectionId, number>>;

export const activeMajorSectionIndex = (
  scrollY: number,
  headerOffset: number,
  sectionStarts: MajorSectionStarts,
) => {
  const marker = scrollY + headerOffset + 1;

  return majorSectionIds.reduce(
    (activeIndex, id, index) =>
      sectionStarts[id] <= marker ? index : activeIndex,
    0,
  );
};

export const majorSectionTarget = (
  id: MajorSectionId,
  sectionStarts: MajorSectionStarts,
  headerOffset: number,
) => (id === "home" ? 0 : Math.max(0, sectionStarts[id] - headerOffset));
