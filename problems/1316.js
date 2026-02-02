/**
 * 백준 - 문자열
 * https://www.acmicpc.net/problem/1316
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N;
let count = 0;

rl.on("line", function (line) {
  if (!N) {
    N = +line;
  } else {
    const visit = new Set();
    let flag = true;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];

      if (visit.has(char) && line[i - 1] !== char) {
        flag = false;
        break;
      }

      visit.add(char);
    }

    if (flag) count += 1;

    if (--N === 0) {
      console.log(count);
      rl.close();
    }
  }
});
