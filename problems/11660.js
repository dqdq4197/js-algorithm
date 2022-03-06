//시간초과 문제 발생 -> 확인결과 빠른 입출력 문제
//빠른 입출력 방법
//-> Node.js의 경우 매 번 console.log로 출력하면 시간초과를 받고, 하나의 문자열에 결과값과 개행문자를 저장해서 마지막에 출력하면 해결

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N, M;
let table = [];
let sections = [];

function prefixSum() {
  let sumTable = Array.from({ length: N + 1 }, () => Array(N + 1).fill(0));
  for (let i = 1; i <= N; i++) {
    for (let j = 1; j <= N; j++) {
      sumTable[i][j] =
        table[i - 1][j - 1] +
        sumTable[i - 1][j] +
        sumTable[i][j - 1] -
        sumTable[i - 1][j - 1];
    }
  }

  return sumTable;
}

function solution(section, sumTable) {
  const [x1, y1, x2, y2] = section;

  let sum =
    sumTable[x2][y2] -
    sumTable[x2][y1 - 1] -
    sumTable[x1 - 1][y2] +
    sumTable[x1 - 1][y1 - 1];

  return sum;
}

rl.on("line", function (line) {
  if (!N) {
    [N, M] = line.split(" ").map((n) => +n);
  } else if (table.length !== N) {
    table.push(line.split(" ").map((n) => +n));
  } else {
    sections.push(line.split(" ").map((n) => +n));

    if (sections.length === M) {
      const sumTable = prefixSum();
      let result = "";
      for (let i = 0; i < M; i++) {
        result += solution(sections[i], sumTable) + "\n";
      }
      console.log(result);
      rl.close();
    }
  }
});
