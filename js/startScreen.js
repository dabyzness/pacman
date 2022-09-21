function renderStartScreen(startScreen, highScoreArr) {
  // gameContainer.style.display = "none";
  // endScreen.style.display = "none";
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
  <div id="high-scores">HIGH SCORES</div>
  <div class="modal" id="controls-modal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Controls/Rules</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p> Use the arrow keys to move around the game board to eat the pellets and evade the ghosts. On the start/end screens press the right arrow key to make your selection.
          </p>
          <p>Collect all of the snack pellets to win.</p>
          <p>If the ghosts touch you, you will lose a life and return to the original start position.
            If you run out of lives, it is game over.</p>
            <p>Eating the large snack pellet will grant you 5 seconds of invulnerability
            During this time, you may eat the ghosts. This will cause the ghosts to despawn.
            Ghosts will respawn inside of the center box immediately following the end of the 5 seconds.
            </p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal" id="high-score-modal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">High Scores</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          ${highScoreArr.reduce((prev, highScore) => {
            prev += `<p>${highScore[0]}   ${highScore[1]}</p>`;
            return prev;
          }, "")}
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>

`;
}
