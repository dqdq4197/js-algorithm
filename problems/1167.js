const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let graph = [];
let N;
let answer = -1;
let maxVertex = 0;

function dfs(w, now, prev = -1) {
  if(answer < w) {
    answer = w;
    maxVertex = now;
  }

  graph[now].forEach(([next, cost]) => {
    if(next !== prev) dfs(w + cost, next, now);
  })
}

rl.on('line', function (line) {
  if(!N) {
    N = +line;
    graph = Array.from({ length: N + 1 }, () => []);
  } else {
    const [node, ...input] = line.split(' ').map(n => +n);
    
    for(let i = 0; i < input.length - 1; i += 2) {
      graph[node].push([input[i], input[i + 1]]);
    }

    if(--N === 0) {
      dfs(0, 1);
      dfs(0, maxVertex);
      console.log(answer);
      rl.close();
    }
  }
})