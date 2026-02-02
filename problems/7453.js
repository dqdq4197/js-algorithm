/**
 * 미해결 문제
 *
 * 백준 - 투포인터
 * https://www.acmicpc.net/problem/7453
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N;
const A = [];
const B = [];
const C = [];
const D = [];

rl.on("line", function (line) {
  if (!N) {
    N = +line;
  } else {
    const [a, b, c, d] = line.split(" ").map(Number);

    A.push(a);
    B.push(b);
    C.push(c);
    D.push(d);

    if (A.length === N) {
      rl.close();
    }
  }
}).on("close", function () {
  const AB = [];
  const CD = [];

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      AB.push(A[i] + B[j]);
      CD.push(C[i] + D[j]);
    }
  }

  AB.sort((a, b) => a - b);
  CD.sort((a, b) => a - b);
  let count = 0n;
  let left = 0;
  let right = CD.length - 1;

  while (left < AB.length && right >= 0) {
    const sum = AB[left] + CD[right];
    if (sum === 0) {
      const leftNum = AB[left];
      let leftCount = 0n;

      while (left < AB.length && leftNum === AB[left]) {
        left += 1;
        leftCount += 1n;
      }

      const rightNum = CD[right];
      let rightCount = 0n;

      while (right >= 0 && rightNum === CD[right]) {
        right -= 1;
        rightCount += 1n;
      }

      count += leftCount * rightCount;
      continue;
    }

    if (sum > 0) {
      right -= 1;
    } else {
      left += 1;
    }
  }
  console.log(count);
});
