const blinkyStart = 1339;
const pinkyStart = 1681;
const inkyStart = 1677;
const clydeStart = 1685;

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
