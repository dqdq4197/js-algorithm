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

  let index = 0;
  while (queue.length > index) {
    const now = queue[index++];

    graph[now].forEach((next) => {
      if (!visit[next]) {
        queue.push(next);
        visit[next] = true;
      }
    });
  }
}

rl.on("line", function (line) {
  if (!N) {
    [N, M] = line.split(" ").map(Number);
    graph = Array.from({ length: N + 1 }, () => []);
    visit = Array.from({ length: N + 1 }, () => false);

    if (M === 0) {
      console.log(N);
      rl.close();
    }
  } else {
    const [u, v] = line.split(" ").map(Number);

    graph[u].push(v);
    graph[v].push(u);

    if (--M === 0) {
      let result = 0;
      for (let i = 1; i <= N; i++) {
        if (!visit[i]) {
          visit[i] = true;
          bfs(i);
          result += 1;
        }
      }
      console.log(result);
      rl.close();
    }
  }
});
