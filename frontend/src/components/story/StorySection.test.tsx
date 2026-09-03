import { act, cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import StorySection from "./StorySection";
import { storyMilestones } from "./storyMilestones";

const media = (matches = true) =>
  vi.fn().mockReturnValue({
    matches,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  });
class TestIntersectionObserver {
  static instance: TestIntersectionObserver | undefined;
  callback: IntersectionObserverCallback;
  disconnect = vi.fn();
  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
    TestIntersectionObserver.instance = this;
  }
  observe = vi.fn();
  unobserve = vi.fn();
  takeRecords = () => [];
  emit(target: Element, intersectionRatio: number) {
    this.callback(
      [
        {
          target,
          isIntersecting: intersectionRatio > 0,
          intersectionRatio,
        } as IntersectionObserverEntry,
      ],
      this as unknown as IntersectionObserver,
    );
  }
}
beforeEach(() => {
  vi.stubGlobal("matchMedia", media());
  vi.stubGlobal("requestAnimationFrame", (fn: FrameRequestCallback) => {
    fn(0);
    return 1;
  });
  vi.stubGlobal("cancelAnimationFrame", vi.fn());
  vi.stubGlobal("scrollTo", vi.fn());
});
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

test("keeps real milestones in semantic chronology and renders the time jump as a non-interactive break", () => {
  render(<StorySection />);
  expect(
    within(
      screen.getByRole("list", { name: "Chronological story" }),
    ).getAllByRole("listitem"),
  ).toHaveLength(storyMilestones.length);
  expect(
    screen.queryByRole("button", { name: /2008/ }),
  ).not.toBeInTheDocument();
  expect(
    document.querySelector('[data-milestone-id="still-learning"]'),
  ).toHaveAttribute("data-time-jump-before", "true");
});

test("selecting a milestone uses the same native story scroll position", () => {
  render(<StorySection />);
  const section = screen.getByRole("region", { name: "Explore My Story" });
  Object.defineProperty(section, "offsetHeight", {
    configurable: true,
    value: 6000,
  });
  vi.spyOn(section, "getBoundingClientRect").mockReturnValue({
    top: 100,
    bottom: 0,
    left: 0,
    right: 0,
    width: 0,
    height: 0,
    x: 0,
    y: 100,
    toJSON: () => ({}),
  });
  act(() =>
    screen.getByRole("button", { name: /2007.*ORACLE DATABASE/ }).click(),
  );
  expect(window.scrollTo).toHaveBeenCalled();
});

test("native scroll derives forward and reverse active milestones and cleans listeners up", () => {
  const remove = vi.spyOn(window, "removeEventListener");
  render(<StorySection />);
  const section = screen.getByRole("region", { name: "Explore My Story" });
  Object.defineProperty(section, "offsetHeight", {
    configurable: true,
    value: 6000,
  });
  vi.spyOn(section, "getBoundingClientRect").mockImplementation(() => ({
    top: -window.scrollY,
    bottom: 0,
    left: 0,
    right: 0,
    width: 0,
    height: 0,
    x: 0,
    y: 0,
    toJSON: () => ({}),
  }));
  Object.defineProperty(window, "scrollY", { configurable: true, value: 4800 });
  act(() => window.dispatchEvent(new Event("scroll")));
  expect(
    document
      .querySelector('[data-milestone-id="oracle"]')
      ?.getAttribute("data-active"),
  ).toBe("true");
  Object.defineProperty(window, "scrollY", { configurable: true, value: 0 });
  act(() => window.dispatchEvent(new Event("scroll")));
  expect(
    document
      .querySelector('[data-milestone-id="logo"]')
      ?.getAttribute("data-active"),
  ).toBe("true");
  cleanup();
  expect(remove).toHaveBeenCalledWith("scroll", expect.any(Function));
});

test("has no visible previous or next controls and mobile stays sequential", () => {
  vi.stubGlobal("matchMedia", media(false));
  render(<StorySection />);
  expect(
    screen.queryByRole("button", { name: /previous|next/i }),
  ).not.toBeInTheDocument();
  expect(
    screen.getByRole("region", { name: "Explore My Story" }),
  ).toHaveAttribute("data-desktop-presentation", "false");
});

test("mobile observation updates the active milestone in both reading directions", () => {
  vi.stubGlobal("matchMedia", media(false));
  vi.stubGlobal("IntersectionObserver", TestIntersectionObserver);
  render(<StorySection />);
  const observer = TestIntersectionObserver.instance;
  const firstPc = document.querySelector('[data-milestone-id="first-pc"]');
  const logo = document.querySelector('[data-milestone-id="logo"]');
  act(() => observer?.emit(firstPc!, 0.7));
  expect(firstPc).toHaveAttribute("data-active", "true");
  act(() => observer?.emit(logo!, 0.7));
  expect(logo).toHaveAttribute("data-active", "true");
  cleanup();
  expect(observer?.disconnect).toHaveBeenCalledOnce();
});

test("mobile activates the final milestone at the document bottom and resumes observer activation upward", () => {
  vi.stubGlobal("matchMedia", media(false));
  vi.stubGlobal("IntersectionObserver", TestIntersectionObserver);
  Object.defineProperty(window, "innerHeight", {
    configurable: true,
    value: 800,
  });
  Object.defineProperty(window, "scrollY", { configurable: true, value: 1200 });
  Object.defineProperty(document.documentElement, "scrollHeight", {
    configurable: true,
    value: 2000,
  });
  render(<StorySection />);
  const finalMilestone = document.querySelector(
    '[data-milestone-id="still-learning"]',
  );
  act(() => window.dispatchEvent(new Event("scroll")));
  expect(finalMilestone).toHaveAttribute("data-active", "true");
  const oracle = document.querySelector('[data-milestone-id="oracle"]');
  act(() => TestIntersectionObserver.instance?.emit(oracle!, 0.7));
  expect(oracle).toHaveAttribute("data-active", "true");
});

test("renders supplementary single and dual approved media with meaningful alternative text", () => {
  vi.stubGlobal("matchMedia", media(false));
  render(<StorySection />);
  expect(screen.getByAltText("486-era desktop computer.")).toHaveAttribute(
    "loading",
    "lazy",
  );
  expect(
    screen.getByAltText("BASIC programming environment in DOS."),
  ).toBeInTheDocument();
  expect(
    screen.getByAltText("Fantavision animation software in DOS."),
  ).toBeInTheDocument();
  expect(screen.queryByAltText(/Pascal/i)).not.toBeInTheDocument();
});
