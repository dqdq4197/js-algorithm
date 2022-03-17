const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
let N, M, x, y, K;
let map = [];
let dirs = [];
const dx = [0, 1, -1, 0, 0];
const dy = [0, 0, 0, -1, 1];
const HDice = [0, 0, 0, 0]; // 상, 좌, 하, 우
const VDice = [0, 0]; // 앞 뒤
let result = [];

function copy(y, x) {
  if (map[y][x] === 0) {
    map[y][x] = HDice[2];
  } else {
    HDice[2] = map[y][x];
    map[y][x] = 0;
  }
}

function move(dir) {
  const nx = x + dx[dir];
  const ny = y + dy[dir];

  if (nx >= 0 && ny >= 0 && nx < M && ny < N) {
    y = ny;
    x = nx;

    // 동
    if (dir === 1) {
      HDice.push(HDice.shift());
      copy(ny, nx);
    }
    // 서
    if (dir === 2) {
      HDice.unshift(HDice.pop());
      copy(ny, nx);
    }
    // 북
    if (dir === 3) {
      const up = HDice[0];
      HDice[0] = VDice[1];
      VDice[1] = HDice[2];
      HDice[2] = VDice[0];
      VDice[0] = up;
      copy(ny, nx);
    }
    // 남
    if (dir === 4) {
      const up = HDice[0];
      HDice[0] = VDice[0];
      VDice[0] = HDice[2];
      HDice[2] = VDice[1];
      VDice[1] = up;
      copy(ny, nx);
    }

    result += HDice[0] + "\n";
  }
}

rl.on("line", function (line) {
  if (!N) {
    [N, M, y, x, K] = line.split(" ").map((n) => +n);
  } else if (map.length !== N) {
    map.push(line.split(" ").map((n) => +n));
  } else {
    dirs = line.split(" ").map((n) => +n);

    for (let i = 0; i < K; i++) {
      const dir = dirs[i];
      move(dir);
    }
    console.log(result);
    rl.close();
  }
});
