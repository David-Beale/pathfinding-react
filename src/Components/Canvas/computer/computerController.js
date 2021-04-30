import Computer from "./computer.js";
export default class ComputerController {
  constructor(context, map) {
    this.size = 15;
    this.map = map;
    this.cars = [];
    this.arrayOfVertices = Object.keys(map.graphObj);
    this.context = context;
    this.spawnCars();
  }
  run() {
    this.cars.forEach((car) => car.run());
  }
  spawnCars(num = this.size) {
    this.size = num;
    this.clearExistingCars();
    const availablePositions = this.arrayOfVertices.slice();
    for (let i = 0; i < this.size; i++) {
      const randomIndex = Math.floor(Math.random() * availablePositions.length);
      const vertex = availablePositions.splice(randomIndex, 1);
      const computer = new Computer(this.context, this.map, vertex);
      this.cars.push(computer);
    }
  }
  clearExistingCars() {
    this.cars.forEach((car) => (car.currentVertex.occupied = false));
    this.cars = [];
  }
}
