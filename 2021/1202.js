const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let jewels = [];
let queue = [];
let N, K;
let result = 0;

function enqueue(arr) {
  let isContain = false;
  for(let i = 0; i < queue.length; i++) {
    if(queue[i][1] < arr[1]) {
      queue.splice(i, 0, arr);
      isContain = true;
      break;
    }
  }
  if(!isContain) {
    queue.push(arr);
  }
}

function dequeue() {
  return queue.shift();
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
      enqueue(jewels[i]);
    } else {
      if(queue.length) {
        let jewel = dequeue();

        result += jewel[1];
      }
    }
  }

  console.log(result);
  process.exit();
});