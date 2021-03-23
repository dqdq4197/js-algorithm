function permutation(arr, selectNum) {
  let result = [];
    
  if (selectNum === 1) return arr.map((v) => [v]);
    
  arr.forEach((v, idx, arr) => {
    const fixer = v;
    const restArr = arr.filter((_, index) => index !== idx && index > idx);
    const permuationArr = permutation(restArr, selectNum - 1);
    const combineFixer = permuationArr.map((v) => [fixer, ...v]);
    result.push(...combineFixer);
  });
    
  return result;
}

function solution(orders, course) {
  var answer = [];
  orders = orders.map(order => order.split('').sort());
  let table = new Map();
  
  course.forEach(num => {
      for(let i = 0; i < orders.length; i ++) {
          if(orders[i].length < num) continue;
          let combiArr = permutation(orders[i], num)
          combiArr.forEach(arr => {
              if(table.get(arr.join(''))) {
                  table.set(arr.join(''), table.get(arr.join('')) + 1)
              } else {
                  table.set(arr.join(''), 1);
              }
          })
      }
  })
  
  let maxValue = []
  for (let [key, value] of table) {
    if(value < 2) continue;
    if(!maxValue[key.length]) maxValue[key.length] = 1;
    if(!answer[key.length]) answer[key.length] = [];
    if(maxValue[key.length] === value) {
      answer[key.length].push(key);
    } else if(maxValue[key.length] < value) {
      answer[key.length] = [key];
      maxValue[key.length] = value;
    }
  }
  
  
  return answer;
}

solution(["XYZ", "XWY", "WXA"],	[2,3,4])