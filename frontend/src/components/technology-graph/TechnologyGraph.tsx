import {
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
import {
  compactSharedContextLabel,
  contextLabel,
  projectTechnologyGraph,
  sharedContextHeading,
} from "./graphProjection";
import {
  mobileTechnologyFamilies,
  type MobileTechnologyFamily,
} from "./mobileTechnologyExplorer";
import {
  constrainGraphPoint,
  labelOffset,
  nodeRadius,
  type GraphDimensions,
  type GraphPoint,
} from "./graphBounds";
import styles from "./TechnologyGraph.module.css";

const fallbackDimensions = { width: 1100, height: 560 };
const publicDescription =
  "Connections reflect technologies I've used together across work, studies, and projects. They show shared context, not technical dependency.";

type Point = GraphPoint;
type Dimensions = GraphDimensions;
type LayoutNode = {
  id: string;
  name: string;
  familyId: string;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
};

const familyTarget = (familyId: string, dimensions: Dimensions): Point => {
  const targets: Readonly<Record<string, Point>> = {
    languages: { x: 0.19, y: 0.28 },
    web: { x: 0.43, y: 0.18 },
    "java-frameworks": { x: 0.53, y: 0.48 },
    data: { x: 0.73, y: 0.25 },
    apis: { x: 0.84, y: 0.53 },
    infrastructure: { x: 0.72, y: 0.77 },
    build: { x: 0.43, y: 0.8 },
    enterprise: { x: 0.2, y: 0.72 },
    ai: { x: 0.88, y: 0.18 },
  };
  const target = targets[familyId] ?? { x: 0.5, y: 0.5 };
  return { x: dimensions.width * target.x, y: dimensions.height * target.y };
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

const pointFromEvent = (
  event: React.PointerEvent<SVGElement>,
  dimensions: Dimensions,
): Point => {
  const bounds = event.currentTarget.ownerSVGElement?.getBoundingClientRect();
  if (!bounds) return { x: 0, y: 0 };
  return {
    x: ((event.clientX - bounds.left) / (bounds.width || 1)) * dimensions.width,
    y:
      ((event.clientY - bounds.top) / (bounds.height || 1)) * dimensions.height,
  };
};

function TechnologyGraph() {
  const graph = useMemo(
    () => projectTechnologyGraph({ technologies, contexts, relationships }),
    [],
  );
  const mobileFamilies = useMemo(
    () =>
      mobileTechnologyFamilies({
        nodes: graph.nodes,
        contexts,
        relationships,
      }),
    [graph.nodes],
  );
  const surfaceRef = useRef<HTMLDivElement>(null);
  const simulationRef = useRef<Simulation<LayoutNode, undefined> | null>(null);
  const nodeRef = useRef<LayoutNode[]>([]);
  const [dimensions, setDimensions] = useState<Dimensions>(fallbackDimensions);
  const [positions, setPositions] = useState<Record<string, Point>>({});
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [hoveredEdgeId, setHoveredEdgeId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const dragRef = useRef<string | null>(null);

  useEffect(() => {
    const surface = surfaceRef.current;
    if (!surface || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (width > 0 && height > 0) {
        setDimensions({ width: Math.round(width), height: Math.round(height) });
      }
    });
    observer.observe(surface);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const nodes: LayoutNode[] = graph.nodes.map((node, index) => {
      const target = familyTarget(node.familyId, dimensions);
      return {
        id: node.id,
        name: node.name,
        familyId: node.familyId,
        x: target.x + Math.cos(index * 2.4) * 72,
        y: target.y + Math.sin(index * 2.4) * 58,
      };
    });
    nodeRef.current = nodes;
    const constrainNodes = () => {
      for (const node of nodes) {
        const point = constrainGraphPoint(
          {
            x: node.x ?? dimensions.width / 2,
            y: node.y ?? dimensions.height / 2,
          },
          node.name,
          dimensions,
        );
        node.x = point.x;
        node.y = point.y;
      }
    };
    const simulation = forceSimulation(nodes)
      .force("charge", forceManyBody().strength(-125))
      .force(
        "family-x",
        forceX<LayoutNode>(
          (node) => familyTarget(node.familyId, dimensions).x,
        ).strength(0.09),
      )
      .force(
        "family-y",
        forceY<LayoutNode>(
          (node) => familyTarget(node.familyId, dimensions).y,
        ).strength(0.09),
      )
      .force(
        "collision",
        forceCollide<LayoutNode>(
          (node) => 13 + Math.min(node.name.length, 30) * 1.65,
        ).strength(0.88),
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
          .distance(Math.max(90, Math.min(145, dimensions.width / 8)))
          .strength(0.32),
      )
      .force("bounds", () => constrainNodes())
      .alphaDecay(0.045)
      .on("tick", () => {
        constrainNodes();
        setPositions(
          Object.fromEntries(
            nodes.map((node) => [
              node.id,
              {
                x: node.x ?? dimensions.width / 2,
                y: node.y ?? dimensions.height / 2,
              },
            ]),
          ),
        );
      });
    simulationRef.current = simulation;
    return () => {
      simulation.stop();
    };
  }, [dimensions, graph]);

  const focusedId = selectedId ?? hoveredId;
  const focusedNode = graph.nodes.find(({ id }) => id === focusedId);
  const hoveredEdge = graph.edges.find(({ id }) => id === hoveredEdgeId);
  const neighborIds = directNeighborIds(focusedId, graph.edges);
  const positionOf = (id: string) =>
    positions[id] ?? { x: dimensions.width / 2, y: dimensions.height / 2 };
  const clearSelection = () => {
    setSelectedId(null);
    setHoveredId(null);
  };
  const startDrag = (event: React.PointerEvent<SVGGElement>, id: string) => {
    if (event.pointerType && event.pointerType !== "mouse") return;
    const node = nodeRef.current.find((item) => item.id === id);
    if (!node) return;
    dragRef.current = id;
    const point = constrainGraphPoint(
      pointFromEvent(event, dimensions),
      node.name,
      dimensions,
    );
    node.fx = point.x;
    node.fy = point.y;
    simulationRef.current?.alphaTarget(0.2).restart();
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };
  const moveDrag = (event: React.PointerEvent<SVGGElement>, id: string) => {
    if (dragRef.current !== id) return;
    const node = nodeRef.current.find((item) => item.id === id);
    if (!node) return;
    const point = constrainGraphPoint(
      pointFromEvent(event, dimensions),
      node.name,
      dimensions,
    );
    node.fx = point.x;
    node.fy = point.y;
    simulationRef.current?.alpha(0.3).restart();
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
        <p>{publicDescription}</p>
      </div>
      <div className={styles.graphSurface} ref={surfaceRef}>
        <svg
          className={styles.visualGraph}
          viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
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
                <g key={edge.id}>
                  <line
                    className={styles.edge}
                    data-active={active}
                    data-testid={`technology-visible-edge-${edge.id}`}
                    x1={source.x}
                    y1={source.y}
                    x2={target.x}
                    y2={target.y}
                  />
                  {selectedId &&
                  (edge.sourceId === selectedId ||
                    edge.targetId === selectedId) ? (
                    <text
                      className={styles.edgeContextLabel}
                      data-testid={`technology-edge-context-${edge.id}`}
                      x={(source.x + target.x) / 2}
                      y={(source.y + target.y) / 2 - 6}
                    >
                      {compactSharedContextLabel(edge.sharedContexts)}
                    </text>
                  ) : null}
                </g>
              );
            })}
          </g>
          <g aria-hidden="true">
            {graph.edges.map((edge) => {
              const source = positionOf(edge.sourceId);
              const target = positionOf(edge.targetId);
              return (
                <line
                  className={styles.edgeHitArea}
                  data-testid={`technology-edge-${edge.id}`}
                  key={edge.id}
                  x1={source.x}
                  y1={source.y}
                  x2={target.x}
                  y2={target.y}
                  onClick={(event) => event.stopPropagation()}
                  onMouseEnter={() => setHoveredEdgeId(edge.id)}
                  onMouseLeave={() => setHoveredEdgeId(null)}
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
                  r={node.relevance === "current" ? nodeRadius : 8}
                />
                <text className={styles.nodeLabel} x={labelOffset} y={4}>
                  {node.name}
                </text>
              </g>
            );
          })}
        </svg>
        {hoveredEdge ? (
          <aside
            className={`${styles.tooltip} ${styles.edgeTooltip}`}
            aria-label="Shared context details"
          >
            <p className={styles.tooltipName}>
              {sharedContextHeading(hoveredEdge.sharedContexts)}
            </p>
            <ContextList
              heading=""
              values={hoveredEdge.sharedContexts.map((context) =>
                contextLabel(context),
              )}
            />
          </aside>
        ) : focusedNode ? (
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
      <MobileTechnologyExplorer
        families={mobileFamilies}
        selectedId={selectedId}
        onSelect={(id) =>
          setSelectedId((current) => (current === id ? null : id))
        }
      />
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

function MobileTechnologyExplorer({
  families,
  selectedId,
  onSelect,
}: {
  families: readonly MobileTechnologyFamily[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <section
      className={styles.mobileExplorer}
      data-testid="mobile-technology-explorer"
      aria-label="Technology explorer"
    >
      {families.map((family) => {
        const selected = family.technologies.find(
          ({ id }) => id === selectedId,
        );
        return (
          <section className={styles.mobileFamily} key={family.id}>
            <h3>{family.label}</h3>
            <div className={styles.mobileTechnologyList}>
              {family.technologies.map((technology) => (
                <button
                  className={styles.mobileTechnology}
                  data-current={technology.relevance === "current" || undefined}
                  data-historical={
                    technology.relevance === "historical" || undefined
                  }
                  data-selected={technology.id === selectedId || undefined}
                  key={technology.id}
                  type="button"
                  aria-pressed={technology.id === selectedId}
                  aria-label={`${technology.name}${technology.relevance ? ` ${technology.relevance}` : ""}`}
                  onClick={() => onSelect(technology.id)}
                >
                  <span>{technology.name}</span>
                  {technology.relevance ? (
                    <span className={styles.mobileRelevance}>
                      {technology.relevance}
                    </span>
                  ) : null}
                </button>
              ))}
            </div>
            {selected ? (
              <article
                className={styles.mobileDetail}
                aria-label={`${selected.name} context details`}
              >
                <h4>{selected.name}</h4>
                {selected.relevance ? (
                  <p className={styles.mobileDetailStatus}>
                    {selected.relevance}
                  </p>
                ) : null}
                {selected.contextGroups.map((group) => (
                  <div
                    className={styles.mobileContextGroup}
                    key={group.heading}
                  >
                    <p>{group.heading}</p>
                    <ul>
                      {group.contexts.map((context) => (
                        <li key={context}>{context}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </article>
            ) : null}
          </section>
        );
      })}
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
      {heading ? <p>{heading}</p> : null}
      <ul>
        {values.map((value) => (
          <li key={value}>{value}</li>
        ))}
      </ul>
    </div>
  ) : null;
}

export default TechnologyGraph;
