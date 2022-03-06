const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let T;
let N;
let minQ, maxQ;
let valid = {};

function minHeap(Q) {
  this.queue = Q;

  this.size = () => this.queue.length - 1;
  this.getMin = () => this.queue[1];

  this.enqueue = (num) => {
    this.queue.push(num);
    let size = this.queue.length - 1;

    while (size > 1 && this.queue[Math.floor(size / 2)] > this.queue[size]) {
      const temp = this.queue[Math.floor(size / 2)];
      this.queue[Math.floor(size / 2)] = this.queue[size];
      this.queue[size] = temp;
      size = Math.floor(size / 2);
    }
  };

  this.dequeue = () => {
    if (this.queue.length === 2) return this.queue.pop();
    const removeItem = this.queue[1];
    this.queue[1] = this.queue.pop();
    let p = 1;
    let c = 2;

    while (this.queue.length > c) {
      if (this.queue.length > c + 1 && this.queue[c + 1] < this.queue[c]) {
        c = c + 1;
      }

      if (this.queue[c] > this.queue[p]) break;
      const temp = this.queue[c];
      this.queue[c] = this.queue[p];
      this.queue[p] = temp;
      p = c;
      c *= 2;
    }

    return removeItem;
  };
}

function maxHeap(Q) {
  this.queue = Q;

  this.size = () => this.queue.length - 1;
  this.getMax = () => this.queue[1];

  this.enqueue = (num) => {
    this.queue.push(num);
    let size = this.queue.length - 1;

    while (size > 1 && this.queue[Math.floor(size / 2)] < this.queue[size]) {
      const temp = this.queue[Math.floor(size / 2)];
      this.queue[Math.floor(size / 2)] = this.queue[size];
      this.queue[size] = temp;
      size = Math.floor(size / 2);
    }
  };

  this.dequeue = () => {
    if (this.queue.length === 2) return this.queue.pop();
    const removeItem = this.queue[1];
    this.queue[1] = this.queue.pop();
    let p = 1;
    let c = 2;

    while (this.queue.length > c) {
      if (this.queue.length > c + 1 && this.queue[c + 1] > this.queue[c]) {
        c = c + 1;
      }

      if (this.queue[c] < this.queue[p]) break;
      const temp = this.queue[c];
      this.queue[c] = this.queue[p];
      this.queue[p] = temp;
      p = c;
      c *= 2;
    }

    return removeItem;
  };
}

rl.on("line", function (line) {
  if (T === undefined) {
    T = +line;
  } else if (!N) {
    N = +line;
    minQ = new minHeap([null]);
    maxQ = new maxHeap([null]);
  } else {
    const [op, num] = line.split(" ");

    if (op === "I") {
      minQ.enqueue(+num);
      maxQ.enqueue(+num);

      if (valid[+num]) {
        valid[+num]++;
      } else {
        valid[+num] = 1;
      }
    }

    if (op === "D") {
      if (num === "1") {
        while (maxQ.size()) {
          const number = maxQ.dequeue();

          if (valid[number] > 0) {
            valid[number]--;
            break;
          }
        }
      }

      if (num === "-1") {
        while (minQ.size()) {
          const number = minQ.dequeue();

          if (valid[number] > 0) {
            valid[number]--;
            break;
          }
        }
      }
    }

    if (--N === 0) {
      let result = "EMPTY";

      while (maxQ.size()) {
        const number = maxQ.dequeue();

        if (valid[number] > 0) {
          result = number;
          break;
        }
      }

      while (minQ.size()) {
        const number = minQ.dequeue();

        if (valid[number] > 0) {
          result += ` ${number}`;
          break;
        }
      }

      console.log(result);
      if (--T === 0) {
        rl.close();
      }
    }
  }
});
