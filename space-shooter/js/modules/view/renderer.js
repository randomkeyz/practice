import game from './../controller/game.js';
import Player from './../model/player.js';
import Enemy from './../model/enemy.js';

class Renderer {
    constructor() {
        this.canvas = document.querySelector('canvas');
        this.context = this.canvas.getContext('2d');
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
                if(game.keys.leftPressed) spritePos = 0;
                else if (game.keys.rightPressed) spritePos = 2;

                entity.draw(this.context, i, spritePos);
            }

            if(entity instanceof Enemy) entity.draw(this.context, i);
        }

        // Draw projectiles
        game.projectiles.forEach((projectile, index) => {
            projectile.draw(projectile.x, projectile.y, this.context, projectile.color, index)
        });
    }
}

const renderer = new Renderer();
Object.freeze(renderer);

export default renderer;