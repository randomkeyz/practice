import game from './modules/controller/game.js';

const startBtn = document.querySelector('#startGame');
startBtn.onclick = () => {
    document.querySelector('canvas').style.display = 'block';
    game.start();
    startBtn.remove(); // Remove btn so that start animation loop isnt triggered again
};