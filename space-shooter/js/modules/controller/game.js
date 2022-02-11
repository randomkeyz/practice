import Player from './../model/player.js';
import Enemy from './../model/enemy.js';
import physics from './../controller/physics.js';
import renderer from './../view/renderer.js';
import { setRandomInterval } from './../utility.js';

// Controller
class Game {
    constructor() {
        this.player = new Player();
        this.entities = [];
        this.projectiles = [];
        this.height = innerHeight;
    }

    start() {
        const redAlert = new Audio('/audio/redalert.mp3');
        const bgm = new Audio('/audio/tngend.mp3');
        redAlert.play();
        bgm.loop = true;
        bgm.play();

        // Default entities on start
        this.entities.push(this.player);
        this.entities.push(new Enemy());
                
        // Run event listeners
        physics.startMovementDetect();

        // Create new enemies randomly. Max 10 num of entities allowed.
        const spawnEnemy = () => { 
            if(this.entities.length < 10) this.entities.push(new Enemy());
        }
        const spawnEnemyInt = setRandomInterval(spawnEnemy, 1000, 5000);

        window.requestAnimationFrame(this.update.bind(this));
    };

    // Gets called every sec
    update() {
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