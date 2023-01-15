const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


/** case 1. */
// function bfs(N) {
//   let index = 0
//   const visit = new Set()
//   const queue = [[1, 0, [1]]]

//   while (queue.length > index) {
//     const [num, cnt, history] = queue[index++]

//     if (num === N) {
//       return [cnt, history]
//     }

//     [num + 1, num * 2, num * 3].forEach(nNum => {
//       if (nNum <= N && !visit.has(nNum)) {
//         queue.push([nNum, cnt + 1, [nNum, ...history]])
//         visit.add(nNum)
//       }
//     })
//   }
// }

// rl.on("line", function (line) {
//   const N = +line

//   const [cnt, history] = bfs(N)

//   console.log(cnt)
//   console.log(history.join(' '))
//   process.exit();
// })


/** case 2. */
rl.on("line", function (line) {
  let result
  const N = +line
  const visit = new Set()
  const stack = [[N]]

  let index = 0
  while (stack.length > index) {
    const nums = stack[index++]
    const n = nums.slice(-1)[0]

    if (n === 1) {
      result = nums
      break
    }

    if (n % 3 === 0 && !visit.has(n / 3)) {
      visit.add(n / 3)
      stack.push([...nums, n / 3])
    }

    if (n % 2 === 0 && !visit.has(n / 2)) {
      visit.add(n / 2)
      stack.push([...nums, n / 2])
    }

    if (!visit.has(n - 1)) {
      visit.add(n - 1)
      stack.push([...nums, n - 1])
    }
  }

  console.log(`${result.length - 1}\n${result.join(' ')}`)
  process.exit()
})
