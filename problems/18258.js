/**
 * 백준 - 큐
 * https://www.acmicpc.net/problem/18258
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N;
const queue = [];
const answer = [];
let index = 0;

rl.on("line", function (line) {
  if (!N) {
    N = +line;
  } else {
    const [command, num] = line.split(" ");
    const size = queue.length - index;

    if (command === "push") {
      queue.push(+num);
    }

    if (command === "pop") {
      const n = queue[index];

      if (size > 0) {
        index += 1;
      }

      answer.push(n ?? -1);
    }

    if (command === "size") {
      answer.push(size);
    }

    if (command === "empty") {
      answer.push(size ? 0 : 1);
    }

    if (command === "front") {
      answer.push(queue[index] ?? -1);
    }

    if (command === "back") {
      answer.push(size ? queue[queue.length - 1] : -1);
    }

    if (--N === 0) {
      console.log(answer.join("\n"));
      rl.close();
    }
  }
});
