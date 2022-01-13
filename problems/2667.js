const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
let input = [];

rl.on('line', function (line) {
  input.push(line);
})

.on('close', function () {
  // 입력 받기
  const N = input.shift();
  let table = [];
  for(let i = 0; i < N; i++) {
    table[i] = input[i].split('').map(v => Number(v))
  }
  
  // // 방문 초기화 --- 
  let v = Array.from({length: N}, () => []);

  for(let i = 0; i < N; i++) {
    for(let j = 0; j < N; j++) {
      v[i][j] = false;
    }
  }

  let dx = [0, 0, 1, -1];
  let dy = [1, -1, 0, 0];
  let queue = [];
  let answer = [];

  function dfs(row, col, num) {
    queue.push([row, col])
    v[row][col] = true;
    num++;

    while(queue.length) {
      let [curX, curY] = queue.shift();
      for(let i = 0; i < 4; i++) {
        let nx = curX + dx[i];
        let ny = curY + dy[i];

        if(nx >= 0 && ny >= 0 && nx < N && ny < N){
          if(!v[nx][ny] && table[nx][ny] === 1) {
            queue.push([nx, ny]);
            v[nx][ny] = true;
            num ++;
          }
        }
      }
    }

    answer.push(num);
  }

  for(let i = 0; i < N; i++) {
    for(let j = 0; j < N; j++) {
      if(table[i][j] === 1 && !v[i][j]) {
        dfs(i, j, 0);
      }
    }
  }

  console.log(answer.length);
  answer.sort((a,b) => a - b);
  answer.forEach(num => console.log(num))

  process.exit();
});