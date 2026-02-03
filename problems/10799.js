/**
 * 백준 - 스택
 * https://www.acmicpc.net/problem/10799
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", function (line) {
  let count = 0;
  const stack = [];

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === "(") {
      stack.push(char);
      continue;
    }

    if (i > 0 && line[i - 1] === "(") {
      stack.pop();
      count += stack.length;
      continue;
    }

    stack.pop();
    count += 1;
  }

  console.log(count);

  rl.close();
});
