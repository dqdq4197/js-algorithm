const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N, M;
let graph = [];
let visit = [];

function bfs(start) {
  const queue = [start];
  visit[start] = true;
  let cnt = 0;

  let index = 0;
  while (queue.length > index) {
    const now = queue[index++];

    graph[now].forEach((nNode) => {
      if (!visit[nNode]) {
        queue.push(nNode);
        visit[nNode] = true;
        cnt += 1;
      }
    });
  }

  return cnt;
}

rl.on("line", function (line) {
  if (!N) {
    [N, M] = line.split(" ").map(Number);
    graph = Array.from({ length: N + 1 }, () => []);
  } else {
    const [u, v] = line.split(" ").map(Number);
    graph[v].push(u);

    if (--M === 0) {
      let result = [];
      let max = -1;
      for (let i = 1; i <= N; i++) {
        visit = Array.from({ length: N + 1 }, () => false);
        const cnt = bfs(i);
        if (max === cnt) {
          result.push(i);
        }

        if (max < cnt) {
          max = cnt;
          result = [i];
        }
      }

      console.log(result.join(" "));
      rl.close();
    }
  }
});
