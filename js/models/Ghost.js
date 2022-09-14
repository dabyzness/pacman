const blinkyStart = [
  [1338 - 57, 1339 - 57, 1340 - 57],
  [1338, 1339, 1340],
  [1338 + 57, 1339 + 57, 1340 + 57],
];

const pinkyStart = [
  [1680 - 57, 1681 - 57, 1682 - 57],
  [1680, 1681, 1682],
  [1680 + 57, 1681 + 57, 1682 + 57],
];

const inkyStart = [
  [1676 - 57, 1677 - 57, 1678 - 57],
  [1676, 1677, 1678],
  [1676 + 57, 1677 + 57, 1678 + 57],
];

const clydeStart = [
  [1684 - 57, 1685 - 57, 1686 - 57],
  [1684, 1685, 1686],
  [1684 + 57, 1685 + 57, 1686 + 57],
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
