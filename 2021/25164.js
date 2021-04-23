const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let input = [];
let answer = [999999, 0];

rl.on('line', function (line) {
  input = line;
  rl.close();
})

.on('close', function () {
  
  function oddCnt(num) {
    return num.split('').map(num => num % 2 === 0 ? 0 : 1).reduce((a,b) => a + b);
  }
  function changeAnswer(cnt) {
    if(answer[0] > cnt) {
      answer[0] = cnt;
    }
    if(answer[1] < cnt) {
      answer[1] = cnt;
    }
  }
  function recur(num, cnt) {
    let cntTemp = cnt + oddCnt(num);
    let resetCnt = cntTemp;
    for(let i = 1; i < num.length - 1; i++) {
      for(let j = i + 1; j < num.length; j++) {
        let temp = num;
        let num1 = +temp.slice(0, i);
        let num2 = +temp.slice(i, j);
        let num3 = +temp.slice(j, temp.length);

        temp = num1 + num2 + num3 + ''

        if(temp.length > 2) {
          recur(temp, cntTemp);
        } else {
          if(temp.length === 2) {
            cntTemp += oddCnt(temp);
            temp = parseInt(temp[0]) + parseInt(temp[1]) + '';
          }

          if(temp.length === 2) {
            cntTemp += oddCnt(temp);
            temp = parseInt(temp[0]) + parseInt(temp[1]);
          }
          
          if(temp % 2 === 1) {
            cntTemp += 1
          }

          changeAnswer(cntTemp)
          cntTemp = resetCnt;
        }
      }
    }
  }

  if(input.length === 1) {
    let cnt = oddCnt(input);
    changeAnswer(cnt);
  }

  if(input.length === 2) {
    let cnt = oddCnt(input);
    input = parseInt(input[0]) + parseInt(input[1]) + '';
    if(input.length === 2) {
      cnt += oddCnt(input);
      input = parseInt(input[0]) + parseInt(input[1]) + '';
      cnt += oddCnt(input);
    }
    changeAnswer(cnt);
  }

  if(input.length > 2) {
    recur(input, 0);
  }

  console.log(answer[0], answer[1]);
  
  process.exit();
});