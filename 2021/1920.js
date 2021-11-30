const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
let input = [];

rl.on('line', function (line) {
  input.push(line.split(' ').map(num => +num));
  if(input.length === 4) rl.close();
})

.on('close', function () {
  console.log(input);
  let set = new Set(input[1]);
  input[3].forEach(n => {
    if(set.has(n)) {
      console.log(1);
    } else {
      console.log(0);
    }
  })
  process.exit();
});
