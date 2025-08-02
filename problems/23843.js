/**
 * 백준 - 우선순위큐
 * https://www.acmicpc.net/problem/23843
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

let N, M;
let times;

rl.on("line", function (line) {
  if (!N) {
    [N, M] = line.split(" ").map(Number);
  } else {
    times = line.split(" ").map(Number);
    rl.close();
  }
}).on("close", function () {
  times.sort((a1, a2) => a2 - a1);

  const minHeap = new MinHeap();

  let index = 0;
  let time = 0;

  while (true) {
    while (minHeap.size()) {
      const peek = minHeap.peek();

      if (peek > time) {
        break;
      }

      minHeap.dequeue();
    }

    while (M > minHeap.size() && index < N) {
      minHeap.enqueue(time + times[index]);
      index += 1;
    }

    if (index >= N && minHeap.size() <= 0) {
      break;
    }

    time += 1;
  }

  console.log(time);

  process.exit();
});
