function solution(info, query) {
  var answer = [];
  let infoMap = new Map();
  let queryMap = new Map();
  
  info.forEach(v => {
      let temp = v.split(' ')
      infoMap.set(temp.slice(0, 4).join(''), Number(...temp.slice(-1)));
  })
  
  query.forEach(v => {
    let temp = v.split(' ').filter(q => q !== 'and')
    queryMap.set(temp.slice(0,4), temp.slice(-1))
  })
  console.log(infoMap, queryMap)

  
  return answer;
}

solution(["java backend junior pizza 150","python frontend senior chicken 210","python frontend senior chicken 150","cpp backend senior pizza 260","java backend junior chicken 80","python backend senior chicken 50"],["java and backend and junior and pizza 100","python and frontend and senior and chicken 200","cpp and - and senior and pizza 250","- and backend and senior and - 150","- and - and - and chicken 100","- and - and - and - 150"])