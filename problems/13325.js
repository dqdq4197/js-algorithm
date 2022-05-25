const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let K;
let input = [];
let nodeCnt = 0;
let result = 0;

function dfs(node) {
  if (nodeCnt <= node) return 0;
  const left = dfs(node * 2) + input[node * 2];
  const right = dfs(node * 2 + 1) + input[node * 2 + 1];
  const max = Math.max(left, right);
  input[node * 2] += max - left;
  input[node * 2 + 1] += max - right;
  result += input[node * 2] + input[node * 2 + 1];
  return max;
}

rl.on("line", function (line) {
  if (!K) {
    K = +line;
    nodeCnt = 1 << K;
  } else {
    input = [0, 0, ...line.split(" ").map(Number)];
    dfs(1);
    console.log(result);
    rl.close();
  }
});
