const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N;
let input = [];

function minHeap(queue) {
  this.queue = queue;

  this.getQueue = () => this.queue;
  this.enqueue = (q) => {
    this.queue.push(q);
    let size = this.queue.length - 1;

    while (
      size > 1 &&
      this.queue[Math.floor(size / 2)][2] > this.queue[size][2]
    ) {
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
      if (
        this.queue.length > c + 1 &&
        this.queue[c + 1][2] < this.queue[c][2]
      ) {
        c = c + 1;
      }
      if (this.queue[c][2] > this.queue[p][2]) break;
      let temp = this.queue[c];
      this.queue[c] = this.queue[p];
      this.queue[p] = temp;
      p = c;
      c = p * 2;
    }

    return removeItem;
  };
}

function unionFind(N) {
  this.parents = Array.from({ length: N }, (_, i) => i);

  this.getParent = (num) => {
    if (this.parents[num] === num) return num;
    return (this.parents[num] = this.getParent(this.parents[num]));
  };

  this.unionParent = (a, b) => {
    const aParent = this.getParent(a);
    const bParent = this.getParent(b);

    if (aParent > bParent) this.parents[aParent] = bParent;
    else this.parents[bParent] = aParent;
  };

  this.find = (a, b) => {
    const aParent = this.getParent(a);
    const bParent = this.getParent(b);

    return aParent === bParent;
  };
}

rl.on("line", function (line) {
  if (!N) {
    N = +line;
  } else {
    input.push(line.split(" ").map((num) => +num));

    if (input.length === N) rl.close();
  }
}).on("close", function () {
  const minQ = new minHeap([null]);
  const uf = new unionFind(N);

  for (let i = 0; i < N; i++) {
    for (let j = i + 1; j < N; j++) {
      const a = input[i];
      const b = input[j];

      const dist = +Math.sqrt((b[0] - a[0]) ** 2 + (b[1] - a[1]) ** 2).toFixed(
        2
      );
      minQ.enqueue([i, j, dist]);
    }
  }

  let result = 0;
  let cnt = 0;
  while (true) {
    const [a, b, dist] = minQ.dequeue();

    if (!uf.find(a, b)) {
      result += dist;
      uf.unionParent(a, b);
      cnt += 1;
    }
    if (cnt === N - 1) break;
  }

  console.log(result);
  process.exit();
});
