/**
 * 백준 - 구현
 * https://www.acmicpc.net/problem/16637
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N;

rl.on("line", function (line) {
  if (!N) {
    N = +line;
  } else {
    const formula = line.split("").map((v, i) => (i % 2 === 0 ? Number(v) : v));
    const queue = [[[], 1, false]];
    let max = -Infinity;
    let index = 0;

    while (queue.length > index) {
      const [stack, i, isUsed] = queue[index++];

      if (i >= formula.length) {
        max = Math.max(max, calc(stack));
        continue;
      }

      queue.push([stack, i + 2, false]);

      if (!isUsed) {
        queue.push([[...stack, i], i + 2, true]);
      }
    }

    function calc(stack) {
      const newFormula = [];
      let formulaIndex = 0;
      let stackIndex = 0;

      while (formula.length > formulaIndex) {
        const opIndex = stack[stackIndex];

        if (stack.length > stackIndex && formulaIndex === opIndex - 1) {
          const num1 = formula[opIndex - 1];
          const num2 = formula[opIndex + 1];
          const op = formula[opIndex];
          const nextNum = calculate(num1, num2, op);

          newFormula.push(nextNum);

          formulaIndex = opIndex + 2;
          stackIndex += 1;

          continue;
        }

        newFormula.push(formula[formulaIndex++]);
      }

      if (newFormula.length === 1) {
        return newFormula[0];
      }

      let result = null;

      for (let i = 1; i < newFormula.length; i += 2) {
        const num1 = result ?? newFormula[i - 1];
        const num2 = newFormula[i + 1];
        const op = newFormula[i];
        result = calculate(num1, num2, op);
      }

      return result;
    }

    console.log(max);
    rl.close();
  }
});

function calculate(a, b, op) {
  if (op === "+") {
    return a + b;
  }

  if (op === "-") {
    return a - b;
  }

  if (op === "*") {
    return a * b;
  }

  return 0;
}
