const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let N, M;
let map = [];
let rooms = [];
let dx = [-1, 0, 1, 0];
let dy = [0, -1, 0, 1];
let roomSize = [0];
let maxTwoRoomSize = 0;
// 1 -> 서, 2 -> 북, 4 -> 동, 8 -> 남

function marking(r, c, roomNum) {
  let size = 0;
  let stack = [[r, c]];

  while(stack.length) {
    let [y, x] = stack.pop();
    size++;
    
    for(let i = 0; i < 4; i++) {
      if((map[y][x] & 1 << i) !== 0) continue;
      let nx = x + dx[i];
      let ny = y + dy[i];

      if(!rooms[ny][nx]) {
        rooms[ny][nx] = roomNum;
        stack.push([ny, nx]);
      }
    }
  }

  return size;
}

rl.on('line', function (line) {
  if(!N) {
    [N, M] = line.split(' ').map(n => +n);
    rooms = Array.from({ length: M }, () => Array(N).fill(0));
  } else {
    map.push(line.split(' ').map(n => +n));
    if(map.length === M) {
      let roomNum = 0;

      for(let i = 0; i < M; i++) {
        for(let j = 0; j < N; j++) {
          if(!rooms[i][j]) {
            rooms[i][j] = ++roomNum;
            let size = marking(i, j, roomNum);
            roomSize[roomNum] = size;
          }
        }
      }

      for(let i = 0; i < M; i++) {
        for(let j = 0; j < N; j++) {
          let nowRoom = rooms[i][j];
          map[i][j] = -1;
          for(let k = 0; k < 4; k++) {
            let nx = j + dx[k];
            let ny = i + dy[k];

            if(nx >= 0 && ny >= 0 && nx < N && ny < M && map[ny][nx] !== -1) {
              let nextRoom = rooms[ny][nx];

              if(nowRoom !== nextRoom) {
                maxTwoRoomSize = Math.max(maxTwoRoomSize, roomSize[nowRoom] + roomSize[nextRoom]);
              }
            }
          }
        }
      }
      
      console.log(roomNum);
      console.log(Math.max(...roomSize));
      console.log(maxTwoRoomSize);
      rl.close();
    }
  }
})