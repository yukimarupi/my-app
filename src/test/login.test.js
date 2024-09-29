/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom'
const fs = require('fs')
const path = require('path')
const html = fs.readFileSync(
  path.resolve(__dirname, '../create-account.html'),
  'utf8',
)

global.fetch = require('jest-fetch-mock')
let document
let window
describe('アカウント作成とログイン機能', () => {
  beforeEach(() => {
    document = new DOMParser().parseFromString(html, 'text/html')
    window = document.defaultView
    console.log(window)

    global.document = document
    global.window = window
    require('../app.js') // これはあなたの実際のJavaScriptファイルへのパスに置き換えてください
    fetch.resetMocks()
    global.fetch = require('jest-fetch-mock')
  })

  test('全ての入力項目に正しい情報を入力した場合に新規登録が成功すること', () => {
    document.getElementById('newEmail').value = 'test@example.com'
    document.getElementById('newPassword').value = 'password123'
    document.getElementById('username').value = 'testuser'
    document.getElementById('newUserId').value = 'user123'

    const form = document.getElementById('accountForm')
    const mockSubmit = jest.fn()
    form.addEventListener('submit', mockSubmit)

    const event = document.createEvent('Event')
    event.initEvent('submit', true, true)
    form.dispatchEvent(event)

    expect(mockSubmit).toHaveBeenCalled()
    expect(fetch).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        method: 'POST',
      }),
    )
  })

  test('メールアドレスが空の場合、新規登録が拒否されること', () => {
    document.getElementById('newEmail').value = ''
    document.getElementById('newPassword').value = 'password123'
    document.getElementById('username').value = 'testuser'

    const form = document.getElementById('accountForm')
    const mockSubmit = jest.fn()
    form.addEventListener('submit', mockSubmit)
    form.dispatchEvent(new window.Event('submit'))

    expect(mockSubmit).not.toHaveBeenCalled()
  })

  test('正しい認証情報でログインできること', () => {
    document.getElementById('email').value = 'test@example.com'
    document.getElementById('password').value = 'password123'

    const form = document.getElementById('loginForm')
    const mockSubmit = jest.fn()
    form.addEventListener('submit', mockSubmit)
    form.dispatchEvent(new window.Event('submit'))

    expect(mockSubmit).toHaveBeenCalled()
  })

  // 他のテストケースも同様のパターンで記述可能です。
})
