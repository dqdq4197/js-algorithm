

// n자리 
function makeCombination(n) {
  for(let i = 0; i < Math.pow(2, n); i++) {
    console.log(i.toString(2));
  }
}

makeCombination(4);

function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;

  return arr;
}
function combi(arr, idx) {

  for(let i = idx; i < arr.length - 1; i++) {
    combi(swap(arr, i, i + 1), i);
  }
  console.log(arr);
}

combi([1,2,3], 0);