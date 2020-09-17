const splice = (array: string[], index: number ) => {
  array.splice(index, 0, ',')
  return array.join('')
}

export const toMoney = (value: number): any => {
  const array = value.toString().split('')
  
  switch(array.length) {
    case 4:
      return splice(array, 1)
    case 5:
      return splice(array, 2)
    case 6:
      return splice(array, 3)
    case 7:
      splice(array, 4)
      return splice(array, 1)
    default:
      return value
  }
}