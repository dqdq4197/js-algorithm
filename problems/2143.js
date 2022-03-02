// 첫 번째 방식: Map 함수를 이용한 방식
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let T;
let ALen, BLen;
let A = [];
let B = [];
let result = 0;
let mapA = new Map();

function solution() {
  for (let i = 0; i < A.length; i++) {
    let sum = 0;
    for (let j = i; j < A.length; j++) {
      sum += A[j];
      if (mapA.has(sum)) mapA.set(sum, mapA.get(sum) + 1);
      else mapA.set(sum, 1);
    }
  }

  for (let i = 0; i < B.length; i++) {
    let sum = 0;
    for (let j = i; j < B.length; j++) {
      sum += B[j];
      if (mapA.get(T - sum)) result += mapA.get(T - sum);
    }
  }

  console.log(result);
}

rl.on("line", function (line) {
  if (T === undefined) {
    T = +line;
  } else if (!ALen) {
    ALen = +line;
  } else if (A.length === 0) {
    A = line.split(" ").map((n) => +n);
  } else if (!BLen) {
    BLen = +line;
  } else {
    B = line.split(" ").map((n) => +n);
    rl.close();
  }
}).on("close", function () {
  solution();
  process.exit();
});

// 2번째 방식 : Two pointer
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let T;
let ALen, BLen;
let A = [];
let B = [];
let result = 0;

function convertArrToPartialSum(arr) {
  let result = [];

  for (let i = 0; i < arr.length; i++) {
    let sum = 0;
    for (let j = i; j < arr.length; j++) {
      sum += arr[j];
      result.push(sum);
    }
  }

  return result.sort((a, b) => a - b);
}

function twoPointer(A, B) {
  let l = 0;
  let r = B.length - 1;

  while (l < A.length && r >= 0) {
    const sum = A[l] + B[r];
    if (sum === T) {
      let sumL = 1;
      let sumR = 1;
      while (l + 1 < A.length && A[l] === A[l + 1]) {
        l += 1;
        sumL += 1;
      }

      while (r - 1 >= 0 && B[r] === B[r - 1]) {
        r -= 1;
        sumR += 1;
      }

      result += sumL * sumR;
      l += 1;
    } else if (sum > T) {
      r -= 1;
    } else {
      l += 1;
    }
  }
}

rl.on("line", function (line) {
  if (T === undefined) {
    T = +line;
  } else if (!ALen) {
    ALen = +line;
  } else if (A.length === 0) {
    A = line.split(" ").map((n) => +n);
  } else if (!BLen) {
    BLen = +line;
  } else {
    B = line.split(" ").map((n) => +n);
    rl.close();
  }
}).on("close", function () {
  A = convertArrToPartialSum(A);
  B = convertArrToPartialSum(B);

  twoPointer(A, B);
  console.log(result);
  process.exit();
});
