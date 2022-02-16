import game from './game.js';

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
                    game.player.fire();
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

    detectCollision(obj) {
        
    }
}

const physics = new Physics();
Object.freeze(physics);

export default physics; 