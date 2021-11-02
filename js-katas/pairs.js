function solution(str){
    let regex = /([a-zA-Z]{2})/;
    let pairs = str.split(regex).filter(pair => pair !== '' && pair.length > 1);
  
    if(str.length%2 === 1){
        pairs.push(str.slice(-1) + '_');
    }
    
    return pairs;
  }

solution('abcde');