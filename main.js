class Game {
  constructor() {
    let canvas = document.querySelector("#canvas");
    let screen = canvas.getContext("2d");
    this.player = new Player(screen, this);
  }
}

class Player {
  constructor(screen) {
    this.player = this.draw(screen);
    this.screenWidth = screen.width;
  }
  draw(screen) {
    screen.fillStyle = "#ff5a5f";
    screen.fillRect(
      canvas.width / 2 - 3,
      canvas.height - canvas.height / 5,
      30,
      30
    );
  }
}

let game = new Game();
