export class UI {
  constructor(game) {
    this.game = game;
    this.fontSize = 20;
    this.fontFamily = "Helvetica";
  }
  draw(context) {
    context.font = this.fontSize + "px " + this.fontFamily;
    context.textAlign = "left";
    context.fillStyle = this.game.fontColor;
    context.fillText("Time: " + Math.round(this.game.time/1000) + " s", 20, 50);

    if(this.game.gameOver){
        context.textAligh = 'left';
        context.font = 60 + "px " + this.fontFamily;
        context.fillStyle = 'red';
        context.fillText('Game over', this.game.width*0.5, this.game.height*0.5);
    }
  }
}
