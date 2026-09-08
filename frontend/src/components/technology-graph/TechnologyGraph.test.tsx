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
import {
  projectTechnologyGraph,
  sharedContextHeading,
} from "./graphProjection";
import { mobileTechnologyFamilies } from "./mobileTechnologyExplorer";
import TechnologyGraph from "./TechnologyGraph";
import { constrainGraphPoint } from "./graphBounds";
import styles from "./TechnologyGraph.module.css";

afterEach(cleanup);

test("derives each mobile explorer family from canonical graph metadata", () => {
  const graph = projectTechnologyGraph({
    technologies,
    contexts,
    relationships,
  });
  const families = mobileTechnologyFamilies({
    nodes: graph.nodes,
    contexts,
    relationships,
  });
  const visibleTechnologyIds = families.flatMap((family) =>
    family.technologies.map(({ id }) => id),
  );

  expect(visibleTechnologyIds).toHaveLength(graph.nodes.length);
  expect(new Set(visibleTechnologyIds)).toHaveLength(graph.nodes.length);
  expect(families.find(({ id }) => id === "languages")?.technologies).toEqual(
    expect.arrayContaining([expect.objectContaining({ id: "java" })]),
  );

  const java = families
    .flatMap((family) => family.technologies)
    .find(({ id }) => id === "java");
  expect(java?.contextGroups).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        heading: "Learned & used at",
        contexts: expect.arrayContaining([expect.stringContaining("UNICEN")]),
      }),
    ]),
  );
});

