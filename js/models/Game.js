import { Tile } from "./Tile.js";
import { Pacman } from "./Pacman.js";
import { Ghost } from "./Ghost.js";

export class Game {
  constructor(board) {
    this.board = board.map((row) =>
      row.map((tileValue) => new Tile(tileValue))
    );
    this.player = new Pacman();
    this.ghosts = [
      new Ghost("blinky"),
      new Ghost("pinky"),
      new Ghost("clyde"),
      new Ghost("inky"),
    ];
    this.inputs = [];
    this.points = 0;
    this.pillsLeftOnBoard = 244;
    this.winner = false;
  }

  setInputs(input) {
    this.inputs.push(input);
  }

  isWallAhead(nextPos, direction) {
    let row = this.getTilesRowPosDir(nextPos, direction);
    let col = this.getTilesColPosDir(nextPos, direction);

    for (let i = 0; i < row.length; i += 1) {
      if (!this.board[row[i]][col[i]].value) {
        return true;
      }
    }

    return false;
  }

  improvePlayerMovementHitBox(nextPos, player) {
    let row = this.getTilesRowPosDir(nextPos, player.direction);
    let col = this.getTilesColPosDir(nextPos, player.direction);

    let totalValue = 0;

    for (let i = 0; i < row.length; i += 1) {
      totalValue += this.board[row[i]][col[i]].value;
    }

    if (totalValue < 2) {
      return;
    }

    let improvedPos = [];

    switch (player.direction) {
      case "up":
        if (!this.board[row[0]][col[0]].value) {
          improvedPos = nextPos.map((row) => row.map((tileNo) => tileNo + 1));
        } else {
          improvedPos = nextPos.map((row) => row.map((tileNo) => tileNo - 1));
        }
        break;
      case "down":
        if (!this.board[row[0]][col[0]].value) {
          improvedPos = nextPos.map((row) => row.map((tileNo) => tileNo + 1));
        } else {
          improvedPos = nextPos.map((row) => row.map((tileNo) => tileNo - 1));
        }
        break;
      case "left":
        if (!this.board[row[0]][col[0]].value) {
          improvedPos = nextPos.map((row) => row.map((tileNo) => tileNo + 55));
        } else {
          improvedPos = nextPos.map((row) => row.map((tileNo) => tileNo - 55));
        }
        break;
      case "right":
        if (!this.board[row[0]][col[0]].value) {
          improvedPos = nextPos.map((row) => row.map((tileNo) => tileNo + 55));
        } else {
          improvedPos = nextPos.map((row) => row.map((tileNo) => tileNo - 55));
        }
        break;
      default:
        break;
    }

    return improvedPos;
  }

  movePlayer() {
    if (!this.player.direction) {
      return;
    }
    let nextPos = this.player.getNextPos(this.board[0].length, this.inputs);

    if (this.isWallAhead(nextPos, this.player.direction)) {
      const improvedPos = this.improvePlayerMovementHitBox(
        nextPos,
        this.player
      );

      if (improvedPos) {
        nextPos = improvedPos;
      } else {
        return;
      }
    }

    this.handleIfPointAhead(nextPos, this.player);

    this.player.currPos = nextPos;
  }

  handleIfPointAhead(nextPos, character) {
    let tile;
    switch (character.direction) {
      case "up":
        tile =
          this.board[this.getTileRow(nextPos[0][1])][
            this.getTileCol(nextPos[0][1])
          ];
        break;
      case "down":
        tile =
          this.board[this.getTileRow(nextPos[2][1])][
            this.getTileCol(nextPos[2][1])
          ];
        break;
      case "left":
        tile =
          this.board[this.getTileRow(nextPos[1][0])][
            this.getTileCol(nextPos[1][0])
          ];
        break;
      case "right":
        tile =
          this.board[this.getTileRow(nextPos[1][2])][
            this.getTileCol(nextPos[1][2])
          ];
        break;
      default:
        break;
    }

    if (tile.value === 2) {
      this.increasePoints(10);
      tile.setValue(1);
      this.pillsLeftOnBoard -= 1;
      this.isWinner();
    }
  }

  moveGhost(ghost) {
    const choices = [];

    ["up", "down", "left", "right"].forEach((dir) => {
      if (ghost.direction === "left" && dir === "right") {
        return;
      } else if (ghost.direction === "right" && dir === "left") {
        return;
      } else if (ghost.direction === "up" && dir === "down") {
        return;
      } else if (ghost.direction === "down" && dir === "up") {
        return;
      }

      const nextPos = ghost.getNextPos(this.board[0].length, dir);

      if (this.isWallAhead(nextPos, dir)) {
        return;
      }

      choices.push([nextPos, dir]);
    });

    const randomIndex = Math.floor(Math.random() * choices.length);

    ghost.setCurrPos(choices[randomIndex][0]);
    ghost.setDirection(choices[randomIndex][1]);
  }

  increasePoints(points) {
    this.points += points;
  }

  isWinner() {
    this.winner = this.pillsLeftOnBoard ? false : true;
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
