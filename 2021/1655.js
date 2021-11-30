const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let N;
let result = [];
let pq1 = [null];
let pq2 = [null];

function enqueue(pq, num) {
  pq.push(num);
  let size = pq.length - 1;

  while(size > 1 && pq[Math.floor(size / 2)] < pq[size]) {
    let temp = pq[size];
    pq[size] = pq[Math.floor(size / 2)];
    pq[Math.floor(size / 2)] = temp;
    size = Math.floor(size / 2);
  }
}

function dequeue(pq) {
  let removeItem = pq[1];
  pq[1] = pq.pop();

  let p = 1;
  let c = 2;

  while(c < pq.length) {
    if(c + 1 < pq.length && pq[c + 1] > pq[c]) {
      c = c + 1;
    }

    if(pq[c] <= pq[p]) break;
    let temp = pq[c];
    pq[c] = pq[p]
    pq[p] = temp;
    p = c;
    c *= p;
  }

  return removeItem;
}


rl.on('line', function (line) {
  if(N === undefined) {
    N = +line;
  } else {
    if(pq2.length > pq1.length) {
      enqueue(pq1, +line);
    } else {
      enqueue(pq2, +line);
    }
    
    if(pq1.length === 0) {
      result.push(pq2[1]);
    } else {
      if(pq2[1] > pq1[1]) {
        let q1 = dequeue(pq1);
        let q2 = dequeue(pq2);
        enqueue(pq1, q2);
        enqueue(pq2, q1);
      }

      result.push(pq2[1]);
    }
    N--;
    if(N === 0) rl.close();
  }  
})

.on("close", function () {
  console.log(result.join("\n"));
  process.exit();
});