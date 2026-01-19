/**
 * 백준 - 완전탐색
 * https://www.acmicpc.net/problem/9079
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let T;
let grid = [];
const answers = [];

rl.on("line", function (line) {
  if (!T) {
    T = +line;
  } else {
    grid.push(line.split(" "));

    if (grid.length === 3) {
      const answer = solution(grid);
      answers.push(answer);

      if (--T === 0) {
        console.log(answers.join("\n"));
        rl.close();
      }

      grid = [];
    }
  }
});

function solution() {
  let answer = -1;
  const visit = new Set();

  visit.add(boardToString(grid));
  const queue = [[grid, 0]];
  let index = 0;
  while (queue.length > index) {
    const [board, count] = queue[index++];

    const boardString = boardToString(board);
    if (!(/T/.test(boardString) && /H/.test(boardString))) {
      answer = count;
      break;
    }

    for (let i = 0; i < 3; i++) {
      // 행 뒤집기
      const nextBoard1 = board.map((row, rowIndex) =>
        rowIndex === i ? row.map(reverse) : row
      );

      const nextBoard1String = boardToString(nextBoard1);

      if (!visit.has(nextBoard1String)) {
        visit.add(nextBoard1String);
        queue.push([nextBoard1, count + 1]);
      }

      // 열 뒤집기
      const nextBoard2 = board.map((row) =>
        row.map((coin, colIndex) => (colIndex === i ? reverse(coin) : coin))
      );

      const nextBoard2String = boardToString(nextBoard2);
      if (!visit.has(nextBoard2String)) {
        visit.add(nextBoard2String);
        queue.push([nextBoard2, count + 1]);
      }
    }

    // 왼쪽 대각선 뒤집기
    const nextBoard3 = board.map((row, rowIndex) =>
      row.map((coin, colIndex) =>
        rowIndex === colIndex ? reverse(coin) : coin
      )
    );

    const nextBoard3String = boardToString(nextBoard3);
    if (!visit.has(nextBoard3String)) {
      visit.add(nextBoard3String);
      queue.push([nextBoard3, count + 1]);
    }

    // 오른쪽 대각선 뒤집기
    const nextBoard4 = board.map((row, rowIndex) =>
      row.map((coin, colIndex) =>
        2 - rowIndex === colIndex ? reverse(coin) : coin
      )
    );

    const nextBoard4String = boardToString(nextBoard4);
    if (!visit.has(nextBoard4String)) {
      visit.add(nextBoard4String);
      queue.push([nextBoard4, count + 1]);
    }
  }

  return answer;
}

function boardToString(board) {
  return board.map((row) => row.join("")).join("");
}

function reverse(coin) {
  return coin === "T" ? "H" : "T";
}
