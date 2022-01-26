let rps = ['rock', 'paper', 'scissor'];
let result = document.querySelector('.results');

// Opponents random choice
let opponentChoice = rps[Math.floor(Math.random() * rps.length)];
let opponentCard = document.querySelector(`.opponent .${opponentChoice}`);

// Compare choices and determine winner
let resultsCalc = (playersChoice, computerChoice) => {
    console.log(playersChoice, computerChoice);
    if(playersChoice == computerChoice){
        return "It's a tie!";
    }
    switch(playersChoice){
        case "rock":
            if(computerChoice == "scissor") return "Victory!";
            return "You lose!";
            break;
        case "paper":
            if(computerChoice == "rock") return "Victory!";
            return "You lose!";
            break;
        case "scissor":
            if(computerChoice == "paper") return "Victory!";
            return "You lose!";
            break;
    }
};

// Handling player
rps.forEach(choice => {
    let img = document.querySelector(`.player .${choice}`);

    // Callback for hover listener. Updating card img
    let cardHover = () => { img.src = `images/${choice}.png`; };

    // Callback for hoverout listener. Change image to default
    let cardHoverOut = () => { img.src = 'images/back-card.png'; };

    // Remove click event listener
    let selectCard = e => {
        // Updated image to selected choice
        let clickedImg = document.querySelector(`.player .${e.target.className}`);
        clickedImg.src = `images/${e.target.className}.png`;

        // Remove event listeners from selected card
        clickedImg.removeEventListener('mouseenter', cardHover);
        clickedImg.removeEventListener('mouseout', cardHoverOut);
        clickedImg.removeEventListener('click', selectCard);

        // Cloning unclicked card nodes to remove remaining event listeners
        let rpsNew = rps.filter(hand => hand !== e.target.className);
        rpsNew.forEach(option => {
            let oldEle = document.querySelector(`.player .${option}`);
            let newEle = oldEle.cloneNode(true);
            oldEle.parentNode.replaceChild(newEle, oldEle);
        });

        // Show opponent's choice
        opponentCard.src = `images/${opponentChoice}.png`;

        // Update dom with game result
        result.innerHTML = resultsCalc(e.target.className, opponentChoice);

    };

    // Add hover event listeners
    img.addEventListener('mouseenter', cardHover);
    img.addEventListener('mouseout', cardHoverOut);
    img.addEventListener('click', selectCard);
});