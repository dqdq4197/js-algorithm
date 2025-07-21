/**
 * 백준 - 그리디
 * https://www.acmicpc.net/problem/1049
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N, M;
let package = Infinity;
let ea = Infinity;

rl.on("line", function (line) {
  if (!N) {
    [N, M] = line.split(" ").map(Number);
  } else {
    const temp = line.split(" ").map(Number);

    package = Math.min(package, temp[0]);
    ea = Math.min(ea, temp[1]);

    if (--M === 0) {
      rl.close();
    }
  }
}).on("close", function () {
  const 몫 = Math.floor(N / 6);
  const 나머지 = N % 6;

  let answer = 0;

  answer += package / ea < 나머지 ? package : ea * 나머지;
  answer += 몫 * Math.min(package, ea * 6);

  console.log(answer);
  process.exit();
});
