const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let N = 0;
let K = 0;

rl.on('line', function (line) {
  if(!N) {
    N = +line;  
  } else {
    K = +line;
    rl.close();
  }
})

.on('close', function () {
  let min = 1;
  let max = N * N;
  let result = 0;

  while(min <= max) {
    let mid = Math.floor((min + max) / 2);
    let cnt = 0;

    for(let i = 1; i <= N; i++) {
      cnt += Math.min(N, mid / i >> 0);
    }

    if(cnt >= K) {
      result = mid;
      max = mid - 1;
    }

    if(cnt < K) {
      min = mid + 1;
    }
  }

  console.log(result);
  process.exit();
});
