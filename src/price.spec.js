const { parsePrice, percentageDifference } = require('./price')

describe('price', () => {
  it('should parse the price', () => {
    expect(parsePrice('£100')).toEqual({ symbol: '£', value: 100 })
    expect(parsePrice('£10,000')).toEqual({ symbol: '£', value: 10000 })
    expect(parsePrice('£1,000,000')).toEqual({ symbol: '£', value: 1000000 })
  })

  it('should throw an error if unable to parse price', () => {
    expect(() => parsePrice('abc')).toThrow('invalid price: abc')
  })

  it('should return the difference as a percentage', () => {
    expect(percentageDifference(0, 0)).toBe(0)
    expect(percentageDifference(1, 2)).toBe(100)
    expect(percentageDifference(2, 1)).toBe(-50)
  })
})
