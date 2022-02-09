export default class Enemy {
    constructor() {
        this.width = 130;
        this.height = 115;
        this.x = 0;
        this.y = 0;
        this.hp = 3;
        this.direction = 1;
        this.img = 'enemy.png';
    }

    update() {
        if(this.y <= 0 || this.y + this.height >= game.height){
            this.direction *= -1;
        }
    }
}