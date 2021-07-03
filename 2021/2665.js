const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let graph = [];
let dist = [];
let N = 0;
const dx = [-1, 0 , 1, 0];
const dy = [0, -1, 0, 1];

rl.on('line', function (line) {
  if(N === 0) {
    N = +line;
  } else {
    graph.push(line.split('').map(num => +num));
    dist.push(line.split('').map(() => 999));
  }

  if(N === graph.length) rl.close();
})

.on('close', function () {
  let queue = [];
  dist[0][0] = 0;
  queue.push([0, 0]);
  while(queue.length) {
    let [x, y] = queue.shift();

    for(let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];
      if(nx < 0 || nx >= N || ny < 0 || ny >= N) continue;

      if(dist[x][y] >= dist[nx][ny]) continue;
      
      dist[nx][ny] = graph[nx][ny] === 0 ? dist[x][y] + 1 : dist[x][y];
      queue.push([nx, ny])
    }
  }

  console.log(dist[N - 1][N - 1]);
  process.exit();
});