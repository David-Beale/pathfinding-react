import React from "react";
import { useCanvas } from "./useCanvas";
import { useGraph } from "./graph/useGraph";
import { useMouseHandler } from "./mouseHandler/useMouseHandler";

export default function Canvas() {
  const [map, verticesMap] = useGraph();
  const { canvasRef, player, camera } = useCanvas(verticesMap, map);
  const [onMouseDown, onWheel] = useMouseHandler(player, camera);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100vw", height: "100vh" }}
      onMouseDown={onMouseDown}
      onWheel={onWheel}
    />
  );
}
