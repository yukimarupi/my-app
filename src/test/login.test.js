const { Builder, By, Key, until } = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')
const chromedriver = require('chromedriver')

describe('Account Creation and Login Tests', function () {
  // this.timeout(30000); // テストのタイムアウトを設定（必要に応じて調整）
  let driver

  before(async function () {
    driver = new Builder().forBrowser('chrome').build()
  })

  it('should allow a user to register', async function () {
    await driver.get('file:///path/to/your/create-account.html')
    await driver.findElement(By.id('newEmail')).sendKeys('test@example.com')
    await driver.findElement(By.id('newPassword')).sendKeys('password123')
    await driver.findElement(By.id('username')).sendKeys('testuser')
    await driver.findElement(By.id('newUserId')).sendKeys('user123')
    await driver.findElement(By.id('accountForm')).submit()
    await driver.wait(until.elementLocated(By.id('successMessage')), 10000)
  })

  it('should allow a user to login', async function () {
    await driver.get('file:///path/to/your/login.html')
    await driver.findElement(By.id('email')).sendKeys('test@example.com')
    await driver.findElement(By.id('password')).sendKeys('password123')
    await driver.findElement(By.id('loginForm')).submit()
    await driver.wait(until.elementLocated(By.id('welcomeMessage')), 10000)
  })

  after(async function () {
    await driver.quit()
  })
})
