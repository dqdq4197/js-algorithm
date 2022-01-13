const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let map = [];
let R, C;
let dx = [0, 1, 0, -1];
let dy = [1, 0, -1, 0];
let housePos, curPos;
let waterPos = [];

rl.on('line', function (line) {
  if(!R) {
    [R, C] = line.split(' ').map(n => +n);
  } else {
    map.push(line.split(''));
    if(map.length === R) rl.close();
  }
})

.on('close', function () {
  let visit = Array.from({ length: R }, () => Array(C).fill(false));
  for(let i = 0; i < R; i++) {
    for(let j = 0; j < C; j++) {
      if(map[i][j] === 'D') {
        housePos = [i, j];
        continue;
      }
      if(map[i][j] === 'S') {
        curPos = [i, j];
        continue;
      }
      if(map[i][j] === '*') {
        waterPos.push([i, j]);
      }
    }
  }

  visit[curPos[0]][curPos[1]] = true;
  let queue = [[...curPos, 0]];
  while(queue.length) {
    let temp = [...queue];
    queue = [];
    waterCnt = waterPos.length;

    while(waterCnt--) {
      let wPos = waterPos.shift();

      for(let i = 0; i < 4; i++) {
        let waterX = wPos[1] + dx[i];
        let waterY = wPos[0] + dy[i];

        if(waterX >= 0 && waterY >= 0 && waterX < C && waterY < R) {
          const now = map[waterY][waterX];
          if(now === '.' || now === 'S') {
            waterPos.push([waterY, waterX]);
            map[waterY][waterX] = '*';
          }
        }
      }
    }

    while(temp.length) {
      let [y, x, dist] = temp.shift();
  
      for(let i = 0; i < 4; i++) {
        let nx = x + dx[i];
        let ny = y + dy[i];
  
        if(nx >= 0 && ny >= 0 && nx < C && ny < R && !visit[ny][nx]) {
          const now = map[ny][nx];
          
          if(now === 'D') {
            console.log(dist + 1);
            return ;
          }
          if(now === '.' ) {
            visit[ny][nx] = true;
            queue.push([ny, nx, dist + 1]);
          } 
        }
      }
    }
  }

  console.log("KAKTUS");

  process.exit();
});