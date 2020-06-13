
    let a ='';
    function recursion(n) {
        if(n == 0) return console.log(a);
        a += n%10
        recursion (parseInt(n / 10))
    }

  recursion(124)