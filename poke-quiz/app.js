const form = document.forms.pokequiz;
const correctAnswers = ["C","A","D","B","B","D","A","C","B","D",];
let userAnswers = [];
let score = 0;

form.addEventListener('submit', e => {
    // Prevent default submit
    e.preventDefault();

    // Store user answers in array
    for(i = 1; i < 11; i++){
        userAnswers.push(form["q" + i].value);
    }

    //Compare user answers to correct answers
    userAnswers.forEach((answer, index) => {
        if(answer === correctAnswers[index]) score += 10;
    });
    

    // Update DOM
    score < 100 ? document.querySelector('#main-title').innerHTML = `You are ${score}% of the way to being a Pokemon Master!` : document.querySelector('#main-title').innerHTML = `Congratulations! You ARE a Pokemon Master!`

    window.scroll(0,0);
});