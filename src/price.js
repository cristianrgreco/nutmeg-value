const parsePrice = price => {
  const match = price.match(/^(.)([0-9,]+)$/)
  if (match === null) {
    throw new Error(`invalid price: ${price}`)
  }
  const [symbol, value] = match.slice(1)
  const parsedValue = +(value.replace(/,/g, ''))
  return { symbol, value: parsedValue }
}

const percentageDifference = (a, b) => {
  const diff = ((b - a) / a) * 100
  return isNaN(diff) ? 0 : diff
}

module.exports = { parsePrice, percentageDifference }
