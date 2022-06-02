const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N, M;
let goal;
let graph = [];
let visit = [];

function bfs(start, end) {
  visit[start] = true;
  const queue = [[start, 0]];
  let index = 0;

  while (queue.length > index) {
    const [node, cnt] = queue[index++];

    if (node === end) {
      return cnt;
    }

    graph[node].forEach((nNode) => {
      if (!visit[nNode]) {
        visit[nNode] = true;
        queue.push([nNode, cnt + 1]);
      }
    });
  }

  return -1;
}

rl.on("line", function (line) {
  if (!N) {
    N = +line;
    graph = Array.from({ length: N + 1 }, () => []);
    visit = Array.from({ length: N + 1 }, () => false);
  } else if (!goal) {
    goal = line.split(" ").map(Number);
  } else if (!M) {
    M = +line;
  } else {
    const [u, v] = line.split(" ").map(Number);
    graph[u].push(v);
    graph[v].push(u);

    if (--M === 0) {
      const result = bfs(goal[0], goal[1]);
      console.log(result);
      rl.close();
    }
  }
});
