const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
let input = [];
function check(arr) {
  let queue = [];
  while(arr.length) {
    let q = arr.shift();
    if(q === '(') {
      queue.push(q);
    }
    if(q === ')') {
      if(queue[queue.length - 1] === '(') {
        queue.pop();
      } else {
        return 'NO';
      }
    }
  }
  if(queue[0]) {
    return 'NO';
  }
  return 'YES';
}

rl.on('line', function (line) {
  input.push(line);
})

.on('close', function () {
  const N = input.shift();
  for(let i = 0; i < N; i++) {
    console.log(check(input[i].split('')))
  }
  process.exit();
});