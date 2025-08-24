/**
 * 백준 - 백트래킹
 * https://www.acmicpc.net/problem/15649
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
  function dfs(depth) {
    if (depth === M) {
      console.log(numbers.join(" "));
    }

    for (let i = 1; i <= N; i++) {
      if (visited[i]) continue;
      numbers.push(i);
      visited[i] = true;
      dfs(depth + 1);
      numbers.pop();
      visited[i] = false;
    }
  }

  dfs(0);

  rl.close();
});
