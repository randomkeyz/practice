// Controller
const Game = (() => {
    let _entities = [];
    let _height = innerHeight;

    function _start() {
        console.log('started');
        _entities.push(new Player({x: 0, y:0}));
        _entities.push(new Enemy({x: 0, y: 0}));
                
        Physics.startMovementDetect();

        window.requestAnimationFrame(this.update.bind(this));
    };

    function _update() {
        for(var i = 0; i < _entities.length; i++){
            _entities[i].update();
        }

        Renderer.render();
        
        window.requestAnimationFrame(this.update.bind(this));
    };

    return {
        start: _start,
        update: _update,
        entities: function() { return _entities; },
        height: _height
    }

})();

export default Game;