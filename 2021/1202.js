const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
// max heap 문제
let jewels = [];
let queue = [0];
let N, K;
let result = 0;

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

rl.on('line', function (line) {
  if(!N) {
    [N, K] = line.split(' ').map(n => +n);
  } else if(jewels.length < N) {
    let temp = line.split(' ').map(n => +n);
    jewels.push([temp[0], temp[1], 1]); // 1 -> 보석
  } else {
    jewels.push([+line, 0, 0]); // 0 -> 가방
    if(jewels.length === K + N) rl.close();
  }
})

.on('close', function () {
  jewels.sort((a, b) => {
    if(a[0] !== b[0]) {
      return a[0] - b[0];
    } else {
      return b[2] - a[2];
    }
  })

  for(let i = 0; i < jewels.length; i++) {
    if(jewels[i][2] === 1) {
      enqueue(jewels[i][1]);
    } else {
      let jewel = dequeue();

      if(!jewel) continue;
      result += jewel;
    }
  }

  console.log(result);
  process.exit();
});