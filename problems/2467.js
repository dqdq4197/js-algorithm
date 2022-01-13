const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let N;
let L = 0;
let R = 0;
let result = [0, 0];
let sum = Infinity;

rl.on('line', function (line) {
  if(!N) {
    N = +line;
    R = N - 1;
    result = [L, R];
  } else {
    let nums = line.split(' ').map(n => +n);
    
    while(L < R) {
      let nSum = nums[L] + nums[R]
      if(Math.abs(nSum) < sum) {
        result = [nums[L], nums[R]];
        sum = Math.abs(nSum);
      }
      if(nSum === 0) break;
      if(nSum > 0) R--;
      else L++;
    }

    console.log(result.join(' '));
    rl.close();
  }
})