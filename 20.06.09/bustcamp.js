// 부스트 캠프 모의 시험
//중복 되는 숫자 중복 횟수 계산하여 배열로 return 없으면 return [-1]
// 주어지는 배열 길이는 1이상 100이하 자연수 
function func(arr) {
    let answer =[];
    arr.sort((a,b) => a-b);
    
    function recurve(s) {
        let ans;
        ans = s.filter(data => s[0] !== data);
        if(s.length === 0) return;
        if(ans.length+1 === s.length) {
            s.shift();
            recurve(ans);
        } else {
            answer.push(s.length - ans.length );
            recurve(ans);
        }
    }
    recurve(arr);
    return answer.length ? answer : [-1];
}

console.log(func([1,2,3,3,3,3,4,5,5,5,5,4,3]));
console.log(func([1,2,3,3,1,3,1,3,4,4,2,5,5,5,5,4,3]));
console.log(func([1,2,3,5,6,1]));
console.log(func([1,2,3,3,1,3,1,3,4,4,1,2,3,3,1,3,1,3,4,4,2,5,5,5,5,4,3,2,5,5,5,5,4,3,1,2,3,3,1,3,1,3,4,4,2,5,5,5,5,4,3]));