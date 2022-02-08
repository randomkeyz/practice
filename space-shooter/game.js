// Game Entities
class Player {
    constructor(position) {
        this.x = position.x;
        this.y = position.y;
        this.width = 73;
        this.height = 146;
        this.hp = 4;
        this.direction = 1;
        this.img = 'player.png';
    }

    update() {
        if(this.y <= 0 || this.y + this.height >= game.height()){
            this.direction *= -1;
        }
    }
}


// View
let renderer = (() => {
    // Handles rendering Entities and rendering

    let scale = 0.5;

    // draw player
    function _drawPlayer(context, player){
        const playerImg = new Image();
        playerImg.src = `./imgs/${player.img}`;

        context.drawImage(
            playerImg, 
            innerWidth / 2- player.width / 2, 
            innerHeight - player.height + 40,
            player.width * scale,
            player.height * scale
        );
    }

    // draw enemy

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
        }

    }

    return {
        render: _render
    }

})();

// Controller
let game = (() => {
    let _entities = [];

    function _start() {
        console.log('started');
        _entities.push(new Player({x: 0, y:0}));
        //_entities.push(new Enemy(0,0));
        console.log(_entities);
        window.requestAnimationFrame(this.update.bind(this));
    };

    function _update() {
        for(var i = 0; i < _entities.length; i++){
            _entities[i].update();
        }

        renderer.render();

        window.requestAnimationFrame(this.update.bind(this));
    };

    return {
        start: _start,
        update: _update,
        entities: function() { return _entities; }
    }

})();

game.start();