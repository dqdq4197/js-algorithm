const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let R, C;
let input = [];
const INF = Infinity;
const dx = [1, 0, -1, 0];
const dy = [0, 1, 0, -1];

function spreadFire(maze, queue) {
  let index = 0;

  while (queue.length > index) {
    const [y, x] = queue[index++];

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx < 0 || ny < 0 || nx >= C || ny >= R) continue;
      if (maze[ny][nx] === ".") {
        maze[ny][nx] = maze[y][x] + 1;
        queue.push([ny, nx]);
      }
    }
  }
}

function move(maze, start) {
  const queue = [start];
  let index = 0;

  while (queue.length > index) {
    const [y, x] = queue[index++];

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx < 0 || ny < 0 || nx >= C || ny >= R) continue;
      if (maze[ny][nx] === ".") {
        maze[ny][nx] = maze[y][x] + 1;
        queue.push([ny, nx]);
      }
    }
  }
}

rl.on("line", function (line) {
  if (!R) {
    [R, C] = line.split(" ").map(Number);
  } else {
    input.push(line.split(""));

    if (input.length === R) rl.close();
  }
}).on("close", function () {
  const moveMaze = input.map((row) =>
    row.map((col) => (col === "J" ? 1 : col))
  );
  const fireMaze = input.map((row) =>
    row.map((col) => {
      if (col === "F") return 1;
      if (col === "J") return ".";
      return col;
    })
  );

  const queue = [];
  let start = [];
  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      if (input[i][j] === "F") {
        queue.push([i, j]);
      }

      if (input[i][j] === "J") {
        start = [i, j];
      }
    }
  }

  spreadFire(fireMaze, queue);
  move(moveMaze, start);

  let result = INF;

  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      if (i !== 0 && i !== R - 1 && j !== 0 && j !== C - 1) continue;
      if (typeof moveMaze[i][j] !== "number") continue;

      if (typeof fireMaze[i][j] === "number") {
        if (fireMaze[i][j] > moveMaze[i][j]) {
          result = Math.min(result, moveMaze[i][j]);
        }
      } else {
        result = Math.min(result, moveMaze[i][j]);
      }
    }
  }

  console.log(result === INF ? "IMPOSSIBLE" : result);
  process.exit();
});
