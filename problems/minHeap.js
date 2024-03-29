let queue = [0];

// min heap
function minHeap(Q) {
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

// max heap

function enqueue(num) {
  queue.push(num);
  let size = queue.length - 1;

  while (size > 1 && queue[Math.floor(size / 2)] < queue[size]) {
    let temp = queue[size];
    queue[size] = queue[Math.floor(size / 2)];
    queue[Math.floor(size / 2)] = temp;
    size = Math.floor(size / 2);
  }
}

function dequeue() {
  if (queue.length === 1) return undefined;
  if (queue.length === 2) return queue.pop();
  let removeItem = queue[1];
  queue[1] = queue.pop();

  let p = 1;
  let c = 2;

  while (c < queue.length) {
    if (c + 1 < queue.length && queue[c + 1] > queue[c]) {
      c = c + 1;
    }
    if (queue[c] <= queue[p]) break;

    let temp = queue[c];
    queue[c] = queue[p];
    queue[p] = temp;
    p = c;
    c *= 2;
  }

  return removeItem;
}
