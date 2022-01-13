const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
let N, M;
let S = new Set();
let result = 0;

rl.on('line', function (line) {
  if(N === undefined) {
    [N, M] = line.split(' ').map(n => +n);
  } else if(N > 0) {
    N--;
    S.add(line);
  } else {
    if(S.has(line)) result++;
    if(--M === 0) {
      console.log(result);
      rl.close();
    }
  }
})