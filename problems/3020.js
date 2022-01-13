const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let W, H;
let top = []; // 석순
let bot = []; // 종유석
let idx = 0;

rl.on('line', function (line) {
  if(!W) {
    [W, H] = line.split(' ').map(n => +n);
    top = Array.from({ length: H + 1 }, () => 0);
    bot = Array.from({ length: H + 1 }, () => 0);
  } else {
    if(idx % 2 === 0) {
      bot[+line]++;
    } else {
      top[+line]++;
    }
    
    if(++idx === W) rl.close();
  }
})

.on('close', function () {
  let sum_top = [];
  let sum_bot = [];
  
  for(let i = H; i > 0; i--) {
    sum_top[i] = (sum_top[i + 1] ?? 0) + top[i];
    sum_bot[i] = (sum_bot[i + 1] ?? 0) + bot[i];
  }
  
  let min = 200000;
  let cnt = 0;

  for(let i = H; i > 0; i--) {
    sum_bot[i] = sum_bot[i] + sum_top[H - i + 1];

    if(sum_bot[i] < min) {
      min = sum_bot[i];
      cnt = 1;
    } else if(sum_bot[i] === min) {
      cnt++;
    }
  }

  console.log(min, cnt);
  process.exit();
});