import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { afterEach, expect, test } from "vitest";
import {
  contexts,
  relationships,
  technologies,
} from "../../data/portfolio-data";
import { projectTechnologyGraph } from "./graphProjection";
import TechnologyGraph from "./TechnologyGraph";
import styles from "./TechnologyGraph.module.css";

afterEach(cleanup);

test("renders technology-only graph details and canonical focus information", () => {
  render(<TechnologyGraph />);

  const section = screen.getByRole("region", { name: "Technology Graph" });
  expect(within(section).getByText("Technology Graph")).toBeInTheDocument();
  expect(within(section).getAllByText("Node.js")).toHaveLength(1);
  expect(
    within(section).queryByText("Unitech", { selector: "circle" }),
  ).not.toBeInTheDocument();
  expect(
    within(section).queryByText("PROGRAMMING LANGUAGES"),
  ).not.toBeInTheDocument();
  expect(section.querySelectorAll("[data-family-hub]")).toHaveLength(0);
  expect(section.querySelectorAll("[data-family-edge]")).toHaveLength(0);
  expect(
    screen.queryByRole("complementary", { name: "Focused technology details" }),
  ).not.toBeInTheDocument();

  const java = within(section).getByRole("button", {
    name: /Java technology/i,
  });
  fireEvent.focus(java);

  const tooltip = within(section).getByRole("complementary", {
    name: "Focused technology details",
  });
  expect(within(tooltip).getByText("Used at")).toBeInTheDocument();
  expect(within(tooltip).getAllByText("UNICEN — Learning")).toHaveLength(2);
  expect(within(tooltip).getByText("Current")).toBeInTheDocument();
});

test("supports persistent selection and keyboard clearing", () => {
  render(<TechnologyGraph />);

  const java = screen.getByRole("button", { name: /Java technology/i });
  fireEvent.click(java);
  fireEvent.keyDown(java, { key: "Escape" });

  expect(
    screen.queryByRole("complementary", {
      name: "Focused technology details",
    }),
  ).not.toBeInTheDocument();
});

test("clears selection on a stationary background click without moving the graph", () => {
  render(<TechnologyGraph />);

  const java = screen.getByRole("button", { name: /Java technology/i });
  const graph = screen.getByRole("group", {
    name: "Technology relationship graph",
  });
  fireEvent.click(java);
  fireEvent.click(graph);

  expect(
    screen.queryByRole("complementary", {
      name: "Focused technology details",
    }),
  ).not.toBeInTheDocument();
});

test("uses only direct visible graph neighbors for focused emphasis", () => {
  render(<TechnologyGraph />);

  fireEvent.click(
    screen.getByRole("button", { name: /Spring Boot technology/i }),
  );

  const graph = projectTechnologyGraph({
    technologies,
    contexts,
    relationships,
  });
  const directIds = new Set(
    graph.edges.flatMap((edge) =>
      edge.sourceId === "spring-boot"
        ? [edge.targetId]
        : edge.targetId === "spring-boot"
          ? [edge.sourceId]
          : [],
    ),
  );
  const activeNodeIds = graph.nodes
    .filter(
      (node) =>
        ["true", "false"].includes(
          screen
            .getByTestId(`technology-node-${node.id}`)
            .getAttribute("data-active") ?? "",
        ) &&
        screen
          .getByTestId(`technology-node-${node.id}`)
          .getAttribute("data-active") === "true",
    )
    .map((node) => node.id);

  expect(activeNodeIds).toEqual(
    expect.arrayContaining(["spring-boot", ...directIds]),
  );
  expect(activeNodeIds).toHaveLength(directIds.size + 1);
});

test("drags a technology node without a graph camera transform", async () => {
  render(<TechnologyGraph />);

  const java = screen.getByRole("button", { name: /Java technology/i });
  const before = java.getAttribute("transform");
  fireEvent.pointerDown(java, {
    clientX: 100,
    clientY: 100,
    pointerType: "mouse",
    pointerId: 1,
  });
  fireEvent.pointerMove(java, {
    clientX: 240,
    clientY: 180,
    pointerType: "mouse",
    pointerId: 1,
  });
  fireEvent.pointerUp(java, { pointerType: "mouse", pointerId: 1 });

  await waitFor(() => expect(java.getAttribute("transform")).not.toBe(before));
  expect(
    screen.getByRole("group", { name: "Technology relationship graph" }),
  ).not.toHaveAttribute("transform");
});

test("keeps the structured context companion offscreen rather than visibly rendered", () => {
  render(<TechnologyGraph />);

  expect(screen.getByTestId("technology-semantic-companion")).toHaveClass(
    styles.semanticCompanion,
  );
  expect(
    screen.getByRole("heading", { name: "Technology context details" }),
  ).toBeInTheDocument();
});
