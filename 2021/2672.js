const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
let input = [];
let N = 0;

rl.on('line', function (line) {
  if(N === 0) {
    N = +line;
  } else {
    input.push(line.split(' ').map(num => +num));
    if(input.length === N) {
      rl.close();      
    }
  }
})

.on('close', function () {
  let area = input.map(rect => rect[2] * rect[3]).reduce((a,b) => a + b);

  for(let i = 0; i < N; i++) {
    for(let j = i + 1; j < N; j++) {
      let curBottomY = input[i][1];
      let curTopY = curBottomY + input[i][3];
      let curLeftX = input[i][0];
      let curRightX = curLeftX + input[i][2];
      let targetBottomY = input[j][1];
      let targetTopY = targetBottomY + input[j][3];
      let targetLeftX = input[j][0];
      let targetRightX = targetLeftX + input[j][2];
      if(curBottomY < targetTopY && targetBottomY < curTopY) {
        // y선분 겹침
        if(curLeftX < targetRightX && targetLeftX < curRightX) {
          // x선분 겹침
          let height = Math.min(curTopY, targetTopY) - Math.max(curBottomY, targetBottomY);
          let width = Math.min(curRightX, targetRightX) - Math.max(curLeftX, targetLeftX);
          area -= height * width;
        }
      }
    }
  }

  if(area % 10 === 0) {
    console.log(area);
  } else {
    console.log(area.toFixed(2));
  }
  process.exit();
});