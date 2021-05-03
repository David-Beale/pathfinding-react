import { useRef, useEffect } from "react";
import { reset } from "./generalFunctions/reset";
import { drawMap } from "./map/drawMap";
import { drawTrafficLights } from "./trafficLights/drawTrafficLights";
import Camera from "./camera/camera";
import Player from "./player/player";
import ComputerController from "./computer/computerController";
import { useSelector } from "react-redux";
import { drawCollisionBoxes } from "./collisionBoxes/drawCollisionBoxes";
import { drawRoadWorks } from "./roadWorks/drawRoadWorks";
import { drawTrafficConditions } from "./trafficConditions/drawTrafficConditions";

export const useCanvas = (verticesMap, map) => {
  const canvasRef = useRef(null);
  const playerRef = useRef(null);
  const cameraRef = useRef(null);
  const computerRef = useRef(null);
  const settingsRef = useRef({});

  settingsRef.current.trafficLights = useSelector(
    ({ settings }) => settings.trafficLights
  );
  settingsRef.current.cameraLock = useSelector(
    ({ settings }) => settings.cameraLock
  );
  settingsRef.current.computerNumber = useSelector(
    ({ settings }) => settings.computerNumber
  );
  settingsRef.current.collisionBoxes = useSelector(
    ({ settings }) => settings.collisionBoxes
  );
  settingsRef.current.trafficConditions = useSelector(
    ({ settings }) => settings.trafficConditions
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    cameraRef.current = new Camera(context, canvas.width, canvas.height);
    const camera = cameraRef.current;
    playerRef.current = new Player(context, map, camera);
    const player = playerRef.current;
    computerRef.current = new ComputerController(context, map);
    const computerController = computerRef.current;
    const settings = settingsRef.current;

    const render = () => {
      window.requestAnimationFrame(render);

      if (settings.cameraLock) camera.followPlayer(player);
      reset(context, camera);
      drawMap(context);
      drawTrafficLights(context, verticesMap, settings.trafficLights);
      drawTrafficConditions(context, map, settings.trafficConditions);
      drawRoadWorks(context, map);
      if (settings.collisionBoxes) drawCollisionBoxes(context, map);
      player.run();
      computerController.run();
    };
    render();
  }, [verticesMap, map]);

  useEffect(() => {
    computerRef.current.spawnCars(settingsRef.current.computerNumber);
  }, [settingsRef.current.computerNumber]);
  return { canvasRef, playerRef, cameraRef };
};
