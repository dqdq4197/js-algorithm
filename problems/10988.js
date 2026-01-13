/**
 * 백준 - 문자열
 * https://www.acmicpc.net/problem/10988
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", function (line) {
  const mid = line.length >> 1;

  let index = 0;
  while (mid > index) {
    const left = index;
    const right = line.length - index - 1;

    if (line[left] !== line[right]) {
      console.log(0);
      process.exit();
    }

    index += 1;
  }

  console.log(1);
  rl.close();
});
