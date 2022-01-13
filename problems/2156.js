const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let N;
let input = [0];

rl.on('line', function (line) {
  if(!N) N = +line;
  else {
    if(N === 1) {
      console.log(+line);
      process.exit();
    }
    input.push(+line);
    if(input.length === N + 1) {
      let DP = Array.from({ length: N + 1 }, () => 0);
      DP[1] = input[1];
      DP[2] = DP[1] + input[2];

      for(let i = 3; i <= N; i++) {
        DP[i] = Math.max(DP[i - 2] + input[i], DP[i - 3] + input[i - 1] + input[i], DP[i - 1]);
      }
      console.log(Math.max(...DP));
      rl.close();
    }
  }
})