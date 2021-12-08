const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let N;
let times = [null];
let graph = [];
let idx = 0;
let inDegree = [];

function solution() {
  let queue = [];
  let result = Array.from({ length: N + 1 }, () => 0);
  
  for(let i = 1; i <= N; i++) {
    if(inDegree[i] === 0) {
      queue.push(i);
      result[i] += times[i];
    }
  }

  while(queue.length) {
    let num = queue.shift();
    
    graph[num].forEach(n => {
      inDegree[n]--;
      result[n] = Math.max(result[num] + times[n], result[n]);

      if(inDegree[n] === 0) {
        queue.push(n);
      }
    })
  }
  
  return result.slice(1);
}

rl.on('line', function (line) {
  if(!N) {
    N = +line;
    inDegree = Array.from({ length: N + 1 }, () => 0);
    graph = Array.from({ length: N + 1 }, () => []);
  } else {
    idx++;
    let input = line.split(' ').map(n => +n);
    times.push(input[0]);

    for(let i = 1; i < input.length; i++) {
      let cur = input[i];
      if(cur === -1) break;
      graph[cur].push(idx);
      inDegree[idx]++;
    }

    if(idx === N) {
      console.log(solution().join('\n'));
      rl.close();
    }
  }
})