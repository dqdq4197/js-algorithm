const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let M, N;
let input = [];
let dx = [0, 1, 0, -1];
let dy = [1, 0, -1, 0];
let cnt = 0;
let isContainZero = false;
let result = 0;
let queue = [];

function bfs() {
  let number = 0;

  while(number !== queue.length) {
    let [y, x] = queue[number];

    for(let i = 0; i < 4; i++) {
      let nx = x + dx[i];
      let ny = y + dy[i];

      if(nx >= 0 && ny >= 0 && nx < M && ny < N) {
        if(input[ny][nx] === 0) {
          cnt++;
          input[ny][nx] = input[y][x] + 1;
          result = Math.max(result, input[ny][nx] - 1);
          queue.push([ny, nx]);
        }
      } 
    }

    number++;
  }
}

rl.on('line', function (line) {
  if(!N) {
    [M, N] = line.split(' ').map(n => +n);
  } else {
    input.push(line.split(' ').map((n, i) => {
      if(n === '1' || n === '-1') {
        if(n === '1') queue.push([input.length, i]);
        cnt++;
      }
      if(!isContainZero && n === '0') isContainZero = true;
      return +n
    }));
    if(input.length === N) rl.close();
  }
})

.on('close', function () {
  bfs();

  if(!isContainZero) {
    console.log(0);
  } else if(M * N !== cnt) {
    console.log(-1);
  } else {
    console.log(result);
  }
  process.exit();
});