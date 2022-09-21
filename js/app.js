import { board } from "../data/board.js";
import { Game } from "./models/Game.js";
import { renderStartScreen, deRenderStartScreen } from "./startScreen.js";

const gameContainer = document.getElementById("game-container");
const grid = document.getElementById("game");
const startScreen = document.getElementById("start-screen");
const endScreen = document.getElementById("end-screen");
const remainingLives = document.querySelector(".remaining-lives");

const scoreOnGame = document.querySelector("#game-container > .score");
const highScoreOnGame = document.querySelector(
  "#game-container > .highest-score"
);

const startAudio = new Audio("../assets/audio/pacman_beginning.wav");
const ghostEatAudio = new Audio("../assets/audio/pacman_killghost.m4r");
const deathAudio = new Audio("../assets/audio/pacman_death.wav");

startAudio.volume = 0.1;
ghostEatAudio.volume = 0.1;
deathAudio.volume = 0.1;

ghostEatAudio.addEventListener("timeupdate", ({ target }) => {
  let buffer = 0.4;
  if (target.currentTime > target.duration - buffer) {
    target.currentTime = 0.1;
    target.play();
  }
});

let controlsModal;
let highScoreModal;
let startScreenPos;
let tiles;
let playInterval;
let left, middle, right;
let highScoreInp;
let currPos = 0;
const highScoreList = [
  ["ALX", 5000],
  ["BEN", 5000],
  ["DAV", 5000],
  ["HUN", 5000],
  ["IAN", 5000],
  ["JOE", 5000],
];

const startScreenGridRowCont = ["35 / 38", "40 / 43", "47 / 50"];
let startScreenGridRowPos = 0;

let possibleMovements = ["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"];

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

const edgeCornerNames = [
  "tile edge-top-left",
  "tile edge-top-right",
  "tile edge-bottom-left",
  "tile edge-bottom-right",
];

// Event Listeners
startAudio.addEventListener("playing", () => {
  possibleMovements = [];
});

startAudio.addEventListener("ended", () => {
  possibleMovements = ["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"];
  game.player.direction = "left";
});

window.addEventListener("keydown", handleKeyDown);

let game;

init();

function init() {
  gameContainer.style.display = "none";
  endScreen.style.display = "none";
  renderStartScreen(startScreen, highScoreList);
  startScreenPos = document.getElementById("pacman-controller");
  controlsModal = new bootstrap.Modal(
    document.getElementById("controls-modal")
  );
  highScoreModal = new bootstrap.Modal(
    document.getElementById("high-score-modal")
  );
}

