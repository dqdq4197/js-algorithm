const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N;
const input = [];

class MinHeap {
  constructor(Q) {
    this.queue = Q;
  }
  size = () => this.queue.length - 1;

  top = () => this.queue[1];

  enqueue = (num) => {
    this.queue.push(num);
    let size = this.queue.length - 1;

    while (size > 1 && this.queue[Math.floor(size / 2)] > this.queue[size]) {
      const temp = this.queue[Math.floor(size / 2)];
      this.queue[Math.floor(size / 2)] = this.queue[size];
      this.queue[size] = temp;
      size = Math.floor(size / 2);
    }
  };

  dequeue = () => {
    if (this.queue.length === 2) return this.queue.pop();
    const removeItem = this.queue[1];
    this.queue[1] = this.queue.pop();
    let p = 1;
    let c = 2;

    while (c < this.queue.length) {
      if (c + 1 < this.queue.length && this.queue[c + 1] < this.queue[c]) {
        c = c + 1;
      }
      if (this.queue[p] < this.queue[c]) break;
      const temp = this.queue[p];
      this.queue[p] = this.queue[c];
      this.queue[c] = temp;
      p = c;
      c *= 2;
    }
    return removeItem;
  };
}

rl.on("line", function (line) {
  if (!N) {
    N = +line;
  } else {
    input.push(line.split(" ").map(Number));
    const minHeap = new MinHeap([null]);
    if (input.length === N) {
      input.sort((a, b) => a[0] - b[0]);

      input.forEach(([days, score]) => {
        if (days > minHeap.size()) {
          minHeap.enqueue(score);
        } else if (minHeap.top() < score) {
          minHeap.dequeue();
          minHeap.enqueue(score);
        }
      });
      const result = minHeap.queue.slice(1).reduce((a, b) => a + b);
      console.log(result);
      rl.close();
    }
  }
});
