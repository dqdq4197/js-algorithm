/**
 * 백준 - 시뮬레이션
 * https://www.acmicpc.net/problem/1091
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N;
let P, S;

rl.on("line", function (line) {
  if (!N) {
    N = +line;
  } else if (!P) {
    P = line;
  } else {
    S = line.split(" ").map(Number);
    rl.close();
  }
}).on("close", function () {
  const cards = Array(N / 3)
    .fill()
    .flatMap((_) => [0, 1, 2]);

  const visited = new Set();

  function shuffle() {
    let cardsTemp = [...cards];

    for (let i = 0; i < N; i++) {
      const s = S[i];

      cards[i] = cardsTemp[s];
    }
  }

  let count = 0;
  while (true) {
    const cardsKey = cards.join(" ");

    if (cardsKey === P) {
      break;
    }

    if (visited.has(cardsKey)) {
      count = -1;
      break;
    }

    visited.add(cardsKey);

    shuffle();

    count += 1;
  }

  console.log(count);

  process.exit();
});
