function solution(gems) {
  var answer = [1, gems.length];
  let gemSet = new Map();
  gemSet.set(gems[0], 1);
  let uniqGems = gems.filter((v, i , arr) => arr.indexOf(v) === i).length;
  
  let left = 0;
  let right = 0;
  
  while(left < gems.length) {
    console.log(gemSet)
      if(uniqGems === gemSet.size) {
          if(right - left < answer[1] - answer[0]) {
              answer = [left + 1, right + 1];
          }
          let stack = gemSet.get(gems[left])
          console.log('as', left, right , stack)
          if(stack > 1) {
              gemSet.set(gems[left], stack - 1)
          } else {
              gemSet.delete(gems[left])
          }
          left ++;
      } else if(right === gems.length - 1) {
          break;
      }
      if(uniqGems > gemSet.size && right !== gems.length - 1) {
          console.log(left, right)
          right ++;
          if(gemSet.has(gems[right])) {
              gemSet.set(gems[right], gemSet.get(gems[right]) + 1)
          } else {
              gemSet.set(gems[right], 1)
          }
          console.log('asd', gemSet)
      }
      if(left >= right && right !== 0) {
          break;
      }
  }
  
  return answer;
}

solution(["DIA", "RUBY", "RUBY", "DIA", "DIA", "EMERALD", "SAPPHIRE", "DIA"])