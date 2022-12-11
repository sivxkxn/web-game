// import { animationStates, spriteAnimations } from "./constans.js";

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = (canvas.width = 1400);
const CANVAS_HEIGHT = (canvas.height = 500);
const numberOfEnemies = 5;
const enemiesArray = [];
const animationStates = [
  {
    name: "idle",
    frames: 7,
  },
  {
    name: "jump",
    frames: 7,
  },
  {
    name: "fall",
    frames: 7,
  },
  {
    name: "run",
    frames: 9,
  },
  {
    name: "dizzy",
    frames: 11,
  },
  {
    name: "sit",
    frames: 5,
  },
  {
    name: "roll",
    frames: 7,
  },
  {
    name: "bite",
    frames: 7,
  },
  {
    name: "lay",
    frames: 12,
  },
  {
    name: "getHit",
    frames: 7,
  },
];
const spriteAnimations = [];
let playerState = "run";
let enemyFrame = 0;
const SPRITE_WIDTH = 575;
const SPRITE_HEIGHT = 523;
const staggerFrame = 5;
let gameSpeed = 5;
// let frameX = 0;
// let frameY = 3;
let gameFrame = 0;
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

const enemyImage1 = new Image();
enemyImage1.src = "./src/enemy1.png";
const enemyImage2 = new Image();
enemyImage2.src = "./src/enemy2.png";
const enemyImage3 = new Image();
enemyImage3.src = "./src/enemy3.png";
const enemyImage4 = new Image();
enemyImage4.src = "./src/enemy4.png";

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

