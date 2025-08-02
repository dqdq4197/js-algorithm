/**
 * 백준 - 우선순위큐
 * https://www.acmicpc.net/problem/1374
 */

class MinHeap {
  constructor() {
    this.queue = [null];
  }

  size() {
    return this.queue.length - 1;
  }

  peek() {
    return this.queue[1] ?? null;
  }

  enqueue(n) {
    this.queue.push(n);
    let size = this.queue.length - 1;

    while (size > 1 && this.queue[Math.floor(size / 2)] > this.queue[size]) {
      [this.queue[Math.floor(size / 2)], this.queue[size]] = [
        this.queue[size],
        this.queue[Math.floor(size / 2)],
      ];

      size = Math.floor(size / 2);
    }
  }

  dequeue() {
    if (this.queue.length === 1) return null;
    if (this.queue.length === 2) return this.queue.pop();
    const removeItem = this.queue[1];
    this.queue[1] = this.queue.pop();
    let p = 1;
    let c = 2;

    while (c < this.queue.length) {
      if (c + 1 < this.queue.length && this.queue[c + 1] < this.queue[c]) {
        c += 1;
      }

      if (this.queue[p] < this.queue[c]) {
        break;
      }

      [this.queue[p], this.queue[c]] = [this.queue[c], this.queue[p]];
      p = c;
      c *= 2;
    }

    return removeItem;
  }
}
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N;
let classes = [];

rl.on("line", function (line) {
  if (!N) {
    N = +line;
  } else {
    classes.push(line.split(" ").map(Number));

    if (classes.length === N) {
      rl.close();
    }
  }
}).on("close", function () {
  classes.sort(([_, a1], [__, a2]) => a1 - a2);

  let max = 0;
  const minHeap = new MinHeap();

  for (let i = 0; i < N; i++) {
    const [_, start, end] = classes[i];

    minHeap.enqueue(end);

    while (true) {
      const peek = minHeap.peek();

      if (peek > start) {
        break;
      }
      minHeap.dequeue();
    }

    max = Math.max(max, minHeap.size());
  }

  console.log(max);

  process.exit();
});
