import game from './../controller/game.js';
import physics from './../controller/physics.js';
import Player from './../model/player.js';
import Enemy from './../model/enemy.js';

class Renderer {
    constructor() {
        this.canvas = document.querySelector('canvas');
        this.context = this.canvas.getContext('2d');
    }

    drawPlayer(context, player, index){
        let scale = 0.5;
        const playerImg = new Image();
        playerImg.src = `./imgs/${player.img}`;
        
        physics.updatePlayerMovement(player, index);

        playerImg.onload = (() => {
            context.drawImage(
                playerImg, 
                player.x, 
                player.y,
                player.width * scale,
                player.height * scale
            );
        })();
    }

    drawEnemy(context, enemy, index){
        let scale = 0.35;
        const enemyImg = new Image();
        enemyImg.src = `./imgs/${enemy.img}`;
        
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
        let entity,
            entities = game.entities;

        for(let i=0; i < entities.length; i++){
            entity = entities[i];

            if(entity instanceof Player) this.drawPlayer(this.context, entity, i);
            if(entity instanceof Enemy) this.drawEnemy(this.context, entity, i);
        }

    }
}

const renderer = new Renderer();
Object.freeze(renderer);

export default renderer;