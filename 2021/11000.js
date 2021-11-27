const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let N;
let input = [];
let result = 0;

function enqueue(arr, num) {
  let isContain = false;

  for(let i = 0; i < arr.length; i++) {
    if(arr[i] >= num) {
      arr.splice(i, 0, num);
      isContain = true;
      break;
    }
  }
  if(!isContain) arr.push(num);
}

rl.on('line', function (line) {
  if(!N) {
    N = +line;
  } else {
    input.push(line.split(' ').map(n => +n));
    if(input.length === N) rl.close();
  }
})

.on('close', function () {
  input.sort((a, b) => a[0] - b[0]);

  let queue = [];
  let idx = 0;

  for(let i = 0 ; i < input.length; i++) {
    let [s, t] = input[i];

    if(queue.length === 0 || queue[idx] > s) {
      enqueue(queue, t)
      result++;
    } else {
      enqueue(queue, t);
      idx++;
    }
  }

  console.log(result);
  process.exit();
});