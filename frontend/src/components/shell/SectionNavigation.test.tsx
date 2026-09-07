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
  Object.defineProperty(window, "scrollY", { configurable: true, value: 0 });
  vi.restoreAllMocks();
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
  return {
    scrollIntoView,
    scrollTo: vi.spyOn(window, "scrollTo").mockImplementation(() => undefined),
  };
};

const setScroll = (value: number) => {
  simulatedScroll = value;
  Object.defineProperty(window, "scrollY", { configurable: true, value });
  fireEvent.scroll(window);
};

test("uses document section boundaries independently of Story internals", async () => {
  const { scrollTo } = renderNavigation();
  const previous = screen.getByRole("button", { name: "Previous section" });
  const next = screen.getByRole("button", { name: "Next section" });

  expect(previous).toBeDisabled();
  fireEvent.click(next);
  expect(scrollTo).toHaveBeenLastCalledWith(
    expect.objectContaining({ top: 800, behavior: "smooth" }),
  );

  setScroll(1100);
  await waitFor(() => expect(previous).not.toBeDisabled());
  expect(next).not.toBeDisabled();
  fireEvent.click(previous);
  expect(scrollTo).toHaveBeenLastCalledWith(
    expect.objectContaining({ top: 0 }),
  );
  fireEvent.click(next);
  expect(scrollTo).toHaveBeenLastCalledWith(
    expect.objectContaining({ top: 2500 }),
  );

  setScroll(2600);
  await waitFor(() => expect(next).toBeDisabled());
  fireEvent.click(previous);
  expect(scrollTo).toHaveBeenLastCalledWith(
    expect.objectContaining({ top: 800 }),
  );
});

test("uses instant navigation when reduced motion is requested", () => {
  vi.stubGlobal(
    "matchMedia",
    vi.fn(() => ({ matches: true })),
  );
  const { scrollTo } = renderNavigation();
  fireEvent.click(screen.getByRole("button", { name: "Next section" }));
  expect(scrollTo).toHaveBeenLastCalledWith(
    expect.objectContaining({ behavior: "auto", top: 800 }),
  );
  vi.unstubAllGlobals();
});

test("keeps Story active across its full outer scroll range", async () => {
  renderNavigation();

  setScroll(2450);

  await waitFor(() => {
    expect(
      screen.getByRole("button", { name: "Previous section" }),
    ).not.toBeDisabled();
    expect(
      screen.getByRole("button", { name: "Next section" }),
    ).not.toBeDisabled();
  });
});

test("never invokes navigation from unavailable controls", async () => {
  const { scrollTo } = renderNavigation();
  const previous = screen.getByRole("button", { name: "Previous section" });

  fireEvent.click(previous);
  expect(scrollTo).not.toHaveBeenCalled();

  setScroll(2600);
  const next = screen.getByRole("button", { name: "Next section" });
  await waitFor(() => expect(next).toBeDisabled());
  fireEvent.click(next);
  expect(scrollTo).not.toHaveBeenCalled();
});

test("renders centered SVG chevrons instead of font glyph icons", () => {
  renderNavigation();

  for (const name of ["Previous section", "Next section"]) {
    const button = screen.getByRole("button", { name });
    expect(button.querySelector("svg")).toBeInTheDocument();
    expect(button).not.toHaveTextContent("⌃");
    expect(button).not.toHaveTextContent("⌄");
  }
});
