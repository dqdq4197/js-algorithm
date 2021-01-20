const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
let input = [];

function binalySearch(arr, num) {
  let l = 0;
  let r = arr.length - 1;
  let isContain = 0;

  while(l <= r) {
    let mid = Math.floor((l + r) / 2);

    if(arr[mid] === num) {
      isContain = 1;
      break;
    } else if(arr[mid] > num) {
      r = mid - 1;
    } else {
      l = mid + 1;
    }
  }

  return isContain;
}

rl.on('line', function (line) {
  input.push(line.split(' ').map(num => Number(num)));
})

.on('close', function () {
  const NArr = input[1].sort((a,b) => a - b);
  const MArr = input[3];

  MArr.forEach(num => {
    console.log(binalySearch(NArr, num))
  })
  process.exit();
});
