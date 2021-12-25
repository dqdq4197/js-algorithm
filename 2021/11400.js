const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let V, E;
let graph = [];
let inDegree = [];
let visit = [];

function dfs(start) {
  visit[start] = true;
  let queue = [[start, 0]];

  while(queue.length) {
    let [s, prev] = queue.shift();

    graph[s].forEach(n => {
      if(n !== prev) {
        inDegree[n]++;
      }
      if(!visit[n]) {
        queue.push([n, s]);
        visit[n] = true;
      }
    })
  }
}

rl.on('line', function (line) {
  if(!V) {
    [V, E] = line.split(' ').map(n => +n);
    graph = Array.from({ length: V + 1 }, () => []);
    inDegree = Array.from({ length: V + 1 }, () => 0);
    visit = Array.from({ length: V + 1 }, () => false);
  } else {
    let [A, B] = line.split(' ').map(n => +n);
    graph[A].push(B);
    graph[B].push(A);

    if(--E === 0) {
      dfs(1);
      console.log(inDegree);
      rl.close();
    }
  }
})