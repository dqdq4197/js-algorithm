const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let T;
let N = 0;
let result = [];

rl.on("line", function (line) {
  if (!T) {
    T = +line;
  } else if (!N) {
    N = +line;
  } else {
    const nums = line.split(" ").map(Number);

    let sum = 0;
    let max = -1;

    for (let i = nums.length - 1; i >= 0; i--) {
      const num = nums[i];

      if (max >= num) {
        sum += max - num;
      } else {
        max = num;
      }
    }

    result.push(sum);

    N = 0;
    if (--T === 0) {
      console.log(result.join("\n"));
      rl.close();
    }
  }
});
