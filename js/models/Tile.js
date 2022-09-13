const valueToClassName = [
  "tile edge",
  "tile",
  "tile small-pill",
  "tile big-pill",
];

const valueToEdgeName = [
  "tile edge",
  "tile edge-top",
  "tile edge-middle",
  "tile edge-top-left",
  "tile edge-top-right",
  "tile edge-bottom-left",
  "tile edge-bottom-right",
];

export class Tile {
  constructor(value) {
    if (value > 0) {
      this.value = value;
      this.className = valueToClassName[value];
    } else {
      this.value = value;
      this.className = valueToEdgeName[Math.abs(value)];
    }
  }

  setValue(value) {
    if (value > 0) {
      this.value = value;
      this.className = valueToClassName[value];
    } else {
      this.value = value;
      this.className = valueToEdgeName[Math.abs(value)];
    }
  }
}
