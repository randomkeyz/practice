const form = document.forms.pokequiz;
const correctAnswers = [
    "C",
    "A",
    "D",
    "B",
    "B",
    "D",
    "A",
    "C",
    "B",
    "D",
];
let userAnswers = [];

form.addEventListener('submit', e => {
    // Prevent default submit
    e.preventDefault();

    // Store user answers in array
    for(i = 1; i < 11; i++){
        let q = "q" + i;
        userAnswers.push(form[q].value);
    }

    //Compare user answers to correct answers
    let score = 0;
    
});