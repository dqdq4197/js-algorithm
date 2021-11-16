const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let input = [];
let N, M;
let dx = [0, 1, 0, -1];
let dy = [1, 0, -1, 0];
let result = 0;
let visit = [];

function exception(y, x) {
  // ㅗ or ㅜ
  if(y + 1 < N && x + 2 < M) {
    // ㅗ
    let sum1 = input[y + 1][x] + input[y][x + 1] + input[y + 1][x + 1] + input[y + 1][x + 2]
    // ㅜ
    let sum2 = input[y][x] + input[y][x + 1] + input[y + 1][x + 1] + input[y][x + 2];

    result = Math.max(result, sum1, sum2);
  }

  // ㅏ or ㅓ
  if(y + 2 < N && x + 1 < M) {
    // ㅏ
    let sum1 = input[y][x] + input[y + 1][x] + input[y + 1][x + 1] + input[y + 2][x];
    // ㅓ
    let sum2 = input[y][x + 1] + input[y + 1][x] + input[y + 1][x + 1] + input[y + 2][x + 1];

    result = Math.max(result, sum1, sum2);
  }
}

function dfs(y, x, cnt, sum) {
  if(cnt === 4) {
    result = Math.max(result, sum);
    return ;
  } 

  for(let i = 0; i < 4; i++) {
    let nx = x + dx[i]; 
    let ny = y + dy[i];
    if(nx >= 0 && ny >= 0 && nx < M && ny < N && !visit[ny][nx]) {
      visit[ny][nx] = true;
      dfs(ny, nx, cnt + 1, sum + input[ny][nx]);
      visit[ny][nx] = false;
    }
  }
}

rl.on('line', function (line) {
  if(!N) {
    [N, M] = line.split(' ').map(n => +n);
  } else {
    input.push(line.split(' ').map(n => +n));
    if(input.length === N) rl.close();
  }
})

.on('close', function () {
  visit = Array.from({ length: N }, () => Array.from({ length: M }, () => false));

  for(let i = 0; i < N; i++) {
    for(let j = 0; j < M; j++) {
      visit[i][j] = true;
      dfs(i, j, 1, input[i][j]);
      visit[i][j] = false;
      exception(i, j);
    }
  }
  console.log(result);

  process.exit();
});