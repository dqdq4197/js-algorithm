/**
 * 백준 - 문자열
 * https://www.acmicpc.net/problem/27866
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let string;

rl.on("line", function (line) {
  if (!string) {
    string = line;
  } else {
    console.log(string[+line - 1]);
    rl.close();
  }
});
