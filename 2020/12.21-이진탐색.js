
let arr = [20, 15, 17, 16, 12, 13, 36].sort((a,b) => b-a);
let target = 16;
console.log(arr);
//19,18,17,15,13
function findFunc(start, end) {
  
  let mid = Math.floor((start + end) / 2)
  let sum = 0;
  for(let i = 0; i < arr.length; i++) {
    if(arr[i] > mid) {
      sum += arr[i] - mid;
    }
  }
  console.log(mid,sum,arr.reduce((a,b) => a+b));
  if(sum > target) {
    findFunc(mid, end)
  } else if(sum < target) {
    findFunc(start, mid)
  } else {
    console.log(mid)
    return mid
  }
}

findFunc(0, arr[0]);
