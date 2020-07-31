function solution(begin, target, words) {
  var answer = 51;
  let checks = Array(51);
  if(!words.filter(v => v === target).length) return 0;
  
  function dfs(depth, begin, target, words, check) {
      if(begin === target) {
          answer = answer > depth ? depth : answer;
          console.log('------------',depth)
          return answer;
      }
      
      for(let i = 0; i < words.length; i++) {
          if(!check[i] && compare(begin, words[i])) {
              check[i] = true;
              console.log(begin, words[i], depth);
              dfs(depth + 1, words[i], target, words, check);
              check[i] = false;
          }
      }
  }
  dfs(0, begin, target, words, checks);
  
  return answer;
}

function compare(w1, w2) {
  let cnt = 0;
  for(let i = 0; i < w1.length; i++) {
      if(w1[i] === w2[i]) {
          cnt ++;
      }
  }
  return cnt === w1.length - 1 ? true : false;
}