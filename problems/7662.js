/**
 * 백준 - 이중 우선순위 큐
 * https://www.acmicpc.net/problem/7662
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let T;
let N;
let minHeap, maxHeap;
let store;

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
    if (this.size() === 0) return null;
    if (this.size() === 1) return this.queue.pop();
    const removeItem = this.queue[1];
    this.queue[1] = this.queue.pop();
    let p = 1;
    let c = 2;

    while (this.queue.length > c) {
      if (
        this.queue.length > c + 1 &&
        this.compare(this.queue[c + 1], this.queue[c]) < 0
      ) {
        c += 1;
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

function validPeek(heap) {
  while (heap.size()) {
    const peek = heap.peek();

    if (store[peek]) {
      return peek;
    }

    heap.dequeue();
  }

  return null;
}

rl.on("line", function (line) {
  if (!T) {
    T = +line;
  } else if (!N) {
    N = +line;
    minHeap = new PriorityQueue((a, b) => a - b);
    maxHeap = new PriorityQueue((a, b) => b - a);
    store = {};
  } else {
    const [op, n] = line.split(" ");
    const num = +n;

    if (op === "I") {
      minHeap.enqueue(num);
      maxHeap.enqueue(num);
      store[num] = (store[num] ?? 0) + 1;
    }

    if (op === "D") {
      if (num === 1) {
        // 최댓값에서 제거
        while (maxHeap.size()) {
          const remove = maxHeap.dequeue();

          if (store[remove] === 0) {
            store[remove] -= 1;
            break;
          }
        }
      }

      if (num === -1) {
        // 최솟값에서 제거
        while (minHeap.size()) {
          const remove = minHeap.dequeue();

          if (store[remove]) {
            store[remove] -= 1;
            break;
          }
        }
      }
    }

    if (--N === 0) {
      const min = validPeek(minHeap);
      const max = validPeek(maxHeap);

      if (min === null || max === null) {
        console.log("EMPTY");
      } else {
        console.log(`${max} ${min}`);
      }

      if (--T === 0) {
        rl.close();
      }
    }
  }
});
