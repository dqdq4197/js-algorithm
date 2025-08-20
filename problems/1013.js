/**
 * 백준 - 문자열 / 정규식
 * https://www.acmicpc.net/problem/1013
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let T;

rl.on("line", function (line) {
  if (!T) {
    T = +line;
  } else {
    console.log(/^(100+1+|01)+$/.test(line) ? "YES" : "NO");

    if (--T === 0) {
      rl.close();
    }
  }
});
