/**
 * 백준 - 구현
 * https://www.acmicpc.net/problem/1158
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", function (line) {
  const [N, K] = line.split(" ").map(Number);
  const answer = [];

  let nums = Array.from({ length: N }, (_, index) => index + 1);
  let removeIndex = 0;

  while (nums.length > 0) {
    removeIndex = (removeIndex + K - 1) % nums.length;
    answer.push(nums.splice(removeIndex, 1)[0]);
  }

  console.log(`<${answer.join(", ")}>`);
  rl.close();
});
