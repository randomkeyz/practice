import game from './game.js';

// Default key states
let keys = {
    rightPressed: false,
    leftPressed: false,
    upPressed: false,
    downPressed: false
}

class Physics {
    startMovementDetect(){
        addEventListener('keydown', ({key}) => {
            switch(key){
                case 'ArrowRight':
                    keys.rightPressed = true;
                    break;
                case 'ArrowLeft':
                    keys.leftPressed = true;
                    break;
                case 'ArrowUp':
                    keys.upPressed = true;
                    break;
                case 'ArrowDown':
                    keys.downPressed = true;
                    break;
            }
        });

        addEventListener('keyup', ({key}) => {
            switch(key){
                case 'ArrowRight':
                    keys.rightPressed = false;
                    break;
                case 'ArrowLeft':
                    keys.leftPressed = false;
                    break;
                case 'ArrowUp':
                    keys.upPressed = false;
                    break;
                case 'ArrowDown':
                    keys.downPressed = false;
                    break;
            }
        })
    }

    updatePlayerMovement(player){
        if(keys.rightPressed && player.x <= innerWidth - player.width / 2) player.x += player.speed;
        if(keys.leftPressed && player.x >= 0) player.x -= player.speed;
        if(keys.upPressed && player.y >= 0) player.y -= player.speed;
        if(keys.downPressed && player.y <= innerHeight - player.height / 2) player.y += player.speed;
    }

    updateEnemyMovement(enemy, index){
        enemy.y += 1;

        if(enemy.y >= innerHeight) {
            game.entities.splice(index, 1);
        } 
    }
}

const physics = new Physics();
Object.freeze(physics);

export default physics;