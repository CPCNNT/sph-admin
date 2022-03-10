function toPositive (num) {
  return num > 0 ? num : -num
}

function splitNumByComma(num) {
  const numString = String(num).split('.')
  const arr = numString[0].split('').reverse()
  let res = []
  arr.forEach((item, index) => {
    if (index !== 0 && index % 4 === 0) {
      res.push(',')
    }
    res.push(item)
  })
  res.reverse()
  if (numString[1]) {
    res = res.join('').concat('.' + numString[1])
  } else {
    res = res.join('')
  }
  return res
}

export default {
  toPositive,
  splitNumByComma
}
