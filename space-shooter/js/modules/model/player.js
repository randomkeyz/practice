import game from './../controller/game.js';

export default class Player {
    constructor() {
        this.width = 58;
        this.height = 95;
        this.x = innerWidth / 2 - this.width / 2;
        this.y = innerHeight - this.height + 10;
        this.hp = 4;
        this.speed = 3
        this.img = 'player-ss.png';
    }

    update() {
            // Checks movement
            if(game.keys.rightPressed && this.x <= innerWidth - this.width / 2) this.x += this.speed;
            if(game.keys.leftPressed && this.x >= 0) this.x -= this.speed;
            if(game.keys.upPressed && this.y >= 0) this.y -= this.speed;
            if(game.keys.downPressed && this.y <= innerHeight - this.height / 2) this.y += this.speed;

    }

    draw(context, index, spritePos){
        let scale = 0.6;
        const playerImg = new Image();
        playerImg.src = `./images/${this.img}`;
        
        this.update(index);

        playerImg.onload = (() => {
            // image, srcX, srcY, srcWidth, srcHeight, destX, destY, destWidth, destHeight
            context.drawImage(
                playerImg,
                // Sprite # you want * width of sheet divided by number of sprites (starts at 0)
                spritePos * playerImg.width / 3, 
                0,
                playerImg.width / 3, // Spritesheet width dividedd by the number of sprites
                playerImg.height,
                this.x, 
                this.y,
                this.width * scale,
                this.height * scale
            );
        })();


    }
}