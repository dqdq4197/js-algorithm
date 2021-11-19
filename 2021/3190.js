const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let pos = [];
let N, K, L;
let directs = [];
let dx = [1, 0 , -1, 0]; // 동, 남, 서, 북
let dy = [0, 1, 0, -1];
let transDirL = [3, 0, 1, 2];
let transDirD = [1, 2, 3, 0];
let curDir = 0; // 동 => 0, 남 => 1, 서 => 2, 북 => 3
let result = 0;
let snake = [[1, 1]]; 

function play() {
  while(true) {
    if(directs.length) {
      const [time, dir] = directs[0];
      
      if(time === result) {
        directs.shift();
        curDir = dir === 'L' ? transDirL[curDir] : transDirD[curDir];
      }
    }

    result++;

    const [headR, headC] = snake.slice(-1)[0];

    let nx = headC + dx[curDir];
    let ny = headR + dy[curDir];
    let isOverlap = snake.filter(([r, c]) => r === ny && c === nx)[0];

    if(nx < 1 || ny < 1 || nx > N || ny > N || isOverlap) {
      console.log(result);
      return ;
    } else {
      let len = pos[ny].length;
      pos[ny] = pos[ny].filter(x => x !== nx);
      
      snake.push([ny, nx]);
      if(len === pos[ny].length) {
        // 사과 없는 경우
        snake.shift();
      }
    }
  }
}

rl.on('line', function (line) {
  if(!N) {
    N = +line;
    pos = Array.from({ length: N + 1 }, () => Array.from(N + 1).fill([]));
  } else if(K === undefined) {
    K = +line;
  } else if(K !== 0) {
    K--;
    let [row, col] = line.split(' ').map(n => +n);
    pos[row].push(col);
  } else if(!L) {
    L = +line;
  } else {
    let dir = line.split(' ');
    directs.push([+dir[0], dir[1]]);
  } 
  
  if(directs.length === L) rl.close();
})

.on('close', function () {
  play();
  process.exit();
});