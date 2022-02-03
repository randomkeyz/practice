//given an array and a integer, find the first pair of numbers in the array that add up to the given integer

function sumPairs(numbers, target) {
  for(let i = 0; i < numbers.length; i++){
    let targetCompare = target - numbers[i]; //0
    let firstNum = numbers[i]; //10
    for(let n = i + 1; n < numbers.length; n++){

      if(targetCompare == numbers[n]){
        console.log([numbers[i], numbers[n]]);
        return [numbers[i], numbers[n]];
      }
    }
  }
}

sumPairs([10, 5, 2, 3, 7, 5], 10)
//[3,7]