const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N, M;
let input = [];

class MinHeap {
  constructor() {
    this.queue = [null];
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
    if (this.queue.length === 1) {
      return null;
    }
    if (this.queue.length === 2) {
      return this.queue.pop();
    }
    const removeItem = this.queue[1];
    this.queue[1] = this.queue.pop();
    let p = 1;
    let c = 2;

    while (c < this.queue.length) {
      if (c + 1 < this.queue.length && this.queue[c + 1] < this.queue[c]) {
        c += 1;
      }

      if (this.queue[p] <= this.queue[c]) {
        break;
      }

      [this.queue[p], this.queue[c]] = [this.queue[c], this.queue[p]];
      p = c;
      c *= 2;
    }

    return removeItem;
  }
}

rl.on("line", function (line) {
  if (!N) {
    [N, M] = line.split(" ").map(Number);
  } else {
    input = line.split(" ").map(BigInt);
    const minHeap = new MinHeap();

    input.forEach((n) => minHeap.enqueue(n));

    while (M--) {
      const a = minHeap.dequeue();
      const b = minHeap.dequeue();
      const sum = a + b;
      minHeap.enqueue(sum);
      minHeap.enqueue(sum);
    }

    console.log(
      minHeap.queue
        .slice(1)
        .reduce((a, b) => a + b, 0n)
        .toString()
    );
    rl.close();
  }
});
