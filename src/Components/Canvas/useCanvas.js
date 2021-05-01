import { useRef, useEffect } from "react";
import { reset } from "./generalFunctions/reset";
import { drawMap } from "./map/drawMap";
import { drawTrafficLights } from "./trafficLights/drawTrafficLights";
import Camera from "./camera/camera";
import Player from "./player/player";
import ComputerController from "./computer/computerController";
import { useSelector } from "react-redux";

export const useCanvas = (verticesMap, map) => {
  const canvasRef = useRef(null);
  const playerRef = useRef(null);
  const cameraRef = useRef(null);
  const computerRef = useRef(null);
  const togglesRef = useRef({});

  togglesRef.current.trafficLights = useSelector(
    ({ toggles }) => toggles.trafficLights
  );
  togglesRef.current.cameraLock = useSelector(
    ({ toggles }) => toggles.cameraLock
  );
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const { width, height } = canvas.getBoundingClientRect();
    const { devicePixelRatio: ratio = 1 } = window;
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    context.scale(ratio, ratio);

    cameraRef.current = new Camera(context, canvas.width, canvas.height);
    const camera = cameraRef.current;
    playerRef.current = new Player(context, map, camera);
    const player = playerRef.current;
    computerRef.current = new ComputerController(context, map);
    const computerController = computerRef.current;
    const toggles = togglesRef.current;

    const render = () => {
      window.requestAnimationFrame(render);

      if (toggles.cameraLock) camera.followPlayer(player);
      reset(context, camera);
      drawMap(context);
      drawTrafficLights(context, verticesMap, toggles.trafficLights);
      player.run();
      computerController.run();
    };
    render();
  }, [verticesMap, map]);

  return { canvasRef, player: playerRef, camera: cameraRef };
};
