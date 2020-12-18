//1번 문제

function solution1(name_list) {
    var answer = false;

    name_list.forEach((element,index) => {
        for(let i = 0; i<name_list.length; i ++) {
            if(name_list[i].match(element) && index !== i) {
                answer = true;
                return;
            }
        }
    })

    return answer;
}

//2번 문제 

function set(array) {
    let arr = [];
    arr = array.filter((value, index) => array.indexOf(value) === index);
    return arr;
}
function sum(arrayA, arrayB) {
    let arr = [...arrayA];

    arrayB.forEach((element) => {
        if(arrayA.filter(value => value === element).length === 0) {
            arr = [...arr, element]
        }
    })
    return arr;
}
function complement(arrayA, arrayB) {
    let arr = [...arrayA];
    arrayB.forEach((element) => {
        arr = arr.filter(value => value !== element);
    })
    return arr;
}
function intersect(arrayA, arrayB) {
    let arr = [];
    arrayB.forEach((element) => {
        let common = arrayA.filter(value => value === element)[0];
        if(common)
            arr = [...arr,common]
    })
    return arr;
}

function solution(arrayA, arrayB) {
    let baseSet = set(arrayA);
    let otherSet = set(arrayB);

    var answer = [
        baseSet.length, 
        otherSet.length, 
        sum(baseSet,otherSet).length,
        complement(baseSet,otherSet).length,
        intersect(baseSet,otherSet).length
    ];

    return answer;
}

console.log(solution1(["가을", "우주", "너굴"]))