export const majorSectionIds = [
  "home",
  "about",
  "technology-graph",
  "contact",
] as const;

export type MajorSectionId = (typeof majorSectionIds)[number];
export type MajorSectionStarts = Readonly<Record<MajorSectionId, number>>;
type DocumentMetrics = {
  documentHeight: number;
  viewportHeight: number;
};

export const activeMajorSectionIndex = (
  scrollY: number,
  headerOffset: number,
  sectionStarts: MajorSectionStarts,
  documentMetrics?: DocumentMetrics,
) => {
  if (
    documentMetrics &&
    documentMetrics.documentHeight >= documentMetrics.viewportHeight &&
    scrollY + documentMetrics.viewportHeight >=
      documentMetrics.documentHeight - 1
  ) {
    return majorSectionIds.length - 1;
  }

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
  maximumScrollY = Number.POSITIVE_INFINITY,
) => {
  const target =
    id === "home" ? 0 : Math.max(0, sectionStarts[id] - headerOffset);

  return id === "contact" ? Math.min(maximumScrollY, target) : target;
};
