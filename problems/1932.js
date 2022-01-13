const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let N;
let input = [];

rl.on('line', function (line) {
  if(!N) N = +line; 
  else {
    input.push(line.split(' ').map(n => +n));
    let DP = Array.from({ length: N }, (v, i) => Array(i + 1).fill(0));
    DP[0][0] = input[0][0];
    if(input.length === N) {
      for(let i = 0; i < N - 1; i++) {
        for(let j = 0; j < input[i].length; j++) {
          DP[i + 1][j] = Math.max(DP[i + 1][j], DP[i][j] + input[i + 1][j]);
          DP[i + 1][j + 1] = Math.max(DP[i + 1][j + 1], DP[i][j] + input[i + 1][j + 1]);
        }
      }
      console.log(Math.max(...DP[N - 1]));
      rl.close();
    }
  }
})
