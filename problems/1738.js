const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
// 모든 길이 이어져있지 않을 수 있다.
// N에서 출발해서 갈 수 있는 노드의 경우에 무한 싸이클이 존재할 때에만 -1출력
let N, M;
let edges = [];
let dist = [];
let path = [];
let result = [];
let visit = [];
let graph = [];

function bfs(start) {
  let queue = [start];
  visit[start] = true;
  let index = 0;

  while (queue.length > index) {
    const n = queue[index++];

    graph[n].forEach((nextNode) => {
      if (!visit[nextNode]) {
        visit[nextNode] = true;
        queue.push(nextNode);
      }
    });
  }
}

function bf() {
  for (let i = 1; i <= N; i++) {
    for (let j = 0; j < M; j++) {
      const [start, end, cost] = edges[j];
      if (dist[end] > dist[start] + cost) {
        dist[end] = dist[start] + cost;
        path[end] = start;
        if (i === N && visit[end]) return true;
      }
    }
  }
  return false;
}

rl.on("line", function (line) {
  if (!N) {
    [N, M] = line.split(" ").map((n) => +n);
    dist = Array.from({ length: N + 1 }, () => Infinity);
    visit = Array.from({ length: N + 1 }, () => false);
    graph = Array.from({ length: N + 1 }, () => []);
  } else {
    const [u, v, w] = line.split(" ").map((n) => +n);
    edges.push([u, v, -w]);
    graph[v].push(u);
    if (edges.length === M) {
      dist[1] = 0;
      bfs(N);
      const isInf = bf();
      if (isInf) console.log(-1);
      else {
        let start = N;
        while (true) {
          result.push(start);
          if (start === 1) break;
          start = path[start];
        }

        console.log(result.reverse().join(" "));
      }
      rl.close();
    }
  }
});
