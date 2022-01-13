const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
let input = [];

rl.on('line', function (line) {
  input.push(line);
})

.on('close', function () {
  let [N, K] = input.shift().split(' ').map(v => +v);
  let answer = 0;
  for(let i = N - 1; i >= 0; i--) {
    if(K - input[i] >= 0) {
      answer += parseInt(K / input[i]);
      K %= input[i];
    }
    if(K === 0) break;
  }
  console.log(answer);
  process.exit();
});