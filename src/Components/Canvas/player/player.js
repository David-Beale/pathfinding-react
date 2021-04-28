import dijkstra from "../graph/helpers/dijkstra";
import dijkstraTime from "../graph/helpers/dijkstra-time";
import playerCarImg from "../../../Assets/player.png";
import ClickIndicator from "./clickIndicator";
const RADIUS = 25;
const clickIndicator = new ClickIndicator(RADIUS);
const playerCar = new Image();
playerCar.src = playerCarImg;

export default class Player {
  constructor(context, map, camera) {
    clickIndicator.context = context;
    this.camera = camera;
    this.map = map.graphObj;
    this.context = context;
    this.speed = 5;
    this.currentVertex = null;
    this.nextVertex = null;
    this.targetX = null;
    this.targetY = null;
    this.currentX = null;
    this.currentY = null;
    this.dx = 0;
    this.dy = 0;
    this.direction = null;
    this.reachedDestination = true;
    this.clickX = null;
    this.clickY = null;
    this.pathIndex = 0;
    this.finalX = null;
    this.finalY = null;
    this.pathArray = [];
    this.arrayOfVertices = Object.keys(map.graphObj);
    this.step = RADIUS / this.speed;
    this.enterCornerCheck = false;
    this.exitCornerCheck = false;
    this.pathfinding = "dijkstra";
    this.pathColor = "rgb(58, 94, 211)";
    this.comparePaths = {};
    this.direction0 = null;
    this.direction1 = null;
    this.direction2 = null;
    this.masterSpeed = 5;
  }
  run() {
    clickIndicator.run();
    //Calculate the next step enroute to the target destination
    if (!this.stopped && !this.compare) {
      if (this.subPath1Go) {
        this.subPath1();
      } else if (this.subPath2Go) {
        this.subPath2();
      }
    }

    if (!this.reachedDestination) {
      // if comparison mode is on, we pause the user car, and display only the 2 possible paths
      if (this.compare) {
        if (this.compareReady) {
          this.pathColor = "yellow";
          this.pathArray = this.comparePaths.time.path;
          this.drawPath();
          this.pathColor = "rgb(58, 94, 211)";
          this.pathArray = this.comparePaths.distance.path;
          this.drawPath();
        }

        // if comparison mode is off we will continue movement and position checks
      } else {
        this.drawPath();
        //If the car has stopped, it will continue to check whether it can continue moving.
        if (this.stopped) {
          this.collissionCheck();
        } else {
          this.currentX += this.dx;
          this.currentY += this.dy;

          if (this.hasReachedDestination()) {
            this.reset();
          } else if (this.hasReachedNextVertex()) {
            this.pathIndex++;
            this.findNewPath();
          }
        }
      }
    }
    console.log(this.currentX, this.dx, this.targetX);
    this.drawCar();
  }

  ///////////////Functions/////////////////////
  hasReachedDestination() {
    return this.currentX === this.finalX && this.currentY === this.finalY;
  }
  hasReachedNextVertex() {
    return this.currentX === this.targetX && this.currentY === this.targetY;
  }
  reset() {
    this.reachedDestination = true;
    this.pathIndex = 0;
    this.dx = 0;
    this.dy = 0;
    this.direction0 = null;
    this.direction1 = null;
    this.direction2 = null;
  }
  findVertex() {
    const x = this.clickX - RADIUS;
    const y = this.clickY - RADIUS;
    for (let vertex of this.arrayOfVertices) {
      if (this.map[vertex].x === x && this.map[vertex].y === y) return vertex;
    }
  }
  screenToCoords(screenCoords, cameraAdjustment) {
    const cameraAdjustedCoords =
      (screenCoords + cameraAdjustment) / this.camera.scale;
    return Math.floor(cameraAdjustedCoords / 50) * 50 + RADIUS;
  }
  click(e) {
    const { clientX, clientY } = e;
    this.clickX = this.screenToCoords(clientX, this.camera.x);
    this.clickY = this.screenToCoords(clientY, this.camera.y);
    clickIndicator.click(this.clickX, this.clickY);
    !this.currentVertex ? this.firstClick() : this.secondClick();
  }
  firstClick() {
    const vertex = this.findVertex();
    this.currentVertex = this.map[vertex];
    this.currentVertex.occupied = true;
    this.currentX = this.clickX;
    this.currentY = this.clickY;
  }
  secondClick() {
    const targetVertex = this.findVertex();
    const startVertex = this.nextVertex?.value || this.currentVertex.value;
    this.finalX = this.clickX;
    this.finalY = this.clickY;
    const pathFindingResult = this.runPathfinding(startVertex, targetVertex);

    this.pathArray = pathFindingResult[1];
    this.pathIndex = this.nextVertex ? -1 : 0;
    this.reachedDestination = false;
    if (!this.nextVertex) this.findNewPath();
  }
  runPathfinding(a, b) {
    switch (this.pathfinding) {
      case "dijkstra":
        this.pathColor = "rgb(58, 94, 211)";
        return dijkstra(this.map, a, b);
      case "dijkstra-time":
        this.pathColor = "yellow";
        return dijkstraTime(this.map, a, b);
      default:
        return;
    }
  }
  comparePaths() {
    const [distanceDist, distancePath] = dijkstra(
      this.map,
      this.start,
      this.end
    );
    const [timeTime, timePath] = dijkstraTime(this.map, this.start, this.end);
    this.comparePaths.distance = {
      distance: distanceDist,
      path: distancePath,
      time: this.getEstimatedTime(distancePath),
    };
    this.comparePaths.time = {
      distance: timePath.length - 1,
      path: timePath,
      time: timeTime,
    };
    //inital path will be time. When we draw the second line, the path will be set to distance. If the user selects time, path will be set back to time
    this.pathColor = "yellow";
    this.compareReady = true;
  }

