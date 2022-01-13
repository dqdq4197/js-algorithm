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
  let times = input[0].split(' ').map(v => +v);

  let sum = 0;
  times.sort((a,b) => a - b);
  
  for(let i = 1; i <= N; i++) {
    let idx = i
    while(idx-- > 0) {
      sum += times[idx];
    }
  }
  
  console.log(sum)
  process.exit();
});