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

export {
  pacmanLayoutDown,
  pacmanLayoutLeft,
  pacmanLayoutRight,
  pacmanLayoutUp,
  ghostLayout,
  edgeCornerNames,
};
