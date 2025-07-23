/**
 * 프로그래머스
 * https://school.programmers.co.kr/learn/courses/30/lessons/70129
 */

function solution(s) {
  let count = 0;
  let zeroCount = 0;

  while (s !== "1") {
    count += 1;

    const ns = s.split("").filter((n) => {
      if (n === "0") {
        zeroCount += 1;
        return false;
      }

      return true;
    });

    const c = ns.length.toString(2);
    s = c;
  }

  return [count, zeroCount];
}