  collissionCheck() {
    if (
      !this.nextVertex.occupied &&
      this.currentVertex.light === "green" &&
      !this.compare
    ) {
      this.currentVertex.occupiedFalse();
      this.nextVertex.occupied = true;
      this.nextVertex.speed = this.speed;
      this.dx = this.saveDx;
      this.dy = this.saveDy;
      this.stopped = false;
    }
  }

  findNewPath() {
    this.currentVertex = this.map[this.pathArray[this.pathIndex]];
    this.nextVertex = this.map[this.pathArray[this.pathIndex + 1]];
    this.speedCheck();

    if (this.direction1 !== null) this.direction0 = this.direction1;
    if (this.direction2 !== null) this.direction1 = this.direction2;
    else {
      this.direction1 = this.getDirection(
        this.currentVertex.x,
        this.nextVertex.x,
        this.currentVertex.y,
        this.nextVertex.y
      );
    }

    if (this.pathArray[this.pathIndex + 2]) {
      this.nextNextVertex = this.map[this.pathArray[this.pathIndex + 2]];
      this.direction2 = this.getDirection(
        this.nextVertex.x,
        this.nextNextVertex.x,
        this.nextVertex.y,
        this.nextNextVertex.y
      );
    } else {
      //if there is only 1 vertex left, we will always take a straight line to the end.
      this.direction2 = this.direction1;
    }
    if (this.direction0 !== null)
      this.movement1 = this.getMovement(this.direction0, this.direction1);
    else {
      this.initialDirection(this.direction1); // When we start, we need to set the initial dx, dy values
      this.direction = this.direction1;
      this.movement1 = "straight";
    }
    this.movement2 = this.getMovement(this.direction1, this.direction2);
    let subPath = this.getSubPath(this.movement1, this.movement2);
    this.subPath1 = subPath[0];
    this.subPath2 = subPath[1];
    this.counter = 0;
    this.subPath1Go = true;
    this.subPath2Go = true;
    this.stepCount = Math.floor(50 / this.speed / 2);
    this.subPath1();

    if (
      !this.nextVertex.occupied &&
      this.currentVertex.light === "green" &&
      !this.compare
    ) {
      this.nextVertex.occupied = true;
      this.currentVertex.occupiedFalse();
      this.nextVertex.speed = this.speed;
      this.nextVertex.counter = 0;
    } else {
      this.stopped = true;
      this.saveDx = this.dx;
      this.saveDy = this.dy;
      this.dx = this.dy = 0;
    }
  }
  drawPath() {
    for (let i = this.pathIndex; i < this.pathArray.length - 1; i++) {
      let startX;
      let startY;
      if (i === this.pathIndex) {
        //path starts at car position
        startX = this.currentX;
        startY = this.currentY;
      } else {
        const vertex = this.map[this.pathArray[i]];
        startX = vertex.x + RADIUS;
        startY = vertex.y + RADIUS;
      }
      const nextVertex = this.map[this.pathArray[i + 1]];
      const nextX = nextVertex.x + RADIUS;
      const nextY = nextVertex.y + RADIUS;
      this.drawLine(startX, startY, nextX, nextY);
    }
  }

