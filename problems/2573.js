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
let visit;

function dfs(y, x) {
  visit[y][x] = true;

  for(let i = 0; i < 4; i++) {
    let nx = x + dx[i];
    let ny = y + dy[i];

    if(nx >= 0 && ny >= 0 && nx < M && ny < N && !visit[ny][nx]) {
      if(input[ny][nx] > 0) {
        dfs(ny, nx);
      }
    }
  }
}

rl.on('line', function (line) {
  if(!N) {
    [N, M] = line.split(' ').map(n => +n);
  } else {
    input.push(line.split(' ').map(n => +n));
    if(N === input.length) rl.close();
  }
})

.on('close', function () {

  while(true) {
    visit = Array.from({ length: N }, () => Array(M).fill(false));
    let k = 0;
    for(let i = 0; i < N; i++) {
      for(let j = 0; j < M; j++) {
        
        if(input[i][j] > 0) {
          k++;
          let cnt = 0;
          for(let z = 0; z < 4; z++) {
            let nx = j + dx[z];
            let ny = i + dy[z];

            if(nx >= 0 && ny >= 0 && nx < M && ny < N) {
              if(input[ny][nx] <= 0 && result <= input[ny][nx]) {
                cnt++;
              }
            }
          }

          if(input[i][j] <= cnt) {
            input[i][j] = result - 1;
          } else {
            input[i][j] -= cnt;
          }
        }
      }
    }
    
    result--;
    
    let cnt = 0;
    for(let i = 0; i < N; i++) {
      for(let j = 0; j < M; j++) {
        if(input[i][j] > 0 && !visit[i][j]) {
          dfs(i, j);
          cnt++;
        }
      }
    }
    
    if(cnt < 2 && k === 0) {
      console.log(0);
      break;
    }

    if(cnt >= 2) {
      console.log(result * -1);
      break;
    }
  }
  
  process.exit();
});
