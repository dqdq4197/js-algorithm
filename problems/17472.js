const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N, M;
let map = [];
let distance = [];
const INF = Infinity;
const dx = [0, 1, 0, -1];
const dy = [1, 0, -1, 0];

function UnionFind(N) {
  this.parents = Array.from({ length: N + 1 }, (_, i) => i);

  this.getParent = (num) => {
    if (this.parents[num] === num) return num;
    return (this.parents[num] = this.getParent(this.parents[num]));
  };

  this.unionParents = (a, b) => {
    const aParent = this.getParent(a);
    const bParent = this.getParent(b);

    if (aParent > bParent) this.parents[aParent] = bParent;
    else this.parents[bParent] = aParent;
  };

  this.findParent = (a, b) => {
    const aParent = this.getParent(a);
    const bParent = this.getParent(b);

    return aParent === bParent;
  };
}

function isLandNumbering(i, j, isLandNum) {
  const queue = [[i, j]];

  let index = 0;
  while (queue.length > index) {
    const [y, x] = queue[index++];
    map[y][x] = isLandNum;

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx < 0 || ny < 0 || nx >= M || ny >= N) continue;
      if (map[ny][nx] === -1) {
        queue.push([ny, nx]);
      }
    }
  }
}

function searchMinDist(queue, now) {
  let index = 0;
  while (queue.length > index) {
    const [y, x, dist, dir] = queue[index++];

    const stack = [];
    if (dir === -1) {
      for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];

        stack.push([ny, nx, i]);
      }
    } else {
      const nx = x + dx[dir];
      const ny = y + dy[dir];

      stack.push([ny, nx, dir]);
    }

    while (stack.length) {
      const [ny, nx, nDir] = stack.pop();

      if (nx < 0 || ny < 0 || nx >= M || ny >= N) continue;
      const next = map[ny][nx];
      if (next === now) continue;
      if (next !== 0 && dist > 1) {
        distance[now][next] = Math.min(distance[now][next], dist);
      }
      if (next === 0) {
        queue.push([ny, nx, dist + 1, nDir]);
      }
    }
  }
}

rl.on("line", function (line) {
  if (!N) {
    [N, M] = line.split(" ").map(Number);
    visit = Array.from({ length: N }, () => Array(M).fill(false));
  } else {
    map.push(line.split(" ").map((n) => (n === "1" ? -1 : +n)));

    if (map.length === N) {
      rl.close();
    }
  }
}).on("close", function () {
  // 섬 구역별로 번호 매기기
  let isLandNumber = 0;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (map[i][j] === -1) {
        isLandNumber += 1;
        isLandNumbering(i, j, isLandNumber);
      }
    }
  }

  distance = Array.from({ length: isLandNumber + 1 }, () =>
    Array(isLandNumber + 1).fill(INF)
  );

  // 섬에서 섬으로 갈 수 있는 최소 거리 구하기
  for (let k = 1; k <= isLandNumber; k++) {
    const queue = [];
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        if (map[i][j] === k) {
          queue.push([i, j, 0, -1]);
        }
      }
    }

    searchMinDist(queue, k);
  }

  const edges = [];
  for (let i = 1; i <= isLandNumber; i++) {
    for (let j = 1; j <= isLandNumber; j++) {
      const dist = distance[i][j];
      if (dist !== INF) {
        edges.push([i, j, dist]);
      }
    }
  }

  const uf = new UnionFind(isLandNumber);
  let result = 0;
  edges.sort((a, b) => a[2] - b[2]);
  for (let i = 0; i < edges.length; i++) {
    const [from, to, dist] = edges[i];
    if (!uf.findParent(from, to)) {
      uf.unionParents(from, to);
      result += dist;
    }
  }

  // 갈 수 없는 섬이 있는지 확인
  let flag = false;
  for (let i = 2; i <= isLandNumber; i++) {
    if (!uf.findParent(1, i)) {
      flag = true;
      break;
    }
  }
  console.log(flag ? -1 : result);

  process.exit();
});
