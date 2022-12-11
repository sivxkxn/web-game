class Enemy {
  constructor() {
    this.frameX = 0;
    this.frameY = 0;
    this.fps = 20;
    this.frameInterval = 1000 / this.fps;
    this.frameTimer = 0;
    this.markedForDeletion = false;
  }
  update(deltaTime) {
    this.x -= this.speedX + this.game.speed;
    this.y += this.speedY;
    if (this.frameTimer > this.frameInterval) {
      this.frameInterval = 0;
      // console.log( this.frameX)
      //   if (this.frameX < this.maxFrame && this.frameX % 8 == 0) this.frameX++;
      if (this.frameX < this.maxFrame) this.frameX++;
      else this.frameX = 0;
    } else {
      this.frameTimer += deltaTime;
    }
    if (this.x + this.width < 0) this.markedForDeletion = true;
  }

  draw(context) {
    // context.drawImage(this.image,this.frameX*this.width, 0, this.width,this.height,  this.x, this.y, this.width, this.height);
    context.drawImage(
      this.image,
      this.frameX * this.width,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

export class FlyingEnemy extends Enemy {
  constructor(game) {
    super();
    this.game = game;
    this.width = 60;
    this.height = 44;
    this.x = this.game.width + Math.random() * this.game.width * 0.5;
    this.y = Math.random() * this.game.height * 0.8;
    this.speedX = Math.random() + 2;
    this.speedY = 0;
    this.maxFrame = 5;
    this.image = new Image();
    this.image.src = "./src/enemy_fly.png";
    this.va = Math.random() * 0.1 + 0.1;
    this.angle = 0;
    this.score = 0;
  }
  update(deltaTime) {
    super.update(deltaTime);
    this.angle += this.va;
    this.y += Math.sin(this.angle);
  }
}

export class GroundEnemy extends Enemy {
  constructor(game) {
    super();
    this.game = game;
    this.width = 60;
    this.height = 87;
    this.x = this.game.width;
    this.y = this.game.height - this.height - this.game.groundMargin;
    this.image = new Image();
    this.image.src = "./src/enemy_plant.png";
    this.speedX = 0;
    this.speedY = 0;
    this.maxFrame = 1;
  }
}

export class ClimbingEnemy extends Enemy {
  constructor(game) {
    super();
    this.game = game;
    this.width = 120;
    this.height = 144;
    this.x = this.game.width;
    this.y = Math.random() * this.game.height * 0.5;
    this.image = new Image();
    this.image.src = "./src/enemy_spider_big.png";
    this.speedX = 0;
    this.speedY = Math.random() > 0.5 ? 1 : -1;
    this.maxFrame = 5;
  }
  update(deltaTime){
    super.update(deltaTime);
    if(this.y > this.game.height - this.height - this.game.groundMargin){
        this.speedY *= -1;
    }
    if(this.y < -this.height) this.markedForDeletion = true;
  }
  draw(deltaTime){
    super.update(deltaTime);
  }
  draw(context){
    super.draw(context);
    context.beginPath();
    context.moveTo(this.x +this.width/2,0);
    context.lineTo(this.x+this.width/2, this.y+ this.height/2);
    context.stroke();
  }
}
