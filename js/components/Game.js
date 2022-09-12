import { Tile } from "../components/Tile.js";
import { Pacman } from "../components/Pacman.js";

export class Game {
  constructor(board) {
    this.board = board.map((row) =>
      row.map((tileValue) => new Tile(tileValue))
    );
    this.player = new Pacman();
    this.inputs = [];
    this.points = 0;
    this.pillsLeftOnBoard = 244;
    this.winner = false;
  }

  setInputs(input) {
    this.inputs.push(input);
  }

  isWallAhead(nextPos, character) {
    let row = this.getTilesRowPosDir(nextPos, character.direction);
    let col = this.getTilesColPosDir(nextPos, character.direction);

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

    console.log(totalValue);
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

    if (this.isWallAhead(nextPos, this.player)) {
      const improvedPos = this.improvePlayerMovementHitBox(
        nextPos,
        this.player
      );

      if (improvedPos) {
        console.log(nextPos);
        console.log(improvedPos);
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
