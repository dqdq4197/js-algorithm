const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", function (line) {
  const [N, K] = line.split(" ").map((n) => +n);
  visit = [];

  let queue = [[N, 0]];
  let index = 0;

  while (queue.length > index) {
    const [n, time] = queue[index++];

    if (visit[n]) continue;
    visit[n] = true;
    if (n === K) {
      console.log(time);
      break;
    }

    if (n - 1 >= 0) queue.push([n - 1, time + 1]);
    if (n !== 0 && n * 2 <= 100000) queue.push([n * 2, time + 1]);
    if (n + 1 <= 100000) queue.push([n + 1, time + 1]);
  }

  rl.close();
});
