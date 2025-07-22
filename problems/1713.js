/**
 * 백준 - 시뮬레이션
 * https://www.acmicpc.net/problem/1713
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N, M;
let input = [];

rl.on("line", function (line) {
  if (!N) {
    N = +line;
  } else if (!M) {
    M = +line;
  } else {
    input = line.split(" ").map(Number);

    rl.close();
  }
}).on("close", function () {
  const students = new Map();

  let time = M;

  for (const num of input) {
    if (students.has(num)) {
      const student = students.get(num);

      students.set(num, { vote: student.vote + 1, time: student.time });
      continue;
    }

    if (students.size < N) {
      students.set(num, { vote: 1, time: time-- });
      continue;
    }

    const bottomStudentNumber = getBottomStudentNumber(students);
    students.delete(bottomStudentNumber);
    students.set(num, { vote: 1, time: time-- });
  }

  const tops = Array.from(students, ([key]) => key)
    .sort((a, b) => a - b)
    .join(" ");
  console.log(tops);

  process.exit();
});

function getBottomStudentNumber(students) {
  const array = Array.from(students, ([key, value]) => ({ key, value }));

  const sorted = array.sort((a, b) => {
    const aValue = a.value;
    const bValue = b.value;

    if (aValue.vote === bValue.vote) {
      return bValue.time - aValue.time;
    } else {
      return aValue.vote - bValue.vote;
    }
  });

  return sorted[0].key;
}
