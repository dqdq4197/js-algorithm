const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N, M;
let graph = [[]];
let visit = [];
let start;
let end;
const dx = [null, 1, -1, 0, 0];
const dy = [null, 0, 0, 1, -1]; // 동, 서, 남, 북

function bfs(start, end) {
  const stack = [[...start, 0]];
  let index = 0;

  while (stack.length > index) {
    const [y, x, dir, cnt] = stack[index++];

    if (y === end[0] && x === end[1] && dir === end[2]) {
      return cnt;
    }

    // 회전 후 하나 태우고
    if (dir === 1 || dir === 2) {
      if (!visit[y][x][3]) {
        visit[y][x][3] = true;
        stack.push([y, x, 3, cnt + 1]);
      }

      if (!visit[y][x][4]) {
        visit[y][x][4] = true;
        stack.push([y, x, 4, cnt + 1]);
      }
    } else {
      if (!visit[y][x][1]) {
        visit[y][x][1] = true;
        stack.push([y, x, 1, cnt + 1]);
      }

      if (!visit[y][x][2]) {
        visit[y][x][2] = true;
        stack.push([y, x, 2, cnt + 1]);
      }
    }

    let temp = 0;
    while (temp++ < 3) {
      const nx = x + dx[dir] * temp;
      const ny = y + dy[dir] * temp;

      if (nx <= 0 || ny <= 0 || nx > M || ny > N) break;
      if (graph[ny][nx] === 1) break;
      if (visit[ny][nx][dir]) continue;

      visit[ny][nx][dir] = true;
      stack.push([ny, nx, dir, cnt + 1]);
    }
  }
}

rl.on("line", function (line) {
  if (!N) {
    [N, M] = line.split(" ").map((n) => +n);
  } else if (graph.length <= N) {
    graph.push([0, ...line.split(" ").map((n) => +n)]);
    visit = Array.from({ length: N + 1 }, () =>
      Array.from({ length: M + 1 }, () => Array(5).fill(false))
    );
  } else if (!start) {
    start = line.split(" ").map((n) => +n);
  } else {
    end = line.split(" ").map((n) => +n);

    rl.close();
  }
}).on("close", function () {
  visit[start[0]][start[1]][start[2]] = true;
  const result = bfs(start, end);

  console.log(result);
  process.exit();
});
