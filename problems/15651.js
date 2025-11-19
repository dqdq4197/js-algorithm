/**
 * 백준 - 순열 / 조합
 * https://www.acmicpc.net/problem/15651
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", function (line) {
  const [N, M] = line.split(" ").map(Number);

  const combo = [];
  const result = [];

  function combination() {
    if (combo.length === M) {
      result.push(combo.join(" "));
      return;
    }

    for (let i = 1; i <= N; i++) {
      combo.push(i);
      combination();
      combo.pop();
    }
  }

  combination();

  console.log(result.join("\n"));
  rl.close();
});
