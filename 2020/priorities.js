

let arr = [];

function enqueue(arr, num) {
  let isContain = false;
  for(let i = 0; i < arr.length; i++) {
    if(arr[i][0] < num[0]) {
      arr.splice(i, 0, num);
      isContain = true;
      console.log('ar', arr)
      break ;
    }
  }
  if(!isContain) {
    arr.push(num);
  }
}

function dequeue(arr) {
  if(arr.length) {
    return arr.pop();
  }
}

enqueue(arr, [1 ,3]);
enqueue(arr, [5, 5]);
enqueue(arr, [3, 4]);
enqueue(arr, [17,2]);
enqueue(arr, [14,2]);
console.log(arr);
let [dis, now] = dequeue(arr);
dequeue(arr)
dequeue(arr)
console.log(arr, dis, now);