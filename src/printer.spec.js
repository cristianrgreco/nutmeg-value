const colors = require('colors')
const { print } = require('./printer')

describe('printer', () => {
  it('should output a profit', () => {
    const total = { symbol: '£', value: 2000 }
    const totalContrib = { symbol: '£', value: 1000 }

    const expected = colors.green(`+ £1000 (100%)`)
    const actual = print(total, totalContrib)

    expect(actual).toBe(expected)
  })

  it('should output a loss', () => {
    const total = { symbol: '£', value: 2000 }
    const totalContrib = { symbol: '£', value: 4000 }

    const expected = colors.red(`- £1000 (-50%)`)
    const actual = print(total, totalContrib)

    expect(actual).toBe(expected)
  })
})
