import game from './game.js';
import Player from './../model/player.js';
import Enemy from './../model/enemy.js';
import Particle from './../model/particle.js';
import Projectile from '../model/projectile.js';

class Physics {
    startMovementDetect(){
        addEventListener('keydown', ({key}) => {
            switch(key){
                case 'ArrowRight':
                    game.keys.rightPressed = true;
                    break;
                case 'ArrowLeft':
                    game.keys.leftPressed = true;
                    break;
                case 'ArrowUp':
                    game.keys.upPressed = true;
                    break;
                case 'ArrowDown':
                    game.keys.downPressed = true;
                    break;
                case ' ':
                    // Filter for player entity and fire
                    game.entities
                        .filter(entity => entity instanceof Player)[0]
                        .fire();

                    game.keys.spacePressed = true;
                    break;
            }
        });

        addEventListener('keyup', ({key}) => {
            switch(key){
                case 'ArrowRight':
                    game.keys.rightPressed = false;
                    break;
                case 'ArrowLeft':
                    game.keys.leftPressed = false;
                    break;
                case 'ArrowUp':
                    game.keys.upPressed = false;
                    break;
                case 'ArrowDown':
                    game.keys.downPressed = false;
                    break;
                case ' ':
                    game.keys.spacePressed = false;
                    break;
            }
        })
    }

    explosion(object, color) {
        // Play explosion audio
        const explosionAudio = new Audio('/audio/explosion.mp3');
        explosionAudio.play();


        for(let i = 0; i < 20; i++){
            let exploColor = color;
            if(!exploColor) {
                // Randomly choose particle color to resemble explosion
                const coinToss = Math.floor(Math.random() * 2);
                if(coinToss === 0) exploColor = '#ffb83f'; // orange
                else exploColor = '#feff3b'; // yellow
            }

            game.particles.push(new Particle({
                position: {
                    x: object.x + object.width / 2,
                    y: object.y + object.height / 2
                },
                velocity: {
                    x: (Math.random() - 0.5) * 2,
                    y: (Math.random() - 0.5) * 2
                },
                radius: Math.random() * 6,
                color: exploColor,
                fades: true
            }));
        }
    }

    createCollisionPairs() {
        // All possible pairs of things that can collide
        let collisionPairs = [];

        const playerProjectiles = game.projectiles.filter(projectile => projectile.type === 'player');
        const player = game.entities.filter(entity => entity instanceof Player)[0];

        // Enemies loop
        game.entities
            .filter(entity => entity instanceof Enemy)
            .forEach(enemy => {
                // player ship vs enemy ship
                collisionPairs.push({a: player, b: enemy});

                // player projectile vs enemy
                playerProjectiles.forEach(playerProjectile => {
                    collisionPairs.push({a: playerProjectile, b: enemy});
                });
            });

        // Enemy projectiles loop
        game.projectiles
            .filter(projectile => projectile.type === 'enemy')
            .forEach(enemyProjectile => {
                // Check enemy projectiles vs player
                collisionPairs.push({a: player, b: enemyProjectile});

                // Check player torpedo vs enemy torpedo
                playerProjectiles.forEach(playerProjectile => {
                    collisionPairs.push({a: playerProjectile, b: enemyProjectile});
                });
            });

        return collisionPairs;
    }

    detectCollision() {
        const resolveProjectile = projectile => {
            let index = game.projectiles.findIndex(entity => entity === projectile);
            game.projectiles.splice(index, 1);
        };

        //check intersecting boundaries
        this.createCollisionPairs().forEach(pair => {
            if(pair.a.boundary().intersects(pair.b.boundary())){
                // Resolve projectile collisions. If projectiles hit each other they cancel out
                if(pair.a instanceof Projectile && pair.b instanceof Projectile){
                    resolveProjectile(pair.a);
                    resolveProjectile(pair.b);
                } else if(pair.a instanceof Projectile){
                    resolveProjectile(pair.a);
                } else if(pair.b instanceof Projectile){
                    resolveProjectile(pair.b);
                };


                // Resolve player collision
                if(pair.a instanceof Player){
                    this.explosion(pair.a);

                    let aIndex = game.entities.findIndex(entity => entity === pair.a);
                    game.entities.splice(aIndex, 1);

                    setTimeout(() => {
                        game.state.running = false;
                    }, 1);
                }

                // Resolve enemy collision
                if(pair.b instanceof Enemy){
                    let bIndex = game.entities.findIndex(entity => entity === pair.b);
                    // Reduce hp by one if it hasn't reached 0
                    if(game.entities[bIndex].hp > 0) return game.entities[bIndex].hp -=1;
                    // Once hp reaches 0, remove entity and set explosion
                    game.entities.splice(bIndex, 1);
                    this.explosion(pair.b);

                    // Update score
                    game.state.score += 10;
                }
            }
        });
    }
}

const physics = new Physics();
Object.freeze(physics);

export default physics; 