const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let T, N, K, W;
let graph = [];
let times = [];
let inDegree = [];

function topoLogicalSort() {
  let queue = [];
  let result = Array.from({ length: N + 1 }, () => 0);

  for(let i = 1; i <= N; i++) {
    if(inDegree[i] === 0){
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

  return result[W];
}

rl.on('line', function (line) {
  if(T === undefined) T = +line;
  else if(!N) {
    [N, K] = line.split(' ').map(n => +n);
    graph = Array.from({ length: N + 1 }, () => []);
    inDegree = Array.from({ length: N + 1 }, () => 0);
  } else if(times.length === 0) {
    times = [0, ...line.split(' ').map(n => +n)];
  } else if(K-- > 0) {
    let [A, B] = line.split(' ').map(n => +n);
    graph[A].push(B);
    inDegree[B]++;
  } else {
    W = +line;

    console.log(topoLogicalSort());
    N = 0;
    times = [];
    if(--T === 0) rl.close();
  }
})