/**
 * 백준 - bfs / 최단경로
 * https://www.acmicpc.net/problem/16166
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N, E;
let groups = [];
const costs = new Map();

rl.on("line", function (line) {
  if (!N) {
    N = +line;
  } else {
    if (groups.length === N) {
      E = +line;
      rl.close();
    }

    const group = line.split(" ").slice(1).map(Number);

    for (station of group) {
      costs.set(station, Infinity);
    }

    groups.push(group);
  }
}).on("close", function () {
  costs.set(0, 0);
  const queue = [];

  for (let i = 0; i < N; i++) {
    const group = groups[i];

    for (let j = 0; j < group.length; j++) {
      const station = group[j];

      if (station === 0) {
        queue.push([i, station, 0]);
      }
    }
  }

  let index = 0;
  while (queue.length > index) {
    const [groupIndex, station, cost] = queue[index++];

    for (let nextGroupIndex = 0; nextGroupIndex < N; nextGroupIndex++) {
      const nextGroup = groups[nextGroupIndex];
      let nextCost = nextGroupIndex === groupIndex ? cost : cost + 1;

      if (!nextGroup.includes(station)) {
        continue;
      }

      for (const nextStation of nextGroup) {
        if (costs.get(nextStation) <= nextCost) {
          continue;
        }

        costs.set(nextStation, nextCost);
        queue.push([nextGroupIndex, nextStation, nextCost]);
      }
    }
  }

  const result = costs.get(E);
  console.log(result === Infinity ? -1 : result);
});
