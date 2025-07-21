// 왼쪽 자식노드 인덱스 : 부모노드 인덱스 * 2
// 오른쪽 자식노드 인덱스 : (부모노드 인덱스 * 2) + 1
// 부모노드 인덱스 : 자식노드 / 2 소수점 버림

class PriorityQueue {
  constructor(compare = (a, b) => a - b) {
    this.heap = [null];
    this.compare = compare;
  }

  enqueue(item) {
    let size = this.heap.length;

    while (
      size > 1 &&
      this.compare(item, this.heap[Math.floor(size / 2)]) < 0
    ) {
      this.heap[size] = this.heap[Math.floor(size / 2)];
      size = Math.floor(size / 2);
    }

    this.heap[size] = item;
  }

  dequeue() {
    if (this.heap.length <= 1) {
      return null;
    }

    const root = this.heap[1];
    const last = this.heap.pop();

    if (this.heap.length === 1) {
      return root;
    }

    let parent = 1;
    let child = 2;

    while (child < this.heap.length) {
      if (
        child + 1 < this.heap.length &&
        this.compare(this.heap[child + 1], this.heap[child]) < 0
      ) {
        child++;
      }

      if (this.compare(last, this.heap[child]) <= 0) break;

      this.heap[parent] = this.heap[child];
      parent = child;
      child *= 2;
    }

    this.heap[parent] = last;
    return root;
  }

  size() {
    return this.heap.length - 1;
  }
}

const heap = new PriorityQueue();

heap.enqueue(19);
heap.enqueue(12);
heap.enqueue(13);
heap.enqueue(15);
heap.enqueue(9);
heap.enqueue(20);
console.log(heap.dequeue());
console.log(heap.dequeue());
console.log(heap.dequeue());
console.log(heap.dequeue());
console.log(heap.dequeue());
