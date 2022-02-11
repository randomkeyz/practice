import game from './../controller/game.js';

export default class Player {
    constructor() {
        this.width = 58;
        this.height = 95;
        this.x = innerWidth / 2 - this.width / 2;
        this.y = innerHeight - this.height + 10;
        this.hp = 4;
        this.direction = 1;
        this.speed = 3
        this.img = 'player-ss.png';
    }

    update() {
        if(this.y <= 0 || this.y + this.height >= game.height){
            this.direction *= -1;
        }
    }
}