import game from './../controller/game.js';
import Projectile from './../model/projectile.js';

export default class Enemy {
    constructor() {
        this.width = 130;
        this.height = 115;
        this.x = Math.floor(Math.random() * innerWidth - this.width / 2);
        this.y = 0;
        this.hp = 3;
        this.img = 'enemy.png';
        this.speed = 1.5;
    }

    update(index) {
        // Update movement
        this.y += this.speed;

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

    fire(enemy){
        // Check to see how many torpedos are active. Only 3 on screen at a time.
        const torpedoCount = game.projectiles.filter(projectile => {
            return projectile.type === 'enemy';
        });

        if(torpedoCount.length < 3){
            // Play torpedo sound
            const torpedo = new Audio('/audio/klingon_torpedo.mp3');
            torpedo.play();

            // Create new projectile and add to list
            game.projectiles.push(
                new Projectile(
                    enemy.x + enemy.width / 2 - 12, 
                    enemy.y, 
                    'red', 
                    'enemy'
                )
            );
        }
    }
}