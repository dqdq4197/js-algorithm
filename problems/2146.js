const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let N;
let input = [];
let visit = [];
let dx = [0, 1, 0, -1];
let dy = [1, 0, -1, 0];
let result = 10001;

function bfs(r, c) {
  let queue = [[r, c]];
  let coors = [];
  visit[r][c] = true;

  while(queue.length) {
    let [y, x] = queue.shift();

    let isOutside = false;
    for(let i = 0; i < 4; i++) {
      let nx = x + dx[i];
      let ny = y + dy[i];

      if(nx >= 0 && ny >= 0 && nx < N && ny < N && !visit[ny][nx]) {
        if(input[ny][nx]) {
          visit[ny][nx] = true;
          queue.push([ny, nx]);
        } else {
          isOutside = true;
        }
      }
    }

    if(isOutside) {
      coors.push([y, x]);
    }
  }

  return coors
}

rl.on('line', function (line) {
  if(!N) {
    N = +line;
  } else {
    input.push(line.split(' ').map(n => +n));
    if(input.length === N) rl.close();
  }
})

.on('close', function () {
  visit = Array.from({ length: N }, () => Array(N).fill(false));
  let isLands = [];

  for(let i = 0; i < N; i++) {
    for(let j = 0; j < N; j++) {
      if(!visit[i][j] && input[i][j]) {
        isLands.push(bfs(i, j));
      }
    }
  }

  for(let i = 0; i < isLands.length; i++) {
    for(let j = i + 1; j < isLands.length; j++) {
      let nowIsLand = isLands[i];
      let nextIsLand = isLands[j];

      for(let k = 0; k < nowIsLand.length; k++) {
        let [nowY, nowX] = nowIsLand[k];
  
        for(let w = 0; w < nextIsLand.length; w++) {
          let [nextY, nextX] = nextIsLand[w];
  
          result = Math.min(result, Math.abs(nowY - nextY) + Math.abs(nowX - nextX) - 1);
        }
      }
    }
  }

  console.log(result);

  process.exit();
});