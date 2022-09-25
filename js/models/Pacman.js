const startPosition = 2707;

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

  getNextPos(boardLength, dir) {
    let nextPos;

    switch (dir) {
      case "up":
        nextPos = this.currPos - boardLength;
        break;
      case "down":
        nextPos = this.currPos + boardLength;
        break;
      case "left":
        nextPos = this.currPos - 1;
        break;
      case "right":
        nextPos = this.currPos + 1;
        break;
      default:
        break;
    }

    return nextPos;
  }
}
