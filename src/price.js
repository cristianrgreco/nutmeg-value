const parsePrice = price => {
  const [symbol, value] = price.match(/^(.)([0-9,]+)$/).slice(1)
  const parsedValue = +(value.replace(/,/g, ''))
  return { symbol, value: parsedValue }
}

const percentageDifference = (a, b) => {
  const diff = Math.round(((b - a) / a) * 100)
  return isNaN(diff) ? 0 : diff
}

module.exports = { parsePrice, percentageDifference }
