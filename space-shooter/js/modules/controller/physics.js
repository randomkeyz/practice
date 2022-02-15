import game from './game.js';
import Projectile from './../model/projectile.js';

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
                    game.projectiles.push(
                        new Projectile(
                            game.player.x + game.player.width / 2, 
                            game.player.y, 
                            'blue', 
                            -1
                        )
                    );
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
}

const physics = new Physics();
Object.freeze(physics);

export default physics; 