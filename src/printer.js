const colors = require('colors')
const { percentageDifference } = require('./price')

const print = (total, totalContrib) => {
  const totalProfit = total.value - totalContrib.value
  const totalPercentageDiff = percentageDifference(totalContrib.value, total.value)
  const isProfitable = totalPercentageDiff >= 0
  const color = isProfitable ? 'green' : 'red'
  return colors[color](`${isProfitable ? '+' : '-'} ${total.symbol}${totalProfit} (${totalPercentageDiff}%)`)
}

module.exports = { print }
