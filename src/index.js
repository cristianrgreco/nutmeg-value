const chromeLauncher = require('chrome-launcher')
const {Chromeless} = require('chromeless')
const page = require('./page')
const {print} = require('./printer')
const {promptCredentials} = require('./credentials')
const {parsePrice} = require('./price')

const startChromeless = async () => {
  const chrome = await chromeLauncher.launch({
    port: 9222,
    chromeFlags: ['--headless']
  })
  return {chrome, chromeless: new Chromeless({launchChrome: false})}
}

const getCredentials = async chromeless => {
  const [{username, password}] = await Promise.all([
    promptCredentials(),
    chromeless
      .goto(page.url)
      .wait(page.signInButton)
      .click(page.signInButton)
      .wait(page.usernameInput)
      .wait(page.passwordInput)
  ])
  return {username, password}
}

const fetchTotals = async (chromeless, {username, password}) => {
  const {total, totalContrib} = await chromeless
    .type(username, page.usernameInput)
    .type(password, page.passwordInput)
    .click(page.loginButton)
    .click(page.loginButton)
    .wait(page.overallPortfolio)
    .click(page.overallPortfolio)
    .wait(page.total)
    .evaluate(() => {
      const getText = cssSelector => document.querySelector(cssSelector).textContent
      const totalSelector = '.portfolio.total'
      const totalContribSelector = '#contributions_all_time .portfolio.amount'
      const total = getText(totalSelector)
      const totalContrib = getText(totalContribSelector)
      return {total, totalContrib}
    })
  return {total, totalContrib}
}

const signOut = chromeless => {
  return chromeless
    .evaluate(() => {
      const signOutSelector = '#sign-out'
      document.querySelector(signOutSelector).click()
    })
    .wait(page.usernameInput)
    .end()
}

const main = async () => {
  const {chrome, chromeless} = await startChromeless()
  const {username, password} = await getCredentials(chromeless)
  const {total, totalContrib} = await fetchTotals(chromeless, {username, password})
  await signOut(chromeless)

  const parsedTotal = parsePrice(total)
  const parsedTotalContrib = parsePrice(totalContrib)
  console.log(print(parsedTotal, parsedTotalContrib))

  await chrome.kill()
}

main().catch(err => console.error(err))
