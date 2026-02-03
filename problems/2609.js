/**
 * 백준 - 유클리드호제법
 * https://www.acmicpc.net/problem/2609
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", function (line) {
  const [N, M] = line.split(" ").map(Number);
  const g = gcd(N, M);
  const l = (N * M) / g;

  console.log(g);
  console.log(l);

  rl.close();
});

function gcd(x, y) {
  if (y === 0) return x;
  return gcd(y, x % y);
}
