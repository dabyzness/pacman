const startPosition = [
  [74, 75, 76],
  [74 + 55, 75 + 55, 76 + 55],
  [74 + 110, 75 + 110, 76 + 110],
];

export class Pacman {
  constructor() {
    this.direction = null;
    this.currPos = startPosition;
    // [
    //   [24, 25, 26],
    //   [31, 32, 33],
    //   [38, 39, 40],
    // ];
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
