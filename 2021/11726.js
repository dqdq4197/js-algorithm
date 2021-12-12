const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', function (line) {
  let DP = [1, 2];
  for(let i = 2; i < +line; i++) {
    DP[i] = (DP[i - 2] + DP[i - 1]) % 10007;
  }
  console.log(DP[+line - 1]);
  rl.close();
})