class Game {
  constructor() {
    const canvas = document.querySelector("#canvas");
    const screen = canvas.getContext("2d");
    const gameSize = { x: canvas.width, y: canvas.height };
    this.player = new Player(this, gameSize);
    this.bodies = [];
    this.bodies = this.bodies.concat(addEnemies(this));
    this.bodies = this.bodies.concat(new Player(this, gameSize));

    const tick = () => {
      this.update();
      this.draw(screen, gameSize);
      requestAnimationFrame(tick);
    };
    tick();
  }

  update() {
    for (let i = 0; i < this.bodies.length; i++) {
      this.bodies[i].update();
    }

    let notCollidingWithAnything = b1 => {
      return (
        this.bodies.filter(function(b2) {
          return colliding(b1, b2);
        }).length === 0
      );
    };

    // Throw away bodies that are colliding with something. They
    // will never be updated or draw again.
    this.bodies = this.bodies.filter(notCollidingWithAnything);

    for (let i = 0; i < this.bodies.length; i++) {
      if (
        this.bodies[i].center.y > 800 ||
        this.bodies[i].center.x > canvas.width ||
        this.bodies[i].center.y < 0 ||
        this.bodies[i].center.x < 0
      ) {
        this.bodies.splice(i, 1);
        this.bodies.push(
          new Enemy(this, { x: Math.random() * 500, y: Math.random() * 700 })
        );
      }
    }
  }

  draw(screen, gameSize) {
    screen.clearRect(0, 0, gameSize.x, gameSize.y);
    for (let i = 0; i < this.bodies.length; i++) {
      drawRect(screen, this.bodies[i]);
    }
  }

  addBody(body) {
    this.bodies.push(body);
  }
}

class Player {
  constructor(game, gameSize) {
    this.game = game;
    this.size = { x: 20, y: 20 };
    this.center = { x: gameSize.x / 2, y: gameSize.y - this.size.y * 2 };

    this.keyboarder = Keyboarder;
  }

  update() {
    if (this.keyboarder.isDown(this.keyboarder.KEYS.LEFT)) {
      this.center.x -= 2;
      console.log(this.center);
    } else if (this.keyboarder.isDown(this.keyboarder.KEYS.RIGHT)) {
      this.center.x += 2;
    } else if (this.keyboarder.isDown(this.keyboarder.KEYS.UP)) {
      this.center.y -= 2;
    } else if (this.keyboarder.isDown(this.keyboarder.KEYS.DOWN)) {
      this.center.y += 2;
    }
  }
}

class Enemy {
  constructor(game, center) {
    this.game = game;
    this.center = center;
    this.size = { x: 20, y: 20 };
    this.moveX = 0;
    this.speedX = Math.random() * 5 - 2.5;
    this.moveY = 0;
    this.speedY = Math.random() * 5 - 2.5;
  }

  update() {
    this.center.x += this.speedX;
    this.center.y += this.speedY;
    this.moveX += this.speedX;
    this.moveY += this.speedY;
    if (this.moveX < 0 || this.moveX > 30) {
      // ... reverse direction of movement.
      this.speedX = -this.speedX;
    }
    if (this.moveY < 0 || this.moveY > 30) {
      // ... reverse direction of movement.
      this.speedX = -this.speedX;
    }
  }
}

function addEnemies(game) {
  const enemies = [];
  for (let i = 0; i < 15; i++) {
    const x = Math.random() * 500;
    const y = Math.random() * 700;
    enemies.push(new Enemy(game, { x: x, y: y }));
  }
  return enemies;
}

function drawRect(screen, body) {
  screen.fillRect(
    body.center.x - body.size.x / 2,
    body.center.y / 2,
    body.size.x,
    body.size.y
  );
  screen.fillStyle = "#FF5A5F";
}

function colliding(b1, b2) {
  return !(
    b1 === b2 ||
    b1.center.x + b1.size.x / 2 < b2.center.x - b2.size.x / 2 ||
    b1.center.y + b1.size.y / 2 < b2.center.y - b2.size.y / 2 ||
    b1.center.x - b1.size.x / 2 > b2.center.x + b2.size.x / 2 ||
    b1.center.y - b1.size.y / 2 > b2.center.y + b2.size.y / 2
  );
}

window.addEventListener("load", function() {
  new Game();
});
