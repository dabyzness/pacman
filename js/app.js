import { board } from "../data/board.js";
import { Game } from "./models/Game.js";

const grid = document.getElementById("game");
const startScreen = document.getElementById("start-screen");
const endScreen = document.getElementById("end-screen");
// const introEndAudio = document.createElement("audio");
// introEndAudio.src = "../assets/audio/pacman_intermission.wav";
// introEndAudio.setAttribute("loop", true);

const startAudio = document.getElementById("gameStart");
const ghostEatAudio = new Audio("../assets/audio/pacman_killghost.m4r");
const deathAudio = new Audio("../assets/audio/pacman_death.wav");

// ghostEatAudio.play();

// wakkawakka.loop = "true";
// wakkawakka.playbackRate = 2;

// const siren = new Audio("../assets/audio/pacman_siren.mp3");
ghostEatAudio.addEventListener("timeupdate", ({ target }) => {
  var buffer = 0.4;
  if (target.currentTime > target.duration - buffer) {
    target.currentTime = 0.1;
    target.play();
  }
});

// startAudio.setAttribute("preload", "metadata");
// startAudio.src = "../assets/audio/pacman_beginning.wav";

// startAudio.setAttribute("loop", "true");
// startAudio.play();
let prevPoints = 0;
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

startAudio.addEventListener("playing", () => {
  possibleMovements = [];
});

startAudio.addEventListener("ended", () => {
  console.log("MY BIG FAT TITTIES");
  possibleMovements = ["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"];
  game.player.direction = "left";
});

let game;

init();

function init() {
  renderStartScreen(startScreen);
  startScreenPos = document.getElementById("pacman-controller");
  // introEndAudio.play();
}

function renderStartScreen(startScreen) {
  grid.style.display = "none";
  endScreen.style.display = "none";
  startScreen.style.display = "grid";

  startScreen.innerHTML = `<img src="./assets/svg/Pac-Man.svg" alt="" />

  <div id="big-pill" class="big-pill"></div>

  <div id="pacman">
    <div class="bottom-right dir-left"></div>
    <div class="bottom-center dir-left"></div>
    <div class="bottom-left dir-left"></div>
    <div class="middle-right dir-left"></div>
    <div class="middle-center dir-left"></div>
    <div class="middle-left dir-left"></div>
    <div class="top-right dir-left"></div>
    <div class="top-center dir-left"></div>
    <div class="top-left dir-left"></div>
  </div>

  <div id="blinky-start">
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

  <div id="pinky-start">
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

  <div id="inky-start">
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

  <div id="clyde-start">
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

  <div id="pacman-controller">
    <div class="top-left"></div>
    <div class="top-center"></div>
    <div class="top-right"></div>
    <div class="middle-left"></div>
    <div class="middle-center"></div>
    <div class="middle-right"></div>
    <div class="bottom-left"></div>
    <div class="bottom-center"></div>
    <div class="bottom-right"></div>
  </div>

  <div id="start">START</div>
  <div id="controls">CONTROLS</div>
  <div id="high-scores">HIGH SCORES</div>`;
}

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

function startPlayInterval() {
  playInterval = setInterval(() => {
    if (game.livesLeft < 0) {
      clearInterval(playInterval);
      return;
    }

    if (game.player.isDead) {
      return;
    }

    if (game.winner) {
      grid.innerHTML = "";
      game = new Game(board, game.livesLeft);
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

window.addEventListener("keydown", ({ key }) => {
  if (!possibleMovements.includes(key)) {
    return;
  }

  // Start Screen Controls
  if (startScreen.style.display === "grid") {
    if (key === "ArrowRight" && startScreenGridRowPos === 0) {
      startScreen.innerHTML = "";
      startScreen.style.display = "none";
      grid.style.display = "grid";
      // Request Animation Frame --> Scroll Over YADDA YADDA
      // SetTimeout for length of animation frame;
      // At Timeout START GAME
      game = new Game(board, 2);
      renderMap();
      startAudio.play();
      startPlayInterval();
      return;
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

    return;
  }

  if (endScreen.style.display === "grid") {
    if (key === "ArrowUp") {
      let char = highScoreInp[currPos].textContent.charCodeAt(0);
      if (char === 65) {
        highScoreInp[currPos].textContent = "Z";
      } else {
        highScoreInp[currPos].textContent = String.fromCharCode(char - 1);
      }
    } else if (key === "ArrowDown") {
      let char = highScoreInp[currPos].textContent.charCodeAt(0);
      if (char === 91) {
        highScoreInp[currPos].textContent = "A";
      } else {
        highScoreInp[currPos].textContent = String.fromCharCode(char + 1);
      }
    } else if (key === "ArrowRight") {
      currPos += 1;
      if (currPos > 2) {
        currPos = 0;
        renderStartScreen(startScreen);
        highScoreList.push([
          highScoreInp[0].textContent +
            highScoreInp[1].textContent +
            highScoreInp[2].textContent,
          game.points,
        ]);
        startScreenPos = document.getElementById("pacman-controller");
      }
    }
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

// SET INTERVAL VERY NECESSARY FOR GAMEPLAY;

// const play = setInterval(() => {
//   console.log("SHAPOOPY");

//   if (game.winner) {
//     return;
//   }

//   if (
//     game.isGhostTouching(tiles[game.player.currPos[1][1]]) &&
//     !game.pillTimer
//   ) {
//     onDeath();
//     return;
//   }

//   if (!game.player.direction) {
//     renderPos();
//     renderGhost(game.ghosts);
//     return;
//   }

//   if (game.pillTimer) {
//     game.setPillTimer(-1);
//   }

//   if (count === 3) {
//     unRenderPos(game.player);
//     game.movePlayer();
//     game.ghosts.forEach((ghost) => {
//       unRenderPos(ghost);
//       game.moveGhost(ghost);
//     });
//     count = 0;
//   } else {
//     count += 1;
//   }

//   renderPos();
//   renderGhost(game.ghosts);
// }, 1000 / 60);

function renderEndScreen(endScreen, points, highestScore) {
  endScreen.style.display = "grid";
  endScreen.innerHTML = `<span id="final-score">1UP ${points}</span>
  <span id="highest-score">HIGH SCORE ${highestScore}</span>
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

function onDeath() {
  game.player.isDead = true;
  game.changeLivesLeft(-1);

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
      grid.style.display = "none";
      grid.innerHTML = "";
      clearInterval(playInterval);

      let highestScore = game.points;
      if (highScoreList.length) {
        highestScore = highScoreList[0][1];
      }

      renderEndScreen(endScreen, game.points, highestScore);
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
