// https://www.acmicpc.net/problem/20437
// 백준 - 슬라이딩 윈도우

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let T;
let string, K;

rl.on("line", function (line) {
  if (!T) {
    T = +line;
  } else if (string === undefined) {
    string = line;
  } else {
    K = +line;

    const dict = new Map();
    let min = Infinity;
    let max = -1;

    for (let i = 0; i < string.length; i++) {
      const char = string[i];
      const nextIndexes = dict.get(char) || [];
      nextIndexes.push(i);

      dict.set(char, nextIndexes);

      if (nextIndexes.length === K) {
        const start = nextIndexes[0];
        const end = nextIndexes.at(-1);
        const len = end - start + 1;

        min = Math.min(min, len);

        if (string[start] === string[end]) {
          max = Math.max(max, len);
        }

        nextIndexes.shift();
        dict.set(char, nextIndexes);
      }
    }

    if (min === Infinity) {
      console.log(-1);
    } else {
      console.log([min, max].join(" "));
    }

    string = undefined;
    if (--T === 0) {
      rl.close();
    }
  }
});
