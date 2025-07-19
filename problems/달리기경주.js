/**
 * 프로그래머스
 * https://school.programmers.co.kr/learn/courses/30/lessons/178871
 */

function solution(players, callings) {
  const nameMap = new Map(players.map((player, i) => [player, i]));

  callings.forEach((calling) => {
    const order = nameMap.get(calling);

    nameMap.set(calling, order - 1);
    const topPlayer = players[order - 1];
    nameMap.set(topPlayer, nameMap.get(topPlayer) + 1);

    players[order] = players[order - 1];
    players[order - 1] = calling;
  });

  return players;
}
