const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", function (line) {
  let [A, B] = line.split(" ").map((n) => +n);

  let queue = [[A, 0]];
  let result = -1;

  while (queue.length) {
    let [num, cnt] = queue.shift();

    if (num * 2 === B || +(num + "1") === B) {
      result = cnt + 1 + 1;
      break;
    }

    if (num * 2 < B) queue.push([num * 2, cnt + 1]);
    if (+(num + "1") < B) queue.push([+(num + "1"), cnt + 1]);
  }

  console.log(result);
  rl.close();
});
