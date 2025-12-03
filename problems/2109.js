/**
 * 백준 - 우선순위큐
 * https://www.acmicpc.net/problem/2109
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class PriorityQueue {
  constructor(compare = (a, b) => a - b) {
    this.queue = [null];
    this.compare = compare;
  }

  size() {
    return this.queue.length - 1;
  }

  peek() {
    return this.queue[1];
  }

  items() {
    return this.queue.slice(1);
  }

  enqueue(item) {
    this.queue.push(item);
    let size = this.queue.length - 1;

    while (
      size > 1 &&
      this.compare(this.queue[Math.floor(size / 2)], this.queue[size]) > 0
    ) {
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
      if (
        this.queue.length > c + 1 &&
        this.compare(this.queue[c], this.queue[c + 1]) > 0
      ) {
        c = c + 1;
      }

      if (this.compare(this.queue[p], this.queue[c]) < 0) {
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
const schedules = [];

rl.on("line", function (line) {
  if (!N) {
    N = +line;
  } else {
    schedules.push(line.split(" ").map(Number));

    if (schedules.length === N) {
      rl.close();
    }
  }
}).on("close", function () {
  const minHeap = new PriorityQueue();

  schedules.sort((a, b) => a[1] - b[1]);

  for (const [d, p] of schedules) {
    if (p > minHeap.size()) {
      minHeap.enqueue(d);
      continue;
    }

    const storedD = minHeap.peek();
    if (storedD >= d) {
      continue;
    }

    minHeap.dequeue();
    minHeap.enqueue(d);
  }

  const result = minHeap.items().reduce((totalD, d) => totalD + d, 0);
  console.log(result);
});
