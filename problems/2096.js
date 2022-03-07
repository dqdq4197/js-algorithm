// DP문제 정답은 맞지만 메모리 초과(max 4MB)로 Node.js로는 통과 불가능..
// 현재 그냥 실행만으로도 메모리가 초과됨.

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N;
let max, min;

rl.on("line", function (line) {
  if (!N) N = +line;
  else if (!max) {
    max = min = line.split(" ").map((n) => +n);
  } else {
    const input = line.split(" ").map((n) => +n);

    const maxA = Math.max(max[0], max[1]) + input[0];
    const maxB = Math.max(...max) + input[1];
    const maxC = Math.max(max[1], max[2]) + input[2];

    const minA = Math.min(min[0], min[1]) + input[0];
    const minB = Math.min(...min) + input[1];
    const minC = Math.min(min[1], min[2]) + input[2];
    max = [maxA, maxB, maxC];
    min = [minA, minB, minC];
  }
}).on("close", function () {
  console.log(`${Math.max(...max)} ${Math.min(...min)}`);
  process.exit();
});
