const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let K = 0;
let N = 0;
let arr = [];

rl.on('line', function (line) {
  if(K === 0) {
    [K, N] = line.split(' ').map(n => +n);
  } else {
    arr.push(+line);
    if(arr.length === K) {
      rl.close();
    }
  }
})

.on('close', function () {
  let max = Math.max(...arr);
  let min = 1;
  let result = 0;

  while(min <= max) {
    let mid = Math.floor((min + max) / 2);
    let cnt = arr.reduce((a, b) => a + (b / mid >> 0), 0);

    if(cnt >= N) {
      result = Math.max(result, mid);
      min = mid + 1;
    } else {
      max = mid - 1;
    }
  }

  console.log(result);
  process.exit();
});
