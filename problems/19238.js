const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N, M, fuel;
let map = [[]];
let start;
let cnt = 0;
const dx = [1, 0, -1, 0];
const dy = [0, 1, 0, -1];

/**
 * @description 거리가 작은 승객들의 위치를 찾는 탐색 함수
 * @param {[y, x]} start 시작 위치
 * @returns [거리가 같은 승객들의 위치, 비용]
 */
function pickupBfs(start) {
  const visit = Array.from({ length: N + 1 }, () => Array(N + 1).fill(false));
  visit[start[0]][start[1]] = true;
  const passengers = [];
  const queue = [[...start, 0]];
  let dist = -1;
  let index = 0;

  while (queue.length > index) {
    const [y, x, cost] = queue[index++];

    if (dist !== -1 && dist !== cost) break;

    if (typeof map[y][x] !== "number") {
      passengers.push([y, x]);
      dist = cost;
    }

    for (let i = 0; i < 4; i++) {
      const nx = dx[i] + x;
      const ny = dy[i] + y;

      if (nx <= 0 || ny <= 0 || nx > N || ny > N) continue;
      if (map[ny][nx] === 1 || visit[ny][nx]) continue;
      visit[ny][nx] = true;
      queue.push([ny, nx, cost + 1]);
    }
  }

  return [passengers, dist];
}

/**
 * @description 승객의 위치에서 목적지를 찾는 탐색 함수
 * @param {[y, x]} start 시작 위치
 * @param {[y, x]} end 도착 위치
 * @return 목적지까지 발생한 비용 or 갈수 없음(-1)
 */
function passBfs(start, end) {
  const visit = Array.from({ length: N + 1 }, () => Array(N + 1).fill(false));
  visit[start[0]][start[1]] = true;
  const queue = [[...start, 0]];
  let index = 0;

  while (queue.length > index) {
    const [y, x, cost] = queue[index++];

    if (y === end[0] && x === end[1]) {
      return cost;
    }

    for (let i = 0; i < 4; i++) {
      const nx = dx[i] + x;
      const ny = dy[i] + y;

      if (nx <= 0 || ny <= 0 || nx > N || ny > N) continue;
      if (map[ny][nx] === 1 || visit[ny][nx]) continue;
      visit[ny][nx] = true;
      queue.push([ny, nx, cost + 1]);
    }
  }

  return -1;
}

rl.on("line", function (line) {
  if (!N) {
    [N, M, fuel] = line.split(" ").map(Number);
  } else if (map.length <= N) {
    map.push([null, ...line.split(" ").map(Number)]);
  } else if (!start) {
    start = line.split(" ").map(Number);
  } else {
    const [startY, startX, ...destination] = line.split(" ").map(Number);
    map[startY][startX] = destination;

    if (++cnt === M) rl.close();
  }
}).on("close", function () {
  let moveCompletedCount = 0; // 승객을 데려다 주는데 성공한 횟수
  let temp = false; // 이동 도중에 연료가 바닥나서 다음 출발지나 목적지로 이동할 수 없음 체크

  while (true) {
    const [passengers, dist] = pickupBfs(start);
    let end = []; // 승객의 목적지 좌표를 담을 배열

    // 승객을 태우러 가다가 연료 바닥남
    if (fuel <= dist) {
      temp = true;
      break;
    }
    // 승객을 태우고, 태우러 간 거리만큼 연료을 빼줌
    fuel -= dist;

    // 태울 수 있는 승객이 없음
    if (passengers.length === 0) {
      temp = true;
      break;
    }

    // 여러 승객중 행이 작은 & 열이 작은 승객 선택
    if (passengers.length > 1) {
      passengers.sort((a, b) => {
        if (a[0] === b[0]) return a[1] - b[1];
        else return a[0] - b[0];
      });
    }
    // 다음 시작점을 승객의 위치로 초기화
    start = passengers[0];

    // map 승객의 위치에 목적지를 입력받아 두었으므로, map의 승객의 위치에 목적지 정보가 존재함.
    // 목적지 위치를 end의 값으로 초기화
    end = map[start[0]][start[1]];

    // 승객을 태웠으니 그 자리는 다시 "길"(0)로 초기화
    map[start[0]][start[1]] = 0;

    const cost = passBfs(start, end);

    // 목적지에 도달할 수 없으면
    if (cost === -1) {
      temp = true;
      break;
    }

    // 목적지까지 가다가 연료이 바닥남
    if (fuel < cost) {
      temp = true;
      break;
    }

    // 목적지까지 거리 x 2의 양을 연료 채워줌
    fuel += cost;

    // 다음 시작점을 승객의 목적지로 초기화
    start = end;
    moveCompletedCount += 1;

    // 모든 승객이 성공적으로 이동 했으면, loop 탈출
    if (moveCompletedCount === M) break;
  }

  if (temp) console.log(-1);
  else console.log(fuel);
});
