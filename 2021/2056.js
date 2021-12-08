const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let N;
let input = [];
let graph = [];
let inDegree = [];
let times = [];
let idx = 0;

function solution() {
  let queue = [];
  let T = Array.from({ length: N + 1 }, () => 0);
  let S = [];
  for(let i = 1; i <= N; i++) {
    if(inDegree[i] === 0) {
      queue.push(i);
      T[i] = times[i];
    }
  }

  while(queue.length) {
    let num = queue.shift();
    S.push(num);
    graph[num].forEach(n => {
      inDegree[n]--;
      T[n] = Math.max(T[n], T[num] + times[n]);

      if(inDegree[n] === 0) {
        queue.push(n);
      }
    })
  }
  
  return Math.max(...T);
}

rl.on('line', function (line) {
  if(!N) {
    N = +line;
    inDegree = Array.from({ length: N + 1 }, () => 0);
    graph = Array.from({ length: N + 1 }, () => []);
    times = Array.from({ length: N + 1 }, () => 0);
  } else {
    idx++;
    let input = line.split(' ').map(n => +n);
    times[idx] = input[0];
    
    for(let i = 2; i < 2 + input[1]; i++) {
      graph[input[i]].push(idx);
      inDegree[idx]++;
    }
    if(N === idx) {
      console.log(solution());
      rl.close();
    }
  }
})