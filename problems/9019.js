const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let T;
let result = [];
const commands = ["D", "S", "L", "R"];

function convert(a, b) {
  let visit = [];
  visit[a] = true;
  const queue = [[a, ""]];

  while (queue.length) {
    const [num, history] = queue.shift();

    for (let i = 0; i < commands.length; i++) {
      let nextNum = num;
      switch (commands[i]) {
        case "D":
          nextNum = (nextNum * 2) % 10000;
          break;
        case "S":
          nextNum -= 1;
          if (nextNum < 0) nextNum = 9999;
          break;
        case "L":
          nextNum = (nextNum % 1000) * 10 + Math.floor(nextNum / 1000);
          break;
        case "R":
          nextNum = Math.floor(nextNum / 10) + (nextNum % 10) * 1000;
          break;
      }
      if (nextNum === b) {
        return history + commands[i];
      } else {
        if (!visit[nextNum]) {
          queue.push([nextNum, history + commands[i]]);
          visit[nextNum] = true;
        }
      }
    }
  }
}

rl.on("line", function (line) {
  if (!T) T = +line;
  else {
    const [a, b] = line.split(" ").map((n) => +n);
    const history = convert(a, b);
    result += history + "\n";

    if (--T === 0) {
      console.log(result);
      rl.close();
    }
  }
});
