const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let input = [];
let N;
let costs = [];
let dx = [0, 1, 0, -1];
let dy = [1, 0, -1, 0];
let result = 0;

function dfs(y, x) {
  if(!costs[y][x]) {
    costs[y][x] = 1;
    let cost = 0;

    for(let i = 0; i < 4; i++) {
      let nx = x + dx[i];
      let ny = y + dy[i];

      if(nx >= 0 && ny >= 0 && nx < N && ny < N) {
        if(input[y][x] < input[ny][nx]) {
          cost = Math.max(cost, dfs(ny, nx))
        }
      }
    }

    costs[y][x] += cost;
  }

  return costs[y][x];
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
  costs = Array.from({ length: N }, () => Array(N).fill(null));
  
  for(let i = 0; i < N; i++) {
    for(let j = 0; j < N; j++) {
      result = Math.max(result, dfs(i, j));
    }
  }
  
  console.log(result);
  process.exit();
});