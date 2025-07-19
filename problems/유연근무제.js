/**
 * 프로그래머스
 * https://school.programmers.co.kr/learn/courses/30/lessons/388351
 */

function getUntil(schedule) {
  const time = schedule + 10;
  const mins = ("" + time).slice(-2);

  if (mins >= 60) {
    return time + 40;
  }

  return time;
}

function solution(schedules, timelogs, startday) {
  let answer = 0;

  schedules.forEach((schedule, num) => {
    const until = getUntil(schedule);

    const good = timelogs[num].every((timelog, i) => {
      const day = (startday + i) % 7;

      if (day === 6 || day === 0) {
        return true;
      }

      return timelog <= until;
    });

    if (good) {
      answer += 1;
    }
  });

  return answer;
}
