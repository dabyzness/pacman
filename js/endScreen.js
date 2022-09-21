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

function deRenderEndScreen(endScreen) {
  endScreen.innerHTML = "";
  endScreen.style.display = "none";
}

export { renderEndScreen, deRenderEndScreen };
