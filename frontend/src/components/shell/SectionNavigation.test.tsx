import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, expect, test, vi } from "vitest";
import SectionNavigation from "./SectionNavigation";

afterEach(() => {
  simulatedScroll = 0;
  cleanup();
});
let simulatedScroll = 0;

const renderNavigation = () => {
  document.body.innerHTML =
    '<section id="home"></section><section id="about"></section><section id="technology-graph"></section>';
  const scrollIntoView = vi.fn();
  for (const [id, top] of [
    ["home", 0],
    ["about", 800],
    ["technology-graph", 2500],
  ] as const) {
    const element = document.getElementById(id)!;
    element.scrollIntoView = scrollIntoView;
    vi.spyOn(element, "getBoundingClientRect").mockImplementation(
      () => ({ top: top - simulatedScroll }) as DOMRect,
    );
  }
  render(<SectionNavigation />);
  return scrollIntoView;
};

const setScroll = (value: number) => {
  simulatedScroll = value;
  fireEvent.scroll(window);
};

test("uses explicit Home, Story, and Graph anchors for section navigation", async () => {
  const scrollIntoView = renderNavigation();
  const previous = screen.getByRole("button", { name: "Previous section" });
  const next = screen.getByRole("button", { name: "Next section" });

  expect(previous).toBeDisabled();
  fireEvent.click(next);
  expect(document.getElementById("about")!.scrollIntoView).toHaveBeenCalledWith(
    expect.objectContaining({ block: "start" }),
  );

  setScroll(1100);
  await waitFor(() => expect(previous).not.toBeDisabled());
  expect(next).not.toBeDisabled();
  fireEvent.click(previous);
  expect(document.getElementById("home")!.scrollIntoView).toHaveBeenCalled();
  fireEvent.click(next);
  expect(
    document.getElementById("technology-graph")!.scrollIntoView,
  ).toHaveBeenCalled();

  setScroll(2600);
  await waitFor(() => expect(next).toBeDisabled());
  fireEvent.click(previous);
  expect(document.getElementById("about")!.scrollIntoView).toHaveBeenCalled();
  expect(scrollIntoView).toHaveBeenCalled();
});

test("uses instant navigation when reduced motion is requested", () => {
  vi.stubGlobal(
    "matchMedia",
    vi.fn(() => ({ matches: true })),
  );
  renderNavigation();
  fireEvent.click(screen.getByRole("button", { name: "Next section" }));
  expect(document.getElementById("about")!.scrollIntoView).toHaveBeenCalledWith(
    { behavior: "auto", block: "start" },
  );
  vi.unstubAllGlobals();
});
