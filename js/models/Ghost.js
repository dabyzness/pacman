const blinkyStart = [
  [1236 - 55, 1237 - 55, 1238 - 55],
  [1236, 1237, 1238],
  [1236 + 55, 1237 + 55, 1238 + 55],
];

const pinkyStart = [
  [1566 - 55, 1567 - 55, 1568 - 55],
  [1566, 1567, 1568],
  [1566 + 55, 1567 + 55, 1568 + 55],
];

const inkyStart = [
  [1562 - 55, 1563 - 55, 1564 - 55],
  [1562, 1563, 1564],
  [1562 + 55, 1563 + 55, 1564 + 55],
];

const clydeStart = [
  [1570 - 55, 1571 - 55, 1572 - 55],
  [1570, 1571, 1572],
  [1570 + 55, 1571 + 55, 1572 + 55],
];

export class Ghost {
  constructor(name) {
    this.name = name;
    this.direction = "left";

    switch (name) {
      case "blinky":
        this.currPos = blinkyStart;
        break;
      case "pinky":
        this.currPos = pinkyStart;
        break;
      case "inky":
        this.currPos = inkyStart;
        break;
      case "clyde":
        this.currPos = clydeStart;
        break;
      default:
        break;
    }

    this.velocity = null;
  }

  setCurrPos(pos) {
    this.currPos = pos;
  }

  setDirection(dir) {
    this.direction = dir;
  }

  getNextPos(boardLength, dir) {
    let nextPos = [];

    switch (dir) {
      case "up":
        nextPos = this.currPos.map((row) =>
          row.map((tileNo) => tileNo - boardLength)
        );
        break;
      case "down":
        nextPos = this.currPos.map((row) =>
          row.map((tileNo) => tileNo + boardLength)
        );
        break;
      case "left":
        nextPos = this.currPos.map((row) => row.map((tileNo) => tileNo - 1));
        break;
      case "right":
        nextPos = this.currPos.map((row) => row.map((tileNo) => tileNo + 1));
        break;
      default:
        break;
    }

    return nextPos;
  }
}
