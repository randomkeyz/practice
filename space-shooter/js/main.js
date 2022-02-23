import game from './modules/controller/game.js';

const startBtn = document.querySelector('#startGame');
const replayBtn = document.querySelector('#replayGame');

startBtn.onclick = () => {
    const startBtn = document.querySelector('#startGame');
    document.querySelector('canvas').style.display = 'block';
    document.querySelector('#main').style.display = 'none';
    game.start();
};

replayBtn.onclick = () => game.replay();