const blinkyStart = [
  [1214 - 57, 1215 - 57, 1216 - 57],
  [1214, 1215, 1216],
  [1214 + 57, 1215 + 57, 1216 + 57],
];

const pinkyStart = [
  [1556 - 57, 1557 - 57, 1558 - 57],
  [1556, 1557, 1558],
  [1556 + 57, 1557 + 57, 1558 + 57],
];

const inkyStart = [
  [1552 - 57, 1553 - 57, 1554 - 57],
  [1552, 1553, 1554],
  [1552 + 57, 1553 + 57, 1554 + 57],
];

const clydeStart = [
  [1560 - 57, 1561 - 57, 1562 - 57],
  [1560, 1561, 1562],
  [1560 + 57, 1561 + 57, 1562 + 57],
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
