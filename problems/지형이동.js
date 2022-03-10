const dx = [1, 0, -1, 0];
const dy = [0, 1, 0, -1];

function devideTheLand(land, height) {
  const N = land.length;
  const devidedLand = Array.from({ length: N }, () => []);

  let number = 0;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (!devidedLand[i][j]) {
        number += 1;
        devidedLand[i][j] = number;
        const queue = [[i, j]];
        let index = 0;

        while (queue.length > index) {
          const [y, x] = queue[index++];

          for (let k = 0; k < 4; k++) {
            const nx = x + dx[k];
            const ny = y + dy[k];

            if (
              nx >= 0 &&
              ny >= 0 &&
              nx < N &&
              ny < N &&
              !devidedLand[ny][nx]
            ) {
              if (height >= Math.abs(land[y][x] - land[ny][nx])) {
                devidedLand[ny][nx] = number;
                queue.push([ny, nx]);
              }
            }
          }
        }
      }
    }
  }

  return [devidedLand, number];
}

function makeEdges(land, devidedLand) {
  const N = land.length;
  const edges = [];
  const visit = Array.from({ length: N }, () => Array(N).fill(false));
  visit[0][0] = true;
  const queue = [[0, 0]];
  let index = 0;

  while (queue.length > index) {
    const [y, x] = queue[index++];
    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx >= 0 && ny >= 0 && nx < N && ny < N) {
        const nowLandNum = devidedLand[y][x];
        const nextLandNum = devidedLand[ny][nx];
        const diff = Math.abs(land[y][x] - land[ny][nx]);
        if (nowLandNum !== nextLandNum) {
          edges.push([nowLandNum, nextLandNum, diff]);
          edges.push([nextLandNum, nowLandNum, diff]);
        }
        if (!visit[ny][nx]) {
          visit[ny][nx] = true;
          queue.push([ny, nx]);
        }
      }
    }
  }

  return edges;
}

function unionFind(n) {
  this.parents = Array.from({ length: n }, (_, i) => i);

  this.getParent = (num) => {
    if (num === this.parents[num]) return num;
    return (this.parents[num] = this.getParent(this.parents[num]));
  };

  this.find = (a, b) => {
    const aParent = this.getParent(a);
    const bParent = this.getParent(b);

    return aParent === bParent;
  };

  this.unionParent = (a, b) => {
    const aParent = this.getParent(a);
    const bParent = this.getParent(b);

    if (aParent > bParent) this.parents[aParent] = bParent;
    else this.parents[bParent] = aParent;
  };
}

function solution(land, height) {
  var answer = 0;

  const [devidedLand, landCnt] = devideTheLand(land, height);
  const edges = makeEdges(land, devidedLand);
  const uf = new unionFind(landCnt + 1);

  edges.sort((a, b) => a[2] - b[2]);
  let cnt = 0;
  for (let i = 0; i < edges.length; i++) {
    const [from, to, cost] = edges[i];

    if (!uf.find(from, to)) {
      answer += cost;
      uf.unionParent(from, to);
      cnt += 1;
    }

    if (cnt === landCnt - 1) break;
  }
  return answer;
}

console.log(
  solution(
    [
      [1, 4, 8, 10],
      [5, 5, 5, 5],
      [10, 10, 10, 10],
      [10, 10, 10, 20],
    ],
    3,
    15
  ),
  solution(
    [
      [10, 11, 10, 11],
      [2, 21, 20, 10],
      [1, 20, 21, 11],
      [2, 1, 2, 1],
    ],
    1,
    18
  )
);
