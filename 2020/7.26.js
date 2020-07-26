// function solution(numbers, target) {
//     var answer = 0;
    
//     function recusion(arr,start) {
//         let sum=0;
        
//         sum = arr.reduce((a,b) => a+b);
//         if(sum === target) {
//             answer++; 
//             return;
//         }
//         for(let i=start; i< arr.length; i++) {
//             arr[i] = -1;
//             console.log(arr);
//             recusion(arr,start+1);
//             arr[i] = 1;
//         }
//     }
//     recusion(numbers,0)
//     return answer;
// }
function solution(numbers, target) {
  var answer = 0;
  const recursion = (arr,index) => {
      
      let sum = arr.reduce((a,b) => a+b);
      if(sum === target) {
          console.log(arr);
          answer ++;
          return ;
      }
      for(let i = index; i < arr.length; i++) {
          arr[i] *= -1;
          recursion(arr, i);
          arr[i] *= -1;
      }
      if(index === arr.length ) return ;
  }
  
  recursion(numbers, 0);
                  
  return answer;
}