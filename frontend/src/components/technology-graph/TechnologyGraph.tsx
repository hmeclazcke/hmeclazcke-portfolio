import {
  forceCenter,
  forceCollide,
  forceLink,
  forceManyBody,
  forceSimulation,
  forceX,
  forceY,
  type Simulation,
} from "d3-force";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  contexts,
  relationships,
  technologies,
} from "../../data/portfolio-data";
import { projectTechnologyGraph } from "./graphProjection";
import styles from "./TechnologyGraph.module.css";

const width = 1100;
const height = 560;
type Point = { x: number; y: number };
type LayoutNode = {
  id: string;
  name: string;
  familyId: string;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
};

const familyTargets: Readonly<Record<string, Point>> = {
  languages: { x: 225, y: 165 },
  web: { x: 430, y: 125 },
  "java-frameworks": { x: 590, y: 260 },
  data: { x: 755, y: 180 },
  apis: { x: 880, y: 330 },
  infrastructure: { x: 735, y: 430 },
  build: { x: 475, y: 455 },
  enterprise: { x: 285, y: 390 },
  ai: { x: 900, y: 145 },
};

const directNeighborIds = (
  technologyId: string | null,
  edges: readonly { sourceId: string; targetId: string }[],
) =>
  new Set(
    technologyId
      ? edges.flatMap((edge) =>
          edge.sourceId === technologyId
            ? [edge.targetId]
            : edge.targetId === technologyId
              ? [edge.sourceId]
              : [],
        )
      : [],
  );

const pointFromEvent = (event: React.PointerEvent<SVGElement>): Point => {
  const bounds = event.currentTarget.ownerSVGElement?.getBoundingClientRect();
  if (!bounds) return { x: 0, y: 0 };
  return {
    x: ((event.clientX - bounds.left) / (bounds.width || 1)) * width,
    y: ((event.clientY - bounds.top) / (bounds.height || 1)) * height,
  };
};

