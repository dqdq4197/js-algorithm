const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N, M;
let board = [];
let visit = new Set();
const dx = [0, 1, 0, -1];
const dy = [1, 0, -1, 0]; // 하, 우, 상, 좌

function bfs(rPos, bPos) {
  const queue = [[...rPos, ...bPos, 0]];
  let index = 0;

  while (queue.length > index) {
    const [rY, rX, bY, bX, cnt] = queue[index++];
    if (cnt >= 10) return -1;
    for (let i = 0; i < 4; i++) {
      // 레드 먼저 움직이기.
      let index = 1;
      let nRY = rY;
      let nRX = rX;
      let nBY = bY;
      let nBX = bX;
      let rFlag = false;
      let bFlag = false;
      if (
        (i === 0 && rY >= bY) ||
        (i === 1 && rX >= bX) ||
        (i === 2 && rY <= bY) ||
        (i === 3 && rX <= bX)
      ) {
        // 레드 먼저 옮기기
        while (true) {
          const nx = rX + dx[i] * index;
          const ny = rY + dy[i] * index;

          // 벽이거나 이동 불가할 때
          if (nx < 0 || ny < 0 || nx >= M || ny >= N || board[ny][nx] === "#")
            break;

          // 다음 위치에 구멍이 있을 때
          if (board[ny][nx] === "O") rFlag = true;

          // 이동 가능할 때
          index += 1;
          nRY = ny;
          nRX = nx;
        }
        // 블루 옮기기
        index = 1;
        while (true) {
          const nx = bX + dx[i] * index;
          const ny = bY + dy[i] * index;

          // 벽이거나 이동 불가할 때 or 레드가 있을 때
          if (nx < 0 || ny < 0 || nx >= M || ny >= N || board[ny][nx] === "#")
            break;

          // 레드가 구멍에 빠졌는데 다음 위치에 레드가 있을 때 or 구멍이 있을 때
          if ((rFlag && nx === nRX && ny === nRY) || board[ny][nx] === "O") {
            rFlag = false;
            bFlag = true;
            break;
          }

          // 다음 위치에 레드가 있을 떄
          if (nx === nRX && ny === nRY) break;

          // 이동 가능할 때
          index += 1;
          nBY = ny;
          nBX = nx;
        }
      } else {
        // 블루 먼저 옮기기
        while (true) {
          const nx = bX + dx[i] * index;
          const ny = bY + dy[i] * index;

          // 벽이거나 이동 불가할 때
          if (nx < 0 || ny < 0 || nx >= M || ny >= N || board[ny][nx] === "#")
            break;

          // 다음 위치에 구멍이 있을 때
          if (board[ny][nx] === "O") {
            bFlag = true;
            break;
          }

          // 이동 가능할 때
          index += 1;
          nBY = ny;
          nBX = nx;
        }
        // 레드 옮기기
        index = 1;
        while (true) {
          const nx = rX + dx[i] * index;
          const ny = rY + dy[i] * index;

          // 벽이거나 이동 불가할 때 or 블루가 있을 때
          if (
            nx < 0 ||
            ny < 0 ||
            nx >= M ||
            ny >= N ||
            board[ny][nx] === "#" ||
            (nx === nBX && ny === nBY)
          )
            break;

          // 다음 위치에 구멍이 있을 때
          if (board[ny][nx] === "O") return cnt + 1;

          // 이동 가능할 때
          index += 1;
          nRY = ny;
          nRX = nx;
        }
      }

      // 구멍에 레드만 골인!
      if (rFlag) return cnt + 1;
      const s = nRY + "" + nRX + " " + nBY + "" + nBX;
      if (!bFlag && !visit.has(s)) {
        queue.push([nRY, nRX, nBY, nBX, cnt + 1]);
        visit.add(s);
      }
    }
  }
  return -1;
}

rl.on("line", function (line) {
  if (!N) {
    [N, M] = line.split(" ").map(Number);
  } else {
    board.push(line.split(""));

    if (board.length === N) rl.close();
  }
}).on("close", function () {
  let rPos = [];
  let bPos = [];
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (board[i][j] === "B") bPos = [i, j];
      if (board[i][j] === "R") rPos = [i, j];
    }
  }

  visit.add(rPos[0] + "" + rPos[1] + " " + bPos[0] + "" + bPos[1]);
  const result = bfs(rPos, bPos);
  console.log(result);
  process.exit();
});
