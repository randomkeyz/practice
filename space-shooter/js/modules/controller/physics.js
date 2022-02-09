// Physics and movement
const Physics = (() => {
    function defaultStates(){
        this.rightPressed: false,
        this.leftPressed: false,
        this.upPressed: false,
        this.downPressed: false
    }

    function _startMovementDetect(){
        addEventListener('keydown', ({key}) => {
            switch(key){
                case 'ArrowRight':
                    this.rightPressed = true;
                    break;
                case 'ArrowLeft':
                    this.leftPressed = true;
                    break;
                case 'ArrowUp':
                    this.upPressed = true;
                    break;
                case 'ArrowDown':
                    this.downPressed = true;
                    break;
            }
        });

        addEventListener('keyup', ({key}) => {
            switch(key){
                case 'ArrowRight':
                    this.rightPressed = false;
                    break;
                case 'ArrowLeft':
                    this.leftPressed = false;
                    break;
                case 'ArrowUp':
                    this.upPressed = false;
                    break;
                case 'ArrowDown':
                    this.downPressed = false;
                    break;
            }
        })
    }

    function _updatePlayerMovement(player){
        if(keys.right.pressed && player.x <= innerWidth - player.width / 2) player.x += player.speed;
        if(keys.left.pressed && player.x >= 0) player.x -= player.speed;
        if(keys.up.pressed && player.y >= 0) player.y -= player.speed;
        if(keys.down.pressed && player.y <= innerHeight - player.height / 2) player.y += player.speed;
    }

    function _updateEnemyMovement(enemy){
        enemy.y += 1;
    }

    return {
        startMovementDetect: _startMovementDetect,
        updatePlayerMovement: _updatePlayerMovement,
        updateEnemyMovement: _updateEnemyMovement
    }
})();

export default Physics;