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
  console.log(nextPos);

  // direction = dir;

  // if (isWall(nextPos)) {
  //   throw Error("You hit a wall");
  // }
  // currPos = nextPos;

  renderPos();
}

function isWall(pos) {
  const rowNum = Math.floor(pos / board[0].length);
  const colNum = pos % board[0].length;

  if (!board[rowNum][colNum]) {
    return true;
  }

  return false;
}

function getNextPos(direction) {
  let nextPos = [];

  switch (direction) {
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

setInterval(() => {
  step();
}, 500);
