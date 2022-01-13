const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let positiveNums = [];
let negativeNums = [];
let N;
let zeroCnt = 0;
let oneCnt = 0;
let result = 0;

rl.on('line', function (line) {
  if(!N) {
    N = +line;
  } else {
    if(+line === 0) {
      zeroCnt++; 
    } else if(+line === 1) {
      oneCnt++;
    } else if(+line > 0) {
      positiveNums.push(+line);
    } else {
      negativeNums.push(+line);
    }

    if(N === negativeNums.length + positiveNums.length + zeroCnt + oneCnt)
      rl.close()
  }
})

.on('close', function () {
  negativeNums.sort((a, b) => a - b);
  positiveNums.sort((a, b) => b - a);
  
  for(let i = 0; i < negativeNums.length; i += 2) {
    if(i + 1 === negativeNums.length) {
      if(zeroCnt) continue;
      else result += negativeNums[i];
    } else {
      result += negativeNums[i] * negativeNums[i + 1];
    }
  }
  for(let i = 0; i < positiveNums.length; i += 2) {
    if(i + 1 === positiveNums.length) result += positiveNums[i];
    else result += positiveNums[i] * positiveNums[i + 1];
  }
  console.log(result + oneCnt);
  process.exit();
});