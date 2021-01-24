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
  let num = input[0].split(/\-|\+/g).map(v => +v);
  let cals = input[0].split('').filter(v => v === '-' || v === '+');
  let answer = 0;

  while(true) {
    let idx = cals.indexOf('+');
    if(idx !== -1) {
      num.splice(idx, 2, num[idx] + num[idx + 1]);
      cals.splice(idx, 1);
    } else {
      answer = num.reduce((a,b) => a - b);
      break;
    }
  }
  
  console.log(answer);

  process.exit();
});