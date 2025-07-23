/**
 * 프로그래머스
 * https://school.programmers.co.kr/learn/courses/30/lessons/12951
 */

function solution(s) {
  const answer = [];
  const words = s.toLowerCase().split(" ");

  for (let word of words) {
    if (word[0]) {
      word = word.replace(/^./, word[0].toUpperCase());
    }

    answer.push(word);
  }

  return answer.join(" ");
}
