function solution(number){
  //Check if number is negative and set to 0
  if(number < 0) return 0;
  
  // Find all multiples of 3 or 5 and push them into set
  let counter = 1; 
  let current3 = 0;
  let current5 = 0;
  const allMultiples = new Set();
  let multipleSum = 0;
  
  do{
    // Calc multiple if less that number
    if(current3 < number) current3 = counter * 3;   
    if(current5 < number) current5 = counter * 5;
    
    // Check if new multiple is greater than number and add to set if true
    if(current3 < number) allMultiples.add(current3);
    if(current5 < number) allMultiples.add(current5);

    counter++;
  } while (current3 < number || current5 < number);
  
  // Add set data together 
  allMultiples.forEach(function(multiple){
    multipleSum += multiple;
  });

  return multipleSum;
}
