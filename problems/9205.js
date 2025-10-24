/**
 * 백준 - bfs
 * https://www.acmicpc.net/problem/9205
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let T;
let N;
let house;
let stores;
let destination;
let visit;

rl.on("line", function (line) {
  if (!T) {
    T = +line;
  } else if (N === undefined) {
    N = +line;
    house = destination = undefined;
    stores = [];
    visit = Array.from({ length: N }, () => false);
  } else if (house === undefined) {
    house = line.split(" ").map(Number);
  } else if (stores.length !== N) {
    stores.push(line.split(" ").map(Number));
  } else if (destination === undefined) {
    destination = line.split(" ").map(Number);
    N = undefined;

    solution();
    if (--T === 0) {
      rl.close();
    }
  }
});

function solution() {
  const queue = [house];

  let index = 0;
  while (queue.length > index) {
    const start = queue[index++];

    if (canGo(start, destination)) {
      console.log("happy");
      return;
    }

    for (let i = 0; i < stores.length; i++) {
      if (!canGo(start, stores[i])) {
        continue;
      }

      if (visit[i]) {
        continue;
      }

      visit[i] = true;
      queue.push(stores[i]);
    }
  }

  console.log("sad");
}

function canGo(start, end) {
  const [sx, sy] = start;
  const [ex, ey] = end;

  const distX = Math.abs(ex - sx);
  const distY = Math.abs(ey - sy);

  return distX + distY <= 1000;
}
