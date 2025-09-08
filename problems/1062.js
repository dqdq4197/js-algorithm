/**
 * 백준 - 조합 / 브루트포스
 * https://www.acmicpc.net/problem/1062
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N, K;
let words = [];
const fixture = ["a", "n", "t", "i", "c"];

rl.on("line", function (line) {
  if (!N) {
    [N, K] = line.split(" ").map(Number);
  } else {
    words.push(
      line
        .slice(4, -4)
        .split("")
        .filter((c) => !fixture.includes(c))
    );

    if (words.length === N) {
      rl.close();
    }
  }
}).on("close", function () {
  if (K === 26) {
    console.log(N);
    return;
  }

  const k = K - fixture.length;

  if (k < 0) {
    console.log(0);
    return;
  }

  if (k === 0) {
    console.log(words.filter((word) => word.length === 0).length);
    return;
  }

  const chars = Array.from(new Set(words.flat()));

  if (chars.length < k) {
    console.log(N);
    return;
  }

  const combination = [];
  let maxCount = 0;

  function recur(start) {
    if (combination.length === k) {
      const count = counter(combination);
      maxCount = Math.max(maxCount, count);
      return;
    }

    for (let i = start; i < chars.length; i++) {
      const char = chars[i];

      combination.push(char);
      recur(i + 1);
      combination.pop();
    }
  }

  function counter(combination) {
    let count = 0;

    for (const word of words) {
      const isIncluded = word.every((char) => combination.includes(char));

      if (isIncluded) count += 1;
    }

    return count;
  }

  recur(0);

  console.log(maxCount);
});
