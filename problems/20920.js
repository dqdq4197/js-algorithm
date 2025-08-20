/**
 * 백준 - 문자열
 * https://www.acmicpc.net/problem/20920
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N, M;
let words = new Map();

rl.on("line", function (line) {
  if (!N) {
    [N, M] = line.split(" ").map(Number);
  } else {
    if (line.length >= M) {
      words.set(line, words.has(line) ? words.get(line) + 1 : 1);
    }

    if (--N === 0) {
      rl.close();
    }
  }
}).on("close", function () {
  const wordArray = Array.from(words);

  wordArray.sort(([word1, count1], [word2, count2]) => {
    if (count1 !== count2) {
      return count2 - count1;
    }

    if (word1.length !== word2.length) {
      return word2.length - word1.length;
    }

    return word1.localeCompare(word2);
  });

  console.log(wordArray.map(([word]) => word).join("\n"));
});
