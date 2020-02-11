class Game {
  constructor() {
    let canvas = document.querySelector("#canvas");
    let screen = canvas.getContext("2d");
    this.player = new Player(screen);
  }
}

class Player {
  constructor(screen) {
    this.player = this.draw(screen);
  }
  draw(screen) {
    screen.beginPath();
    screen.rect(20, 20, 30, 30);
    screen.fillStyle = "#fff";
    screen.fill();
    screen.closePath();
  }
}

let game = new Game();
