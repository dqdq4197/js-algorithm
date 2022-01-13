const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let N;

rl.on('line', function (line) {
  if(!N) N = +line;
  else {
    let DP = Array.from({ length: N + 1 }, () => Array(N + 1).fill(0));
    packages = [0, ...line.split(' ').map(n => +n)];

    for(let i = 1; i <= N; i++) {
      let money = packages[i];
      for(let j = 1; j <= N; j++) {
        if(i > j) {
          DP[i][j] = DP[i - 1][j];
        } else {
          DP[i][j] = Math.max(DP[i - 1][j], DP[i][j - i] + money);
        }
      }
    }
    console.log(DP[N][N]);
    rl.close();
  }
})

.on('close', function () {

  process.exit();
});