/**
 * 백준 - 문자열
 * https://www.acmicpc.net/problem/1212
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", function (line) {
  const dict = ["000", "001", "010", "011", "100", "101", "110", "111"];
  const result = [];

  for (let i = 0; i < line.length; i++) {
    const index = parseInt(line[i], 8);

    if (i === 0) {
      result.push(index.toString(2));
    } else {
      result.push(dict[index]);
    }
  }

  console.log(result.join(""));
  rl.close();
});
