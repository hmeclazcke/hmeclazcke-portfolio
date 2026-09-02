import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";
import App from "./App";
import SiteShell from "./components/shell/SiteShell";
import { runAxe } from "./test/run-axe";

afterEach(cleanup);

test("renders the approved Home content within the semantic shell", () => {
  render(<App />);

  expect(screen.getByRole("banner")).toBeInTheDocument();
  expect(screen.getByRole("main")).toBeInTheDocument();
  expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  expect(screen.getByText("Hernán Meclazcke")).toBeInTheDocument();
  expect(screen.getByText("hmeclazcke")).toBeInTheDocument();
  expect(screen.getByText("HELLO, I'M HERNÁN.")).toBeInTheDocument();
  expect(
    screen.getByRole("heading", {
      name: "Senior Backend Java Developer",
      level: 1,
    }),
  ).toBeInTheDocument();
  expect(
    screen.getByText(
      "Java · Spring Boot · Microservices · Oracle & PL/SQL · REST APIs",
    ),
  ).toBeInTheDocument();
  expect(
    screen.getByText(
      "Computers and programming have been part of my life since I was a kid. Today I focus on backend development, while still enjoying exploring different technologies and understanding how the pieces of a system fit together.",
    ),
  ).toBeInTheDocument();
  expect(screen.queryByText("Hello, world!")).not.toBeInTheDocument();
  expect(
    screen.queryByText(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    ),
  ).not.toBeInTheDocument();
  expect(screen.queryAllByRole("link")).toHaveLength(0);
  expect(screen.queryAllByRole("button")).toHaveLength(0);
  expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
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
