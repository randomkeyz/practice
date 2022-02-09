// View
const Renderer = (() => {
    // Handles rendering Entities and rendering

    

    // draw player
    function _drawPlayer(context, player){
        let scale = 0.5;
        const playerImg = new Image();
        playerImg.src = `./imgs/${player.img}`;
        
        Physics.updatePlayerMovement(player);

        context.drawImage(
            playerImg, 
            player.x, 
            player.y,
            player.width * scale,
            player.height * scale
        );
    }

    // draw enemy
    function _drawEnemy(context, enemy){
        let scale = 0.35;
        const enemyImg = new Image();
        enemyImg.src = `./imgs/${enemy.img}`;
        
        Physics.updateEnemyMovement(enemy);
        context.translate(enemy.x - enemy.width * scale / 2, enemy.y - enemy.height * scale / 2);
        context.rotate(180 * Math.PI / 180);

        context.drawImage(
            enemyImg, 
            enemy.x, 
            enemy.y,
            enemy.width * scale,
            enemy.height * scale
        );
        
    }

    // draw game
    function _render() {
        const canvas = document.querySelector('canvas');
        const context = canvas.getContext('2d');

        canvas.width = innerWidth;
        canvas.height = innerHeight;

        context.fillStyle = 'black';
        context.fillRect(0, 0, canvas.width, canvas.height);

        let entity,
            entities = game.entities();

        for(let i=0; i < entities.length; i++){
            entity = entities[i];

            if(entity instanceof Player) _drawPlayer(context, entity);
            if(entity instanceof Enemy) _drawEnemy(context, entity);
        }

    }

    return {
        render: _render
    }

})();

export default Renderer;