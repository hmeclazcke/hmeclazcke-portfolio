export type GraphPoint = { x: number; y: number };
export type GraphDimensions = { width: number; height: number };

const nodeRadius = 10;
const labelOffset = 14;
const edgePadding = 14;

const estimatedLabelWidth = (name: string) => Math.max(24, name.length * 7.1);

export const constrainGraphPoint = (
  point: GraphPoint,
  name: string,
  dimensions: GraphDimensions,
): GraphPoint => {
  const labelWidth = estimatedLabelWidth(name);
  return {
    x: Math.min(
      dimensions.width - labelOffset - labelWidth - edgePadding,
      Math.max(nodeRadius + edgePadding, point.x),
    ),
    y: Math.min(
      dimensions.height - nodeRadius - edgePadding,
      Math.max(nodeRadius + edgePadding, point.y),
    ),
  };
};

export { labelOffset, nodeRadius };
