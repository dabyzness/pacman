const startPosition = [
  [2706 - 57, 2707 - 57, 2708 - 57],
  [2706, 2707, 2708],
  [2706 + 57, 2707 + 57, 2708 + 57],
];

export class Pacman {
  constructor() {
    this.direction = null;
    this.currPos = startPosition;
    this.isDead = false;
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
