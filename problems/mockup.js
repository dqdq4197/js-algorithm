const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N, M;
let input = [];

rl.on("line", function (line) {
  if (!N) {
    [N, M] = line.split(" ").map(Number);
  } else {
    input.push(line);
  }
}).on("close", function () {
  process.exit();
});

function getPrime(n) {
  for (let i = 2; i <= n; i++) {
    if (n % i === 0) {
      return i;
    }
  }
}

function solution(n) {
  const numbers = Array.from({ length: n }, (_, i) => i + 1);

  function recur(array) {
    const len = array.length;

    if (len === 1) {
      return array;
    }

    const prime = getPrime(len);
    const nextArray = Array.from({ length: prime }, () => []);

    for (let i = 0; i < len / prime; i++) {
      for (let j = 0; j < prime; j++) {
        const index = i * prime + j;

        nextArray[j].push(array[index]);
      }
    }

    return nextArray.flatMap(recur);
  }

  return recur(numbers);
}

console.log(solution(1));
