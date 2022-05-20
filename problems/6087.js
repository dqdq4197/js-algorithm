const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let W, H;
let input = [];
const dx = [1, 0, -1, 0];
const dy = [0, 1, 0, -1];
const INF = Infinity;

function bfs(start) {
  const queue = [[...start, 0, null]];
  let index = 0;

  while (queue.length > index) {
    const [y, x, cnt, dir] = queue[index++];

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];
      let nCnt = cnt;

      if (nx < 0 || ny < 0 || nx >= W || ny >= H || input[ny][nx] === "*")
        continue;
      if (dir !== null && dir !== i) nCnt++;
      if (visit[ny][nx] < nCnt) continue;
      visit[ny][nx] = nCnt;
      queue.push([ny, nx, nCnt, i]);
    }
  }
}

rl.on("line", function (line) {
  if (!W) {
    [W, H] = line.split(" ").map(Number);
  } else {
    input.push(line.split(""));
    if (input.length === H) rl.close();
  }
}).on("close", function () {
  visit = Array.from({ length: H }, () => Array(W).fill(INF));
  let start, end;

  for (let i = 0; i < H; i++) {
    for (let j = 0; j < W; j++) {
      if (input[i][j] === "C") {
        if (!start) {
          start = [i, j];
          visit[i][j] = 0;
        } else end = [i, j];
      }
    }
  }
  bfs(start);
  console.log(visit[end[0]][end[1]]);
  process.exit();
});
