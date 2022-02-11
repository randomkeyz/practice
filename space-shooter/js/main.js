import game from './modules/controller/game.js';




const startBtn = document.querySelector('#startGame');
startBtn.addEventListener('click', (e) => {
    e.preventDefault();
    game.start();
});
