import Player from './../model/player.js';
import Enemy from './../model/enemy.js';
import physics from './../controller/physics.js';
import renderer from './../view/renderer.js';
import { setRandomInterval } from './../utility.js';

// Controller
class Game {
    constructor( state = { running: true, score: 0 }, keyState = {
        rightPressed: false,
        leftPressed: false,
        upPressed: false,
        downPressed: false,
        spacePressed: false
    }) {
        this.player = new Player();
        this.entities = []; // holds player and enemies
        this.projectiles = []; // holds all shots by player/enemies
        this.particles = []; // holds explosion particles
        this.height = innerHeight;
        this.keys = keyState;
        this.state = state;
        this.bgm = new Audio('/audio/tngend2.mp3');
    }

    spawnEnemy() {
        const spawn = () => { 
            if(this.entities.length < 5) this.entities.push(new Enemy());
        }
        const spawnEnemyInt = setRandomInterval(spawn, 500, 2500);

        return spawnEnemyInt;
    }
    

    // Should only be called once. Multiple calls will result in compounding loops and increase in game speed
    start() {
        const redAlert = new Audio('/audio/redalert.mp3');
        redAlert.play();
        this.bgm.loop = true;
        this.bgm.volume -= 0.2;
        this.bgm.play();

        // Default entities on start
        this.entities.push(this.player);
        this.entities.push(new Enemy());
                
        // Run event listeners
        physics.startMovementDetect();

        // Create new enemies randomly. Max 5 num of entities allowed.
        /* const spawnEnemy = () => { 
            if(this.entities.length < 5) this.entities.push(new Enemy());
        }
        const spawnEnemyInt = setRandomInterval(spawnEnemy, 500, 2500); */

        this.spawnEnemy();

        requestAnimationFrame(this.update.bind(this));
    };

    end(){
        const wrapper = document.querySelector('#main');
        const canvas = document.querySelector('canvas');
        canvas.remove();
        this.bgm.pause();
        wrapper.innerHTML = `<h1>GAME OVER</h1><h3>Final Score: ${this.state.score}</h3>`;
    }

    // Gets called every sec
    update() {
        if(this.state.running === false) return this.end();
        physics.detectCollision();
        renderer.render();

        requestAnimationFrame(this.update.bind(this));
    };
}

const game = new Game();
Object.freeze(game);

export default game;