import {
  pacmanLayoutDown,
  pacmanLayoutLeft,
  pacmanLayoutRight,
  pacmanLayoutUp,
  ghostLayout,
  edgeCornerNames,
} from "./layouts.js";
import { ghostEatAudio } from "./audio.js";

function renderMap(gameContainerEl, gridEl, board) {
  gameContainerEl.style.display = "grid";

  board.forEach((row) => {
    row.forEach((tile) => {
      const tileEl = document.createElement("div");

      tileEl.setAttribute("class", tile.className);
      gridEl.appendChild(tileEl);
    });
  });
}

function renderRemainingLives(remainingLivesEl, lives) {
  remainingLivesEl.innerHTML = "";

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

    remainingLivesEl.appendChild(life);
  }
}

function renderPos(direction, currPos, tilesEl) {
  console.log(currPos);
  tilesEl[currPos].classList.add("puckman");
  switch (direction) {
    case "up":
      tilesEl[currPos].style.transform = "rotate(270deg) scale(300%)";
      break;
    case "down":
      tilesEl[currPos].style.transform = "rotate(90deg) scale(300%)";
      break;
    case "left":
      tilesEl[currPos].style.transform = "rotate(180deg) scale(300%)";
      break;
    case "right":
      tilesEl[currPos].style.transform = "rotate(0deg) scale(300%)";
      break;
    default:
      // currPos.forEach((pos, i) => {
      //   tilesEl[pos[1]].setAttribute("class", `tile ${pacmanLayoutLeft[i][1]}`);
      //   tilesEl[pos[0]].setAttribute("class", `tile ${pacmanLayoutLeft[i][0]}`);
      //   tilesEl[pos[2]].setAttribute("class", `tile ${pacmanLayoutLeft[i][2]}`);

      //   tilesEl[pos[1]].style.animationName = "none";
      //   tilesEl[pos[0]].style.animationName = "none";
      //   tilesEl[pos[2]].style.animationName = "none";
      // });

      break;
  }
}

function unRenderPos(character, tilesEl, board) {
  tilesEl[character.currPos].setAttribute(
    "class",
    board[Math.floor(character.currPos / board[0].length)][
      character.currPos % board[0].length
    ].className
  );

  // character.currPos.forEach((row, i) => {
  //   row.forEach((tileNo, i) => {
  //     tilesEl[tileNo].setAttribute(
  //       "class",
  //       board[Math.floor(tileNo / board[0].length)][tileNo % board[0].length]
  //         .className
  //     );
  //   });
  // });
}

function renderGhost(ghosts, pillTimer, tilesEl) {
  let canBeEaten;

  if (pillTimer) {
    ghostEatAudio.play();
    if (pillTimer < 10) {
      canBeEaten = "killable-blue";
    } else if (pillTimer < 20) {
      canBeEaten = "killable-white";
    } else if (pillTimer < 30) {
      canBeEaten = "killable-blue";
    } else if (pillTimer < 40) {
      canBeEaten = "killable-white";
    } else if (pillTimer < 50) {
      canBeEaten = "killable-blue";
    } else if (pillTimer <= 60) {
      canBeEaten = "killable-white";
    } else {
      canBeEaten = "killable-blue";
    }
  } else {
    ghostEatAudio.pause();
  }

  ghosts.forEach((ghost) => {
    tilesEl[ghost.currPos].setAttribute(
      "class",
      `tile ${ghost.name} ghost ${canBeEaten}`
    );

    // ghost.currPos.forEach((pos, i) => {
    //   tilesEl[pos[1]].setAttribute(
    //     "class",
    //     `tile ${ghost.name} ${ghostLayout[i][1]} ${canBeEaten}`
    //   );
    //   tilesEl[pos[0]].setAttribute(
    //     "class",
    //     `tile ${ghost.name} ${ghostLayout[i][0]} ${canBeEaten}`
    //   );
    //   tilesEl[pos[2]].setAttribute(
    //     "class",
    //     `tile ${ghost.name} ${ghostLayout[i][2]} ${canBeEaten}`
    //   );
    // });
  });
}

function renderTilesFlashing(tilesEl) {
  tilesEl.forEach((tile) => {
    if (edgeCornerNames.includes(tile.classList.value)) {
      tile.style.animation = ".5s on-death-corners infinite";
    } else if (tile.classList.value === "tile edge-top") {
      tile.style.animation = ".5s on-death-horiz infinite";
    } else if (tile.classList.value === "tile edge-middle") {
      tile.style.animation = ".5s on-death-vert infinite";
    }
  });
}

function stopTilesFlashing(tilesEl) {
  tilesEl.forEach((tile) => {
    if (edgeCornerNames.includes(tile.classList.value)) {
      tile.style.animation = "";
    } else if (tile.classList.value === "tile edge-top") {
      tile.style.animation = "";
    } else if (tile.classList.value === "tile edge-middle") {
      tile.style.animation = "";
    }
  });
}

export {
  renderMap,
  renderRemainingLives,
  renderPos,
  unRenderPos,
  renderGhost,
  renderTilesFlashing,
  stopTilesFlashing,
};