  getEstimatedTime(path) {
    let time = 0;
    for (let i = 1; i < path.length; i++) {
      const thisVertex = this.map[path[i]];
      time += thisVertex.average;
    }
    return time;
  }
  getDirection(x1, x2, y1, y2) {
    if (x1 > x2) return 0;
    else if (x2 > x1) return 180;
    else if (y2 > y1) return 270;
    else if (y1 > y2) return 90;
  }

  getMovement(direction1, direction2) {
    if (direction1 === direction2) return "straight";
    else if (direction2 === 0 && direction1 === 270) return "right";
    else if (direction1 === 0 && direction2 === 270) return "left";
    else if (direction2 > direction1) return "right";
    else if (direction2 < direction1) return "left";
  }
  getSubPath(movement1, movement2) {
    if (movement1 === "straight" && movement2 === "straight")
      return [this.straight, this.straight];
    else if (movement1 === "straight" && movement2 === "right")
      return [this.straight, this.enterRight];
    else if (movement1 === "straight" && movement2 === "left")
      return [this.straight, this.enterLeft];
    else if (movement1 === "right" && movement2 === "straight")
      return [this.exitRight, this.straight];
    else if (movement1 === "left" && movement2 === "straight")
      return [this.exitLeft, this.straight];
    else if (movement1 === "right" && movement2 === "right")
      return [this.exitRight, this.enterRight];
    else if (movement1 === "right" && movement2 === "left")
      return [this.exitRight, this.enterLeft];
    else if (movement1 === "left" && movement2 === "right")
      return [this.exitLeft, this.enterRight];
    else if (movement1 === "left" && movement2 === "left")
      return [this.exitLeft, this.enterLeft];
  }
  updateCounter() {
    if (this.counter === this.stepCount) {
      if (this.subPath1Go) {
        this.subPath1Go = false;
        this.counter = 0;
      } else {
        this.subPath2Go = false;
      }
    }
  }
  straight() {
    if (!this.compare && !this.stopped) this.counter++;
    if (this.subPath1Go) {
      this.initialDirection(this.direction1);
      this.direction = this.direction1;
    } else {
      this.initialDirection(this.direction2);
      this.direction = this.direction2;
    }

    if (this.counter === 1) {
      this.targetX = this.nextVertex.x + RADIUS;
      this.targetY = this.nextVertex.y + RADIUS;
    }
    if (this.counter === this.stepCount && !this.subPath1Go) {
      this.dx = this.targetX - this.currentX;
      this.dy = this.targetY - this.currentY;
    }
    this.updateCounter();
  }
  getStartingCoords(direction, movement) {
    let vertex;
    if (this.subPath1Go) {
      vertex = this.currentVertex;
    } else {
      vertex = this.nextVertex;
    }
    if (
      (direction === 90 && movement === "right") ||
      (direction === 0 && movement === "left")
    ) {
      return [vertex.x + 50, vertex.y + 50];
    } else if (
      (direction === 180 && movement === "right") ||
      (direction === 90 && movement === "left")
    )
      return [vertex.x, vertex.y + 50];
    else if (
      (direction === 270 && movement === "right") ||
      (direction === 180 && movement === "left")
    )
      return [vertex.x, vertex.y];
    else if (
      (direction === 0 && movement === "right") ||
      (direction === 270 && movement === "left")
    )
      return [vertex.x + 50, vertex.y];
  }
  enterRight() {
    if (!this.compare && !this.stopped) this.counter++;
    let initialAngle = this.direction1 - 90;
    this.angle = initialAngle + this.counter * (45 / this.stepCount);
    let targetAngle = initialAngle + 45;
    this.direction = this.angle + 90;
    let [startX, startY] = this.getStartingCoords(
      this.direction1,
      this.movement2
    );
    this.targetCornerX = Math.round(
      startX - RADIUS * Math.cos((Math.PI / 180) * this.angle)
    );
    this.targetCornerY = Math.round(
      startY - RADIUS * Math.sin((Math.PI / 180) * this.angle)
    );
    if (this.counter === this.stepCount) {
      this.dx = this.targetX - this.currentX;
      this.dy = this.targetY - this.currentY;
    } else {
      this.dx = this.targetCornerX - this.currentX;
      this.dy = this.targetCornerY - this.currentY;
    }
    if (this.counter === 1) {
      this.targetX = Math.round(
        startX - RADIUS * Math.cos((Math.PI / 180) * targetAngle)
      );
      this.targetY = Math.round(
        startY - RADIUS * Math.sin((Math.PI / 180) * targetAngle)
      );
    }
    this.updateCounter();
  }
  exitRight() {
    if (!this.compare && !this.stopped) this.counter++;
    let initialAngle = this.direction0 - 45;
    this.angle = initialAngle + this.counter * (45 / this.stepCount);
    this.direction = this.angle + 90;
    let [startX, startY] = this.getStartingCoords(
      this.direction0,
      this.movement1
    );
    this.targetCornerX = Math.round(
      startX - RADIUS * Math.cos((Math.PI / 180) * this.angle)
    );
    this.targetCornerY = Math.round(
      startY - RADIUS * Math.sin((Math.PI / 180) * this.angle)
    );
    this.dx = this.targetCornerX - this.currentX;
    this.dy = this.targetCornerY - this.currentY;
    this.updateCounter();
  }
  enterLeft() {
    if (!this.compare && !this.stopped) this.counter++;
    let initialAngle = 360 - this.direction1;
    let angleDelta = this.counter * (45 / this.stepCount);
    this.angle = initialAngle + angleDelta;
    let targetAngle = initialAngle + 45;
    this.direction = 360 - initialAngle - angleDelta;
    let [startX, startY] = this.getStartingCoords(
      this.direction1,
      this.movement2
    );
    this.targetCornerX = Math.round(
      startX - RADIUS * Math.sin((Math.PI / 180) * this.angle)
    );
    this.targetCornerY = Math.round(
      startY - RADIUS * Math.cos((Math.PI / 180) * this.angle)
    );
    if (this.counter === this.stepCount) {
      this.dx = this.targetX - this.currentX;
      this.dy = this.targetY - this.currentY;
    } else {
      this.dx = this.targetCornerX - this.currentX;
      this.dy = this.targetCornerY - this.currentY;
    }
    if (this.counter === 1) {
      this.targetX = Math.round(
        startX - RADIUS * Math.sin((Math.PI / 180) * targetAngle)
      );
      this.targetY = Math.round(
        startY - RADIUS * Math.cos((Math.PI / 180) * targetAngle)
      );
    }
    this.updateCounter();
  }
  exitLeft() {
    if (!this.compare && !this.stopped) this.counter++;
    let initialAngle = 360 - this.direction0 + 45;
    let angleDelta = this.counter * (45 / this.stepCount);
    this.angle = initialAngle + angleDelta;
    this.direction = 360 - initialAngle - angleDelta;
    let [startX, startY] = this.getStartingCoords(
      this.direction0,
      this.movement1
    );
    this.targetCornerX = Math.round(
      startX - RADIUS * Math.sin((Math.PI / 180) * this.angle)
    );
    this.targetCornerY = Math.round(
      startY - RADIUS * Math.cos((Math.PI / 180) * this.angle)
    );
    this.dx = this.targetCornerX - this.currentX;
    this.dy = this.targetCornerY - this.currentY;
    this.updateCounter();
  }

