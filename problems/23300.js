/**
 * 백준 - 스택 / 덱
 * https://www.acmicpc.net/problem/23300
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N, Q;
let backSpace = [];
let frontSpace = [];
let currentPage = null;

rl.on("line", function (line) {
  if (!N) {
    [N, Q] = line.split(" ").map(Number);
  } else {
    const [command, num] = line.split(" ");

    if (command === "A") {
      if (currentPage !== null) {
        backSpace.push(currentPage);
      }

      currentPage = +num;
      frontSpace = [];
    }

    if (command === "B" && backSpace.length > 0) {
      frontSpace.push(currentPage);
      currentPage = backSpace.pop();
    }

    if (command === "F" && frontSpace.length > 0) {
      backSpace.push(currentPage);
      currentPage = frontSpace.pop();
    }

    if (command === "C") {
      backSpace = backSpace.filter(
        (n, i) => i === 0 || backSpace[i - 1] !== backSpace[i]
      );
    }

    if (--Q === 0) {
      console.log(currentPage);
      console.log(backSpace.length ? backSpace.reverse().join(" ") : -1);
      console.log(frontSpace.length ? frontSpace.reverse().join(" ") : -1);

      rl.close();
    }
  }
});
