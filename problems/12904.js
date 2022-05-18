const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let S, T;

rl.on("line", function (line) {
  if (!S) S = line;
  else {
    T = line;
    let status = 1; // 0 -> 앞, 1 -> 뒤
    let frontIdx = 0;
    let backIdx = T.length - 1;
    while (S.length <= Math.abs(backIdx - frontIdx)) {
      // 뒤인 경우
      if (status === 1) {
        if (T[backIdx] === "B") {
          status = 0;
          backIdx -= 1;
        } else {
          backIdx -= 1;
        }
      } else {
        if (T[frontIdx] === "B") {
          status = 1;
          frontIdx += 1;
        } else {
          frontIdx += 1;
        }
      }
    }
    let result = T.slice(frontIdx, backIdx + 1);
    result = status === 0 ? result.split("").reverse().join("") : result;
    console.log(result === S ? 1 : 0);
    rl.close();
  }
});
