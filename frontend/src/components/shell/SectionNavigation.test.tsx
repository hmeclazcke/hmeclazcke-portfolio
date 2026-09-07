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
    '<section id="home"></section><section id="about"></section><section id="technology-graph"></section><footer id="contact"></footer>';
  const scrollIntoViews = new Map<string, ReturnType<typeof vi.fn>>();
  for (const [id, top] of [
    ["home", 0],
    ["about", 800],
    ["technology-graph", 2500],
    ["contact", 3600],
  ] as const) {
    const element = document.getElementById(id)!;
    const scrollIntoView = vi.fn();
    scrollIntoViews.set(id, scrollIntoView);
    element.scrollIntoView = scrollIntoView;
    vi.spyOn(element, "getBoundingClientRect").mockImplementation(
      () => ({ top: top - simulatedScroll }) as DOMRect,
    );
  }
  render(<SectionNavigation />);
  return {
    scrollIntoView: (id: string) => scrollIntoViews.get(id)!,
    scrollTo: vi.spyOn(window, "scrollTo").mockImplementation(() => undefined),
  };
};

const setScroll = (value: number) => {
  simulatedScroll = value;
  Object.defineProperty(window, "scrollY", { configurable: true, value });
  fireEvent.scroll(window);
};

test("uses document section boundaries independently of Story internals", async () => {
  const { scrollIntoView } = renderNavigation();
  const previous = screen.getByRole("button", { name: "Previous section" });
  const next = screen.getByRole("button", { name: "Next section" });

  expect(previous).toBeDisabled();
  fireEvent.click(next);
  expect(scrollIntoView("about")).toHaveBeenLastCalledWith(
    expect.objectContaining({ block: "start", behavior: "smooth" }),
  );

  setScroll(1100);
  await waitFor(() => expect(previous).not.toBeDisabled());
  expect(next).not.toBeDisabled();
  fireEvent.click(previous);
  expect(scrollIntoView("home")).toHaveBeenLastCalledWith(
    expect.objectContaining({ block: "start" }),
  );
  fireEvent.click(next);
  expect(scrollIntoView("technology-graph")).toHaveBeenLastCalledWith(
    expect.objectContaining({ block: "start" }),
  );

  setScroll(2600);
  await waitFor(() => expect(next).not.toBeDisabled());
  fireEvent.click(next);
  expect(scrollIntoView("contact")).toHaveBeenLastCalledWith(
    expect.objectContaining({ block: "start" }),
  );

  setScroll(3700);
  await waitFor(() => expect(next).toBeDisabled());
  fireEvent.click(previous);
  expect(scrollIntoView("technology-graph")).toHaveBeenLastCalledWith(
    expect.objectContaining({ block: "start" }),
  );
});

test("uses instant navigation when reduced motion is requested", () => {
  vi.stubGlobal(
    "matchMedia",
    vi.fn(() => ({ matches: true })),
  );
  const { scrollIntoView } = renderNavigation();
  fireEvent.click(screen.getByRole("button", { name: "Next section" }));
  expect(scrollIntoView("about")).toHaveBeenLastCalledWith(
    expect.objectContaining({ behavior: "auto", block: "start" }),
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
  const { scrollIntoView } = renderNavigation();
  const previous = screen.getByRole("button", { name: "Previous section" });

  fireEvent.click(previous);
  expect(scrollIntoView("about")).not.toHaveBeenCalled();

  setScroll(3700);
  const next = screen.getByRole("button", { name: "Next section" });
  await waitFor(() => expect(next).toBeDisabled());
  fireEvent.click(next);
  expect(scrollIntoView("contact")).not.toHaveBeenCalled();
});

test("keeps footer link focus and navigation state unchanged for unavailable Contact next", async () => {
  const { scrollIntoView } = renderNavigation();
  const footerLink = document.createElement("a");
  footerLink.href = "https://github.com/hmeclazcke";
  document.getElementById("contact")!.append(footerLink);

  setScroll(3700);
  const next = screen.getByRole("button", { name: "Next section" });
  await waitFor(() => expect(next).toBeDisabled());
  footerLink.focus();

  fireEvent.pointerDown(next);
  fireEvent.click(next);

  expect(document.activeElement).toBe(footerLink);
  expect(scrollIntoView("contact")).not.toHaveBeenCalled();
  expect(next).toBeDisabled();
});

test("recognizes Contact at document bottom when its short footer cannot top-align", async () => {
  const { scrollIntoView } = renderNavigation();
  Object.defineProperty(window, "innerHeight", {
    configurable: true,
    value: 800,
  });
  Object.defineProperty(document.documentElement, "scrollHeight", {
    configurable: true,
    value: 4300,
  });

  setScroll(3500);

  await waitFor(() =>
    expect(screen.getByRole("button", { name: "Next section" })).toBeDisabled(),
  );
  fireEvent.click(screen.getByRole("button", { name: "Previous section" }));
  expect(scrollIntoView("technology-graph")).toHaveBeenLastCalledWith(
    expect.objectContaining({ block: "start" }),
  );
});

test("leaves document-bottom Contact for the Graph after Previous scrolls upward", async () => {
  const { scrollIntoView } = renderNavigation();
  Object.defineProperty(window, "innerHeight", {
    configurable: true,
    value: 800,
  });
  Object.defineProperty(document.documentElement, "scrollHeight", {
    configurable: true,
    value: 4300,
  });
  scrollIntoView("technology-graph").mockImplementation(() => setScroll(2500));

  setScroll(3500);
  fireEvent.click(screen.getByRole("button", { name: "Previous section" }));

  expect(scrollIntoView("technology-graph")).toHaveBeenLastCalledWith(
    expect.objectContaining({ block: "start", behavior: "smooth" }),
  );
  expect(scrollIntoView("contact")).not.toHaveBeenCalled();
  await waitFor(() => {
    expect(
      screen.getByRole("button", { name: "Previous section" }),
    ).not.toBeDisabled();
    expect(
      screen.getByRole("button", { name: "Next section" }),
    ).not.toBeDisabled();
  });
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
