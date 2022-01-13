const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let N, M;
let graph = [];
let path = [];
let result = 'YES';
let visit = [];

function bfs(start) {
  let stack = [start];
  visit[start] = true;

  while(stack.length) {
    let now = stack.pop();

    for(let i = 0; i < N; i++) {
      if(graph[now - 1][i] && !visit[i + 1]) {
        visit[i + 1] = true;
        stack.push(i + 1);
      }
    }
  }
}

rl.on('line', function (line) {
  if(!N) {
    N = +line;
    visit = Array.from({ length: N + 1 }, () => false);
  } else if(!M) {
    M = +line;
  } else if(graph.length !== N) {
    graph.push(line.split(' ').map(n => +n));
  } else {
    path = line.split(' ').map(n => +n);
    bfs(path[0]);
    
    for(let i = 1; i < path.length; i++) {
      if(!visit[path[i]]) {
        result = "NO";
        break;
      }
    }
    console.log(result);
    rl.close();
  }
})