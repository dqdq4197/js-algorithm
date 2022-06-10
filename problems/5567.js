const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N, M;
let graph = [];

function bfs(start) {
  let result = 0;
  const queue = [[start, 0]];
  visit[start] = true;
  let index = 0;
  while (queue.length > index) {
    const [now, cnt] = queue[index++];

    if (cnt >= 2) continue;

    graph[now].forEach((next) => {
      if (!visit[next]) {
        visit[next] = true;
        queue.push([next, cnt + 1]);
        result += 1;
      }
    });
  }

  return result;
}

rl.on("line", function (line) {
  if (!N) {
    N = +line;
    graph = Array.from({ length: N + 1 }, () => []);
    visit = Array.from({ length: N + 1 }, () => false);
  } else if (!M) {
    M = +line;
  } else {
    const [u, v] = line.split(" ").map(Number);
    graph[v].push(u);
    graph[u].push(v);

    if (--M === 0) {
      const result = bfs(1);
      console.log(result);
      rl.close();
    }
  }
});
