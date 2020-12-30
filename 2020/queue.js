
let Queue = function() {
  this.first = null;
  this.size = 0;
}

let Node = function(data) {
  this.data = data;
  this.next = null
}

Queue.prototype.enqueue = function(data) {
  let node = new Node(data);

  if(!this.first) {
    this.first = node;
  } else {
    n = this.first;
    while(n.next) {
      n = n.next;
    }
    n.next = node;
  }
  this.size += 1;
  
  console.log('first', this.first, n)
  return node;
}

let queue = new Queue();
queue.enqueue(3)