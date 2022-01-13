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
  const N = input.shift();
  input = input.map(v => +v).sort((a,b) => b - a);
  let i = 0;
  let max = 0;
  while(i < N) {
    if(max < input[i] * (i + 1)) {
      max = input[i] * (i + 1)
    }
    i++;
  }

  console.log(max)

  process.exit();
});