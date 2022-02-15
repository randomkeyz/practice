import game from './../controller/game.js';

export default class Enemy {
    constructor() {
        this.width = 130;
        this.height = 115;
        this.x = Math.floor(Math.random() * innerWidth);
        this.y = 0;
        this.hp = 3;
        this.img = 'enemy.png';
    }

    update(index) {
        // Update movement
        this.y += 1;

        // Remove enemy from entity array if it falls below view
        if(this.y >= innerHeight) game.entities.splice(index, 1);
    }

    draw(context, index){
        let scale = 0.5;
        const enemyImg = new Image();
        enemyImg.src = `./images/${this.img}`;
        
        this.update(index);

        //context.translate(enemy.x - enemy.width * scale / 2, enemy.y - enemy.height * scale / 2);
        //context.rotate(180 * Math.PI / 180);

        enemyImg.onload = (() => {
            context.drawImage(
                enemyImg, 
                this.x, 
                this.y,
                this.width * scale,
                this.height * scale
            );
        })();
    }
}