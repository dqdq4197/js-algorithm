const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let N, K;
let input = [];

rl.on('line', function (line) {
  if(!N) {
    [N, K] = line.split(' ').map(n => +n);
  } else {
    let DP = Array.from({ length: 100001 }, () => 0);
    input.push(line.split(' ').map(n => +n));
    if(input.length === N) {
      for(let i = 0; i < N; i++) {
        console.log(DP[input[i][0]], input[i][1]);
        DP[input[i][0]] = Math.max(DP[input[i][0]], input[i][1]);
        for(let j = 0; j < i; j++) {
          if(input[i][0] + input[j][0] > 100000) continue;
          DP[input[i][0] + input[j][0]] = Math.max(DP[input[i][0] + input[j][0]], input[i][1] + input[j][1]);
        }
      }
      console.log(DP);
      rl.close();
    }
  }
})