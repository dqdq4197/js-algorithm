const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let N;
let DP = [];
let input = [[-1, -1, -1]];

rl.on('line', function (line) {
  if(!N) {
    N = +line;
    DP = Array.from({ length: N + 1 }, () => Array(3).fill(0));
  } else {
    input.push(line.split(' ').map(n => +n));
    DP[1] = [...input[1]];
    if(N + 1 === input.length) {
      for(let i = 2; i <= N; i++) {
        for(let j = 0; j < 3; j++) {
          DP[i][j] = Math.min(...DP[i - 1].slice(0, j), ...DP[i - 1].slice(j + 1, 3)) + input[i][j];
        }
      }
      console.log(Math.min(...DP[N]));
      rl.close();
    }
  }
})