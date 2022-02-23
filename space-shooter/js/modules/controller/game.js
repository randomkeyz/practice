import Player from './../model/player.js';
import Enemy from './../model/enemy.js';
import physics from './../controller/physics.js';
import renderer from './../view/renderer.js';
import { setRandomInterval } from './../utility.js';

// Controller
class Game {
    constructor( state = { running: true, score: 0, spawnEnemyInt: null }, keyState = {
        rightPressed: false,
        leftPressed: false,
        upPressed: false,
        downPressed: false,
        spacePressed: false
    }) {
        this.entities = []; // holds player and enemies
        this.projectiles = []; // holds all shots by player/enemies
        this.particles = []; // holds explosion particles
        this.height = innerHeight;
        this.keys = keyState;
        this.state = state;
        this.bgm = new Audio('/audio/tngend2.mp3');
        this.redAlert = new Audio('/audio/redalert.mp3');
        this.width = 1024;
        this.height = 576;
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
        this.redAlert.play();
        this.bgm.loop = true;
        this.bgm.volume -= 0.2;
        this.bgm.play();

        // Default entities on start
        this.entities.push(new Player());
        this.entities.push(new Enemy());
                
        // Run event listeners
        physics.startMovementDetect();

        // Create new enemies randomly. Max 5 num of entities allowed.
        /* const spawnEnemy = () => { 
            if(this.entities.length < 5) this.entities.push(new Enemy());
        }
        const spawnEnemyInt = setRandomInterval(spawnEnemy, 500, 2500); */

        this.state.spawnEnemyInt = this.spawnEnemy();

        requestAnimationFrame(this.update.bind(this));
    };

    end(){
        const main = document.querySelector('#main');
        const startingMenu = document.querySelector('.startingMenu');
        const gameOverMenu = document.querySelector('.gameOverMenu');
        const finalScore = document.querySelector('#finalScore');
        
        renderer.canvas.style.display = 'none';
        startingMenu.style.display = 'none';
        gameOverMenu.style.display = 'block';
        main.style.display = 'block';
        
        this.bgm.pause();
        finalScore.innerHTML = `${this.state.score}`;
        this.state.spawnEnemyInt.clear(); // Clear interval so no other enemies are spawned in the bg
    }

    replay(){
        const gameOverMenu = document.querySelector('.gameOverMenu');
        gameOverMenu.style.display = 'none';
        this.state.running = true;
        this.state.score = 0;
        this.entities.splice(0, this.entities.length); // Clear entity array
        
        renderer.canvas.style.display = 'block';
        main.style.display = 'none';
        renderer.context.clearRect(0, 0, this.width, this.height); // Clearing canvas
        
        this.redAlert.load(); // Restart audio from beginning
        this.bgm.load(); // Restart audio from beginning

        // Default entities on start
        this.entities.push(new Player());
        this.entities.push(new Enemy());
        this.state.spawnEnemyInt = this.spawnEnemy(); // Restart spawn enemy interval

        requestAnimationFrame(this.update());
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