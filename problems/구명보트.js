/**
 * 프로그래머스 - 투포인터
 * https://school.programmers.co.kr/learn/courses/30/lessons/42885
 */
function solution(people, limit) {
  people.sort((a, b) => b - a);

  let answer = 0;
  let start = 0;
  let end = people.length - 1;

  while (true) {
    if (start === end) {
      answer += 1;
      break;
    }

    if (start > end) {
      break;
    }

    const firstWeight = people[start];
    const secondWeight = people[end];

    if (firstWeight + secondWeight <= limit) {
      start += 1;
      end -= 1;
      answer += 1;
    } else {
      start += 1;
      answer += 1;
    }
  }

  return answer;
}
