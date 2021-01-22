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
  const K = +input.shift();
  let answer = [];

  for(let i = 0; i < K; i++) {
    if(+input[i] === 0) {
      answer.pop();
    } else {
      answer.push(+input[i]);
    }
  }
  answer[0] ? console.log(answer.reduce((a,b) => a + b)) : console.log(0);

  process.exit();
});
