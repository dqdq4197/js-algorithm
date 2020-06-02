// 2차원 행렬 arr1과 arr2를 입력받아, arr1에 arr2를 곱한 결과를 반환하는 함수, solution을 완성해주세요.

// 제한 조건
// 행렬 arr1, arr2의 행과 열의 길이는 2 이상 100 이하입니다.
// 행렬 arr1, arr2의 원소는 -10 이상 20 이하인 자연수입니다.
// 곱할 수 있는 배열만 주어집니다.

function solution(arr1, arr2) {
    var answer = new Array();
    
    for(let x=0; x<arr1.length; x++) {
        answer.push([])
        for(let c=0; c<arr2[0].length; c++) {
            answer[x].push(0)
        }
    }
    for(let w=0; w<arr1.length; w++) {
        for(let i=0; i<arr1[0].length; i++) {
            for(let v=0; v<arr2[0].length; v++) {
                answer[w][v]+= arr1[w][i] * arr2[i][v]   
            }
        }
    }
    return answer;
}

console.log(solution([[1, 4], [3, 2], [4, 1]],	[[3, 3], [3, 3]]))
console.log(solution([[2, 3, 2], [4, 2, 4], [3, 1, 4]],	[[5, 4, 3], [2, 4, 1], [3, 1, 1]]))