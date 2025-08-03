/**
 * 백준 - 우선순위큐
 * https://www.acmicpc.net/problem/19598
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

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

    while (this.queue.length > c) {
      if (this.queue.length > c + 1 && this.queue[c + 1] < this.queue[c]) {
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

let N;
let times = [];

rl.on("line", function (line) {
  if (!N) {
    N = +line;
  } else {
    times.push(line.split(" ").map(Number));

    if (times.length === N) {
      rl.close();
    }
  }
}).on("close", function () {
  let max = 0;
  times.sort(([s1], [s2]) => s1 - s2);

  const minHeap = new MinHeap();

  for (const [start, end] of times) {
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
