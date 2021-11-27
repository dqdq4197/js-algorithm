// 왼쪽 자식노드 인덱스 : 부모노드 인덱스 * 2  
// 오른쪽 자식노드 인덱스 : (부모노드 인덱스 * 2) + 1 
// 부모노드 인덱스 : 자식노드 / 2 소수점 버림 

let array = [null];

function enqueue(item) {
  let size = array.length;

  while(array[Math.floor(size / 2)] <= item && size !== 1) {
    array[size] = array[Math.floor(size / 2)];
    size = Math.floor(size / 2);
  }

  array[size] = item;
}

function dequeue(){
  let remove = array[1];
  let temp = array.pop();
  let size = array.length;
  array[1] = temp; 
  size--;

  let parent = 1; 
  let childe = 2;
  
  while(childe <= size){
      // 두 자식중 큰 노드와 부모노드랑 비교 
      if(array[childe] < array[childe + 1] && childe < size){
          childe += 1; 
      }

      if(temp >= array[childe]) break; // 만약 자식 노드와 비교해서 크다면 해당 반복문 멈춤 
      array[parent] = array[childe]; 
      parent = childe;
      childe *=2;
  }
  array[parent] = temp;
  console.log(array);
  return remove;
}

enqueue(19);
enqueue(12);
enqueue(13);
enqueue(15);
enqueue(9);
enqueue(20);
console.log('as', array);
console.log(dequeue());
console.log(dequeue());
console.log(dequeue());
console.log(dequeue());
console.log(dequeue());

console.log(array);
// size => 3, item => 2