test("renders technology-only graph details and canonical focus information", () => {
  render(<TechnologyGraph />);

  const section = screen.getByRole("region", { name: "Technology Graph" });
  expect(within(section).getByText("Technology Graph")).toBeInTheDocument();
  expect(
    within(section).getByText(
      "Connections reflect technologies I've used together across work, studies, and projects. They show shared context, not technical dependency.",
    ),
  ).toBeInTheDocument();
  expect(
    within(section).getAllByText("Node.js", { selector: "text" }),
  ).toHaveLength(1);
  expect(
    within(section).queryByText("Unitech", { selector: "circle" }),
  ).not.toBeInTheDocument();
  expect(
    within(section).queryByText("PROGRAMMING LANGUAGES", { selector: "text" }),
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

test("filters graph and mobile explorer from one accessible query and clears it with Escape", () => {
  render(<TechnologyGraph />);

  const input = screen.getByRole("searchbox", { name: "Search technologies" });
  input.focus();
  fireEvent.change(input, { target: { value: "Spr" } });

  expect(input).toHaveFocus();
  expect(
    screen.getByRole("button", { name: /Spring Boot technology/i }),
  ).toBeInTheDocument();
  expect(
    screen.queryByRole("button", { name: /Java technology/i }),
  ).not.toBeInTheDocument();
  expect(
    within(screen.getByTestId("mobile-technology-explorer")).queryByText(
      "PROGRAMMING LANGUAGES",
    ),
  ).not.toBeInTheDocument();

  fireEvent.keyDown(input, { key: "Escape" });
  expect(input).toHaveValue("");
  expect(
    screen.getByRole("button", { name: /Java technology/i }),
  ).toBeInTheDocument();
});

test("clears hidden selection and shows then clears the no-results state", () => {
  render(<TechnologyGraph />);

  fireEvent.click(screen.getByRole("button", { name: /Java technology/i }));
  const input = screen.getByRole("searchbox", { name: "Search technologies" });
  fireEvent.change(input, { target: { value: "zzzzzzzz" } });

  expect(screen.getByText("No technologies found")).toBeInTheDocument();
  expect(
    screen.queryByRole("complementary", { name: "Focused technology details" }),
  ).not.toBeInTheDocument();
  expect(screen.queryByTestId("technology-node-java")).not.toBeInTheDocument();
  expect(
    within(screen.getByTestId("mobile-technology-explorer")).queryAllByRole(
      "heading",
      { level: 3 },
    ),
  ).toHaveLength(0);

  fireEvent.change(input, { target: { value: "" } });
  expect(screen.queryByText("No technologies found")).not.toBeInTheDocument();
  expect(screen.getByTestId("technology-node-java")).toBeInTheDocument();
});

test("preserves a selected technology that remains visible after filtering", () => {
  render(<TechnologyGraph />);

  const springBoot = screen.getByRole("button", {
    name: /Spring Boot technology/i,
  });
  fireEvent.click(springBoot);
  fireEvent.change(
    screen.getByRole("searchbox", { name: "Search technologies" }),
    {
      target: { value: "spr" },
    },
  );

  expect(springBoot).toHaveAttribute("data-selected", "true");
  expect(
    screen.getByRole("complementary", { name: "Focused technology details" }),
  ).toHaveTextContent("Spring Boot");
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

test("keeps dragged nodes and right-hand labels within label-aware graph bounds", () => {
  const constrained = constrainGraphPoint(
    { x: 1099, y: 559 },
    "Spring WebFlux / Project Reactor",
    { width: 1100, height: 560 },
  );

  expect(constrained.x).toBeLessThan(900);
  expect(constrained.y).toBeLessThan(550);
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

test("provides a family-based mobile explorer with deduplicated context detail", () => {
  render(<TechnologyGraph />);

  const explorer = screen.getByTestId("mobile-technology-explorer");
  expect(
    within(explorer).getByText("PROGRAMMING LANGUAGES"),
  ).toBeInTheDocument();
  expect(within(explorer).getByText("DATABASES / DATA")).toBeInTheDocument();
  expect(
    within(explorer).queryByRole("heading", {
      name: "Technology context details",
    }),
  ).not.toBeInTheDocument();

  fireEvent.click(
    within(explorer).getByRole("button", { name: /Java.*Current/i }),
  );
  expect(within(explorer).getByText("Learned & used at")).toBeInTheDocument();
  expect(within(explorer).getAllByText("UNICEN \u2014 Learning")).toHaveLength(
    1,
  );

  fireEvent.click(within(explorer).getByRole("button", { name: "C++" }));
  expect(
    within(explorer).getByRole("heading", { name: "C++", level: 4 }),
  ).toBeInTheDocument();
  expect(
    within(explorer).queryByText("Java", { selector: "h4" }),
  ).not.toBeInTheDocument();
});

test("propagates concrete project context corrections into the mobile explorer", () => {
  render(<TechnologyGraph />);

  const explorer = screen.getByTestId("mobile-technology-explorer");
  fireEvent.click(
    within(explorer).getByRole("button", { name: "Docker Compose" }),
  );

  expect(
    within(explorer).getByText("job-search-platform \u2014 Portfolio"),
  ).toBeInTheDocument();
});

test("explains a hovered visible edge without clearing persistent node selection", () => {
  render(<TechnologyGraph />);

  const graph = projectTechnologyGraph({
    technologies,
    contexts,
    relationships,
  });
  const edge = graph.edges.find((item) => item.sharedContexts.length === 1)!;
  const unrelatedEdge = graph.edges.find(
    (item) => item.sourceId !== "java" && item.targetId !== "java",
  )!;
  const java = screen.getByRole("button", { name: /Java technology/i });
  fireEvent.click(java);
  expect(
    screen.getByTestId(`technology-visible-edge-${unrelatedEdge.id}`),
  ).toHaveAttribute("data-active", "false");
  fireEvent.mouseEnter(screen.getByTestId(`technology-edge-${edge.id}`));

  const tooltip = screen.getByRole("complementary", {
    name: "Shared context details",
  });
  expect(within(tooltip).getByText("Shared context")).toBeInTheDocument();
  expect(
    within(tooltip).getByText(
      /(Learning|Professional|Portfolio|Personal project)/,
    ),
  ).toBeInTheDocument();
  expect(tooltip).toHaveTextContent("\u2014");
  expect(tooltip).not.toHaveTextContent("â");
  expect(java).toHaveAttribute("data-selected", "true");

  fireEvent.mouseLeave(screen.getByTestId(`technology-edge-${edge.id}`));
  expect(
    screen.queryByRole("complementary", { name: "Shared context details" }),
  ).not.toBeInTheDocument();
  expect(
    screen.getByRole("complementary", { name: "Focused technology details" }),
  ).toBeInTheDocument();
});

test("uses singular and plural shared-context headings", () => {
  const graph = projectTechnologyGraph({
    technologies,
    contexts,
    relationships,
  });
  const singular = graph.edges.find(
    (edge) => edge.sharedContexts.length === 1,
  )!;
  const plural = graph.edges.find((edge) => edge.sharedContexts.length > 1)!;

  expect(sharedContextHeading(singular.sharedContexts)).toBe("Shared context");
  expect(sharedContextHeading(plural.sharedContexts)).toBe("Shared contexts");
});

test("shows compact context labels only for direct visible edges of a selection", () => {
  render(<TechnologyGraph />);

  const graph = projectTechnologyGraph({
    technologies,
    contexts,
    relationships,
  });
  const directEdges = graph.edges.filter(
    ({ sourceId, targetId }) => sourceId === "java" || targetId === "java",
  );

  fireEvent.click(screen.getByRole("button", { name: /Java technology/i }));

  expect(screen.getAllByTestId(/technology-edge-context-/)).toHaveLength(
    directEdges.length,
  );
});
