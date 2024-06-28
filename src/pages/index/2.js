const code = 16889603
const num = code.toString(2).split('')
num.pop()
num.reverse()
const playlag = num[0]
const tryFlag = num[13]
console.log(playlag === '1' || (playlag === '1' && tryFlag === '1'))
