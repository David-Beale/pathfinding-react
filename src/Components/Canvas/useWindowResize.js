import { useEffect } from "react";

export const useWindowResize = (canvasRef, cameraRef) => {
  useEffect(() => {
    const camera = cameraRef.current;
    const canvas = canvasRef.current;
    const initialView = () => {
      const diffX = canvas.width / (2 * canvas.ratio) - 550;
      const diffY = canvas.height / (2 * canvas.ratio) - 750;
      camera.x = -diffX;
      camera.y = -diffY;
      camera.scale = 0.5;
      camera.zoom(camera.scale, camera.scale);
      camera.translate(-camera.x, -camera.y);
    };
    const onResize = () => {
      const context = canvas.getContext("2d");

      const { width, height } = canvas.getBoundingClientRect();
      const { devicePixelRatio: ratio = 1 } = window;
      canvas.ratio = ratio;
      canvas.width = camera.width = width * ratio;
      canvas.height = camera.height = height * ratio;
      context.scale(ratio, ratio);
      camera.zoom(camera.scale, camera.scale);
      camera.translate(-camera.x, -camera.y);
    };
    onResize();
    initialView();

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [canvasRef, cameraRef]);
};
