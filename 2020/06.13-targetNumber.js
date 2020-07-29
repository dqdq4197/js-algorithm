function solution(numbers, target) {
    var answer = 0;
    
    
    function recur(idx, sum){
        if( idx === numbers.length){
            if(sum ===target ){
                answer+=1;
            }
            return;
        }
        
        recur(idx+1, sum+numbers[idx]);
        recur(idx+1, sum-numbers[idx]);
    }
    
    recur(0, 0);
    
    return answer;
}
// 두번 째 답 
// function solution(numbers, target) {
//     var answer = 0;
//     const recursion = (arr,index) => {
//         let sum = arr.reduce((a,b) => a+b);
//         if(sum === target) {
//             answer ++;
//         }
//         for(let i = index; i < arr.length; i++) {
//             arr[i] *= -1;
//             recursion(arr, i + 1);
//             arr[i] *= -1;
//         }
//         if(index === arr.length ) return ;
//         index ++;
//     }
//     recursion(numbers, 0);
                    
//     return answer;
// }


[['ICN','BOO' ], [ 'ICN', 'COO' ], [ 'COO', 'DOO' ], ['DOO', 'COO'], [ 'BOO', 'DOO'] ,['DOO', 'BOO'], ['BOO', 'ICN' ], ['COO', 'BOO']]
['ICN', 'BOO', 'DOO', 'BOO', 'ICN', 'COO', 'DOO', 'COO', 'BOO']