import { board } from "../data/board.js";
import { Game } from "./models/Game.js";

const grid = document.querySelector(".grid");
let tiles;

const possibleMovements = ["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"];

const pacmanLayoutRight = [
  ["top-left", "top-center", "top-right"],
  ["middle-left", "middle-center", "middle-right"],
  ["bottom-left", "bottom-center", "bottom-right"],
];

const pacmanLayoutLeft = [
  ["bottom-right dir-left", "bottom-center dir-left", "bottom-left dir-left"],
  ["middle-right dir-left", "middle-center dir-left", "middle-left dir-left"],
  ["top-right dir-left", "top-center dir-left", "top-left dir-left"],
];

const pacmanLayoutUp = [
  ["top-right dir-up", "middle-right dir-up", "bottom-right dir-up"],
  ["top-center dir-up", "middle-center dir-up", "bottom-center dir-up"],
  ["top-left dir-up", "middle-left dir-up", "bottom-left dir-up"],
];

const pacmanLayoutDown = [
  ["bottom-left dir-down", "middle-left dir-down", "top-left dir-down"],
  ["bottom-center dir-down", "middle-center dir-down", "top-center dir-down"],
  ["bottom-right dir-down", "middle-right dir-down", "top-right dir-down"],
];

const ghostLayout = [
  ["bloop-top-left", "bloop-top-center", "bloop-top-right"],
  ["bloop-middle-left", "bloop-middle-center", "bloop-middle-right"],
  ["bloop-bottom-left", "bloop-bottom-center", "bloop-bottom-right"],
];

const game = new Game(board);
renderMap();

function init() {}

function renderMap() {
  game.board.forEach((row) => {
    row.forEach((tile) => {
      const tileEl = document.createElement("div");

      tileEl.setAttribute("class", tile.className);
      grid.appendChild(tileEl);
    });
  });

  tiles = document.querySelectorAll(".tile");
  renderPos();
}

function renderPos() {
  switch (game.player.direction) {
    case "up":
      game.player.currPos.forEach((pos, i) => {
        tiles[pos[1]].setAttribute("class", `tile ${pacmanLayoutUp[i][1]}`);
        tiles[pos[0]].setAttribute("class", `tile ${pacmanLayoutUp[i][0]}`);
        tiles[pos[2]].setAttribute("class", `tile ${pacmanLayoutUp[i][2]}`);
      });
      break;
    case "down":
      game.player.currPos.forEach((pos, i) => {
        tiles[pos[1]].setAttribute("class", `tile ${pacmanLayoutDown[i][1]}`);
        tiles[pos[0]].setAttribute("class", `tile ${pacmanLayoutDown[i][0]}`);
        tiles[pos[2]].setAttribute("class", `tile ${pacmanLayoutDown[i][2]}`);
      });
      break;
    case "left":
      game.player.currPos.forEach((pos, i) => {
        tiles[pos[1]].setAttribute("class", `tile ${pacmanLayoutLeft[i][1]}`);
        tiles[pos[0]].setAttribute("class", `tile ${pacmanLayoutLeft[i][0]}`);
        tiles[pos[2]].setAttribute("class", `tile ${pacmanLayoutLeft[i][2]}`);
      });
      break;
    case "right":
      game.player.currPos.forEach((pos, i) => {
        tiles[pos[1]].setAttribute("class", `tile ${pacmanLayoutRight[i][1]}`);
        tiles[pos[0]].setAttribute("class", `tile ${pacmanLayoutRight[i][0]}`);
        tiles[pos[2]].setAttribute("class", `tile ${pacmanLayoutRight[i][2]}`);
      });
      break;
    default:
      game.player.currPos.forEach((pos, i) => {
        tiles[pos[1]].setAttribute("class", `tile ${pacmanLayoutLeft[i][1]}`);
        tiles[pos[0]].setAttribute("class", `tile ${pacmanLayoutLeft[i][0]}`);
        tiles[pos[2]].setAttribute("class", `tile ${pacmanLayoutLeft[i][2]}`);

        tiles[pos[1]].style.animationName = "none";
        tiles[pos[0]].style.animationName = "none";
        tiles[pos[2]].style.animationName = "none";
      });

      break;
  }
}

window.addEventListener("keydown", ({ key }) => {
  if (!possibleMovements.includes(key)) {
    return;
  }

  game.setInputs(key.replace("Arrow", "").toLowerCase());

  if (!game.player.direction) {
    game.player.direction = key.replace("Arrow", "").toLowerCase();
  }
});

function unRenderPos(character) {
  character.currPos.forEach((row, i) => {
    row.forEach((tileNo, i) => {
      tiles[tileNo].setAttribute(
        "class",
        game.board[Math.floor(tileNo / game.board[0].length)][
          tileNo % game.board[0].length
        ].className
      );
    });
  });
}

function renderGhost(ghosts) {
  ghosts.forEach((ghost) => {
    ghost.currPos.forEach((pos, i) => {
      tiles[pos[1]].setAttribute(
        "class",
        `tile ${ghost.name} ${ghostLayout[i][1]}`
      );
      tiles[pos[0]].setAttribute(
        "class",
        `tile ${ghost.name} ${ghostLayout[i][0]}`
      );
      tiles[pos[2]].setAttribute(
        "class",
        `tile ${ghost.name} ${ghostLayout[i][2]}`
      );
    });
  });
}

let count = 0;

setInterval(() => {
  if (game.winner) {
    return;
  }

  if (!game.player.direction) {
    renderPos();
    renderGhost(game.ghosts);
    return;
  }

  if (count === 3) {
    unRenderPos(game.player);
    game.movePlayer();
    game.ghosts.forEach((ghost) => {
      unRenderPos(ghost);
      game.moveGhost(ghost);
    });
    count = 0;
  } else {
    count += 1;
  }

  renderPos();
  renderGhost(game.ghosts);
}, 1000 / 60);
