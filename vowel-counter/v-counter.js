let form = document.querySelector("form");
let resultBox  =  document.querySelector(".result");
let vCount = userInput => {
    //create regex for vowels
    let regex = /([aeiou])/gi;
    let vowels = userInput.match(regex);
    return vowels.length;
};

form.addEventListener('submit', e => {
    e.preventDefault();
    let word = form.word.value; 
    resultBox.innerHTML = vCount(word);
});
