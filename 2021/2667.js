const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
let input = [];

rl.on('line', function (line) {
  input.push(line.split(' ').map(num => Number(num)));
})

.on('close', function () {
  // 입력 받기
  const N = input[0][0];
  let table = [];
  for(let i = 1; i < N + 1; i++) {
    table.push(input[i]);
  }
  
  // 방문 초기화 --- 
  let v = Array.from({length: N}, () => []);

  for(let i = 0; i < N; i++) {
    for(let j = 0; j < N; j++) {
      v[i][j] = false;
    }
  }

  let queue = [];
  let answer = [];

  function dfs(row, col, num) {
    if(!v[row][col]) {
      v[row][col] = true;
      num++;
    }

    if(col + 1 !== N && !v[row][col + 1] && table[row][col + 1] === 1) {
      queue.push([row, col + 1])
    }
    if(row + 1 !== N && !v[row + 1][col] && table[row + 1][col] === 1) {
      queue.push([row + 1, col])
    }
    if(col - 1 >= 0 && !v[row][col - 1] && table[row][col - 1] === 1) {
      queue.push([row, col - 1])
    }
    if(row - 1 >= 0 && !v[row - 1][col] && table[row - 1][col] === 1) {
      queue.push([row - 1, col])
    }

    if(queue.length) {
      let [r, c] = queue.pop();
      dfs(r, c, num);
    } else {
      answer.push(num);
    }
  }

  for(let i = 0; i < N; i++) {
    for(let j = 0; j < N; j++) {
      if(table[i][j] === 1) {
        dfs(i, j, 0);
        table = table.map((r, i) => r.map((c,idx) => v[i][idx] === true ? 0 : c));
      }
    }
  }
  console.log(answer.length);
  answer.sort((a,b) => a - b);
  answer.forEach(num => console.log(num))

  process.exit();
});