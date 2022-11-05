const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = (canvas.width = 1400);
const CANVAS_HEIGHT = (canvas.height = 700);

const SPRITE_WIDTH = 575;
const SPRITE_HEIGHT = 523;
let gameSpeed = 5;
const gameSpeedHTML = document.getElementById("showGameSpeed");
gameSpeedHTML.innerHTML = "Game speed: " + gameSpeed;

const playerImage = new Image();
playerImage.src = "./src/shadow_dog.png";
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

let frameX = 0;
let frameY = 3;
let gameFrame = 0;
class Layer {
  constructor(image, speedModifier) {
    this.x = 0;
    this.y = 0;
    this.width = 2400;
    this.height = 700;
    this.x2 = this.width;
    this.image = image;
    this.speedModifier = speedModifier;
    this.speed = gameSpeed + this.speedModifier;
  }
  update() {
    this.speed = gameSpeed + this.speedModifier;
    if (this.x <= -this.width) {
      this.x = this.width + this.x2 - this.speed;
    } else {
      this.x -= gameSpeed;
    }
    if (this.x2 <= -this.width) {
      this.x2 = this.width + this.x - this.speed;
    } else {
      this.x2 -= gameSpeed;
    }
    this.x = Math.floor(this.x - this.speed);
    this.x2 = Math.floor(this.x2 - this.speed);
  }
  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.drawImage(this.image, this.x2, this.y, this.width, this.height);
  }
}

const layer1 = new Layer(backgroundLayer1, 4);
const layer2 = new Layer(backgroundLayer2, 4);
const layer3 = new Layer(backgroundLayer3, 4);
const layer4 = new Layer(backgroundLayer4, 4);
const layer5 = new Layer(backgroundLayer5, 4);

const gameLayers = [layer1, layer2, layer3, layer4, layer5];
const staggerFrame = 5;
function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  gameLayers.forEach((layer) => {
    layer.update();
    layer.draw();
  });
  let position = Math.floor(gameFrame / staggerFrame) % 6;
  // image, sx, sy, sw, sh, da, dy, dw, dh
  frameX = SPRITE_WIDTH * position;
  ctx.drawImage(
    playerImage,
    frameX,
    frameY * SPRITE_HEIGHT,
    SPRITE_WIDTH,
    SPRITE_HEIGHT,
    100,
    400,
    200,
    200
  );
  // ctx.fillRect(100, 50, 100, 100);
  // if (gameFrame % staggerFrame == 0) {
  //   frameX < 6 ? frameX++ : (frameX = 0);
  // }
  gameFrame++;
  requestAnimationFrame(animate);
}
animate();
