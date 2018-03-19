const colors = require('colors')
const {percentageDifference} = require('./price')

const print = (total, totalContrib) => {
  const totalProfit = Math.abs(total.value - totalContrib.value)
  const totalPercentageDiff = percentageDifference(
    totalContrib.value,
    total.value
  )
  const isProfitable = totalPercentageDiff >= 0
  const color = isProfitable ? 'green' : 'red'
  const sign = isProfitable ? '+' : '-'

  return colors[color](
    `${sign} ${total.symbol}${totalProfit} (${totalPercentageDiff.toFixed(2)}%)`
  )
}

module.exports = {print}
