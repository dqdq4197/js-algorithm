const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
let N, M;
let map = new Map();
let result = 0;
let i = 0;

rl.on('line', function (line) {
  if(!N) {
    [N, M] = line.split(' ').map(n => +n);
  } else {
    if(map.has(line)) {
      result++;
    } else {
      map.set(line, true)
    }

    if(++i === N + M) rl.close();
  }
})

.on('close', function () {
  console.log(result);
  process.exit();
});