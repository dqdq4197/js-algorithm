const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
let input = [];
let R = 0;
let C = 0;
const dx = [0, 1, 0, -1];
const dy = [1, 0, -1, 0];
visit = new Array(26).fill(false);
let result = 0;

function dfs(x, y, cnt) {
  for(let i = 0; i < 4; i++) {
    let nx = x + dx[i];
    let ny = y + dy[i];

    if(nx >= 0 && ny >= 0 && nx < R && ny < C) {
      let char = input[nx][ny];
      if(!visit[char.charCodeAt() - 65]) {
        visit[char.charCodeAt() - 65] = true;
        dfs(nx, ny, cnt + 1);
        visit[char.charCodeAt() - 65] = false;
      }
    }
  }

  result = Math.max(result, cnt);
}

rl.on('line', function (line) {
  if(!R) {
    [R, C] = line.split(' ').map(n => +n);
  } else {
    input.push(line.split(''));    
    if(input.length === R) rl.close();
  }
})

.on('close', function () {
  visit[input[0][0].charCodeAt() - 65] = true;
  dfs(0, 0, 1)
  console.log(result);
  process.exit();
});