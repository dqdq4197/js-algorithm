const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const MAX = 100001;

function bfs(start, end) {
  const visit = Array.from({ length: MAX }, () => false);
  let time = MAX;
  let pathCount = 0;

  const queue = [[start, 0]];
  let index = 0;

  while (queue.length > index) {
    const [now, cnt] = queue[index++];

    if (time < cnt) continue;
    visit[now] = true;

    if (now === end) {
      time = cnt;
      pathCount += 1;
      continue;
    }

    const x1 = now * 2;
    const x2 = now + 1;
    const x3 = now - 1;
    const nextTime = cnt + 1;

    if (x1 <= 2 * end && !visit[x1]) {
      queue.push([x1, nextTime]);
    }
    if (x2 <= MAX && !visit[x2]) {
      queue.push([x2, nextTime]);
    }
    if (x3 >= 0 && !visit[x3]) {
      queue.push([x3, nextTime]);
    }
  }

  return [time, pathCount];
}

rl.on("line", function (line) {
  const [N, K] = line.split(" ").map((n) => +n);

  const result = bfs(N, K);
  console.log(result.join("\n"));
  rl.close();
});
