const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let N = 0;
let input = [];

rl.on('line', function (line) {
  if(!N) {
    N = +line;
  } else {
    input = line.split(' ').map(n => +n);
    rl.close();
  }
})

.on('close', function () {
  let answer = [];
  let map = new Map();
  let sortedInput = Array.from(new Set([...input])).sort((a, b) => a - b);
  sortedInput.forEach((v, i) => map.set(v, i));
  input.forEach(v => answer.push(map.get(v)));
  console.log(answer.join(" "))
  process.exit();
});