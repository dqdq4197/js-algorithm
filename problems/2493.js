const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let N;

rl.on('line', function (line) {
  if(!N) {
    N = +line;
  } else {
    let tops = line.split(' ').map(n => +n);
    let answer = [];
    let stack = [];

    for(let i = 0; i < N; i++) {
      let now = tops[i]; // 현재 탑 
      console.log(stack);
      // 현재 탑을 기준으로 
      // 가장 근접한 탑인 스택(stack[stack.length - 1])과 비교하여
      // 현재 탑보다 높이가 낮다면 스택에서 제거해줍니다.
      while(stack.length && tops[stack[stack.length - 1]] < now) {
        stack.pop();
      }

      if(stack.length === 0) {
        // 스택에 현재 탑보다 큰 탑이 없기때문에 0을 출력해줍니다.
        answer.push(0);
      } else {
        // 위 while문을 통해 현재 탑과 
        // 가장 근접한 탑중 높이가 더 낮은 탑은 스택에서 제거하였기 때문에
        // 남은 스택의 가장 근접한 탑(stack[stack.length - 1])인덱스에 1을 더해 출력해줍니다.
        answer.push(stack[stack.length - 1] + 1);
      }

      //현재 탑의 인덱스를 스택에 푸쉬해줍니다.
      stack.push(i);
    }

    console.log(answer.join(' '));
    rl.close();
  }
})