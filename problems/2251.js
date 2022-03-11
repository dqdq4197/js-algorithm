const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", function (line) {
  const [A, B, C] = line.split(" ").map((n) => +n);
  const result = new Set();
  let queue = [[0, 0, C]];
  let index = 0;
  // a와 b visit 처리
  const visit = Array.from({ length: 201 }, () => Array(201).fill(false));
  while (queue.length > index) {
    const [a, b, c] = queue[index++];

    if (a === 0) result.add(c);
    if (a !== 0) {
      // b한테 몰빵
      let temp = Math.min(B - b, a);
      let newA = a - temp;
      let newB = Math.min(B, b + temp);

      if (!visit[newA][newB]) {
        visit[newA][newB] = true;
        queue.push([newA, newB, c]);
      }

      // c한테 몰빵
      temp = Math.min(C - c, a);
      newA = a - temp;
      newC = Math.min(C, c + temp);

      if (!visit[newA][b]) {
        visit[newA][b] = true;
        queue.push([newA, b, newC]);
      }
    }

    if (b !== 0) {
      // A한테 몰빵
      let temp = Math.min(A - a, b);
      let newA = Math.min(A, a + temp);
      let newB = b - temp;

      if (!visit[newA][newB]) {
        visit[newA][newB] = true;
        queue.push([newA, newB, c]);
      }

      // c한테 몰빵
      temp = Math.min(C - c, b);
      newB = b - temp;
      newC = Math.min(C, c + temp);

      if (!visit[a][newB]) {
        visit[a][newB] = true;
        queue.push([a, newB, newC]);
      }
    }

    if (c !== 0) {
      // a몰빵
      let temp = Math.min(A - a, c);
      let newA = Math.min(A, a + temp);
      let newC = c - temp;

      if (!visit[newA][b]) {
        visit[newA][b] = true;
        queue.push([newA, b, newC]);
      }

      // b한테 몰빵
      temp = Math.min(B - b, c);
      newB = Math.min(B, b + temp);
      newC = c - temp;

      if (!visit[a][newB]) {
        visit[a][newB] = true;
        queue.push([a, newB, newC]);
      }
    }
  }
  console.log([...result].sort((a, b) => a - b).join(" "));
});
