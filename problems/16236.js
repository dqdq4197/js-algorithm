const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N;
let input = [];
let start = [];
const dx = [0, -1, 0, 1];
const dy = [1, 0, -1, 0];
let size = [2, 0];

function searchFish(startY, startX) {
  const visit = Array.from({ length: N }, () => Array(N).fill(false));
  visit[startY][startX] = true;
  const queue = [[startY, startX, 0]];
  let minDist = Infinity;
  let result = [];
  let index = 0;

  while (queue.length > index) {
    const [y, x, dist] = queue[index++];

    if (input[y][x] !== 0 && input[y][x] < size[0] && minDist >= dist) {
      minDist = dist;
      result.push([y, x, dist]);
    }

    if (minDist < dist) break;

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (
        nx >= 0 &&
        ny >= 0 &&
        nx < N &&
        ny < N &&
        !visit[ny][nx] &&
        input[ny][nx] <= size[0]
      ) {
        queue.push([ny, nx, dist + 1]);
        visit[ny][nx] = true;
      }
    }
  }

  if (result.length === 0) return null;
  return result.sort((a, b) => (a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]))[0];
}

rl.on("line", function (line) {
  if (!N) {
    N = +line;
  } else {
    input.push(
      line.split(" ").map((n, i) => {
        if (n === "9") start = [input.length, i];
        return +n;
      })
    );

    if (input.length === N) {
      let result = 0;

      while (true) {
        input[start[0]][start[1]] = 0;
        const fishPos = searchFish(start[0], start[1]);
        if (fishPos === null) break;
        else {
          const [y, x, dist] = fishPos;
          start = [y, x];
          if (size[0] === size[1] + 1) {
            size[0] += 1;
            size[1] = 0;
          } else {
            size[1] += 1;
          }
          result += dist;
        }
      }
      console.log(result);
      rl.close();
    }
  }
});
