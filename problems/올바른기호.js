/**
 * 프로그래머스 - 스택/큐
 * https://school.programmers.co.kr/learn/courses/30/lessons/12909
 */
function solution(s) {
  const ss = s.split("");
  let openCount = 0;
  let closeCount = 0;

  while (ss.length > 0) {
    const op = ss.pop();

    if (op === ")") {
      closeCount += 1;
    }

    if (op === "(") {
      if (closeCount === 0) {
        openCount += 1;
        break;
      }

      closeCount -= 1;
    }
  }

  return openCount === 0 && closeCount === 0;
}
