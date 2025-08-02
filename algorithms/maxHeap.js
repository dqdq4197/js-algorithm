/**
 * 부모 노드는 자식 노드보다 반드시 크거나 같아야한다.
 *
 * 왼쪽 자식노드 인덱스 : 부모노드 인덱스 * 2
 * 오른쪽 자식노드 인덱스 : (부모노드 인덱스 * 2) + 1
 * 부모노드 인덱스 : 자식노드 / 2 소수점 버림
 */

class MaxHeap {
  constructor() {
    this.queue = [null];
  }

  size() {
    return this.queue.length;
  }

  peek() {
    return this.queue[1] ?? null;
  }

  enqueue(n) {
    this.queue.push(n);
    let size = this.queue.length - 1;

    while (size > 1 && this.queue[Math.floor(size / 2)] < this.queue[size]) {
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
      if (this.queue.length > c + 1 && this.queue[c + 1] > this.queue[c]) {
        c += 1;
      }

      if (this.queue[p] > this.queue[c]) {
        break;
      }

      [this.queue[p], this.queue[c]] = [this.queue[c], this.queue[p]];
      p = c;
      c *= 2;
    }

    return removeItem;
  }
}

const maxHeap = new MaxHeap();

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
