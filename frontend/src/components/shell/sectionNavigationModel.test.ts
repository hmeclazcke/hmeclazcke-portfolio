import { describe, expect, test } from "vitest";
import {
  activeMajorSectionIndex,
  majorSectionTarget,
} from "./sectionNavigationModel";

const sectionStarts = {
  home: 0,
  about: 800,
  "technology-graph": 2500,
} as const;

describe("major section navigation model", () => {
  test("treats a root positioned below the persistent header as active", () => {
    expect(activeMajorSectionIndex(740, 60, sectionStarts)).toBe(1);
    expect(activeMajorSectionIndex(2440, 60, sectionStarts)).toBe(2);
  });

  test("uses absolute section roots and one header offset for targets", () => {
    expect(majorSectionTarget("home", sectionStarts, 60)).toBe(0);
    expect(majorSectionTarget("about", sectionStarts, 60)).toBe(740);
    expect(majorSectionTarget("technology-graph", sectionStarts, 60)).toBe(
      2440,
    );
  });
});
