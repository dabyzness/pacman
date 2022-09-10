export class Tile {
  constructor(value) {
    switch (value) {
      case 0:
        tileEl.setAttribute("class", "tile edge");
        break;
      case 1:
        tileEl.setAttribute("class", "tile");
        break;
      case 2:
        tileEl.setAttribute("class", "tile small-pill");
        break;
      default:
        break;
    }
  }
}
