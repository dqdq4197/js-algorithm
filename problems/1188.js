const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function gcd(a, b) {
  if (b === 0) return a;
  return gcd(b, a % b);
}

rl.on("line", function (line) {
  const [N, M] = line.split(" ").map((n) => +n);
  console.log(M - gcd(N, M));
  rl.close();
});
