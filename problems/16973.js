const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
//         상, 하, 좌, 우
const dc = [0, 0, -1, 1];
const dr = [-1, 1, 0, 0];
let R, C;
let grid = [];
let H, W, SR, SC, FR, FC;

rl.on("line", function (line) {
  if (!R) {
    [R, C] = line.split(" ").map(Number);
  } else if (grid.length !== R) {
    grid.push(line.split(" ").map(Number));
  } else {
    [H, W, SR, SC, FR, FC] = line.split(" ").map(Number);
    rl.close();
  }
}).on("close", function () {
  const costs = Array.from({ length: R }, Array(C).fill(Infinity));
  costs[SR][SC] = 0;
  const queue = [[SR, SC]];

  let index = 0;
  while (queue.length > index) {
    const [r, c] = queue[index++];

    for (let i = 0; i < 4; i++) {
      const nr = r + dr[i];
      const nc = c + dc[i];

      // 상
      if (i === 0 && nr >= 0) {
      }
      // 하
      if (i === 1 && nr + H - 1 < R) {
      }
      // 좌
      if (i === 2 && nc >= 0) {
      }
      // 우
      if (i === 3 && nc + W - 1 < C) {
      }
    }
  }
});
// 18:08
