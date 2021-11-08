const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let input = [];
let answer = [];
rl.on('line', function (line) {
  input.push(line.split(' ').map(num => +num));
  if(input.length === 4) {
    rl.close();
  }
})

.on('close', function () {
  let map = new Map();

  input[1].forEach(num => {
    if(map.has(num)) {
      map.set(num, map.get(num) + 1);
    } else {
      map.set(num, 1);
    }
  })

  input[3].forEach(num => answer.push(map.get(num) || 0));

  console.log(answer.join(' '));
  
  process.exit();
});
