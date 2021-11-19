const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
let map = [];
let M, N;
let dx = [0, 1, 0, -1];
let dy = [1, 0, -1, 0];

function dfs(x, y) {
  if(x === N - 1 && y === M - 1) {
    return 1;
  }

  if(dp[y][x] !== -1) {
    return dp[y][x];
  }

  dp[y][x] = 0;
  for(let i = 0; i < 4; i++) {
    let nx = x + dx[i];
    let ny = y + dy[i];

    if(nx >= 0 && ny >= 0 && nx < N && ny < M) {
      if(map[y][x] > map[ny][nx]) {
        dp[y][x] += dfs(nx, ny);
      }
    }
  }

  return dp[y][x];
}

rl.on('line', function (line) {
  if(!N) {
    [M, N] = line.split(' ').map(n => +n);
  } else {
    map.push(line.split(' ').map(n => +n));
    if(M === map.length) rl.close();
  }
})

.on('close', function () {
  dp = Array.from({ length: M }, () => Array(N).fill(-1));
  dfs(0, 0);
  console.log(dp[0][0]);
  process.exit();
});