const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
let input = [];

rl.on('line', function (line) {
  input.push(line);
})

.on('close', function () {
  let arr = [[]];
  for(let i = 0; i < 4; i++) {
    arr.push(input.shift().split('').map(v => +v))
  }
  const K = input.shift();
  let move = Array.from({length: K}, () => [])
  for(let i = 0; i < K; i++) {
    move[i] = input[i].split(' ').map(v => +v);
  } 
  let answer = 0;

  move.forEach(v => {
    let [num, dir] = v;
    left(num, dir);
    right(num, dir);
    rotate(num, dir);
  })
  
  function check(a, b) {
    if(a > b) {
      if(arr[a][6] !== arr[b][2]) {
        return true;
      } else {
        return false;
      }
    } else {
      if(arr[a][2] !== arr[b][6]) {
        return true;
      } else {
        return false;
      }
    }
  }
  
  function left(num, dir) {
    if(num <= 1) {
      return ;
    }
    if(check(num, num - 1)) {
      left(num - 1, -dir);
      rotate(num - 1, -dir);
    }
  }
  
  function right(num, dir) {
    if(num >= 4) {
      return ;
    }
  
    if(check(num, num + 1)) {
      right(num + 1, -dir);
      rotate(num + 1, -dir);
    }
  }
  
  function rotate(num, dir) {
    if(dir === 1) {
      let temp = arr[num][7];
      arr[num].pop();
      arr[num].unshift(temp);
    } else {
      let temp = arr[num][0];
      arr[num].shift();
      arr[num].push(temp);
    }
  }
  
  arr.forEach((v, i) => {
    if(v[0] === 1) {
      answer += Math.pow(2, i - 1);
    }
  })
  
  console.log(answer);
  process.exit();
});