/**
 * 부모 노드는 자식 노드보다 반드시 작거나 같아야한다.
 *
 * 왼쪽 자식노드 인덱스 : 부모노드 인덱스 * 2
 * 오른쪽 자식노드 인덱스 : (부모노드 인덱스 * 2) + 1
 * 부모노드 인덱스 : 자식노드 / 2 소수점 버림
 */

class MinHeap {
  constructor() {
    this.queue = [null];
  }

  size() {
    return this.queue.length - 1;
  }

  peek() {
    return this.queue[1] ?? null;
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
    if (this.queue.length === 1) return null;
    if (this.queue.length === 2) return this.queue.pop();
    const removeItem = this.queue[1];
    this.queue[1] = this.queue.pop();
    let p = 1;
    let c = 2;

    while (this.queue.length > c) {
      if (this.queue.length > c + 1 && this.queue[c + 1] < this.queue[c]) {
        c += 1;
      }

      if (this.queue[p] < this.queue[c]) {
        break;
      }

      [this.queue[p], this.queue[c]] = [this.queue[c], this.queue[p]];
      p = c;
      c *= 2;
    }

    return removeItem;
  }
}

const minHeap = new MinHeap();

minHeap.enqueue(3);
minHeap.enqueue(6);
minHeap.enqueue(1);
minHeap.enqueue(2);
minHeap.enqueue(6);
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
