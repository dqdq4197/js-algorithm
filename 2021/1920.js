const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
let input = [];

function binalySearch(arr, v) {
  let minIdx = 0;
  let maxIdx = arr.length - 1;

  while(minIdx <= maxIdx) {
    let curIdx = Math.floor((minIdx + maxIdx) / 2);
    if(arr[curIdx] === v) {
      return 1;
    }
    if(arr[curIdx] < v) {
      minIdx = curIdx + 1;
    } else {
      maxIdx = curIdx - 1;
    }
  }
  return 0;
}

rl.on('line', function (line) {
  input.push(line.split(' ').map(num => Number(num)));
})

.on('close', function () {
  let NArr = input[1].sort((a,b) => a - b);
  let MArr = input[3]

  MArr.forEach(num => {
    console.log(binalySearch(NArr, num))
  })

  process.exit();
});
