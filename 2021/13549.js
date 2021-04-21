const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let answer = 100001;
let inf = 100001;
let N = 0;
let K = 0;
let costs = new Array(100001).fill(inf);

rl.on('line', function (line) {
  [N, K] = line.split(' ').map(num => +num);
  rl.close();
})

.on('close', function () {
  let queue = [[N, 0]];

  while(queue.length) {
    let [num, cnt] = queue.shift();
    
    if(costs[num] < cnt) continue;

    if(num === K) {
      answer = cnt;
      break;
    }

    let x1 = num - 1;
    let x2 = num + 1;
    let x3 = num * 2;


    if (0 <= x1 && costs[x1] > cnt + 1) { 
      costs[x1] = cnt + 1;
      queue.push([x1, cnt + 1]);
    }

    if (x2 <= inf && costs[x2] > cnt + 1) {
      costs[x2] = cnt + 1;
      queue.push([x2, cnt + 1]);
    }

    if (x3 <= inf && costs[x3] > cnt) {
      costs[x3] = cnt;
      queue.push([x3, cnt]);
    }
  }

  console.log(answer);
  process.exit();
});