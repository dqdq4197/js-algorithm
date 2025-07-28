/**
 * 백준 - 시뮬레이션
 * https://www.acmicpc.net/problem/9519
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let X;
let input = [];

rl.on("line", function (line) {
  if (!X) {
    X = +line;
  } else {
    input = line;
    rl.close();
  }
}).on("close", function () {
  const reverseStart =
    input.length % 2 === 0 ? input.length - 1 : input.length - 2;

  let n = 0;
  let tempString = input;
  while (n < X) {
    const temp = [];

    for (let i = 0; i < input.length; i += 2) {
      temp.push(tempString[i]);
    }

    for (let i = reverseStart; i > 0; i -= 2) {
      temp.push(tempString[i]);
    }

    tempString = temp.join("");
    n += 1;

    if (tempString === input) {
      n = Math.max(n, X - (X % n));
    }
  }

  console.log(tempString);
  process.exit();
});
