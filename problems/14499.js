const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let map = [];
let N, M, x, y, K, move;
let dice = {
  '앞': 0,
  '뒤': 0,
  '상': 0,
  '하': 0,
  '좌': 0,
  '우': 0
}
let dx = [1, -1, 0, 0];
let dy = [0, 0, -1, 1];

rl.on('line', function (line) {
  if(!N) {
    [N, M, x, y, K] = line.split(' ').map(n => +n);
  } else if(map.length !== N) {
    map.push(line.split(' ').map(n => +n));
  } else if(!move) {
    move = line.split(' ').map(n => +n);
    rl.close();
  }
})

.on('close', function () {
  for(let i = 0; i < K; i++) {
    let dir = move[i];
    let nx = x + dx[dir - 1];
    let ny = y + dy[dir - 1];

    if(nx < 0 || ny < 0 || nx >= M || ny >= N) continue;

    x = nx; y = ny;
    let copyDice = { ...dice };

    switch(dir) {
      case 1:
        // 동
        dice['하'] = copyDice['우'];
        dice['우'] = copyDice['상'];
        dice['상'] = copyDice['좌'];
        dice['좌'] = copyDice['하'];
        break;
      case 2:
        // 서
        dice['하'] = copyDice['좌'];
        dice['우'] = copyDice['하'];
        dice['상'] = copyDice['우'];
        dice['좌'] = copyDice['상'];
        break;
      case 3:
        // 북
        dice['하'] = copyDice['뒤'];
        dice['앞'] = copyDice['하'];
        dice['상'] = copyDice['앞'];
        dice['뒤'] = copyDice['상'];
        break;
      case 4:
        // 남
        dice['하'] = copyDice['앞'];
        dice['뒤'] = copyDice['하'];
        dice['상'] = copyDice['뒤'];
        dice['앞'] = copyDice['상'];
        break;
    }

    if(map[ny][nx] === 0) {
      map[ny][nx] = dice['하'];
    } else {
      dice['하'] = map[ny][nx];
      map[ny][nx] = 0;
    }
    console.log(dice['상']);
  }
  
  process.exit();
});

