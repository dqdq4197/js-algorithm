const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", function (line) {
  let stack = [];

  for (let i = 0; i < line.length; i++) {
    const s = line[i];

    if (stack.length === 0 && (s === ")" || s === "]")) {
      stack = [0];
      break;
    }

    if (s === "(" || s === "[") {
      stack.push(s);
      continue;
    }

    if (s === ")") {
      if (stack[stack.length - 1] === "(") {
        stack.pop();
        stack.push(2);
      } else if (
        stack[stack.length - 2] === "(" &&
        typeof stack[stack.length - 1] === "number"
      ) {
        const num = stack.pop();
        stack.pop();

        stack.push(num * 2);
      } else {
        stack = [0];
        break;
      }
    }

    if (s === "]") {
      if (stack[stack.length - 1] === "[") {
        stack.pop();
        stack.push(3);
      } else if (
        stack[stack.length - 2] === "[" &&
        typeof stack[stack.length - 1] === "number"
      ) {
        const num = stack.pop();
        stack.pop();

        stack.push(num * 3);
      } else {
        stack = [0];
        break;
      }
    }

    if (
      typeof stack[stack.length - 1] === "number" &&
      typeof stack[stack.length - 2] === "number"
    ) {
      const num1 = stack.pop();
      const num2 = stack.pop();

      stack.push(num1 + num2);
    }
  }

  if (typeof stack[0] === "number") {
    console.log(stack[0]);
  } else {
    console.log(0);
  }
  rl.close();
});
