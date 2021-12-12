const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let N;
rl.on('line', function (line) {
  if(!N) N = +line;
  else {
    let nums = line.split(' ').map(n => +n);
    let DP = Array.from({ length: N }, () => 0);
    DP[0] = nums[0];

    for(let i = 1; i < N; i++) {
      DP[i] = Math.max(nums[i] + DP[i - 1], nums[i]);
    }

    console.log(Math.max(...DP));
    rl.close();
  }
})