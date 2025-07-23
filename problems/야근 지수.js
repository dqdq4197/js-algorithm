/**
 * 프로그래머스 - 시뮬레이션
 * https://school.programmers.co.kr/learn/courses/30/lessons/12927
 */

function solution(n, works) {
  works.sort((a, b) => b - a);

  let i = 0;
  while (n > 0) {
    if (i > 0 && works[i - 1] > works[i]) {
      i -= 1;
      continue;
    }

    if (i + 1 < works.length && works[i] === works[i + 1]) {
      i += 1;
      continue;
    }

    works[i] -= 1;
    n -= 1;
  }

  return works.reduce((result, work) => {
    if (work <= 0) {
      return result;
    }

    return result + Math.pow(work, 2);
  }, 0);
}
