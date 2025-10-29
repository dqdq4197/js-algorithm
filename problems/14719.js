/**
 * 백준 - 시뮬레이션
 * https://www.acmicpc.net/problem/14719
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const MAX_HEIGHT = 500;

let heights = [];
let H = 0;
let W = 0;

rl.on("line", function (line) {
  if (!W) {
    [H, W] = line.split(" ").map(Number);
  } else {
    heights = line.split(" ").map(Number);
    rl.close();
  }
}).on("close", function () {
  const leftMax = [];
  const rightMax = [];
  let total = 0;

  let max = 0;
  for (let i = 0; i < W; i++) {
    const height = heights[i];

    max = Math.max(max, height);
    leftMax[i] = max;
  }

  max = 0;
  for (let i = W - 1; i >= 0; i--) {
    const height = heights[i];

    max = Math.max(max, height);
    rightMax[i] = max;
  }

  for (let i = 0; i < W; i++) {
    const height = heights[i];
    const water = Math.min(leftMax[i], rightMax[i]) - height;

    if (water <= 0) continue;
    total += water;
  }

  console.log(total);
});