function renderMap() {
  gameContainer.style.display = "grid";
  game.board.forEach((row) => {
    row.forEach((tile) => {
      const tileEl = document.createElement("div");

      tileEl.setAttribute("class", tile.className);
      grid.appendChild(tileEl);
    });
  });

  tiles = document.querySelectorAll(".tile");
  renderPos();
  renderRemainingLives(game.livesLeft);
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

function startPlayInterval() {
  playInterval = setInterval(() => {
    scoreOnGame.textContent = `1UP ${game.points}`;
    highScoreOnGame.textContent =
      game.points > highScoreList[0][1]
        ? `HIGH SCORE ${game.points}`
        : `HIGH SCORE ${highScoreList[0][1]}`;
    if (game.livesLeft < 0) {
      clearInterval(playInterval);
      return;
    }

    if (game.player.isDead) {
      return;
    }

    if (game.winner) {
      grid.innerHTML = "";
      game = new Game(board, game.livesLeft, game.points);
      renderMap();
      startAudio.play();

      return;
    }

    if (
      game.isGhostTouching(tiles[game.player.currPos[1][1]]) &&
      !game.pillTimer
    ) {
      onDeath();
      return;
    }

    if (!game.player.direction) {
      renderPos();
      renderGhost(game.ghosts);
      return;
    }

    if (game.pillTimer) {
      game.setPillTimer(-1);
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
}

// on Key Down functions
function handleKeyDown({ key }) {
  if (!possibleMovements.includes(key)) {
    return;
  }

  // Start Screen Controls
  if (startScreen.style.display === "grid") {
    handleKeyDownOnStartScreen(key);

    return;
  }

  if (endScreen.style.display === "grid") {
    handleKeyDownOnEndScreen(key);

    return;
  }

  game.setInputs(key.replace("Arrow", "").toLowerCase());

  if (!game.player.direction) {
    game.player.direction = key.replace("Arrow", "").toLowerCase();
  }
}

function handleKeyDownOnStartScreen(key) {
  controlsModal.hide();
  highScoreModal.hide();

  if (key === "ArrowRight" && startScreenGridRowPos === 0) {
    deRenderStartScreen(startScreen);
    gameContainer.style.display = "grid";
    game = new Game(board, 2);
    renderMap();
    startAudio.play();
    startPlayInterval();
    return;
  }

  if (key === "ArrowRight" && startScreenGridRowPos === 1) {
    controlsModal.show();
  }

  if (key === "ArrowRight" && startScreenGridRowPos === 2) {
    highScoreModal.show();
  }

  if (key === "ArrowUp") {
    startScreenGridRowPos -= 1;
  } else if (key === "ArrowDown") {
    startScreenGridRowPos += 1;
  }

  switch (startScreenGridRowPos) {
    case -1:
      startScreenGridRowPos = 0;
      break;
    case 3:
      startScreenGridRowPos = 2;
      break;
    default:
      startScreenPos.style.gridRow =
        startScreenGridRowCont[startScreenGridRowPos];
      break;
  }
}

function handleKeyDownOnEndScreen(key) {
  if (key === "ArrowUp") {
    let char = highScoreInp[currPos].textContent.charCodeAt(0);
    if (char === 65) {
      highScoreInp[currPos].textContent = "Z";
    } else {
      highScoreInp[currPos].textContent = String.fromCharCode(char - 1);
    }
  } else if (key === "ArrowDown") {
    let char = highScoreInp[currPos].textContent.charCodeAt(0);
    if (char === 90) {
      highScoreInp[currPos].textContent = "A";
    } else {
      highScoreInp[currPos].textContent = String.fromCharCode(char + 1);
    }
  } else if (key === "ArrowRight") {
    highScoreInp[currPos].style.animation = "none";
    highScoreInp[currPos].style.animation = "gold";
    currPos += 1;
    if (currPos <= 2) {
      highScoreInp[currPos].style.animation = "1s flashing-letter infinite";
    }

    if (currPos > 2) {
      currPos = 0;
      highScoreList.push([
        highScoreInp[0].textContent +
          highScoreInp[1].textContent +
          highScoreInp[2].textContent,
        game.points,
      ]);
      highScoreList.sort((a, b) => {
        if (a[1] > b[1]) {
          return -1;
        } else {
          return 1;
        }
      });
      renderStartScreen(startScreen, highScoreList);
      startScreenPos = document.getElementById("pacman-controller");
      highScoreModal = new bootstrap.Modal(
        document.getElementById("high-score-modal")
      );
    }
  }
}

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
  let canBeEaten;

  if (game.pillTimer) {
    ghostEatAudio.play();
    if (game.pillTimer < 10) {
      canBeEaten = "killable-blue";
    } else if (game.pillTimer < 20) {
      canBeEaten = "killable-white";
    } else if (game.pillTimer < 30) {
      canBeEaten = "killable-blue";
    } else if (game.pillTimer < 40) {
      canBeEaten = "killable-white";
    } else if (game.pillTimer < 50) {
      canBeEaten = "killable-blue";
    } else if (game.pillTimer <= 60) {
      canBeEaten = "killable-white";
    } else {
      canBeEaten = "killable-blue";
    }
  } else {
    ghostEatAudio.pause();
  }

  ghosts.forEach((ghost) => {
    ghost.currPos.forEach((pos, i) => {
      tiles[pos[1]].setAttribute(
        "class",
        `tile ${ghost.name} ${ghostLayout[i][1]} ${canBeEaten}`
      );
      tiles[pos[0]].setAttribute(
        "class",
        `tile ${ghost.name} ${ghostLayout[i][0]} ${canBeEaten}`
      );
      tiles[pos[2]].setAttribute(
        "class",
        `tile ${ghost.name} ${ghostLayout[i][2]} ${canBeEaten}`
      );
    });
  });
}

let count = 0;

function renderEndScreen(endScreen, points, highestScore) {
  endScreen.style.display = "grid";
  endScreen.innerHTML = `<span class="score">1UP ${points}</span>
  <span class="highest-score">HIGH SCORE ${highestScore}</span>
  <span id="header-end"> CHARACTER / NICKNAME</span>

  <div id="blinky-end">
    <div class="blinky bloop-top-left"></div>
    <div class="blinky bloop-top-center"></div>
    <div class="blinky bloop-top-right"></div>
    <div class="blinky bloop-middle-left"></div>
    <div class="blinky bloop-middle-center"></div>
    <div class="blinky bloop-middle-right"></div>
    <div class="blinky bloop-bottom-left"></div>
    <div class="blinky bloop-bottom-center"></div>
    <div class="blinky bloop-bottom-right"></div>
  </div>

  <div id="pinky-end">
    <div class="pinky bloop-top-left"></div>
    <div class="pinky bloop-top-center"></div>
    <div class="pinky bloop-top-right"></div>
    <div class="pinky bloop-middle-left"></div>
    <div class="pinky bloop-middle-center"></div>
    <div class="pinky bloop-middle-right"></div>
    <div class="pinky bloop-bottom-left"></div>
    <div class="pinky bloop-bottom-center"></div>
    <div class="pinky bloop-bottom-right"></div>
  </div>

  <div id="inky-end">
    <div class="inky bloop-top-left"></div>
    <div class="inky bloop-top-center"></div>
    <div class="inky bloop-top-right"></div>
    <div class="inky bloop-middle-left"></div>
    <div class="inky bloop-middle-center"></div>
    <div class="inky bloop-middle-right"></div>
    <div class="inky bloop-bottom-left"></div>
    <div class="inky bloop-bottom-center"></div>
    <div class="inky bloop-bottom-right"></div>
  </div>

  <div id="clyde-end">
    <div class="clyde bloop-top-left"></div>
    <div class="clyde bloop-top-center"></div>
    <div class="clyde bloop-top-right"></div>
    <div class="clyde bloop-middle-left"></div>
    <div class="clyde bloop-middle-center"></div>
    <div class="clyde bloop-middle-right"></div>
    <div class="clyde bloop-bottom-left"></div>
    <div class="clyde bloop-bottom-center"></div>
    <div class="clyde bloop-bottom-right"></div>
  </div>

  <span id="blinky-real-name">-SHADOW</span>
  <span id="pinky-real-name">-SPEEDY</span>
  <span id="inky-real-name">-BASHFUL</span>
  <span id="clyde-real-name">-COOKIE</span>

  <span id="blinky-nickname">"BLINKY"</span>
  <span id="pinky-nickname">"PINKY"</span>
  <span id="inky-nickname">"INKY"</span>
  <span id="clyde-nickname">"CLYDE"</span>

  <span id="first">A</span>
  <span id="second">A</span>
  <span id="third">A</span>
  <span id="enter-score">ENTER YOUR NAME</span>
  <span id="copyright">&#169 2022 DAMIAN BZDYRA</span>
  <span id="remaining-credits">CREDITS 0</span>`;
}

function renderRemainingLives(lives) {
  remainingLives.innerHTML = "";

  for (let i = 1; i <= lives; i += 1) {
    const life = document.createElement("div");

    life.style.display = "grid";
    life.style.gridRow = " 1 / 3";
    life.style.gridTemplateColumns = "repeat(3, 8px)";
    life.style.marginLeft = "8px";
    life.innerHTML = `<div class="half-bottom-right dir-left"></div>
    <div class="bottom-center dir-left"></div>
    <div class="bottom-left dir-left"></div>
    <div class="half-middle-right dir-left"></div>
    <div class="half-middle-center dir-left"></div>
    <div class="middle-left dir-left"></div>
    <div class="half-top-right dir-left"></div>
    <div class="top-center dir-left"></div>
    <div class="top-left dir-left"></div>
    `;

    remainingLives.appendChild(life);
  }
}

function onDeath() {
  game.player.isDead = true;
  game.changeLivesLeft(-1);
  renderRemainingLives(game.livesLeft);

  game.ghostsEaten = [];
  game.ghosts.forEach((ghost) => {
    unRenderPos(ghost);
    game.ghostsEaten.push(ghost.name);
  });

  renderPos(game.player);
  game.ghosts = [];
  game.ghostsEaten.forEach((ghostEaten) => {
    game.respawnGhost(ghostEaten);
  });
  game.ghostsEaten = [];
  deathAudio.play();

  tiles.forEach((tile) => {
    if (edgeCornerNames.includes(tile.classList.value)) {
      tile.style.animation = ".5s on-death-corners infinite";
    } else if (tile.classList.value === "tile edge-top") {
      tile.style.animation = ".5s on-death-horiz infinite";
    } else if (tile.classList.value === "tile edge-middle") {
      tile.style.animation = ".5s on-death-vert infinite";
    }
  });

  setTimeout(() => {
    unRenderPos(game.player);
  }, 2000);

  setTimeout(() => {
    if (game.livesLeft < 0) {
      gameContainer.style.display = "none";
      grid.innerHTML = "";
      clearInterval(playInterval);

      let topScore =
        game.points > highScoreList[0][1] ? game.points : highScoreList[0][1];

      renderEndScreen(endScreen, game.points, topScore);
      left = document.getElementById("first");
      middle = document.getElementById("second");
      right = document.getElementById("third");
      highScoreInp = [left, middle, right];
      return;
    }

    game.respawnPlayer();
    game.inputs = [];
    renderGhost(game.ghosts);
    renderPos(game.player);
    tiles.forEach((tile) => {
      if (edgeCornerNames.includes(tile.classList.value)) {
        tile.style.animation = "";
      } else if (tile.classList.value === "tile edge-top") {
        tile.style.animation = "";
      } else if (tile.classList.value === "tile edge-middle") {
        tile.style.animation = "";
      }
    });
    startAudio.play();
    game.player.isDead = false;
  }, 3000);
}
