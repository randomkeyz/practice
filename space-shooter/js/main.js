import game from './modules/controller/game.js';

const startBtn = document.querySelector('#startGame');
startBtn.onclick = () => {
    game.start();
    startBtn.remove(); // Remove btn so that start animation loop isnt triggered again
};