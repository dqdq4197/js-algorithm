const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let K;
let W, H;
let map = [];
let horseDx = [-2, -1, 1, 2, -2, -1, 1, 2];
let horseDy = [-1, -2, -2, -1, 1, 2, 2, 1];
let dx = [1, 0, -1, 0];
let dy = [0, 1, 0, -1];
let visit = [];

function bfs() {
  let queue = [[[0, 0], 0, K]];
  visit[0][0][K] = true;

  while(queue.length) {
    let [[x, y], cnt, k] = queue.shift();

    if(x === W - 1 && y === H - 1) {
      return cnt;
    }

    for(let i = 0; i < 4; i++) {
      let nx = x + dx[i];
      let ny = y + dy[i];
      
      if(nx >= 0 && ny >= 0 && nx < W && ny < H) {
        if(map[ny][nx] === 0 && !visit[ny][nx][k]) {
          visit[ny][nx][k] = true;
          queue.push([[nx, ny], cnt + 1, k]);
        }
      }
    }

    if(k > 0) {
      for(let i = 0; i < 8; i++) {
        let nx = x + horseDx[i];
        let ny = y + horseDy[i];
  
        if(nx >= 0 && ny >= 0 && nx < W && ny < H) {
          if(map[ny][nx] === 0 && !visit[ny][nx][k - 1]) {
            visit[ny][nx][k - 1] = true;
            queue.push([[nx, ny], cnt + 1, k - 1]);
          }
        }
      }
    }
  }
  
  return -1;
}

rl.on('line', function (line) {
  if(K === undefined) {
    K = +line;
  } else if(!W) {
    [W, H] = line.split(' ').map(n => +n);
    visit = Array.from({ length: H }, () => Array.from({ length: W }, () => Array.from({ length: K + 1 }, () => false)));
  } else {
    map.push(line.split(' ').map(n => +n));
    if(map.length === H) {
      console.log(bfs());
      rl.close();
    }
  }
})