/**
 * 프로그래머스
 * https://school.programmers.co.kr/learn/courses/30/lessons/172928
 */

const dirs = {
  E: [1, 0],
  W: [-1, 0],
  S: [0, 1],
  N: [0, -1],
};

function getCurrent(park) {
  for (let y = 0; y < park.length; y++) {
    for (let x = 0; x < park[y].length; x++) {
      if (park[y][x] === "S") {
        return [x, y];
      }
    }
  }
}

function solution(park, routes) {
  let [x, y] = getCurrent(park);

  routes.forEach((route) => {
    const [op, n] = route.split(" ");
    const dir = dirs[op];

    let [tempX, tempY] = [x, y];

    let i = 0;
    while (i < +n) {
      const nx = tempX + dir[0];
      const ny = tempY + dir[1];

      if (park[ny] === undefined) {
        break;
      }

      const next = park[ny][nx];

      if (next !== "S" && next !== "O") {
        break;
      }

      [tempX, tempY] = [nx, ny];
      i += 1;
    }

    if (i === +n) {
      [x, y] = [tempX, tempY];
    }
  });

  return [y, x];
}
