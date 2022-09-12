const startPosition = [
  [2556 - 55, 2557 - 55, 2558 - 55],
  [2556, 2557, 2558],
  [2556 + 55, 2557 + 55, 2558 + 55],
];

export class Pacman {
  constructor() {
    this.direction = null;
    this.currPos = startPosition;
    this.velocity = null;
  }

  setDirection(dir) {
    this.direction = dir;
  }

  setCurrPos(currPos) {
    this.currPos = currPos;
  }

  getNextPos(boardLength, inputsArr) {
    let nextPos = [];
    const dir = inputsArr.shift() || this.direction;

    this.direction = dir;

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
