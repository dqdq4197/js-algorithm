const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
let input = [];
let sortedN = [];
let answer = [];

function binalySearch(num) {
  let min = 0;
  let max = sortedN.length - 1;

  while(min <= max) {
    let mid = Math.floor((min + max) / 2);
    
    if(sortedN[mid] === num) {
      return true;
    } else if(sortedN[mid] < num) {
      min = mid + 1;
    } else {
      max = mid - 1;
    }
  }

  return false;
}

rl.on('line', function (line) {
  input.push(line.split(' ').map(num => +num));
  if(input.length === 4) {
    rl.close();
  }
})

.on('close', function () {
  sortedN = input[1].sort((a, b) => a - b);

  input[3].forEach(num => {
    let isContain = binalySearch(num);
    answer.push(isContain ? 1 : 0);
  })

  console.log(answer.join(' '));

  process.exit();
});