import { playSnakeEatingSound } from "../sound";
import { directionEnum } from "../utils";

// TODO
// Make audio when snake eats work DONE
// Highscore and current score feature
// Handle self collision
// start a new game
// Create the title screen
// Manage themes
// Refactor classes and styles of element

export class BetterBoard {
  constructor(
    rows,
    cols,
    boardSelector,
    scoreSelector,
    gameoverSelector,
    snake,
    food
  ) {
    this.rows = rows;
    this.cols = cols;
    this.boxes = [];
    this.boardSelector = boardSelector;
    this.scoreSelector = scoreSelector;
    this.gameoverSelector = gameoverSelector;
    this.snake = snake;
    this.food = food;
    this.score = 0;
    this.selectElements();
    this.input();
    this.init();
  }

  selectElements() {
    this.board = document.querySelector(this.boardSelector);
    this.scoreElement = document.querySelector(this.scoreSelector);
    this.gameOverElement = document.querySelector(this.gameoverSelector);
  }

  update() {
    // Updating stuff here
    this.changedDirection = false;
    this.snake.foodPosition = this.food.getFood;
    this.snake.move();
    this.checkCollision();
  }

  updateScore() {
    this.scoreElement.innerText = `Score: ${
      this.score
    } (Best: ${this.getBestScore()})`;
  }

  getBestScore() {
    if (!localStorage.getItem("best_score")) return 0;
    return parseInt(localStorage.getItem("best_score"));
  }

  checkBestScore() {
    if (this.scoreNum > this.getBestScore()) {
      localStorage.setItem("best_score", this.scoreNum.toString());
    }
  }

  drawFood() {
    const foodPos = this.food.getFood;
    this.boxes[foodPos.y][foodPos.x].style.backgroundColor = "yellow";
  }

  drawSnake() {
    for (let box of this.snake.getSnakeBody) {
      this.boxes[box.y][box.x].style.backgroundColor = "black";
    }
  }

  draw() {
    // Drawing stuff here
    this.cleanBoard();
    this.drawSnake();
    this.drawFood();
  }

  checkCollision() {
    if (this.snake.foodCollision) {
      this.food.randomFood();
      if (this.snake.containsFood(this.food.getFood)) {
        // Recursively calls itself if food lies inside snake's body
        this.checkCollision();
      }
      playSnakeEatingSound();
      this.score++;
      this.updateScore();
      this.snake.removeFoodCollision();
      this.snake.foodPosition = this.food.getFood;
    }
    if (this.snake.selfCollision) {
      console.log("collision snake collided with itself");
    }
  }

  cleanBoard() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.boxes[j][i].style.backgroundColor = "red";
      }
    }
  }

  init() {
    for (let i = 0; i < this.rows; i++) {
      this.boxes[i] = [];
      for (let j = 0; j < this.cols; j++) {
        let div = document.createElement("div");
        div.classList.add("visible");
        this.board.appendChild(div);
        this.boxes[i].push(div);
      }
    }
    this.updateScore();
  }

  input() {
    window.addEventListener("keydown", (e) => {
      const key = e.key;
      if (!this.playing && !this.gameoverCooldown && !this.paused) {
        //restart the game on key press
        // this.reset();
        // this.move();
      }
      switch (key) {
        case "w":
        case "ArrowUp":
          if (this.currDir === "DOWN" || this.changedDirection) return;
          this.changedDirection = true;
          this.snake.changeVelocity = directionEnum.UP;
          this.currDir = "UP";
          console.log(this.currDir);
          break;
        case "ArrowLeft":
        case "a":
          if (this.currDir === "RIGHT" || this.changedDirection) return;
          this.changedDirection = true;
          this.snake.changeVelocity = directionEnum.LEFT;
          this.currDir = "LEFT";
          console.log(this.currDir);

          break;
        case "ArrowDown":
        case "s":
          if (this.currDir === "UP" || this.changedDirection) return;
          this.changedDirection = true;
          this.snake.changeVelocity = directionEnum.DOWN;
          this.currDir = "DOWN";
          console.log(this.currDir);
          break;
        case "ArrowRight":
        case "d":
          if (this.currDir === "LEFT" || this.changedDirection) return;
          this.changedDirection = true;
          this.snake.changeVelocity = directionEnum.RIGHT;
          this.currDir = "RIGHT";
          console.log(this.currDir);
          break;
        case "Escape":
          if (this.playing) {
            this.pauseGame();
          } else {
            this.resumeGame();
          }
          break;
      }
    });
  }
}
