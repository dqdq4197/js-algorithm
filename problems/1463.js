const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
let n = 0;

rl.on('line', function (line) {
  n = +line;
})

.on('close', function () {
  let d = [0,0,1,1];

  for(let i = 4; i <= n; i++) {
    let a = n;
    let b = n;
    let c = n;
    if(i % 2 === 0) {
      a = d[i / 2] + 1;
    }
    if(i % 3 === 0) {
      b = d[i / 3] + 1;
    }
    c = d[i - 1] + 1;
    d[i] = Math.min(a, b, c);
  }
  console.log(d[n])
  process.exit();
});