function TechnologyGraph() {
  const graph = useMemo(
    () => projectTechnologyGraph({ technologies, contexts, relationships }),
    [],
  );
  const simulationRef = useRef<Simulation<LayoutNode, undefined> | null>(null);
  const nodeRef = useRef<LayoutNode[]>([]);
  const [positions, setPositions] = useState<Record<string, Point>>({});
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const dragRef = useRef<string | null>(null);

  useEffect(() => {
    const nodes: LayoutNode[] = graph.nodes.map((node, index) => ({
      id: node.id,
      name: node.name,
      familyId: node.familyId,
      x: width / 2 + Math.cos(index * 2.4) * 180,
      y: height / 2 + Math.sin(index * 2.4) * 150,
    }));
    nodeRef.current = nodes;
    const simulation = forceSimulation(nodes)
      .force("charge", forceManyBody().strength(-250))
      .force("center", forceCenter(width / 2, height / 2))
      .force(
        "family-x",
        forceX<LayoutNode>((node) => familyTargets[node.familyId]!.x).strength(
          0.028,
        ),
      )
      .force(
        "family-y",
        forceY<LayoutNode>((node) => familyTargets[node.familyId]!.y).strength(
          0.028,
        ),
      )
      .force(
        "collision",
        forceCollide<LayoutNode>(
          (node) => 17 + Math.min(node.name.length, 28) * 3.1,
        ).strength(0.82),
      )
      .force(
        "link",
        forceLink<LayoutNode, { source: string; target: string }>(
          graph.edges.map(({ sourceId, targetId }) => ({
            source: sourceId,
            target: targetId,
          })),
        )
          .id((node) => node.id)
          .distance(135)
          .strength(0.34),
      )
      .alphaDecay(0.045)
      .on("tick", () =>
        setPositions(
          Object.fromEntries(
            nodes.map((node) => [
              node.id,
              { x: node.x ?? width / 2, y: node.y ?? height / 2 },
            ]),
          ),
        ),
      );
    simulationRef.current = simulation;
    return () => {
      simulation.stop();
    };
  }, [graph]);

  const focusedId = selectedId ?? hoveredId;
  const focusedNode = graph.nodes.find(({ id }) => id === focusedId);
  const neighborIds = directNeighborIds(focusedId, graph.edges);
  const positionOf = (id: string) =>
    positions[id] ?? { x: width / 2, y: height / 2 };
  const clearSelection = () => {
    setSelectedId(null);
    setHoveredId(null);
  };
  const startDrag = (event: React.PointerEvent<SVGGElement>, id: string) => {
    if (event.pointerType && event.pointerType !== "mouse") return;
    const node = nodeRef.current.find((item) => item.id === id);
    if (!node) return;
    dragRef.current = id;
    const point = pointFromEvent(event);
    node.fx = point.x;
    node.fy = point.y;
    simulationRef.current?.alphaTarget(0.18).restart();
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };
  const moveDrag = (event: React.PointerEvent<SVGGElement>, id: string) => {
    if (dragRef.current !== id) return;
    const node = nodeRef.current.find((item) => item.id === id);
    if (!node) return;
    const point = pointFromEvent(event);
    node.fx = point.x;
    node.fy = point.y;
    simulationRef.current?.alpha(0.25).restart();
  };
  const endDrag = (id: string) => {
    if (dragRef.current !== id) return;
    const node = nodeRef.current.find((item) => item.id === id);
    if (node) {
      node.fx = null;
      node.fy = null;
    }
    dragRef.current = null;
    simulationRef.current?.alphaTarget(0);
  };

  return (
    <section
      className={styles.section}
      id="technology-graph"
      aria-labelledby="technology-graph-heading"
    >
      <div className={styles.intro}>
        <p className={styles.eyebrow}>CONNECTIONS IN CONTEXT</p>
        <h2 id="technology-graph-heading">Technology Graph</h2>
        <p>
          Shared approved contexts shape these relationships. Families guide the
          layout only; connections never imply dependency.
        </p>
      </div>
      <div className={styles.graphSurface}>
        <svg
          className={styles.visualGraph}
          viewBox={`0 0 ${width} ${height}`}
          role="group"
          aria-label="Technology relationship graph"
          onClick={(event) => {
            if (event.target === event.currentTarget) clearSelection();
          }}
          onKeyDown={(event) => {
            if (event.key === "Escape") clearSelection();
          }}
        >
          <g aria-hidden="true">
            {graph.edges.map((edge) => {
              const source = positionOf(edge.sourceId);
              const target = positionOf(edge.targetId);
              const active =
                !focusedId ||
                edge.sourceId === focusedId ||
                edge.targetId === focusedId;
              return (
                <line
                  className={styles.edge}
                  data-active={active}
                  key={edge.id}
                  x1={source.x}
                  y1={source.y}
                  x2={target.x}
                  y2={target.y}
                />
              );
            })}
          </g>
          {graph.nodes.map((node) => {
            const point = positionOf(node.id);
            const active =
              !focusedId || node.id === focusedId || neighborIds.has(node.id);
            return (
              <g
                className={styles.node}
                data-active={active}
                data-current={node.relevance === "current"}
                data-historical={node.relevance === "historical"}
                data-selected={selectedId === node.id}
                data-technology-node="true"
                data-testid={`technology-node-${node.id}`}
                data-direct-neighbor={
                  focusedId && neighborIds.has(node.id) ? "true" : undefined
                }
                key={node.id}
                role="button"
                tabIndex={0}
                aria-label={`${node.name} technology`}
                transform={`translate(${point.x} ${point.y})`}
                onClick={() => setSelectedId(node.id)}
                onFocus={() => setHoveredId(node.id)}
                onBlur={() => !selectedId && setHoveredId(null)}
                onMouseEnter={() => setHoveredId(node.id)}
                onMouseLeave={() => !selectedId && setHoveredId(null)}
                onPointerDown={(event) => startDrag(event, node.id)}
                onPointerMove={(event) => moveDrag(event, node.id)}
                onPointerUp={() => endDrag(node.id)}
                onPointerCancel={() => endDrag(node.id)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setSelectedId(node.id);
                  }
                  if (event.key === "Escape") clearSelection();
                }}
              >
                <circle
                  className={styles.nodeCore}
                  r={node.relevance === "current" ? 10 : 8}
                />
                <text className={styles.nodeLabel} x={14} y={4}>
                  {node.name}
                </text>
              </g>
            );
          })}
        </svg>
        {focusedNode ? (
          <aside
            className={styles.tooltip}
            aria-label="Focused technology details"
            aria-live="polite"
          >
            <p className={styles.tooltipName}>{focusedNode.name}</p>
            {focusedNode.relevance ? (
              <p className={styles.status}>
                {focusedNode.relevance === "current" ? "Current" : "Historical"}
              </p>
            ) : null}
            <ContextList
              heading="Used at"
              values={graph.contextDetailsByTechnology[focusedNode.id]!.usedAt}
            />
            <ContextList
              heading="Learned at"
              values={
                graph.contextDetailsByTechnology[focusedNode.id]!.learnedAt
              }
            />
          </aside>
        ) : null}
      </div>
      <section
        className={styles.semanticCompanion}
        data-testid="technology-semantic-companion"
        aria-label="Technology context details"
      >
        <h3>Technology context details</h3>
        <ul>
          {graph.nodes.map((node) => (
            <li key={node.id}>
              {node.name}:{" "}
              {graph.contextDetailsByTechnology[node.id]!.usedAt.join(", ")}{" "}
              {graph.contextDetailsByTechnology[node.id]!.learnedAt.join(", ")}
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
}

function ContextList({
  heading,
  values,
}: {
  heading: string;
  values: readonly string[];
}) {
  return values.length ? (
    <div className={styles.contextList}>
      <p>{heading}</p>
      <ul>
        {values.map((value) => (
          <li key={value}>{value}</li>
        ))}
      </ul>
    </div>
  ) : null;
}

export default TechnologyGraph;
