const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let arr = [];
let answer = 0;
let H = 0;
let W = 0;

rl.on('line', function (line) {
  if(!W) {
    [H, W] = line.split(' ').map(num => +num);
  } else {
    arr = line.split(' ').map(num => +num);
  }
  if(arr.length) {
    rl.close();
  }
})

.on('close', function () {
  let startH = arr[0];
  let startIndex = 0;
  let prevH = arr[0];

  for(let i = 1; i < W; i++) {
    if(prevH < arr[i]) {
      let sum = 0;
      let standard = Math.min(startH, arr[i]);
      for(let k = startIndex + 1; k < i; k++) {
        sum += standard - arr[k];
      }
      console.log(startH, startIndex, prevH, i, sum)
      startIndex = i;
      startH = arr[i];
      prevH = arr[i];
      answer += sum;
    } else {
      prevH = arr[i];
    }
  }

  process.exit();
});