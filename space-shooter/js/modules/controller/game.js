import Player from './../model/player.js';
import Enemy from './../model/enemy.js';
import physics from './../controller/physics.js';
import renderer from './../view/renderer.js';

// Controller
class Game {
    constructor() {
        this.entities = [];
        this.height = innerHeight;
    }

    start() {
        console.log('started');
        this.entities.push(new Player({x: 0, y:0}));
        this.entities.push(new Enemy({x: 0, y: 0}));
                
        physics.startMovementDetect();

        window.requestAnimationFrame(this.update.bind(this));
    };

    update() {
        for(var i = 0; i < this.entities.length; i++){
            this.entities[i].update();
        }

        renderer.render();
        
        window.requestAnimationFrame(this.update.bind(this));
    };
}

const game = new Game();
Object.freeze(game);

export default game;