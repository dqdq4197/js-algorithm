// stack 2개로 queue만들기.

function Queue() {
  this.stack1 = [];
  this.stack2 = [];

  this.push = (n) => {
    this.stack1.push(n);
  };

  this.pop = () => {
    if (this.stack2.length === 0) {
      while (this.stack1.length > 0) {
        this.stack2.push(this.stack1.pop());
      }
    }
    if (this.stack1.length === 0 && this.stack2.length === 0) return null;
    return this.stack2.pop();
  };
}

const queue = new Queue();

queue.push(3);
queue.push(4);
queue.push(5);
queue.push(6);
queue.push(7);
queue.push(8);
queue.push(9);
console.log(queue.pop(), queue.pop(), queue.pop());
