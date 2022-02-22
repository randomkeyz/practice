import Player from './../model/player.js';
import Enemy from './../model/enemy.js';
import physics from './../controller/physics.js';
import renderer from './../view/renderer.js';
import { setRandomInterval } from './../utility.js';

// Controller
class Game {
    constructor( running = false, keyState = {
        rightPressed: false,
        leftPressed: false,
        upPressed: false,
        downPressed: false,
        spacePressed: false
    }) {
        this.player = new Player();
        this.entities = []; // holds player and enemies
        this.projectiles = []; // holds all shots by player/enemies
        this.particles = []; // holds stars in the bg
        this.height = innerHeight;
        this.keys = keyState;
        this.running = running;
    }
    

    // Should only be called once. Multiple calls will result in compounding loops and increase in game speed
    start() {
        const redAlert = new Audio('/audio/redalert.mp3');
        const bgm = new Audio('/audio/tngend2.mp3');
        redAlert.play();
        bgm.loop = true;
        bgm.volume -= 0.2;
        bgm.play();

        // Default entities on start
        this.entities.push(this.player);
        this.entities.push(new Enemy());
                
        // Run event listeners
        physics.startMovementDetect();

        // Create new enemies randomly. Max 5 num of entities allowed.
        const spawnEnemy = () => { 
            if(this.entities.length < 5) this.entities.push(new Enemy());
        }
        const spawnEnemyInt = setRandomInterval(spawnEnemy, 500, 2500);

        requestAnimationFrame(this.update.bind(this));
    };

    // Gets called every sec
    update() {
        physics.detectCollision();
        renderer.render();

        requestAnimationFrame(this.update.bind(this));
    };
}

const game = new Game();
Object.freeze(game);

export default game;