import { Tile } from "./Tile.js";
import { Pacman } from "./Pacman.js";
import { Ghost } from "./Ghost.js";

const ghostNames = ["blinky", "pinky", "inky", "clyde"];

export class Game {
  constructor(board, livesLeft, points) {
    this.board = board.map((row) =>
      row.map((tileValue) => new Tile(tileValue))
    );
    this.player = new Pacman();
    this.ghosts = ghostNames.map((ghostName) => new Ghost(ghostName));
    this.inputs = [];
    this.points = points || 0;
    this.pillsLeftOnBoard = 244;
    this.livesLeft = livesLeft;
    this.winner = false;
    this.gameOver = false;
    this.pillTimer = 0;
    this.ghostsEaten = [];
  }

  setInputs(input) {
    this.inputs.push(input);
  }

  isWallAhead(nextPos, direction) {
    let row = this.getTileRow(nextPos);
    let col = this.getTileCol(nextPos);

    if (this.board[row][col].value <= 0) {
      return true;
    }

    switch (direction) {
      case "up":
        if (
          this.board[row - 1][col].value <= 0 ||
          this.board[row - 1][col - 1].value <= 0 ||
          this.board[row - 1][col + 1].value <= 0
        ) {
          return true;
        }
        break;
      case "down":
        if (
          this.board[row + 1][col].value <= 0 ||
          this.board[row + 1][col - 1].value <= 0 ||
          this.board[row + 1][col + 1].value <= 0
        ) {
          return true;
        }
        break;
      case "left":
        if (
          this.board[row][col - 1].value <= 0 ||
          this.board[row - 1][col - 1].value <= 0 ||
          this.board[row + 1][col - 1].value <= 0
        ) {
          return true;
        }
        break;
      case "right":
        if (
          this.board[row][col + 1].value <= 0 ||
          this.board[row - 1][col + 1].value <= 0 ||
          this.board[row + 1][col + 1].value <= 0
        ) {
          return true;
        }
        break;
    }

    return false;
  }

  // improvePlayerMovementHitBox(nextPos, player) {
  //   let row = this.getTilesRow(nextPos, player.direction);
  //   let col = this.getTilesCol(nextPos, player.direction);

  //   let totalValue = 0;

  //   for (let i = 0; i < row.length; i += 1) {
  //     if (this.board[row[i]][col[i]].value < 1) {
  //       continue;
  //     }
  //     totalValue += this.board[row[i]][col[i]].value;
  //   }

  //   if (totalValue <= 1) {
  //     return;
  //   }

  //   let improvedPos = [];

  //   switch (player.direction) {
  //     case "up":
  //       if (this.board[row[0]][col[0]].value <= 0) {
  //         improvedPos = nextPos.map((row) => row.map((tileNo) => tileNo + 1));
  //       } else {
  //         improvedPos = nextPos.map((row) => row.map((tileNo) => tileNo - 1));
  //       }
  //       break;
  //     case "down":
  //       if (this.board[row[0]][col[0]].value <= 0) {
  //         improvedPos = nextPos.map((row) => row.map((tileNo) => tileNo + 1));
  //       } else {
  //         improvedPos = nextPos.map((row) => row.map((tileNo) => tileNo - 1));
  //       }
  //       break;
  //     case "left":
  //       if (this.board[row[0]][col[0]].value <= 0) {
  //         improvedPos = nextPos.map((row) => row.map((tileNo) => tileNo + 57));
  //       } else {
  //         improvedPos = nextPos.map((row) => row.map((tileNo) => tileNo - 57));
  //       }
  //       break;
  //     case "right":
  //       if (this.board[row[0]][col[0]].value <= 0) {
  //         improvedPos = nextPos.map((row) => row.map((tileNo) => tileNo + 57));
  //       } else {
  //         improvedPos = nextPos.map((row) => row.map((tileNo) => tileNo - 57));
  //       }
  //       break;
  //     default:
  //       break;
  //   }

  //   return improvedPos;
  // }

  movePlayer() {
    if (!this.player.direction) {
      return;
    }
    let dir = this.inputs.shift() || this.player.direction;

    let nextPos = this.player.getNextPos(this.board[0].length, dir);

    if (this.isWallAhead(nextPos, dir)) {
      // const improvedPos = this.improvePlayerMovementHitBox(
      //   nextPos,
      //   this.player
      // );

      // if (improvedPos) {
      //   nextPos = improvedPos;
      // } else {
      //   return;
      // }

      if (dir === this.player.direction) {
        return;
      } else {
        dir = this.player.direction;
        nextPos = this.player.getNextPos(
          this.board[0].length,
          this.player.direction
        );

        if (this.isWallAhead(nextPos, this.player.direction)) {
          return;
        }
      }
    }

    this.handleIfPointAhead(nextPos, this.player);

    this.player.currPos = nextPos;
    this.player.direction = dir;
  }

