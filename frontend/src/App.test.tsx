import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";
import App from "./App";
import SiteShell from "./components/shell/SiteShell";
import { storyMilestones } from "./components/story/storyMilestones";
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
  expect(
    screen.getByRole("link", { name: "Explore My Story" }),
  ).toHaveAttribute("href", "#about");
  expect(screen.getByRole("link", { name: "Story" })).toHaveAttribute(
    "href",
    "#about",
  );
  expect(screen.queryAllByRole("link")).toHaveLength(2);
  expect(screen.queryAllByRole("button")).toHaveLength(0);
  expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
});

test("renders the approved semantic Story destination and exact narrative", () => {
  render(<App />);

  const story = screen.getByRole("region", { name: "Explore My Story" });

  expect(story).toHaveAttribute("id", "about");
  expect(
    screen.getByRole("heading", { name: "Explore My Story", level: 2 }),
  ).toBeInTheDocument();
  const timeline = within(story).getByRole("list", {
    name: "Chronological story",
  });
  const listItems = within(timeline).getAllByRole("listitem");

  expect(listItems).toHaveLength(storyMilestones.length);

  for (const [index, milestone] of storyMilestones.entries()) {
    const item = listItems[index]!;

    expect(item).toHaveTextContent(milestone.period);
    expect(
      within(item).getByRole("heading", { name: milestone.title, level: 3 }),
    ).toBeInTheDocument();

    for (const line of milestone.lines) {
      expect(item).toHaveTextContent(line);
    }
  }

  expect(
    screen.queryByRole("link", { name: "Technologies" }),
  ).not.toBeInTheDocument();
  expect(
    screen.queryByRole("link", { name: "Projects" }),
  ).not.toBeInTheDocument();
  expect(
    screen.queryByRole("link", { name: "GitHub" }),
  ).not.toBeInTheDocument();
  expect(
    screen.queryByRole("link", { name: "Contact" }),
  ).not.toBeInTheDocument();
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
