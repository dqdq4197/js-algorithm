function Node(data, next = null) {
  this.data = data;
  this.next = next;

  return { data: this.data, next: this.next };
}

function LinkedList() {
  this.head = null;

  this.insertNode = (n) => {
    this.head = new Node(n, this.head);
  };

  this.getLast = () => {
    let node = this.head;
    while (node.next !== null) {
      node = node.next;
    }
    return node;
  };

  this.clear = () => {
    this.head = null;
  };

  this.removeFirst = () => {
    if (!this.head) return;
    if (!this.head.next) return (this.head = null);
    this.head = this.head.next;
  };
}

const list = new LinkedList();

list.insertNode(3);
list.insertNode(4);
list.insertNode(5);
list.insertNode(6);

console.log(list.head);
list.removeFirst();
list.removeFirst();
console.log(list.head);