  initialDirection(direction) {
    if (direction === 0) {
      this.dx = -this.speed;
      this.dy = 0;
    } else if (direction === 180) {
      this.dx = this.speed;
      this.dy = 0;
    } else if (direction === 90) {
      this.dx = 0;
      this.dy = -this.speed;
    } else if (direction === 270) {
      this.dx = 0;
      this.dy = this.speed;
    }
  }

  speedChange(speed) {
    this.speed = this.masterSpeed = speed;
  }
  speedCheck() {
    if (this.nextVertex.roadWorks) {
      this.speed = 1;
    } else {
      this.speed = this.masterSpeed;
    }
    if (this.nextVertex?.speed < this.speed) {
      this.speed = this.nextVertex.speed;
    }
  }

  //DRAWINGS
  drawCar() {
    if (!this.currentVertex) return;
    const x = this.currentX - RADIUS + 25;
    const y = this.currentY - RADIUS / 2 + 12.5;
    const angle = (this.direction * Math.PI) / 180;
    this.context.save();
    this.context.translate(x, y);
    this.context.rotate(angle);
    this.context.drawImage(playerCar, -25, -12.5, 50, 25);
    this.context.restore();
  }

  drawLine(x, y, targetx, targety) {
    this.context.beginPath();
    this.context.fillStyle = this.pathColor;
    let margin = 0;
    if (this.pathColor === "yellow") {
      margin = 1.5;
    }
    let dx = targetx - x;
    let dy = targety - y;
    if (dx === 0) {
      this.context.fillRect(x - 2.5 - margin / 2, y, 5 + margin, dy * 1.05);
    } else
      this.context.fillRect(x, y - 2.5 - margin / 2, dx * 1.05, 5 + margin);
  }
}
