// import { board } from "../data/board.js";
import { Game } from "../js/components/Game.js";

const grid = document.querySelector(".grid");
let tiles;

const possibleMovements = ["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"];

let direction = "left";
let inputs = [];

let currPos = [
  [24, 25, 26],
  [31, 32, 33],
  [38, 39, 40],
];

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

const board = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0],
];

const game = new Game(board);
renderMap();

function init() {}

function renderMap() {
  game.board.forEach((row) => {
    row.forEach((tile) => {
      const tileEl = document.createElement("div");
      // tile === 1
      //   ? tileEl.setAttribute("class", "tile")
      //   : tileEl.setAttribute("class", "tile edge");
      // grid.appendChild(tileEl);
      tileEl.setAttribute("class", tile.className);

      // switch (tile.value) {
      //   case 0:
      //     tileEl.setAttribute("class", "tile edge");
      //     break;
      //   case 1:
      //     tileEl.setAttribute("class", "tile");
      //     break;
      //   case 2:
      //     tileEl.setAttribute("class", "tile small-pill");
      //     break;
      // }
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
      break;
  }
}

window.addEventListener("keydown", ({ key }) => {
  if (!possibleMovements.includes(key)) {
    return;
  }

  game.setInputs(key.replace("Arrow", "").toLowerCase());

  console.log(game.player);

  if (!game.player.direction) {
    console.log("hit");
    game.player.direction = key.replace("Arrow", "").toLowerCase();
  }

  // switch (key) {
  //   case "ArrowUp":
  //     inputs.push("up");
  //     break;
  //   case "ArrowRight":
  //     inputs.push("right");
  //     break;
  //   case "ArrowDown":
  //     inputs.push("down");
  //     break;
  //   case "ArrowLeft":
  //     inputs.push("left");
  //     break;
  // }
});

// function step() {
// const dir = inputs.shift() || direction;
// const nextPos = getNextPos(dir);

// direction = dir;

// if (isWall(nextPos, direction)) {
//   renderPos();
//   throw Error("You hit a wall");
// }

// unRenderPos();
// currPos = nextPos;
// renderPos();
// }

// function isWall(pos, dir) {
//   let row = [];
//   let col = [];

//   switch (dir) {
//     case "up":
//       row = pos[0].map((tileNo) => Math.floor(tileNo / board[0].length));
//       col = pos[0].map((tileNo) => tileNo % board[0].length);
//       break;
//     case "down":
//       row = pos[2].map((tileNo) => Math.floor(tileNo / board[0].length));
//       col = pos[2].map((tileNo) => tileNo % board[0].length);
//       break;
//     case "left":
//       row.push(
//         Math.floor(pos[0][0] / board[0].length),
//         Math.floor(pos[1][0] / board[0].length),
//         Math.floor(pos[2][0] / board[0].length)
//       );
//       col.push(
//         pos[0][0] % board[0].length,
//         pos[1][0] % board[0].length,
//         pos[2][0] % board[0].length
//       );
//       break;
//     case "right":
//       row.push(
//         Math.floor(pos[0][2] / board[0].length),
//         Math.floor(pos[1][2] / board[0].length),
//         Math.floor(pos[2][2] / board[0].length)
//       );
//       col.push(
//         pos[0][2] % board[0].length,
//         pos[1][2] % board[0].length,
//         pos[2][2] % board[0].length
//       );
//       break;
//   }

//   for (let i = 0; i < row.length; i += 1) {
//     if (!board[row[i]][col[i]]) {
//       return true;
//     }
//   }

//   return false;
// }

// function getNextPos(dir) {
//   let nextPos = [];

//   switch (dir) {
//     case "up":
//       nextPos = currPos.map((row) =>
//         row.map((tileNo) => tileNo - board[0].length)
//       );
//       break;
//     case "down":
//       nextPos = currPos.map((row) =>
//         row.map((tileNo) => tileNo + board[0].length)
//       );
//       break;
//     case "left":
//       nextPos = currPos.map((row) => row.map((tileNo) => tileNo - 1));
//       break;
//     case "right":
//       nextPos = currPos.map((row) => row.map((tileNo) => tileNo + 1));
//       break;
//   }

//   return nextPos;
// }

function unRenderPos(character) {
  character.currPos.forEach((pos) => {
    tiles[pos[0]].setAttribute("class", "tile");
    tiles[pos[1]].setAttribute("class", "tile");
    tiles[pos[2]].setAttribute("class", "tile");
  });

  switch (character.direction) {
    case "up":
      tiles[character.currPos[2][0]].setAttribute(
        "class",
        game.board[Math.floor(character.currPos[2][0] / game.board[0].length)][
          character.currPos[2][0] % game.board[0].length
        ]
      );
      tiles[character.currPos[2][1]].setAttribute(
        "class",
        game.board[Math.floor(character.currPos[2][1] / game.board[0].length)][
          character.currPos[2][1] % game.board[0].length
        ]
      );
      tiles[character.currPos[2][2]].setAttribute(
        "class",
        game.board[Math.floor(character.currPos[2][2] / game.board[0].length)][
          character.currPos[2][2] % game.board[0].length
        ]
      );
      break;
    case "down":
      tiles[character.currPos[0][0]].setAttribute(
        "class",
        game.board[Math.floor(character.currPos[0][0] / game.board[0].length)][
          character.currPos[0][0] % game.board[0].length
        ]
      );
      tiles[character.currPos[0][1]].setAttribute(
        "class",
        game.board[Math.floor(character.currPos[0][1] / game.board[0].length)][
          character.currPos[0][1] % game.board[0].length
        ]
      );
      tiles[character.currPos[0][2]].setAttribute(
        "class",
        game.board[Math.floor(character.currPos[0][2] / game.board[0].length)][
          character.currPos[0][2] % game.board[0].length
        ]
      );
      break;
    case "left":
      tiles[character.currPos[0][2]].setAttribute(
        "class",
        game.board[Math.floor(character.currPos[0][2] / game.board[0].length)][
          character.currPos[0][2] % game.board[0].length
        ]
      );
      tiles[character.currPos[1][2]].setAttribute(
        "class",
        game.board[Math.floor(character.currPos[1][2] / game.board[0].length)][
          character.currPos[1][2] % game.board[0].length
        ]
      );
      tiles[character.currPos[2][2]].setAttribute(
        "class",
        game.board[Math.floor(character.currPos[2][2] / game.board[0].length)][
          character.currPos[2][2] % game.board[0].length
        ]
      );
      break;
    case "right":
      tiles[character.currPos[0][0]].setAttribute(
        "class",
        game.board[Math.floor(character.currPos[0][0] / game.board[0].length)][
          character.currPos[0][0] % game.board[0].length
        ]
      );
      tiles[character.currPos[1][0]].setAttribute(
        "class",
        game.board[Math.floor(character.currPos[1][0] / game.board[0].length)][
          character.currPos[1][0] % game.board[0].length
        ]
      );
      tiles[character.currPos[2][0]].setAttribute(
        "class",
        game.board[Math.floor(character.currPos[2][0] / game.board[0].length)][
          character.currPos[2][0] % game.board[0].length
        ]
      );
      break;
    default:
      break;
  }
}

setInterval(() => {
  unRenderPos(game.player);
  game.movePlayer();
  // unRenderPos();
  renderPos();
  // step();
}, 100);
