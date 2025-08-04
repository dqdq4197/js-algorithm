/**
 * 백준 - 이중 우선순위큐
 * https://www.acmicpc.net/problem/2696
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
    return this.queue[1] ?? null;
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
        this.compare(this.queue[c + 1], this.queue[c]) < 0
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

let T;
let N;
let numbers = [];

function solution() {
  const result = [];
  const minHeap = new PriorityQueue((a, b) => a - b);
  const maxHeap = new PriorityQueue((a, b) => b - a);

  for (let i = 0; i < N; i++) {
    const number = numbers[i];

    maxHeap.enqueue(number);
    minHeap.enqueue(maxHeap.dequeue());

    if (minHeap.size() > maxHeap.size()) {
      maxHeap.enqueue(minHeap.dequeue());
    }

    if (i % 2 === 0) {
      result.push(maxHeap.peek());
    }
  }

  return result;
}

function chunkArray(arr) {
  const SIZE = 10;
  const result = [];

  for (let i = 0; i < arr.length; i += SIZE) {
    result.push(arr.slice(i, i + SIZE));
  }

  return result;
}

rl.on("line", function (line) {
  if (T === undefined) {
    T = +line;
  } else if (N === undefined) {
    N = +line;
  } else {
    numbers = [...numbers, ...line.split(" ").map(Number)];

    if (numbers.length === N) {
      const result = solution();
      console.log(result.length);
      console.log(
        chunkArray(result)
          .map((row) => row.join(" "))
          .join("\n")
      );

      if (--T === 0) {
        rl.close();
      }

      N = undefined;
      numbers = [];
    }
  }
});
