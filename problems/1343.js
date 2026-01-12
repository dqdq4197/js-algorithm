/**
 * 백준 - 문자열
 * https://www.acmicpc.net/problem/1343
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", function (line) {
  const result = line.replace(/XXXX/g, "AAAA").replace(/XX/g, "BB");

  console.log(/X/.test(result) ? -1 : result);
  rl.close();
});
