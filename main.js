class Game {
  constructor() {
    let canvas = document.querySelector("#canvas");
    let screen = canvas.getContext("2d");
    let gameSize = { x: canvas.width, y: canvas.height };
    this.player = new Player(screen, gameSize);

    let tick = () => {
      // Update game state.

      this.update();
      // Draw game bodies.
      this.player.draw(screen);

      // Queue up the next call to tick with the browser.
      requestAnimationFrame(tick);
      console.log("this is a tick");
    };
    tick();
  }
  update() {
    this.player.update();
    console.log("player update is called");
  }
}

class Player {
  constructor(screen, gameSize) {
    this.player = this.draw(screen);
    this.size = { x: 30, y: 30 };
    this.center = { x: gameSize.x / 2, y: gameSize.y - this.size.y * 2 };

    // Create a keyboard object to track button presses.
    this.keyboarder = Keyboarder;
  }

  update() {
    console.log("player update outside if statement");

    if (this.keyboarder.isDown(this.keyboarder.KEYS.LEFT)) {
      console.log("inside left condition player update");
      this.center.x -= 210;
    } else if (this.keyboarder.isDown(this.keyboarder.KEYS.RIGHT)) {
      this.center.x += 210;
    }
  }

  draw(screen) {
    screen.fillStyle = "#ff5a5f";
    screen.fillRect(
      canvas.width / 2,
      canvas.height - canvas.height / 8,
      30,
      30
    );
  }
}

window.addEventListener("load", function() {
  game = new Game();
  console.log(game.player);
});
