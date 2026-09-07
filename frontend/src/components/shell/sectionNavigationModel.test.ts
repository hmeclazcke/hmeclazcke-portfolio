import { describe, expect, test } from "vitest";
import {
  activeMajorSectionIndex,
  majorSectionTarget,
} from "./sectionNavigationModel";

const sectionStarts = {
  home: 0,
  about: 800,
  "technology-graph": 2500,
  contact: 3600,
} as const;

describe("major section navigation model", () => {
  test("treats a root positioned below the persistent header as active", () => {
    expect(activeMajorSectionIndex(740, 60, sectionStarts)).toBe(1);
    expect(activeMajorSectionIndex(2440, 60, sectionStarts)).toBe(2);
    expect(activeMajorSectionIndex(3540, 60, sectionStarts)).toBe(3);
  });

  test("uses absolute section roots and one header offset for targets", () => {
    expect(majorSectionTarget("home", sectionStarts, 60)).toBe(0);
    expect(majorSectionTarget("about", sectionStarts, 60)).toBe(740);
    expect(majorSectionTarget("technology-graph", sectionStarts, 60)).toBe(
      2440,
    );
    expect(majorSectionTarget("contact", sectionStarts, 60, 3200)).toBe(3200);
  });

  test("does not apply the short-footer scroll cap to the Graph destination", () => {
    expect(
      majorSectionTarget("technology-graph", sectionStarts, 60, 2000),
    ).toBe(2440);
  });

  test("treats document bottom as the final major section for a short footer", () => {
    expect(
      activeMajorSectionIndex(3150, 60, sectionStarts, {
        documentHeight: 3900,
        viewportHeight: 750,
      }),
    ).toBe(3);
  });
});
