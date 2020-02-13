class Game {
  constructor() {
    const canvas = document.querySelector("#canvas");
    const screen = canvas.getContext("2d");
    const gameSize = { x: canvas.width, y: canvas.height };
    this.player = new Player(this, gameSize);

    console.log(this.player);

    const tick = () => {
      this.update();
      this.draw(screen, gameSize);
      requestAnimationFrame(tick);
    };
    tick();
  }

  update() {
    this.player.update();
    console.log("update");
  }

  draw(screen, gameSize) {
    screen.clearRect(0, 0, gameSize.x, gameSize.y);
    drawRect(screen, this.player);
  }
}

class Player {
  constructor(game, gameSize) {
    this.game = game;
    this.size = { x: 20, y: 20 };
    this.center = { x: gameSize.x / 2, y: gameSize.y - this.size.y * 2 };
    // this.center = { x: 50, y: 50 }
    this.keyboarder = Keyboarder;
  }

  update() {
    console.log(this.keyboarder.keyState);
    console.log("left", this.keyboarder.KEYS.LEFT);
    console.log("right", this.keyboarder.KEYS.RIGHT);
    if (this.keyboarder.isDown(this.keyboarder.KEYS.LEFT)) {
      this.center.x -= 2;
    } else if (this.keyboarder.isDown(this.keyboarder.KEYS.RIGHT)) {
      this.center.x += 2;
    } else if (this.keyboarder.isDown(this.keyboarder.KEYS.UP)) {
      this.center.y -= 2;
    } else if (this.keyboarder.isDown(this.keyboarder.KEYS.DOWN)) {
      this.center.y += 2;
    }
  }
}

function drawRect(screen, body) {
  screen.fillRect(
    body.center.x - body.size.x / 2,
    body.center.y / 1,
    body.size.x,
    body.size.y
  );
  screen.fillStyle = "#FF5A5F";
}
window.addEventListener("load", function() {
  new Game();
});
