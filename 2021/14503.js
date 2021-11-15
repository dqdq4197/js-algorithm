const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
let input = [];
let N, M;
let curPos;
let visit = [];
let cnt = 0;
let dx = [-1, 0, 1, 0]; //북 동 남 서
let dy = [0, -1, 0, 1];
let direct = [3, 0, 1, 2];
let backX = [0, -1, 0, 1];
let backY = [1, 0, -1, 0];

function cleaning(x, y, dir, stack) {
  let nx = x + dx[dir];
  let ny = y + dy[dir];

  if(nx >= 0 && ny >= 0 && nx < M && ny < N && input[ny][nx] === 0 && !visit[ny][nx]) {
    visit[ny][nx] = true;
    cnt ++;
    cleaning(nx, ny, direct[dir], 0);
  } else {
    if(stack === 4) {
      let backNx = x + backX[dir];
      let backNy = y + backY[dir];

      if(backNx >= 0 && backNy >= 0 && backNx < M && backNy < N && input[backNy][backNx] === 0) {
        cleaning(backNx, backNy, dir, 0);
      } else {
        return ;
      }
    } else {
      cleaning(x, y, direct[dir], stack + 1);
    }
  }
}

rl.on('line', function (line) {
  if(!N) {
    [N, M] = line.split(' ').map(n => +n);
  } else if(!curPos) {
    curPos = line.split(' ').map(n => + n);
  } else {
    input.push(line.split(' ').map(n => +n));
    if(input.length === N) rl.close();
  }
})

.on('close', function () {
  visit = Array.from({ length: N }, () => new Array(M).fill(false));
  visit[curPos[0]][curPos[1]] = true;
  cnt ++;
  cleaning(curPos[1], curPos[0], curPos[2], 0);
  console.log(cnt);
  process.exit();
});