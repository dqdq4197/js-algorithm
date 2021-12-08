const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let N, M;
let inDegree = [];
let queue = [];
let graph = [];
let result = [];

function topologicalSort() {
  while(queue.length) {
    let num = queue.shift();
    result.push(num);
    graph[num].forEach(n => {
      inDegree[n] -= 1;
      if(inDegree[n] === 0) {
        queue.push(n);
        inDegree[n] = -1;
      }
    })
  }
}

rl.on('line', function (line) {
  if(!N) {
    [N, M] = line.split(' ').map(n => +n);
    graph = Array.from({ length: N + 1 }, () => []); 
    inDegree = Array.from({ length: N + 1 }, () => 0);
  } else {
    let [A, B] = line.split(' ').map(n => +n);
    graph[A].push(B);
    inDegree[B] += 1;
    M--;
    if(M === 0) rl.close();
  }
})

.on('close', function () {
  for(let i = 1; i <= N; i++) {
    if(inDegree[i] === 0) {
      queue.push(i);
      inDegree[i] = -1;
    }
  }

  topologicalSort();
  console.log(result.join(' '));
  process.exit();
});