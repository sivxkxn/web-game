const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = (canvas.width = 800);
const CANVAS_HEIGHT = (canvas.height = 700);
let gameSpeed = 5;

const backgroundLayer1 = new Image();
backgroundLayer1.src = "./src/layer-1.png";
const backgroundLayer2 = new Image();
backgroundLayer2.src = "./src/layer-2.png";
const backgroundLayer3 = new Image();
backgroundLayer3.src = "./src/layer-3.png";
const backgroundLayer4 = new Image();
backgroundLayer4.src = "./src/layer-4.png";
const backgroundLayer5 = new Image();
backgroundLayer5.src = "./src/layer-5.png";

let x = 0;
let x2 = 2400;

class Layer {
  constructor(image, speedModifier) {
    this.x = 0;
    this.y = 0;
    this.width = 2400;
    this.height = 700;
    this.image = image;
    this.speedModifier = speedModifier;
    this.speed = gameSpeed + this.speedModifier;
  }
  update() {
    this.speed = gameSpeed + this.speedModifier;
    if (this.x <= -this.width) {
      this.x = this.width + this.x - this.speed;
    }
    if (this.x2 <= -this.width) {
      this.x2 = this.width + this.x2 - this.speed;
    }
  }
  draw() {}
}

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.drawImage(backgroundLayer4, x, 0);
  ctx.drawImage(backgroundLayer4, x2, 0);
  x < -2400 ? (x = 2400 + x2 - gameSpeed) : (x -= gameSpeed);
  x -= gameSpeed;
  x2 < -2400 ? (x2 = 2400 + x - gameSpeed) : (x2 -= gameSpeed);
  x2 -= gameSpeed;
  requestAnimationFrame(animate);
}
animate();
