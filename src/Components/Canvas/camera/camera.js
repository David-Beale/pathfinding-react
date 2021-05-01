export default class Camera {
  constructor(context, width, height) {
    this.x = 0;
    this.y = 0;
    this.width = width;
    this.height = height;
    this.lock = false;
    this.scale = 1;
    this.context = context;
    this.prev = null;
  }
  translate(x, y) {
    this.context.translate(x / this.scale, y / this.scale);
  }
  zoom(x, y) {
    this.context.scale(x, y);
  }
  drag(e) {
    const { clientX, clientY } = e;

    let diffX = clientX - this.prev.x;
    let diffY = clientY - this.prev.y;

    this.prev = { x: clientX, y: clientY };
    this.x -= diffX;
    this.y -= diffY;
    this.translate(diffX, diffY);
  }
  scroll(e) {
    const { clientX, clientY } = e;
    const scaleFactor = e.deltaY < 0 ? 1.25 : 0.8;
    const diffX = (this.x + clientX) * (1 - scaleFactor);
    const diffY = (this.y + clientY) * (1 - scaleFactor);
    this.x -= diffX;
    this.y -= diffY;
    this.scale *= scaleFactor;
    this.zoom(scaleFactor, scaleFactor);
    this.translate(diffX, diffY);
  }
  followPlayer(player) {
    if (!player.currentX) return;
    let diffX = this.width / 2 + this.x - player.currentX * this.scale;
    let diffY = this.height / 2 + this.y - player.currentY * this.scale;
    this.translate(diffX, diffY);
    this.x -= diffX;
    this.y -= diffY;
  }
}
