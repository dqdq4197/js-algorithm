const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", function (line) {
  const [A, B] = line.split(" ");
  const ALen = A.length;
  const BLen = B.length;

  let min = 50;
  for (let i = 0; i <= BLen - ALen; i++) {
    let cnt = 0;
    for (let j = 0; j < ALen; j++) {
      if (A[j] !== B[i + j]) cnt += 1;
      if (cnt >= min) break;
    }

    min = Math.min(min, cnt);
  }

  console.log(min);
  rl.close();
});
