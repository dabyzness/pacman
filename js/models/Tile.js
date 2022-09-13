const valueToClassName = [
  "tile edge",
  "tile",
  "tile small-pill",
  "tile big-pill",
];

export class Tile {
  constructor(value) {
    this.value = value;
    this.className = valueToClassName[value];
  }

  setValue(value) {
    this.value = value;
    this.className = valueToClassName[value];
  }
}
