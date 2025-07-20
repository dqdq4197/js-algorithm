/**
 * 프로그래머스
 * https://school.programmers.co.kr/learn/courses/30/lessons/42862
 */
function solution(n, lost, reserve) {
  const students = Array.from({ length: n + 1 }, () => 1);

  lost.forEach((n) => (students[n] -= 1));
  reserve.forEach((n) => (students[n] += 1));

  for (let i = 1; i <= n; i++) {
    if (students[i] !== 0) {
      continue;
    }

    if (students[i - 1] === 2) {
      students[i] = 1;
      students[i - 1] = 1;
    } else if (students[i + 1] === 2) {
      students[i] = 1;
      students[i + 1] = 1;
    }
  }

  return (
    students.reduce((sum, student) => (sum += student >= 1 ? 1 : 0), 0) - 1
  );
}
