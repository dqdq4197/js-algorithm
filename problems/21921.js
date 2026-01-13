/**
 * 백준 - 슬라이딩 윈도우
 * https://www.acmicpc.net/problem/21921
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N, X;
let visitors = [];

rl.on("line", function (line) {
  if (!N) {
    [N, X] = line.split(" ").map(Number);
  } else {
    visitors = line.split(" ").map(Number);

    let visitCount = 0;
    let maxVisitCount = visitCount;
    let sameCount = 0;
    let left = 0;
    let right = 0;

    while (right < N) {
      visitCount += visitors[right++];

      if (right - left > X) {
        visitCount -= visitors[left++];
      }

      if (visitCount < maxVisitCount) {
        continue;
      }

      if (visitCount === maxVisitCount) {
        sameCount += 1;
        maxVisitCount = visitCount;
        continue;
      }

      sameCount = 1;
      maxVisitCount = visitCount;
    }

    if (maxVisitCount === 0) {
      console.log("SAD");
    } else {
      console.log([maxVisitCount, sameCount].join("\n"));
    }
    rl.close();
  }
});
