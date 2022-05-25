const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let K;
let V, E;
let graph = [];
let colors = []; // 1 -> 빨강, 2 -> 파랑

function bfs(node) {
  const queue = [node];
  colors[node] = 1;
  let index = 0;

  while (queue.length > index) {
    const now = queue[index++];

    for (let i = 0; i < graph[now].length; i++) {
      const nNode = graph[now][i];
      if (colors[nNode] && colors[nNode] === colors[now]) {
        return "NO";
      }
      if (colors[nNode]) continue;
      colors[nNode] = colors[now] === 1 ? 2 : 1;
      queue.push(nNode);
    }
  }
  return "YES";
}

rl.on("line", function (line) {
  if (!K) {
    K = +line;
  } else if (!V) {
    [V, E] = line.split(" ").map(Number);
    graph = Array.from({ length: V + 1 }, () => []);
    colors = Array.from({ length: V + 1 }, () => 0);
  } else {
    const [u, v] = line.split(" ").map(Number);
    graph[u].push(v);
    graph[v].push(u);

    if (--E === 0) {
      let result;
      for (let i = 1; i <= V; i++) {
        if (colors[i]) continue;
        const answer = bfs(i);
        if (answer === "NO") {
          result = answer;
          break;
        }
      }
      result = result === "NO" ? result : "YES";
      console.log(result);
      if (--K === 0) {
        rl.close();
      }
      V = undefined;
    }
  }
});
