import { board } from "../data/board.js";
import { Game } from "./models/Game.js";
import {
  renderStartScreen,
  deRenderStartScreen,
  startScreenGridRowCont,
} from "./renders/startScreen.js";
import { renderEndScreen, deRenderEndScreen } from "./renders/endScreen.js";
import {
  renderMap,
  renderRemainingLives,
  renderPos,
  unRenderPos,
  renderGhost,
  renderTilesFlashing,
  stopTilesFlashing,
} from "./renders/gameScreen.js";
import { startAudio, ghostEatAudio, deathAudio } from "./renders/audio.js";

/* ------------------- Cached Elements References-------------------*/
const gameContainer = document.getElementById("game-container");
const grid = document.getElementById("game");
const startScreen = document.getElementById("start-screen");
const endScreen = document.getElementById("end-screen");
const remainingLives = document.querySelector(".remaining-lives");
const scoreOnGame = document.querySelector("#game-container > .score");
const highScoreOnGame = document.querySelector(
  "#game-container > .highest-score"
);

/* ------------------- DOM Element Variables -------------------*/
let controlsModal;
let highScoreModal;
let startScreenPos;
let tiles;
let left, middle, right;
let highScoreInp;

/* ------------------- Variables -------------------*/
let game;
let playInterval;
let count = 0;
let currPos = 0;
let startScreenGridRowPos = 0;
let possibleMovements = ["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"];
const highScoreList = [
  ["ALX", 5000],
  ["BEN", 5000],
  ["DAV", 5000],
  ["HUN", 5000],
  ["IAN", 5000],
  ["JOE", 5000],
];

/* ------------------- Audio Elements -------------------*/
startAudio.volume = 0.1;
ghostEatAudio.volume = 0.1;
deathAudio.volume = 0.1;

/* ------------------- Event Listeners -------------------*/
window.addEventListener("keydown", handleKeyDown);

startAudio.addEventListener("playing", () => {
  possibleMovements = [];
});

startAudio.addEventListener("ended", () => {
  possibleMovements = ["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"];
  game.player.direction = "left";
});

ghostEatAudio.addEventListener("timeupdate", ({ target }) => {
  let buffer = 0.4;
  if (target.currentTime > target.duration - buffer) {
    target.currentTime = 0.1;
    target.play();
  }
});

/* ------------------- Event Listener Functions -------------------*/
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
    game = new Game(board, 2);
    renderMap(gameContainer, grid, game.board);
    tiles = document.querySelectorAll(".tile");
    renderRemainingLives(remainingLives, game.livesLeft);
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
  let char;
  switch (key) {
    case "ArrowUp":
      char = highScoreInp[currPos].textContent.charCodeAt(0);
      if (char === 65) {
        highScoreInp[currPos].textContent = "Z";
      } else {
        highScoreInp[currPos].textContent = String.fromCharCode(char - 1);
      }
      break;
    case "ArrowDown":
      char = highScoreInp[currPos].textContent.charCodeAt(0);
      if (char === 90) {
        highScoreInp[currPos].textContent = "A";
      } else {
        highScoreInp[currPos].textContent = String.fromCharCode(char + 1);
      }
      break;
    case "ArrowRight":
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
        deRenderEndScreen(endScreen);
      }
      break;
    default:
      break;
  }
}

/**
 * Initializes Game. Renders start screen and caches start screen
 * element references
 */
function init() {
  gameContainer.style.display = "none";
  deRenderEndScreen(endScreen);
  renderStartScreen(startScreen, highScoreList);

  startScreenPos = document.getElementById("pacman-controller");
  controlsModal = new bootstrap.Modal(
    document.getElementById("controls-modal")
  );
  highScoreModal = new bootstrap.Modal(
    document.getElementById("high-score-modal")
  );
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
      renderMap(gameContainer, grid, game.board);
      renderRemainingLives(remainingLives, game.livesLeft);
      tiles = document.querySelectorAll(".tile");
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
      renderPos(game.player.direction, game.player.currPos, tiles);
      renderGhost(game.ghosts, game.pillTimer, tiles);
      return;
    }

    if (game.pillTimer) {
      game.setPillTimer(-1);
    }

    if (count === 3) {
      unRenderPos(game.player, tiles, game.board);
      game.movePlayer();
      game.ghosts.forEach((ghost) => {
        unRenderPos(ghost, tiles, game.board);
        game.moveGhost(ghost);
      });
      count = 0;
    } else {
      count += 1;
    }

    renderPos(game.player.direction, game.player.currPos, tiles);
    renderGhost(game.ghosts, game.pillTimer, tiles);
  }, 1000 / 60);
}

function onDeath() {
  game.player.isDead = true;
  game.changeLivesLeft(-1);
  renderRemainingLives(remainingLives, game.livesLeft);

  game.ghostsEaten = [];
  game.ghosts.forEach((ghost) => {
    unRenderPos(ghost, tiles, game.board);
    game.ghostsEaten.push(ghost.name);
  });

  renderPos(game.player.direction, game.player.currPos, tiles);
  game.ghosts = [];
  game.ghostsEaten.forEach((ghostEaten) => {
    game.respawnGhost(ghostEaten);
  });
  game.ghostsEaten = [];
  deathAudio.play();

  renderTilesFlashing(tiles);

  setTimeout(() => {
    unRenderPos(game.player, tiles, game.board);
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
    renderGhost(game.ghosts, game.pillTimer, tiles);
    renderPos(game.player.direction, game.player.currPos, tiles);
    stopTilesFlashing(tiles);
    startAudio.play();
    game.player.isDead = false;
  }, 3000);
}

init();