class Enemy2 {
  constructor() {
    this.speed = Math.random()* 4 + 1;
    this.spriteWidth = 266;
    //enemy 1 - 293
    //enemy 2 - 266
    this.spriteHeight = 188;
       //enemy 1 - 155
      //enemy 2 - 188
    this.width = this.spriteWidth / 2.5;
    this.height = this.spriteHeight / 2.5;
    this.x = Math.random()*(canvas.width - this.width);
    this.y = Math.random()*(canvas.height - this.height);
    this.enemyFrame = 0;
    this.flapSpeed = Math.floor(Math.random() * 3 + 1);
    this.angle = 0;
    this.angleSpeed = Math.random() * 0.2;
    this.curve = Math.random()*7
  }
  update() {
    // this.x+=Math.random * 5 - 2.5;
    // this.y+=Math.random * 5 - 2.5;
    this.x -=this.speed;
    this.y += this.curve*Math.sin(this.angle);
    this.angle +=this.angleSpeed;
    if(this.x + this.width < 0) this.x = canvas.width;
    if(gameFrame % this.flapSpeed === 0){
      this.enemyFrame > 4 ? this.enemyFrame = 0: this.enemyFrame++;
    }
  }
  draw() {
    ctx.drawImage(enemyImage2, this.enemyFrame*this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
  }
}

class Enemy3 {
  constructor() {
    this.speed = Math.random()* 4 + 1;
    this.spriteWidth = 218;
    //enemy 1 - 293
    //enemy 2 - 266
    this.spriteHeight = 177;
       //enemy 1 - 155
      //enemy 2 - 188
    this.width = this.spriteWidth / 2;
    this.height = this.spriteHeight / 2;
    this.x = Math.random()*(canvas.width - this.width);
    this.y = Math.random()*(canvas.height - this.height);
    this.enemyFrame = 0;
    this.flapSpeed = Math.floor(Math.random() * 3 + 1);
    this.angle = 0;
    this.angleSpeed = Math.random() * 0.5 + 0.5;
    // this.curve = Math.random()* 200 + 50;
  }
  update() {
    // this.x+=Math.random * 5 - 2.5;
    // this.y+=Math.random * 5 - 2.5;
    this.x = canvas.width/3 *Math.sin(this.angle*Math.PI/90) + (canvas.width/2 - this.width/2);
    this.y = canvas.height/3 *Math.cos(this.angle*Math.PI/700) + (canvas.height/2 - this.height/2);
    // this.y += this.curve*Math.sin(this.angle);
    this.angle +=this.angleSpeed;
    if(this.x + this.width < 0) this.x = canvas.width;
    if(gameFrame % this.flapSpeed === 0){
      this.enemyFrame > 4 ? this.enemyFrame = 0: this.enemyFrame++;
    }
  }
  draw() {
    ctx.drawImage(enemyImage3, this.enemyFrame*this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
  }
}
class Enemy4 {
  constructor() {
    this.speed = Math.random()* 4 + 1;
    this.spriteWidth = 218;
    //enemy 1 - 293
    //enemy 2 - 266
    this.spriteHeight = 1207;
       //enemy 1 - 155
      //enemy 2 - 188
    this.width = this.spriteWidth / 2;
    this.height = this.spriteHeight / 2;
    this.x = Math.random()*(canvas.width - this.width);
    this.y = Math.random()*(canvas.height - this.height);
    this.newX = Math.random()*(canvas.width - this.width);
    this.newY = Math.random()*(canvas.height - this.height);
    this.enemyFrame = 0;
    this.flapSpeed = Math.floor(Math.random() * 3 + 1);
    this.angle = 0;
    this.angleSpeed = Math.random() * 0.5 + 0.5;
    // this.curve = Math.random()* 200 + 50;
  }
  update() {
    // this.x+=Math.random * 5 - 2.5;
    // this.y+=Math.random * 5 - 2.5;
    if(gameFrame % 60 === 0){
      this.newX = Math.random()*(canvas.width - this.width);
      this.newY = Math.random()*(canvas.height - this.height);
    }
    let dx = this.x - this.newX;
    let dy = this.y - this.newY;
    this.x -= dx/70;
    this.y -= dy/70;
    // this.y += this.curve*Math.sin(this.angle);
    this.angle +=this.angleSpeed;
    if(this.x + this.width < 0) this.x = canvas.width;
  }
  draw() {
    ctx.drawImage(enemyImage4, this.enemyFrame*this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
  }
}

class Explosion{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.spriteWidth = 200;
    this.spriteHeight = 179;
    this.width = this.spriteWidth * 0.7;
    this.height = this.spriteHeight * 0.7;
    this.image = new Image();
    this.image.src = './src/boom.png';
    this.frame = 0;
    this.timer =0;
  }
  update(){
    this.timer++;
    if(this.timer% 10 ===0){
      this.frame++;
    }
  }
  draw(){
    ctx.drawImage(this.image, this.spriteWidth*this.frame, 0, this.spriteWidth, this.spriteWidth, this.spriteHeight,this.x, this.y, this.width, this.height);
  }
}

for (let i = 0; i < numberOfEnemies; i++) {
  enemiesArray.push(new Enemy3());
}
// console.log(enemiesArray);
animationStates.forEach((state, index) => {
  let frames = {
    loc: [],
  };
  for (let j = 0; j < state.frames; j++) {
    let positionX = j * SPRITE_WIDTH;
    let positionY = index * SPRITE_HEIGHT;
    frames.loc.push({ x: positionX, y: positionY });
  }
  spriteAnimations[state.name] = frames;
});
// console.log(spriteAnimations);
const layer1 = new Layer(backgroundLayer1, 4);
const layer2 = new Layer(backgroundLayer2, 4);
const layer3 = new Layer(backgroundLayer3, 4);
// const layer4 = new Layer(backgroundLayer4, 4);
const layer5 = new Layer(backgroundLayer5, 4);
const enemy1 = new Enemy2();
const enemy2 = new Enemy2();
const gameLayers = [layer1, layer2, layer3, layer5];
function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  gameLayers.forEach((layer) => {
    layer.update();
    layer.draw();
  });
  let position =
    Math.floor(gameFrame / staggerFrame) %
    spriteAnimations[playerState].loc.length;
  // image, sx, sy, sw, sh, da, dy, dw, dh
  let frameX = SPRITE_WIDTH * position;
  let frameY = spriteAnimations[playerState].loc[position].y;
  ctx.drawImage(
    playerImage,
    frameX,
    frameY,
    SPRITE_WIDTH,
    SPRITE_HEIGHT,
    100,
    400,
    200,
    200
  );
  enemiesArray.forEach((enemy) => {
    enemy.update();
    enemy.draw();
  });
  
  // ctx.fillRect(enemy1.x, enemy1.y, enemy1.width, enemy1.height);
  // enemy1.update();
  // if (gameFrame % staggerFrame == 0) {
  //   frameX < 6 ? frameX++ : (frameX = 0);
  // }
  gameFrame++;
  // enemyFrame++;
  requestAnimationFrame(animate);
}
animate();
