const read = require('read')

const promptCredentials = () => new Promise((resolve, reject) => {
  read({ prompt: 'Enter username: ' }, (err, username) => {
    if (err) reject(err)
    read({ prompt: 'Enter password: ', silent: true }, (err, password) => {
      if (err) reject(err)
      else resolve({ username, password })
    })
  })
})

module.exports = { promptCredentials }
