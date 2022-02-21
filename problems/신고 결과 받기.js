function solution(id_list, report, k) {
  var answer = [];
  const suspendedIds = [];
  const reportList = {};
  const reportCnt = {};

  id_list.forEach((id, i) => {
    reportList[id] = new Set();
    reportCnt[id] = 0;
    answer[i] = 0;
  });

  report.forEach((ids) => {
    const [from, to] = ids.split(" ");

    if (!reportList[from].has(to)) {
      reportList[from].add(to);
      reportCnt[to]++;
    }
  });

  for (const id in reportCnt) {
    const cnt = reportCnt[id];

    if (cnt >= k) {
      suspendedIds.push(id);
    }
  }

  Object.entries(reportList).map(([_, values], index) => {
    suspendedIds.forEach((sId) => {
      if (values.has(sId)) {
        answer[index]++;
      }
    });
  });

  return answer;
}
