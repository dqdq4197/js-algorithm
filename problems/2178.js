const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let graph = [];
let dist = [];
let N = 0;
let M = 0;
const dx = [-1, 0 , 1, 0];
const dy = [0, -1, 0, 1];

rl.on('line', function (line) {
  if(N === 0) {
    [N, M] = line.split(' ').map(num => +num);
  } else {
    graph.push(line.split('').map(num => +num));
    dist.push(line.split('').map(() => 10001));
  }

  if(N === graph.length) rl.close();
})

.on('close', function () {
  let queue = [];
  dist[0][0] = 1;
  queue.push([0, 0]);
  while(queue.length) {
    let [x, y] = queue.shift();

    for(let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];
      if(nx < 0 || nx >= N || ny < 0 || ny >= M) continue;
      
      if(graph[nx][ny] === 0) continue;

      if(dist[x][y] + 1 >= dist[nx][ny]) continue;

      dist[nx][ny] = dist[x][y] + 1;
      queue.push([nx, ny])
    }
  }
  console.log(dist[N - 1][M - 1]);
  process.exit();
});