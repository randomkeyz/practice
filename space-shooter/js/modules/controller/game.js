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
        this.entities = [];
        this.projectiles = [];
        this.height = innerHeight;
        this.keys = keyState;
        this.running = running;
    }

    // Should only be called once. Multiple calls will result in compounding loops and increase in game speed
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

            requestAnimationFrame(this.update.bind(this));

            console.log('start');
    };

    // Gets called every sec
    update() {
        this.entities.forEach((entity, index) => {
            entity.update(index);
        });

        renderer.render();
        
        requestAnimationFrame(this.update.bind(this));
    };
}

const game = new Game();
Object.freeze(game);

export default game;