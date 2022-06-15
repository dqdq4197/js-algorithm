const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N, M;
let input = [];

function MinHeap(Q) {
  this.queue = Q;

  this.enqueue = (num) => {
    this.queue.push(num);
    let p = this.queue.length - 1;
    while (p > 1 && this.queue[Math.floor(p / 2)] > this.queue[p]) {
      let temp = this.queue[Math.floor(p / 2)];
      this.queue[Math.floor(p / 2)] = this.queue[p];
      this.queue[p] = temp;
      p = Math.floor(p / 2);
    }
  };

  this.dequeue = () => {
    if (this.queue.length === 2) return this.queue.pop();
    let removeNum = this.queue[1];
    this.queue[1] = this.queue.pop();
    let p = 1;
    let c = 2;

    while (c < this.queue.length) {
      if (c + 1 < this.queue.length && this.queue[c] > this.queue[c + 1]) {
        c = c + 1;
      }
      if (this.queue[p] < this.queue[c]) break;
      let temp = this.queue[c];
      this.queue[c] = this.queue[p];
      this.queue[p] = temp;
      p = c;
      c *= 2;
    }

    return removeNum;
  };
}

rl.on("line", function (line) {
  if (!N) {
    [N, M] = line.split(" ").map(Number);
  } else {
    input = line.split(" ").map(Number);
    const minHeap = new MinHeap([null]);

    input.forEach((n) => minHeap.enqueue(n));

    while (M--) {
      const a = minHeap.dequeue();
      const b = minHeap.dequeue();
      const sum = a + b;
      minHeap.enqueue(sum);
      minHeap.enqueue(sum);
    }

    console.log(minHeap.queue.slice(1).reduce((a, b) => a + b, 0));
    rl.close();
  }
});
