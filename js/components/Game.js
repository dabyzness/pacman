import { Tile } from "../components/Tile.js";
import { Pacman } from "../components/Pacman.js";

export class Game {
  constructor(board) {
    this.board = board.map((row) =>
      row.map((tileValue) => new Tile(tileValue))
    );
    this.player = new Pacman();
  }
}
