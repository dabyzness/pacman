// import { board } from "../data/board.js";

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

let pacmanLayout = [
  ["top-left", "top-center", "top-right"],
  ["middle-left", "middle-center", "middle-right"],
  ["bottom-left", "bottom-center", "bottom-right"],
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

renderMap();

function init() {}

function renderMap() {
  board.forEach((row) => {
    row.forEach((tile) => {
      const tileEl = document.createElement("div");
      // tile === 1
      //   ? tileEl.setAttribute("class", "tile")
      //   : tileEl.setAttribute("class", "tile edge");
      // grid.appendChild(tileEl);

      switch (tile) {
        case 0:
          tileEl.setAttribute("class", "tile edge");
          break;
        case 1:
          tileEl.setAttribute("class", "tile");
          break;
        case 2:
          tileEl.setAttribute("class", "tile small-pill");
          break;
      }
      grid.appendChild(tileEl);
    });
  });

  tiles = document.querySelectorAll(".tile");
  renderPos();
}

function renderPos() {
  currPos.forEach((pos, i) => {
    tiles[pos[0]].classList.add(`${pacmanLayout[i][0]}`);
    tiles[pos[1]].classList.add(`${pacmanLayout[i][1]}`);
    tiles[pos[2]].classList.add(`${pacmanLayout[i][2]}`);
  });
}

window.addEventListener("keydown", ({ key }) => {
  if (!possibleMovements.includes(key)) {
    return;
  }

  switch (key) {
    case "ArrowUp":
      inputs.push("up");
      break;
    case "ArrowRight":
      inputs.push("right");
      break;
    case "ArrowDown":
      inputs.push("down");
      break;
    case "ArrowLeft":
      inputs.push("left");
      break;
  }
});

function step() {
  const dir = inputs.shift() || direction;
  const nextPos = getNextPos(dir);

  direction = dir;

  if (isWall(nextPos, direction)) {
    throw Error("You hit a wall");
  }

  unRenderPos();
  currPos = nextPos;
  renderPos();
}

function isWall(pos, dir) {
  let row = [];
  let col = [];

  switch (dir) {
    case "up":
      row = pos[0].map((tileNo) => Math.floor(tileNo / board[0].length));
      col = pos[0].map((tileNo) => tileNo % board[0].length);
      break;
    case "down":
      row = pos[2].map((tileNo) => Math.floor(tileNo / board[0].length));
      col = pos[2].map((tileNo) => tileNo % board[0].length);
      break;
    case "left":
      row.push(
        Math.floor(pos[0][0] / board[0].length),
        Math.floor(pos[1][0] / board[0].length),
        Math.floor(pos[2][0] / board[0].length)
      );
      col.push(
        pos[0][0] % board[0].length,
        pos[1][0] % board[0].length,
        pos[2][0] % board[0].length
      );
      break;
    case "right":
      row.push(
        Math.floor(pos[0][2] / board[0].length),
        Math.floor(pos[1][2] / board[0].length),
        Math.floor(pos[2][2] / board[0].length)
      );
      col.push(
        pos[0][2] % board[0].length,
        pos[1][2] % board[0].length,
        pos[2][2] % board[0].length
      );
      break;
  }

  for (let i = 0; i < row.length; i += 1) {
    if (!board[row[i]][col[i]]) {
      return true;
    }
  }

  return false;
}

function getNextPos(dir) {
  let nextPos = [];

  switch (dir) {
    case "up":
      nextPos = currPos.map((row) =>
        row.map((tileNo) => tileNo - board[0].length)
      );
      break;
    case "down":
      nextPos = currPos.map((row) =>
        row.map((tileNo) => tileNo + board[0].length)
      );
      break;
    case "left":
      nextPos = currPos.map((row) => row.map((tileNo) => tileNo - 1));
      break;
    case "right":
      nextPos = currPos.map((row) => row.map((tileNo) => tileNo + 1));
      break;
  }

  return nextPos;
}

function unRenderPos() {
  currPos.forEach((pos, i) => {
    tiles[pos[0]].classList.remove(`${pacmanLayout[i][0]}`);
    tiles[pos[1]].classList.remove(`${pacmanLayout[i][1]}`);
    tiles[pos[2]].classList.remove(`${pacmanLayout[i][2]}`);
  });
}

setInterval(() => {
  step();
}, 500);
