const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
let input = [];

rl.on('line', function (line) {
  input.push(line.split(' ').map(num => Number(num)));
})

.on('close', function () {
  const M = input[0][1];
  let HArr = input[1]
  let min = 0;
  let max = HArr.reduce((a,b) => a >= b ? a : b)
  console.log(max)
  let answer = 0;

  while(min <= max) {
    let mid = Math.floor((min + max) / 2);
    let len = HArr.map(v => v - mid > 0 ? v-mid : 0).reduce((a,b) => a + b);
    if(len === M) {
      answer = mid;
      break;
    }
    if(len < M) {
      max = mid - 1
    } else {
      min = mid + 1;
    }
    answer = max;
  }
  
  console.log(answer)
  process.exit();
});
