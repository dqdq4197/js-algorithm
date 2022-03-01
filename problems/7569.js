const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
let input = [[]];
let N, M, H;
let h = 0;
let n = 0;
let result = 0;
const dy = [0, 1, 0, -1];
const dx = [1, 0, -1, 0];
const dh = [1, -1];
let queue = [];
let cnt = 0;

function bfs() {
  let index = 0;

  while (queue.length > index) {
    const [x, y, h] = queue[index++];

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx >= 0 && ny >= 0 && nx < M && ny < N && input[h][ny][nx] === 0) {
        input[h][ny][nx] = input[h][y][x] + 1;
        result = Math.max(input[h][ny][nx], result) - 1;
        queue.push([nx, ny, h]);
      }
    }

    for (let i = 0; i < 2; i++) {
      const nh = h + dh[i];

      if (nh >= 0 && nh < H && input[nh][y][x] === 0) {
        input[nh][y][x] = input[h][y][x] + 1;
        result = Math.max(input[nh][y][x], result) - 1;
        queue.push([x, y, nh]);
      }
    }

    cnt++;
  }
}
rl.on("line", function (line) {
  if (!N) {
    [M, N, H] = line.split(" ").map((v) => +v);
  } else {
    if (n % N === 0 && n !== 0) {
      h += 1;
      input[h] = [];
    }
    input[h].push(
      line.split(" ").map((v, i) => {
        if (v === "-1") cnt += 1;
        if (v === "1") queue.push([i, n % N, h]);
        return +v;
      })
    );
    n += 1;

    if (N * H === n) {
      bfs();
      if (N * M * H === cnt) {
        console.log(result);
      } else {
        console.log(-1);
      }
      rl.close();
    }
  }
});
