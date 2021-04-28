import { useRef, useEffect } from "react";
import { reset } from "./generalFunctions/reset";
import { drawMap } from "./map/drawMap";
import { drawTrafficLights } from "./trafficLights/drawTrafficLights";
import Camera from "./camera/camera";
import Player from "./player/player";

export const useCanvas = (verticesMap, map) => {
  const canvasRef = useRef(null);
  const playerRef = useRef(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const { width, height } = canvas.getBoundingClientRect();
    const { devicePixelRatio: ratio = 1 } = window;
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    context.scale(ratio, ratio);

    let trafficLightsDisabled = false;
    let cameraLock = false;
    let counter = 0;
    cameraRef.current = new Camera(context);
    const camera = cameraRef.current;
    playerRef.current = new Player(context, map, camera);
    const player = playerRef.current;

    const render = () => {
      window.requestAnimationFrame(render);

      if (cameraLock) camera.followPlayer(player);

      reset(context, camera);
      drawMap(context);
      drawTrafficLights(context, verticesMap, counter, trafficLightsDisabled);
      player.run();
      counter++;
      if (counter === 400) counter = 0;
    };
    render();
  }, [verticesMap, map]);

  return { canvasRef, player: playerRef, camera: cameraRef };
};
