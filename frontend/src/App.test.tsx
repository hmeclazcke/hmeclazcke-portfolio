import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";
import App from "./App";
import SiteShell from "./components/shell/SiteShell";
import { runAxe } from "./test/run-axe";

afterEach(cleanup);

test("renders the semantic shell around the temporary walking skeleton", () => {
  render(<App />);

  expect(screen.getByRole("banner")).toBeInTheDocument();
  expect(screen.getByRole("main")).toBeInTheDocument();
  expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  expect(screen.getByText("Hernán Meclazcke")).toBeInTheDocument();
  expect(screen.getByText("hmeclazcke")).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: "Hello, world!", level: 1 }),
  ).toBeInTheDocument();
  expect(
    screen.getByText(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    ),
  ).toBeInTheDocument();
  expect(screen.queryAllByRole("link")).toHaveLength(0);
});

test("has no applicable automated axe violations in jsdom", async () => {
  const { container } = render(<App />);

  const results = await runAxe(container);

  expect(results.violations).toEqual([]);
});

test("allows future main content to select the full shell width", () => {
  render(
    <SiteShell contentWidth="full">
      <p>Future full-width feature region</p>
    </SiteShell>,
  );

  expect(screen.getByRole("main")).toHaveAttribute(
    "data-content-width",
    "full",
  );
});
