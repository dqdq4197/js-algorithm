arr = [1,2,3,4,5,10,11,12,13,14,15,16];
let cnt = 0;
arr.reduce((temp, cur, i) => {
  if(cur > 10) {
    return cnt ++;
  }
}) 
console.log(cnt)

// 1 100 101 90 