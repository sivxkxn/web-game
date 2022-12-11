class Layer {
  constructor(game, width = 500, height = 1400, speedModifier, image) {
    this.game = game;
    this.width = width;
    this.height = height;
    this.speedModifier = speedModifier;
    this.image = image;
    this.x = 0;
    this.y = 0;
  }
  update() {
    if (this.x < -this.width) this.x = 0;
    else this.x -= this.game.speed * this.speedModifier;
  }
  draw(context) {
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
    context.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
  }
}

export class Background {
  constructor(game) {
    this.game = game;
    this.width = 1667;
    this.height = 500;
    this.img1 = new Image();
    this.img1.src = "./src/layer-1.png";
    this.img2 = new Image();
    this.img2.src = "./src/layer-2.png";
    this.img3 = new Image();
    this.img3.src = "./src/layer-3.png";
    this.img4 = new Image();
    this.img4.src = "./src/layer-4.png";
    this.img5 = new Image();
    this.img5.src = "./src/layer-5.png";
    this.layer1 = new Layer(this.game, this.width, this.height, 0.2, this.img1);
    this.layer2 = new Layer(this.game, this.width, this.height, 0.8, this.img2);
    this.layer3 = new Layer(this.game, this.width, this.height, 1, this.img3);
    this.layer4 = new Layer(this.game, this.width, this.height, 1.5, this.img4);
    this.layer5 = new Layer(this.game, this.width, this.height, 2, this.img5);
    this.layers = [
      this.layer1,
      this.layer2,
      this.layer3,
      this.layer4,
      this.layer5,
    ];
  }
  update() {
    this.layers.forEach((layer) => {
      layer.update();
    });
  }
  draw(context) {
    this.layers.forEach((layer) => {
      layer.draw(context);
    });
  }

}
