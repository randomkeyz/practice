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

                entity.draw(i, spritePos);
            }

            if(entity instanceof Enemy) entity.draw(i);
        }

        // Draw projectiles and update position
        game.projectiles.forEach((projectile, index) => {
            let color;
            if(projectile.type === 'player') color = '#4fc3f7';
            else color = 'red';
                
            projectile.draw(projectile.x, projectile.y, color, index);
        });

        // Draw and update particles
        if(game.particles.length <= 0 ) return; // returns if no particles present
        game.particles.forEach((particle, i) => {
            if(particle.position.y - particle.radius >= innerHeight){
                particle.position.x = Math.random() * innerWidth;
                particle.position.y = -particle.radius;
            }
    
            // Remove particles that are no longer visible or run update
            if(particle.opacity <= 0) game.particles.splice(i, 1);
            else particle.update();
        });
    }
}

const renderer = new Renderer();
Object.freeze(renderer);

export default renderer;