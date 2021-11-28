let queue = [0];

// min heap
function enqueue(num) {
  queue.push(num);
  let p = queue.length - 1;
  while(queue[Math.floor(p / 2)] > queue[p] && p > 1) {
    let temp = queue[Math.floor(p / 2)];
    queue[Math.floor(p / 2)] = queue[p];
    queue[p] = temp; 
    p = Math.floor(p / 2);
  }
}

function dequeue() {
  if(queue.length === 2) return queue.pop(); 
  let removeNum = queue[1];
  queue[1] = queue.pop();
  let p = 1;
  let c = 2;
  
  while(c < queue.length) {
    if(c + 1 < queue.length && queue[c] > queue[c + 1]) {
      c = c + 1;
    }
    if(queue[p] < queue[c]) break;
    let temp = queue[c];
    queue[c] = queue[p];
    queue[p] = temp;
    p = c;
    c *= 2;
  }
  
  return removeNum;
}


// max heap

function enqueue(num) {
  queue.push(num);
  let size = queue.length - 1;

  while(size > 1 && queue[Math.floor(size / 2)] < queue[size]) {
    let temp = queue[size];
    queue[size] = queue[Math.floor(size / 2)];
    queue[Math.floor(size / 2)] = temp;
    size = Math.floor(size / 2);
  }
}

function dequeue() {
  if(queue.length === 1) return undefined;
  if(queue.length === 2) return queue.pop();
  let removeItem = queue[1];
  queue[1] = queue.pop();

  let p = 1;
  let c = 2;

  while(c < queue.length) {
    if(c + 1 < queue.length && queue[c + 1] > queue[c]) {
      c = c + 1;
    }
    if(queue[c] <= queue[p]) break;

    let temp = queue[c];
    queue[c] = queue[p];
    queue[p] = temp;
    p = c;
    c *= 2;
  }

  return removeItem;
}