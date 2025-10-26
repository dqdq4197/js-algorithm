/**
 * 백준 - 시뮬레이션
 * https://www.acmicpc.net/problem/20055
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N, K;
let belt = [];

rl.on("line", function (line) {
  if (!N) {
    [N, K] = line.split(" ").map(Number);
  } else {
    belt = line.split(" ").map((age) => [+age, false]);
    rl.close();
  }
}).on("close", function () {
  let step = 0;
  let deadCount = 0;

  function run() {
    step += 1;

    // 1. 벨트가 각 칸 위에 있는 로봇과 함께 한 칸 회전한다.
    belt.unshift(belt.pop());

    // 내리는 지점 도착 시, 로봇 내림
    belt[N - 1][1] = false;

    // 2. 가장 먼저 벨트에 올라간 로봇부터, 벨트가 회전하는 방향으로 한 칸 이동할 수 있다면 이동한다.
    for (let i = N - 2; i > 0; i--) {
      const [_, isCurrentExistRoBot] = belt[i];

      if (!isCurrentExistRoBot) {
        continue;
      }

      const [nextAge, isNextExistRoBot] = belt[i + 1];

      if (nextAge < 1 || isNextExistRoBot) {
        continue;
      }

      belt[i][1] = false;
      belt[i + 1] = [nextAge - 1, i === N - 2 ? false : true];

      if (nextAge - 1 === 0) {
        deadCount += 1;
      }
    }

    // 3. 올리는 위치에 있는 칸의 내구도가 0이 아니면 올리는 위치에 로봇을 올린다.
    const [upPositionAge] = belt[0];
    if (upPositionAge > 0) {
      belt[0] = [upPositionAge - 1, true];

      if (upPositionAge - 1 === 0) {
        deadCount += 1;
      }
    }

    // 4. 내구도가 0인 칸의 개수가 K개 이상이라면 과정을 종료한다. 그렇지 않다면 1번으로 돌아간다.
    if (deadCount < K) {
      run();
    }
  }

  run();

  console.log(step);
});
