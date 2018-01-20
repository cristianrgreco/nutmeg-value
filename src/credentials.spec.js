const mockRead = require('read')
const { promptCredentials } = require('./credentials')

jest.mock('read')

describe('credentials', () => {
  it('should prompt for and return credentials', async () => {
    mockRead.mockImplementationOnce((options, callback) => callback(null, 'username'))
    mockRead.mockImplementationOnce((options, callback) => callback(null, 'password'))

    const expected = { username: 'username', password: 'password' }
    const actual = await promptCredentials()

    expect(actual).toEqual(expected)
  })

  it('should throw an error if username prompt fails', async () => {
    mockRead.mockImplementationOnce((options, callback) => callback(new Error('an error occurred')))

    try {
      await promptCredentials()
      fail()
    } catch (err) {
      expect(err).toEqual(new Error('an error occurred'))
    }
  })

  it('should throw an error if password prompt fails', async () => {
    mockRead.mockImplementationOnce((options, callback) => callback(null, 'username'))
    mockRead.mockImplementationOnce((options, callback) => callback(new Error('an error occurred')))

    try {
      await promptCredentials()
      fail()
    } catch (err) {
      expect(err).toEqual(new Error('an error occurred'))
    }
  })
})
