/**
 * 백준 - 백트래킹
 * https://www.acmicpc.net/problem/15650
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", function (line) {
  const [N, M] = line.split(" ").map(Number);
  const visited = Array(N + 1).fill(false);

  const numbers = [];
  function dfs(depth, start) {
    if (depth === M) {
      console.log(numbers.join(" "));
    }

    for (let i = start; i <= N; i++) {
      if (visited[i]) continue;
      numbers.push(i);
      dfs(depth + 1, i + 1);
      numbers.pop();
    }
  }

  dfs(0, 1);

  rl.close();
});
