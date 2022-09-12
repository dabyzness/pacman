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
    let row = [];
    let col = [];

    switch (character.direction) {
      case "up":
        row = nextPos[0].map((tileNo) => this.getTileRow(tileNo));
        col = nextPos[0].map((tileNo) => this.getTileCol(tileNo));
        break;
      case "down":
        row = nextPos[2].map((tileNo) => this.getTileRow(tileNo));
        col = nextPos[2].map((tileNo) => this.getTileCol(tileNo));
        break;
      case "left":
        row.push(
          this.getTileRow(nextPos[0][0]),
          this.getTileRow(nextPos[1][0]),
          this.getTileRow(nextPos[2][0])
        );
        col.push(
          this.getTileCol(nextPos[0][0]),
          this.getTileCol(nextPos[1][0]),
          this.getTileCol(nextPos[2][0])
        );
        break;
      case "right":
        row.push(
          this.getTileRow(nextPos[0][2]),
          this.getTileRow(nextPos[1][2]),
          this.getTileRow(nextPos[2][2])
        );
        col.push(
          this.getTileCol(nextPos[0][2]),
          this.getTileCol(nextPos[1][2]),
          this.getTileCol(nextPos[2][2])
        );
        break;
    }

    for (let i = 0; i < row.length; i += 1) {
      if (!this.board[row[i]][col[i]].value) {
        return true;
      }
    }

    return false;
  }

  movePlayer() {
    if (!this.player.direction) {
      return;
    }
    const nextPos = this.player.getNextPos(this.board[0].length, this.inputs);

    this.handleIfPointAhead(nextPos, this.player);

    if (this.isWallAhead(nextPos, this.player)) {
      return;
    }

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
}
