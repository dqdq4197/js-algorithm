const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let N, L, R;
let graph = [];
let visit = [];

function dfs(start, end) {
  let queue = [[start,0, 0]];
  visit[start] = true;

  while(queue.length) {
    let [now, dist, maxDist] = queue.shift();
    if(now === end) {
      console.log(dist - maxDist);
      break;
    }

    for(let i = 0; i < graph[now].length; i++) {
      let [n, c] = graph[now][i];
      if(visit[n]) continue;
      visit[n] = true;    
      queue.push([n, dist + c, Math.max(maxDist, c)]); 
    }
  }
}

rl.on('line', function (line) {
  if(!N) {
    [N, L, R] = line.split(' ').map(n => +n);
    graph = Array.from({ length: N + 1 }, () => []);
    visit = Array.from({ length: N + 1 }, () => false);
  } else {
    let [a, b, cost] = line.split(' ').map(n => +n);
    graph[a].push([b, cost]);
    graph[b].push([a, cost]);
  }
})

.on('close', function () {
  dfs(L, R);
  process.exit();
});