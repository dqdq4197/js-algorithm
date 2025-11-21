/**
 * 백준 - 문자열
 * https://www.acmicpc.net/problem/11478
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", function (line) {
  const len = line.length;
  const result = new Set();

  for (let i = 0; i < len; i++) {
    for (let j = 1; i + j <= len; j++) {
      result.add(line.substring(i, i + j));
    }
  }

  console.log(result.size);
  rl.close();
});
