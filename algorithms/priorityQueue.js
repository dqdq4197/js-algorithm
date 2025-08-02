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

const minHeap = new PriorityQueue((a, b) => a - b);

minHeap.enqueue(3);
minHeap.enqueue(6);
minHeap.enqueue(1);
minHeap.enqueue(2);
minHeap.enqueue(9);
minHeap.enqueue(1);
minHeap.enqueue(2);
minHeap.enqueue(9);
minHeap.enqueue(0);

console.log(minHeap.dequeue());
console.log(minHeap.dequeue());
console.log(minHeap.dequeue());
console.log(minHeap.dequeue());
console.log(minHeap.dequeue());
console.log(minHeap.dequeue());
console.log(minHeap.dequeue());
console.log(minHeap.dequeue());
console.log(minHeap.dequeue());

console.log("----------------------------");

const maxHeap = new PriorityQueue((a, b) => b - a);

maxHeap.enqueue(3);
maxHeap.enqueue(6);
maxHeap.enqueue(1);
maxHeap.enqueue(2);
maxHeap.enqueue(9);
maxHeap.enqueue(1);
maxHeap.enqueue(2);
maxHeap.enqueue(9);
maxHeap.enqueue(0);

console.log(maxHeap.dequeue());
console.log(maxHeap.dequeue());
console.log(maxHeap.dequeue());
console.log(maxHeap.dequeue());
console.log(maxHeap.dequeue());
console.log(maxHeap.dequeue());
console.log(maxHeap.dequeue());
console.log(maxHeap.dequeue());
console.log(maxHeap.dequeue());

console.log("----------------------------");

const minHeap2 = new PriorityQueue((a, b) => a[1] - b[1]);

minHeap2.enqueue([0, 3]);
minHeap2.enqueue([0, 9]);
minHeap2.enqueue([0, 11]);
minHeap2.enqueue([0, 3]);
minHeap2.enqueue([0, 19]);
minHeap2.enqueue([0, 11]);
minHeap2.enqueue([0, 14]);
minHeap2.enqueue([0, 20]);
minHeap2.enqueue([0, -1]);

console.log(minHeap2.dequeue());
console.log(minHeap2.dequeue());
console.log(minHeap2.dequeue());
console.log(minHeap2.dequeue());
console.log(minHeap2.dequeue());
console.log(minHeap2.dequeue());
console.log(minHeap2.dequeue());
console.log(minHeap2.dequeue());
console.log(minHeap2.dequeue());

console.log("----------------------------");

const maxHeap2 = new PriorityQueue((a, b) => b[1] - a[1]);

maxHeap2.enqueue([0, 3]);
maxHeap2.enqueue([0, 9]);
maxHeap2.enqueue([0, 11]);
maxHeap2.enqueue([0, 3]);
maxHeap2.enqueue([0, 19]);
maxHeap2.enqueue([0, 11]);
maxHeap2.enqueue([0, 14]);
maxHeap2.enqueue([0, 20]);
maxHeap2.enqueue([0, -1]);

console.log(maxHeap2.dequeue());
console.log(maxHeap2.dequeue());
console.log(maxHeap2.dequeue());
console.log(maxHeap2.dequeue());
console.log(maxHeap2.dequeue());
console.log(maxHeap2.dequeue());
console.log(maxHeap2.dequeue());
console.log(maxHeap2.dequeue());
console.log(maxHeap2.dequeue());
