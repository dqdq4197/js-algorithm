/**
 * 백준 - 문자열
 * https://www.acmicpc.net/problem/1152
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", function (line) {
  const string = line.trim();

  if (string === "") {
    console.log(0);
    rl.close();
  }

  const words = string.split(" ");
  console.log(words.length);

  rl.close();
});
