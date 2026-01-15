/**
 * 백준 - BFS
 * https://www.acmicpc.net/problem/18513
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N, K;
let positions = [];

rl.on("line", function (line) {
  if (!N) {
    [N, K] = line.split(" ").map(Number);
  } else {
    positions = line.split(" ").map(Number);

    rl.close();
  }
}).on("close", function () {
  const visited = new Set(positions);
  const queue = positions.map((pos) => [pos, 0]);

  let result = 0;
  let index = 0;
  while (queue.length > index) {
    const [pos, dist] = queue[index++];

    for (const nextPos of [pos - 1, pos + 1]) {
      if (visited.size >= N + K || visited.has(nextPos)) {
        continue;
      }

      visited.add(nextPos);
      queue.push([nextPos, dist + 1]);
      result += dist + 1;
    }
  }

  console.log(result);
});
