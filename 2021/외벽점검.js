const permutations = arr => {
  if (arr.length <= 2) return arr.length === 2 ? [arr, [arr[1], arr[0]]] : arr;
  return arr.reduce(
    (acc, item, i) =>
      acc.concat(
        permutations([...arr.slice(0, i), ...arr.slice(i + 1)]).map(val => [
          item,
          ...val,
        ])
      ),
    []
  );
};

function solution(n, weak, dist) {
    var answer = 9;
    let tmp = [...weak];
    let distArr = permutations(dist);
    
    for(let i = 0; i < weak.length; i++) {
        distArr.forEach(dist => {
            let temp = [...tmp];
            for(let j = 0; j < dist.length; j++) {
                let std = temp[0];
                temp = temp.filter(w => {
                    if(w < weak[i]) w += n;
                    if(std < weak[i]) std += n;
                    return !(w >= std && std + dist[j] >= w)
                })
                
                if(temp.length === 0) {
                    answer = Math.min(answer, j + 1);
                    break;
                } 
            }
        })
        
        
        tmp.push(tmp.shift());
    }
    
    return answer > 8 ? -1 : answer;
}