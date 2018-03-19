const colors = require('colors')
const {print} = require('./printer')

describe('printer', () => {
  it('should output a profit', () => {
    const total = {symbol: '£', value: 2000}
    const totalContrib = {symbol: '£', value: 1000}

    const expected = colors.green(`+ £1000 (100.00%)`)
    const actual = print(total, totalContrib)

    expect(actual).toBe(expected)
  })

  it('should output a loss', () => {
    const total = {symbol: '£', value: 2000}
    const totalContrib = {symbol: '£', value: 4000}

    const expected = colors.red(`- £2000 (-50.00%)`)
    const actual = print(total, totalContrib)

    expect(actual).toBe(expected)
  })

  it('should format the difference to 2DP', () => {
    const total = {symbol: '£', value: 13}
    const totalContrib = {symbol: '£', value: 7}

    const expected = colors.green(`+ £6 (85.71%)`)
    const actual = print(total, totalContrib)

    expect(actual).toBe(expected)
  })
})
