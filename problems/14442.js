/**
 * 백준 - bfs
 * https://www.acmicpc.net/problem/14442
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class Node {
  constructor(value) {
    this.cur = value;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.front = null;
    this.rear = null;
    this.length = 0;
  }
  push(value) {
    const node = new Node(value);
    if (this.length === 0) {
      this.front = node;
    } else {
      this.rear.next = node;
    }
    this.rear = node;
    this.length++;
  }
  shift() {
    if (this.length === 0) return false;
    const returnValue = this.front.cur;
    this.front = this.front.next;
    this.length--;
    return returnValue;
  }
}

let N, M, K;
let map = [];
const dx = [0, 0, 1, -1];
const dy = [1, -1, 0, 0];

rl.on("line", function (line) {
  if (!N) {
    [N, M, K] = line.split(" ").map(Number);
  } else {
    map.push(line.split("").map(Number));
    if (map.length === N) rl.close();
  }
}).on("close", function () {
  const visit = Array.from({ length: N }, () =>
    Array.from({ length: M }, () => Array(K + 1).fill(false))
  );

  const queue = new Queue();
  queue.push([0, 0, K, 1]);
  visit[0][0][K] = true;

  let answer = -1;

  while (queue.length) {
    const [x, y, k, dist] = queue.shift();

    if (x === M - 1 && y === N - 1) {
      answer = dist;
      break;
    }

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx < 0 || ny < 0 || nx >= M || ny >= N) {
        continue;
      }

      if (map[ny][nx] === 1 && k > 0 && !visit[ny][nx][k - 1]) {
        visit[ny][nx][k - 1] = true;
        queue.push([nx, ny, k - 1, dist + 1]);
      }

      if (map[ny][nx] === 0 && !visit[ny][nx][k]) {
        visit[ny][nx][k] = true;
        queue.push([nx, ny, k, dist + 1]);
      }
    }
  }

  console.log(answer);
});
