export const trafficLightDrawings = (c, x, y, color) => {
  c.beginPath();
  c.arc(x, y, 5, 0, Math.PI * 2, false);
  c.fillStyle = color;
  c.strokeStyle = "black";
  c.stroke();
  c.fill();
};
