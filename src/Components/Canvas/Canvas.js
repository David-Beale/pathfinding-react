import React from "react";
import { useCanvas } from "./useCanvas";
import { useGraph } from "./graph/useGraph";
import { useMouseHandler } from "./mouseHandler/useMouseHandler";
import { useWindowResize } from "./useWindowResize";

export default function Canvas() {
  const [map, verticesMap] = useGraph();
  const { canvasRef, playerRef, cameraRef } = useCanvas(verticesMap, map);
  const [onMouseDown, onWheel] = useMouseHandler(playerRef, cameraRef);
  useWindowResize(canvasRef, cameraRef);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100vw", height: "100vh" }}
      onMouseDown={onMouseDown}
      onWheel={onWheel}
    />
  );
}
