const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


rl.on('line', function (line) {
  let N = +line;
  let DP = Array.from({ length: N + 1 }, () => Array(10).fill(1));
  DP[1][0] = 0;

  for(let i = 2; i <= N; i++) {
    for(let j = 0; j <= 9; j++) {
      if(j === 0) {
        DP[i][j] = DP[i - 1][j + 1];
      } else if(j === 9) {
        DP[i][j] = DP[i - 1][j - 1];
      } else {
        DP[i][j] = (DP[i - 1][j - 1] + DP[i - 1][j + 1]) % 1000000000;
      }
    }
  }
  
  console.log(DP[N].reduce((a, b) => a + b) % 1000000000);
  rl.close();
})