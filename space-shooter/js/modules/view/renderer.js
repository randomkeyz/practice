import game from './../controller/game.js';
import physics, { keys } from './../controller/physics.js';
import Player from './../model/player.js';
import Enemy from './../model/enemy.js';
import Projectile from './../model/projectile.js';

class Renderer {
    constructor() {
        this.canvas = document.querySelector('canvas');
        this.context = this.canvas.getContext('2d');
    }

    drawProjectile(x, y, context, color, projectile, index) {
        context.beginPath();
        // ctx.arc(x, y, radius, startAngle, endAngle [, counterclockwise]);
        context.arc(x, y, 4, 0, 2 * Math.PI);
        context.fillStyle = color;
        context.fill();
        context.closePath();

        physics.updateProjectileMovement(projectile, index);
    }

    drawPlayer(context, player, index, spritePos){
        let scale = 0.6;
        const playerImg = new Image();
        playerImg.src = `./images/${player.img}`;
        
        physics.updatePlayerMovement(player, index);

        playerImg.onload = (() => {
            // image, srcX, srcY, srcWidth, srcHeight, destX, destY, destWidth, destHeight
            context.drawImage(
                playerImg,
                // Sprite # you want * width of sheet divided by number of sprites (starts at 0)
                spritePos * playerImg.width / 3, 
                0,
                playerImg.width / 3, // Spritesheet width dividedd by the number of sprites
                playerImg.height,
                player.x, 
                player.y,
                player.width * scale,
                player.height * scale
            );
        })();
    }

    drawEnemy(context, enemy, index){
        let scale = 0.5;
        const enemyImg = new Image();
        enemyImg.src = `./images/${enemy.img}`;
        
        physics.updateEnemyMovement(enemy, index);

        //context.translate(enemy.x - enemy.width * scale / 2, enemy.y - enemy.height * scale / 2);
        //context.rotate(180 * Math.PI / 180);

        enemyImg.onload = (() => {
            context.drawImage(
                enemyImg, 
                enemy.x, 
                enemy.y,
                enemy.width * scale,
                enemy.height * scale
            );
        })();
    }

    // Gets called every sec
    render() {
        // Drawing canvas
        this.canvas.width = innerWidth;
        this.canvas.height = innerHeight;
        this.context.fillStyle = 'black';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Drawing entities
        let spritePos = 1,
            entity,
            entities = game.entities;

        for(let i=0; i < entities.length; i++){
            entity = entities[i];

            if(entity instanceof Player) {
                // Change sprite based on key press
                if(keys.leftPressed) spritePos = 0;
                else if (keys.rightPressed) spritePos = 2;

                this.drawPlayer(this.context, entity, i, spritePos);
            }

            if(entity instanceof Enemy) this.drawEnemy(this.context, entity, i);
        }

        // Draw projectiles
        game.projectiles.forEach((projectile, index) => {
            this.drawProjectile(projectile.x, projectile.y, this.context, projectile.color, projectile, index)
        });

        console.log(game.projectiles);

    }
}

const renderer = new Renderer();
Object.freeze(renderer);

export default renderer;