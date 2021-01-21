let num = [4,3,6,8,7,5,2,1];
let n = 8
let temp = [];
let answerTemp = [];
let i = 1;
let answer = [];
let idx = 0;
while(i <= n) {
  temp
  answer.push('+')
  if(i === num[idx]) {
    while(temp[temp.length - 1] === num[idx]) {
      answerTemp.push(temp.pop());
      answer.push('-')
      idx++;
      if(idx === n) break;
    }
  }
  i++;
}

console.log(answer)


console.log(answerTemp)