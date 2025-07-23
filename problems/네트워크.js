/**
 * 프로그래머스 - dfs / bfs
 * https://school.programmers.co.kr/learn/courses/30/lessons/43162
 */

// 방법 1.
function solution1(n, computers) {
  let answer = 0;
  const graph = Array.from({ length: n }, () => []);
  const visit = Array.from({ length: n }, () => false);

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i === j) {
        continue;
      }

      if (computers[i][j] === 1) {
        graph[i].push(j);
      }
    }
  }

  for (let i = 0; i < n; i++) {
    if (visit[i]) {
      continue;
    }

    answer += 1;
    visit[i] = true;
    const stack = [i];

    while (stack.length) {
      const v = stack.pop();

      for (let k = 0; k < graph[v].length; k++) {
        const nv = graph[v][k];

        if (visit[nv]) {
          continue;
        }

        visit[nv] = true;
        stack.push(nv);
      }
    }
  }

  return answer;
}

// 방법2.
function solution(n, computers) {
  let answer = 0;
  const visit = Array.from({ length: n }, () => false);

  function dfs(i) {
    if (visit[i]) {
      return 0;
    }

    visit[i] = true;

    const nextComputer = computers[i];

    for (let k = 0; k < nextComputer.length; k++) {
      if (nextComputer[k] === 1) {
        dfs(k);
      }
    }

    return 1;
  }

  for (let i = 0; i < n; i++) {
    answer += dfs(i);
  }

  return answer;
}
