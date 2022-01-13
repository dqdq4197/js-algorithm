//프로그래머스 3단계. 불량 사용자 문제
function solution(user_id, banned_id) {
  let table = [];
  let answerSet = new Set();
  
  for(let i = 0; i < banned_id.length; i++) {
      table[i] = user_id.filter(id => {
          if(banned_id[i].length !== id.length) {
              return false;
          } else {
              let isContain = true;
              for(let j = 0; j < banned_id[i].length; j++) {
                  if(banned_id[i][j] !== '*' && banned_id[i][j] !== id[j]) {
                      isContain = false;
                      break;
                  } 
              } 
              return isContain;
          }
      })
  }
  
  function dfs(idx, setArr) {
      if(idx === banned_id.length) {
          answerSet.add([...setArr].sort().join(''))
          return ;
      }
      
      table[idx].forEach(v => {
          let newSet = new Set([...setArr, v])
          if(newSet.size !== setArr.size) {
              dfs(idx + 1, newSet)
          }
      })
  }
  dfs(0, new Set())
  return answerSet.size;
}