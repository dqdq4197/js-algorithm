const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let N, M;
let input = [];

function binarySearch() {
  let min = 0;
  let max = Math.max(...input);
  let result = 0;

  while(min <= max) {
    let mid = Math.floor((min + max) / 2);

    let sum = 0;
    input.forEach(num => {
      if(num > mid) {
        sum += mid;
      } else {
        sum += num;
      }
    })
    
    if(sum === M) {
      result = mid;
      break;
    } else if(sum < M) {
      min = mid + 1;
      result = mid;
    } else {
      max = mid - 1;
    }
  }

  return result;
}

rl.on('line', function (line) {
  if(!N) {
    N = +line;
  } else if(input.length === 0) {
    input = line.split(' ').map(n => +n);
  } else {
    M = +line;
    console.log(binarySearch());
    rl.close();
  }
})