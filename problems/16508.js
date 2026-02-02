/**
 * 백준 - dfs / 완전탐색
 * https://www.acmicpc.net/problem/16508
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let target;
let N;
let books = [];
let costs = [];

rl.on("line", function (line) {
  if (!target) {
    target = Array(26).fill(0);

    for (let i = 0; i < line.length; i++) {
      const index = line[i].charCodeAt() - 65;
      target[index] += 1;
    }
  } else if (!N) {
    N = +line;
  } else {
    const [cost, title] = line.split(" ");
    const book = Array(26).fill(0);

    for (let i = 0; i < title.length; i++) {
      const index = title[i].charCodeAt() - 65;
      book[index] += 1;
    }

    costs.push(+cost);
    books.push(book);

    if (books.length === N) {
      rl.close();
    }
  }
}).on("close", function () {
  let minPrice = Infinity;

  function isCollected(words) {
    return target.every((count, index) => count <= words[index]);
  }

  function dfs(bookIndex, price, words) {
    if (price >= minPrice) {
      return;
    }

    if (isCollected(words)) {
      minPrice = Math.min(minPrice, price);
      return;
    }

    if (bookIndex >= N) {
      return;
    }

    const next = words.slice();

    for (let i = 0; i < 26; i++) {
      next[i] += books[bookIndex][i];
    }

    dfs(bookIndex + 1, price + costs[bookIndex], next);
    dfs(bookIndex + 1, price, words);
  }

  dfs(0, 0, Array(26).fill(0));

  console.log(minPrice === Infinity ? -1 : minPrice);
});
