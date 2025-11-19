/**
 * 백준 - 스택
 * https://www.acmicpc.net/problem/28278
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N;
let stack = [];
const result = [];

rl.on("line", function (line) {
  if (!N) {
    N = +line;
  } else {
    const [command, x] = line.split(" ").map(Number);

    if (command === 1) {
      stack.push(x);
    }

    if (command === 2) {
      result.push(stack.pop() ?? -1);
    }

    if (command === 3) {
      result.push(stack.length);
    }

    if (command === 4) {
      result.push(stack.length === 0 ? 1 : 0);
    }

    if (command === 5) {
      result.push(stack.at(-1) ?? -1);
    }

    if (--N === 0) {
      console.log(result.join("\n"));
      rl.close();
    }
  }
});
