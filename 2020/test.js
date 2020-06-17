let item;
function createItem(callback){
    callback('콜백함수')
}
createItem((el) => item = el)
console.log(item);