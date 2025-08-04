/**
 * 백준 - 다익스트라
 * https://www.acmicpc.net/problem/10282
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let T;
let N, D, C;
let graph;

rl.on("line", function (line) {
  if (!T) {
    T = +line;
  } else if (!D) {
    [N, D, C] = line.split(" ").map(Number);
    graph = Array.from({ length: N + 1 }, () => []);
  } else {
    const [a, b, s] = line.split(" ").map(Number);

    graph[b].push([a, s]);

    if (--D === 0) {
      const times = Array.from({ length: N + 1 }, () => Infinity);

      times[C] = 0;
      const queue = [C];

      let index = 0;
      while (queue.length > index) {
        const computer = queue[index++];

        for (const [nComputer, time] of graph[computer]) {
          if (times[computer] + time < times[nComputer]) {
            times[nComputer] = times[computer] + time;
            queue.push(nComputer);
          }
        }
      }

      const infectedTimes = times.filter((time) => time !== Infinity);
      const maxTime = Math.max(...infectedTimes);

      console.log(`${infectedTimes.length} ${maxTime}`);

      if (--T === 0) {
        rl.close();
      }
    }
  }
});
