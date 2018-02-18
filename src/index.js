const chromeLauncher = require('chrome-launcher')
const { Chromeless } = require('chromeless')
const page = require('./page')
const { print } = require('./printer')
const { promptCredentials } = require('./credentials')
const { parsePrice } = require('./price');

(async () => {
  const chrome = await chromeLauncher.launch({ port: 9222, chromeFlags: ['--headless'] })
  const chromeless = new Chromeless({ launchChrome: false })

  const [{ username, password }] = await Promise.all([
    promptCredentials(),
    chromeless
      .goto(page.url)
      .wait(page.signInButton)
      .click(page.signInButton)
      .wait(page.usernameInput)
      .wait(page.passwordInput)
  ])

  const { total, totalContrib } = await chromeless
    .type(username, page.usernameInput)
    .type(password, page.passwordInput)
    .click(page.loginButton)
    .click(page.loginButton)
    .wait(page.overallPortfolio)
    .click(page.overallPortfolio)
    .wait(page.total)
    .evaluate(() => {
      const totalSelector = '.portfolio.total'
      const totalContribSelector = '#contributions_all_time .portfolio.amount'
      const total = document.querySelector(totalSelector).textContent
      const totalContrib = document.querySelector(totalContribSelector).textContent
      return { total, totalContrib }
    })

  await chromeless
    .evaluate(() => {
      const signOutSelector = '#sign-out'
      document.querySelector(signOutSelector).click()
    })
    .wait(page.usernameInput)
    .end()

  const parsedTotal = parsePrice(total)
  const parsedTotalContrib = parsePrice(totalContrib)

  console.log(print(parsedTotal, parsedTotalContrib))

  await chrome.kill()
})()
