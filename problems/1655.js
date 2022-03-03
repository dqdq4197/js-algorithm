const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N;
let input = [];
let result = [];

function minHeap(minQ) {
  this.queue = minQ;

  this.getSize = () => this.queue.length;

  this.getQueue = () => this.queue;

  this.getMin = () => this.queue[1];

  this.enqueue = (num) => {
    this.queue.push(num);
    let size = this.queue.length - 1;

    while (size > 1 && this.queue[Math.floor(size / 2)] > this.queue[size]) {
      let temp = this.queue[Math.floor(size / 2)];
      this.queue[Math.floor(size / 2)] = this.queue[size];
      this.queue[size] = temp;
      size = Math.floor(size / 2);
    }
  };

  this.dequeue = () => {
    if (this.queue.length === 2) return this.queue.pop();
    let removeItem = this.queue[1];
    this.queue[1] = this.queue.pop();
    let p = 1;
    let c = 2;

    while (this.queue.length > c) {
      if (this.queue.length > c + 1 && this.queue[c + 1] < this.queue[c]) {
        c = c + 1;
      }
      if (this.queue[p] < this.queue[c]) break;
      let temp = this.queue[c];
      this.queue[c] = this.queue[p];
      this.queue[p] = temp;
      p = c;
      c *= 2;
    }
    return removeItem;
  };
}

function maxHeap(maxQ) {
  this.queue = maxQ;

  this.getSize = () => this.queue.length;

  this.getMax = () => this.queue[1];

  this.getQueue = () => this.queue;

  this.enqueue = (num) => {
    this.queue.push(num);
    let size = this.queue.length - 1;

    while (size > 1 && this.queue[Math.floor(size / 2)] < this.queue[size]) {
      let temp = this.queue[Math.floor(size / 2)];
      this.queue[Math.floor(size / 2)] = this.queue[size];
      this.queue[size] = temp;
      size = Math.floor(size / 2);
    }
  };

  this.dequeue = () => {
    if (this.queue.length === 2) return this.queue.pop();
    let removeItem = this.queue[1];
    this.queue[1] = this.queue.pop();
    let p = 1;
    let c = 2;

    while (this.queue.length > c) {
      if (this.queue.length > c + 1 && this.queue[c + 1] > this.queue[c]) {
        c = c + 1;
      }
      if (this.queue[p] > this.queue[c]) break;
      let temp = this.queue[c];
      this.queue[c] = this.queue[p];
      this.queue[p] = temp;
      p = c;
      c *= 2;
    }
    return removeItem;
  };
}

rl.on("line", function (line) {
  if (N === undefined) {
    N = +line;
  } else {
    input.push(+line);
    if (input.length === N) rl.close();
  }
}).on("close", function () {
  const minH = new minHeap([null]);
  const maxH = new maxHeap([null]);

  input.forEach((num) => {
    if (minH.getSize() < maxH.getSize()) minH.enqueue(num);
    else maxH.enqueue(num);

    if (minH.getMin() < maxH.getMax()) {
      let min = minH.dequeue();
      let max = maxH.dequeue();

      minH.enqueue(max);
      maxH.enqueue(min);
    }

    result.push(maxH.getMax());
  });

  console.log(result.join("\n"));
  process.exit();
});
