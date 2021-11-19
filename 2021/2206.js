const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let map = [];
let N, M;
let dx = [0, 1, 0, -1];
let dy = [1, 0, -1, 0];
let result = -1;

rl.on('line', function (line) {
  if(!N) {
    [N, M] = line.split(' ').map(n => +n);
  } else {
    map.push(line.split('').map(n => +n));
    if(map.length === N) rl.close();
  }
})

.on('close', function () {
  visit = Array.from({ length: N }, () => Array.from({ length: M }, () => Array(2).fill(false)));

  let queue = [[0, 0, 1, 1]];
  while(queue.length) {
    let [x, y, available, dist] = queue.shift();

    if(x === M - 1 && y === N - 1) {
      result = dist;
      break ;
    }

    for(let i = 0; i < 4; i++) {
      let nx = x + dx[i];
      let ny = y + dy[i];
  
      if(nx >= 0 && ny >= 0 && nx < M && ny < N && !visit[ny][nx][available]) {
        if(map[ny][nx] === 1) {
          if(available) {
            visit[y][x][0] = true;
            queue.push([nx, ny, 0, dist + 1])
          }
        } else {
          visit[ny][nx][available] = true;
          queue.push([nx, ny, available, dist + 1])
        }
      }
    }
  }

  console.log(result);
  process.exit();
});