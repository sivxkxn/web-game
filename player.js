import {Falling, Jumping, Rolling, Running, Sitting} from './playerStates.js'

export class Player{
    constructor(game){
        this.game = game;
        this.width = 100;
        this.height = 91.3;
        this.frameWidth = 575;
        this.frameHeight = 523;
        this.x = 0;
        this.y =(this.game.height - this.height);
        this.vy = 0;
        this.weight = 1;
        this.image = new Image();
        this.image.src = "./src/shadow_dog.png";
        this.frameX = 0;
        this.frameY = 0;
        this.speed = 0;
        this.maxSpeed = 6;
        this.maxFrame = 5;
        this.fps = 80;
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 10;
        this.states = [new Sitting(this.game), new Running(this.game), new Jumping(this.game), new Falling(this.game), new Rolling(this.game)];
        // this.currentState = this.states[0];
        // this.currentState.enter();
    }
    update(input, deltaTime){
        this.checkCollision();
        this.currentState.handleInput(input);
        this.x += this.speed;
        if(input.includes('ArrowRight')) this.speed = this.maxSpeed;
        else if(input.includes('ArrowLeft')) this.speed =- this.maxSpeed;
        else this.speed =0;
        if(this.x < 0) this.x = 0;
        if(this.x > this.game.width - this.width) this.x = this.game.width - this.width; 
        // this.y +=this.vy;
        if(input.includes('ArrowUp') && this.onGround()) this.vy -= 15;
        this.y += this.vy;
        if(!this.onGround()) this.vy+=this.weight
        else this.vy = 0;
        // if(deltaTime/2<  this.maxFrame) this.frameX++;
        // else this.frameX = 0;
        // console.log(this.frameTimer, this.frameInterval )
        if(this.frameTimer%7 > 4){
            this.frameTimer = 0;
            if(this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;
        } else{
            
            this.frameTimer +=deltaTime;
        }
    // }
    }
    draw(context){
        context.drawImage(this.image, this.frameX*this.frameWidth, this.frameY*this.frameHeight, this.frameWidth, this.frameHeight, this.x, this.y, this.width, this.height);
    }
    onGround(){
        return this.y >= this.game.height - this.height - this.game.groundMargin;
    }
    setState(state, speed){
        this.currentState = this.states[state];
        this.currentState.enter();
        this.game.speed = speed * this.maxSpeed;
    }
    checkCollision(){
        this.game.enemies.forEach(enemy => {
            if(
                enemy.x < this.x + this.width 
                && enemy.x + enemy.width > this.x &&
                enemy.y < this.y + this.height &&
                enemy.y + enemy.height > this.y
            ){
                // console.log('Collision');
                this.game.gameOver = true;
                console.log( this.game.gameOver);
                enemy.markedForDeletion = true;
                this.game.score ++;
                // if(document.getElementById('over')){
                // const over = document.getElementById('over')
                // over.innerHTML = 'Game over';
                // }
                // gameOver.innerHTML  = 'Game over';
            }
            else{}
            
        });
    }
}