  handleIfPointAhead(nextPos, character) {
    let tile = this.board[this.getTileRow(nextPos)][this.getTileCol(nextPos)];
    // switch (character.direction) {
    //   case "up":
    //     tile =
    //       this.board[this.getTileRow(nextPos[0][1])][
    //         this.getTileCol(nextPos[0][1])
    //       ];
    //     break;
    //   case "down":
    //     tile =
    //       this.board[this.getTileRow(nextPos[2][1])][
    //         this.getTileCol(nextPos[2][1])
    //       ];
    //     break;
    //   case "left":
    //     tile =
    //       this.board[this.getTileRow(nextPos[1][0])][
    //         this.getTileCol(nextPos[1][0])
    //       ];
    //     break;
    //   case "right":
    //     tile =
    //       this.board[this.getTileRow(nextPos[1][2])][
    //         this.getTileCol(nextPos[1][2])
    //       ];
    //     break;
    //   default:
    //     break;
    // }

    if (tile.value >= 2) {
      if (tile.value === 3) {
        this.pillTimer = 300;
      }
      this.increasePoints(tile.value);
      tile.setValue(1);
      this.pillsLeftOnBoard -= 1;
      this.isWinner();
    }
  }

  // moveGhost(ghost) {
  //   const choices = [];

  //   ["up", "down", "left", "right"].forEach((dir) => {
  //     if (ghost.direction === "left" && dir === "right") {
  //       return;
  //     } else if (ghost.direction === "right" && dir === "left") {
  //       return;
  //     } else if (ghost.direction === "up" && dir === "down") {
  //       return;
  //     } else if (ghost.direction === "down" && dir === "up") {
  //       return;
  //     }

  //     const nextPos = ghost.getNextPos(this.board[0].length, dir);

  //     if (this.isWallAhead(nextPos, dir)) {
  //       return;
  //     }

  //     if (nextPos[2][1] === 1292) {
  //       return;
  //     }
  //     choices.push([nextPos, dir]);
  //   });

  //   if (!choices.length) {
  //     const onlyPos = ghost.currPos.map((row) =>
  //       row.map((pos) => (ghost.direction === "left" ? pos + 53 : pos - 53))
  //     );

  //     ghost.setCurrPos(onlyPos);
  //     return;
  //   }

  //   const randomIndex = Math.floor(Math.random() * choices.length);

  //   ghost.setCurrPos(choices[randomIndex][0]);
  //   ghost.setDirection(choices[randomIndex][1]);
  // }

  // isGhostTouching(tile) {
  //   if (["blinky", "pinky", "inky", "clyde"].includes(tile.classList[1])) {
  //     if (
  //       tile.classList[3] === "killable-blue" ||
  //       tile.classList[3] === "killable-white"
  //     ) {
  //       this.ghosts = this.ghosts.filter(
  //         (ghost) => ghost.name != tile.classList[1]
  //       );
  //       this.ghostsEaten.push(tile.classList[1]);

  //       let pointValue;
  //       switch (this.ghostsEaten.length) {
  //         case 1:
  //           pointValue = 200;
  //           break;
  //         case 2:
  //           pointValue = 400;
  //           break;
  //         case 3:
  //           pointValue = 800;
  //           break;
  //         case 4:
  //           pointValue = 1600;
  //           break;
  //         default:
  //           break;
  //       }
  //       this.increasePoints(pointValue);

  //       return false;
  //     }

  //     return true;
  //   }

  //   return false;
  // }

  setPillTimer(value) {
    if (!this.pillTimer) {
      return;
    }

    if (this.pillTimer === 1) {
      if (this.ghostsEaten.length) {
        this.ghostsEaten.forEach((ghostEaten) => {
          this.respawnGhost(ghostEaten);
        });

        this.ghostsEaten = [];
      }
    }

    this.pillTimer += value;
  }

  increasePoints(tileValue) {
    if (tileValue === 2) {
      this.points += 10;
    } else if (tileValue === 3) {
      this.points += 50;
    } else {
      this.points += tileValue;
    }
  }

  changeLivesLeft(value) {
    this.livesLeft += value;
  }

  isWinner() {
    this.winner = this.pillsLeftOnBoard ? false : true;
  }

  respawnGhost(name) {
    this.ghosts.push(new Ghost(name));
  }

  respawnPlayer() {
    this.player = new Pacman();
  }

  getTileRow(tileNo) {
    return Math.floor(tileNo / this.board[0].length);
  }

  getTileCol(tileNo) {
    return tileNo % this.board[0].length;
  }

  getTilesRowPosDir(position, direction) {
    let row = [];

    switch (direction) {
      case "up":
        row = position[0].map((tileNo) => this.getTileRow(tileNo));
        break;
      case "down":
        row = position[2].map((tileNo) => this.getTileRow(tileNo));
        break;
      case "left":
        row.push(
          this.getTileRow(position[0][0]),
          this.getTileRow(position[1][0]),
          this.getTileRow(position[2][0])
        );
        break;
      case "right":
        row.push(
          this.getTileRow(position[0][2]),
          this.getTileRow(position[1][2]),
          this.getTileRow(position[2][2])
        );
        break;
    }

    return row;
  }

  getTilesColPosDir(position, direction) {
    let col = [];

    switch (direction) {
      case "up":
        col = position[0].map((tileNo) => this.getTileCol(tileNo));
        break;
      case "down":
        col = position[2].map((tileNo) => this.getTileCol(tileNo));
        break;
      case "left":
        col.push(
          this.getTileCol(position[0][0]),
          this.getTileCol(position[1][0]),
          this.getTileCol(position[2][0])
        );
        break;
      case "right":
        col.push(
          this.getTileCol(position[0][2]),
          this.getTileCol(position[1][2]),
          this.getTileCol(position[2][2])
        );
        break;
    }

    return col;
  }
}
