import { cleanup, render, screen, within } from "@testing-library/react";
import { act } from "react";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import StorySection from "./StorySection";
import { storyMilestones } from "./storyMilestones";

type ObserverCallback = (
  entries: IntersectionObserverEntry[],
  observer: IntersectionObserver,
) => void;

class TestIntersectionObserver {
  static instances: TestIntersectionObserver[] = [];

  readonly observed = new Set<Element>();
  readonly disconnect = vi.fn();
  readonly callback: ObserverCallback;
  readonly options?: IntersectionObserverInit;

  constructor(callback: ObserverCallback, options?: IntersectionObserverInit) {
    this.callback = callback;
    this.options = options;
    TestIntersectionObserver.instances.push(this);
  }

  observe = (element: Element) => {
    this.observed.add(element);
  };

  unobserve = vi.fn();

  takeRecords = () => [];

  emit(entries: IntersectionObserverEntry[]) {
    this.callback(entries, this as unknown as IntersectionObserver);
  }
}

const entry = (
  target: Element,
  top: number,
  isIntersecting = true,
): IntersectionObserverEntry =>
  ({
    target,
    isIntersecting,
    intersectionRatio: isIntersecting ? 1 : 0,
    boundingClientRect: { top, height: 100 } as DOMRectReadOnly,
    intersectionRect: {} as DOMRectReadOnly,
    rootBounds: { top: 0, height: 800 } as DOMRectReadOnly,
    time: 0,
  }) as IntersectionObserverEntry;

beforeEach(() => {
  TestIntersectionObserver.instances = [];
  vi.stubGlobal("IntersectionObserver", TestIntersectionObserver);
  vi.stubGlobal(
    "matchMedia",
    vi.fn().mockReturnValue({
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }),
  );
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

test("keeps every milestone in a semantic chronological list without enhancement", () => {
  vi.stubGlobal("IntersectionObserver", undefined);
  render(<StorySection />);

  const list = screen.getByRole("list", { name: "Chronological story" });
  const items = within(list).getAllByRole("listitem");

  expect(items).toHaveLength(storyMilestones.length);
  for (const [index, milestone] of storyMilestones.entries()) {
    expect(items[index]).toHaveTextContent(milestone.period);
    for (const line of milestone.lines) {
      expect(items[index]).toHaveTextContent(line);
    }
  }
});

test("enhances the active milestone locally and disconnects its observer", () => {
  const { unmount } = render(<StorySection />);
  const observer = TestIntersectionObserver.instances[0];
  const logo = document.querySelector('[data-milestone-id="logo"]');
  const firstPc = document.querySelector('[data-milestone-id="first-pc"]');

  expect(observer).toBeDefined();
  expect(observer?.observed.size).toBe(storyMilestones.length);
  expect(logo).toHaveAttribute("data-active", "true");

  act(() => {
    observer?.emit([entry(logo!, 50), entry(firstPc!, 330)]);
  });

  expect(firstPc).toHaveAttribute("data-active", "true");
  expect(logo).toHaveAttribute("data-active", "false");
  expect(screen.getByText("486 DX4 100 MHz")).toBeInTheDocument();
  expect(
    within(
      screen.getByRole("complementary", { name: "Story milestone emphasis" }),
    ).getByText("MY FIRST PC"),
  ).toBeInTheDocument();

  const iac = document.querySelector('[data-milestone-id="iac"]');

  act(() => {
    observer?.emit([entry(firstPc!, 350), entry(iac!, 350)]);
  });

  expect(firstPc).toHaveAttribute("data-active", "true");
  expect(iac).toHaveAttribute("data-active", "false");

  unmount();

  expect(observer?.disconnect).toHaveBeenCalledOnce();
});
