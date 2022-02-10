import Player from './../model/player.js';
import Enemy from './../model/enemy.js';
import physics from './../controller/physics.js';
import renderer from './../view/renderer.js';
import { setRandomInterval } from '../utility.js';

// Controller
class Game {
    constructor() {
        this.entities = [];
        this.height = innerHeight;
    }

    start() {
        // Default entities on start
        this.entities.push(new Player());
        this.entities.push(new Enemy());
                
        // Run event listeners
        physics.startMovementDetect();

        // Create new enemies randomly
        const spawnEnemy = () => {
            console.log(Math.floor(Math.random() * innerWidth));
            if(this.entities.length < 10){
                this.entities.push(new Enemy());
            }
        };
        const spawnEnemyInt = setRandomInterval(spawnEnemy, 1000, 5000);

        window.requestAnimationFrame(this.update.bind(this));
    };

    // Gets called every sec
    update() {
        
        console.log(this.entities);
        for(var i = 0; i < this.entities.length; i++){
            // Calling update on enemy/player class respectively
            this.entities[i].update();
        }

        renderer.render();
        
        window.requestAnimationFrame(this.update.bind(this));
    };
}

const game = new Game();
Object.freeze(game);

export default game;