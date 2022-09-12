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
  }

  setInputs(input) {
    this.inputs.push(input);
  }

  isWallAhead(nextPos, character) {
    let row = [];
    let col = [];

    switch (character.direction) {
      case "up":
        row = nextPos[0].map((tileNo) =>
          Math.floor(tileNo / this.board[0].length)
        );
        col = nextPos[0].map((tileNo) => tileNo % this.board[0].length);
        break;
      case "down":
        row = nextPos[2].map((tileNo) =>
          Math.floor(tileNo / this.board[0].length)
        );
        col = nextPos[2].map((tileNo) => tileNo % this.board[0].length);
        break;
      case "left":
        row.push(
          Math.floor(nextPos[0][0] / this.board[0].length),
          Math.floor(nextPos[1][0] / this.board[0].length),
          Math.floor(nextPos[2][0] / this.board[0].length)
        );
        col.push(
          nextPos[0][0] % this.board[0].length,
          nextPos[1][0] % this.board[0].length,
          nextPos[2][0] % this.board[0].length
        );
        break;
      case "right":
        row.push(
          Math.floor(nextPos[0][2] / this.board[0].length),
          Math.floor(nextPos[1][2] / this.board[0].length),
          Math.floor(nextPos[2][2] / this.board[0].length)
        );
        col.push(
          nextPos[0][2] % this.board[0].length,
          nextPos[1][2] % this.board[0].length,
          nextPos[2][2] % this.board[0].length
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

    if (this.isWallAhead(nextPos, this.player)) {
      return false;
    }
    this.player.currPos = nextPos;
  }
}
