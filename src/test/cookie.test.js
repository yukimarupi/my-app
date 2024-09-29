import '@testing-library/jest-dom';
import { setCookie, getCookie, addTask, displayTasks, deleteTask, getTasks, saveTasks } from '../app.js'; 

global.fetch = require('jest-fetch-mock');
let document;

describe('Cookieの設定と取得', () => {
  let cookies = {};
  beforeEach(() => {
    cookies = {}; // Cookieを格納するオブジェクトを初期化
    if (typeof document !== "undefined" && !document.hasOwnProperty('cookie')) {
      Object.defineProperty(document, 'cookie', {
        configurable: true, // これによりプロパティの再定義が可能になる
        enumerable: true,
        get: () => 
          Object.entries(cookies)
            .map(([key, value]) => `${key}=${value}`)
            .join("; "), // すべてのCookieを一つの文字列に連結
        set: (value) => {
          const [cookieName, cookieValue] = value.split("=");
          cookies[cookieName.trim()] = cookieValue.split(";")[0]; // ";"で区切られた最初の部分が値
        }
      });
    }
  });

  test('setCookieでCookieが正しく設定されること', () => {
    const name = 'testName';
    const value = 'testValue';
    const days = 7;
    const userId = '123';

    // setCookieを呼び出し
    setCookie(name, value, days, userId);

    // 期待されるCookieの形式を確認
    const expectedCookieName = `${userId}_${name}`;
    expect(cookies[expectedCookieName]).toBe(value);
  });

  test('getCookieで正しいCookieが取得できること', () => {
    const name = 'testName';
    const value = 'testValue';
    const userId = '123';

    // テスト用のCookieを設定
    cookies[`${userId}_${name}`] = value;

    // getCookieを呼び出し
    const result = getCookie(name, userId);

    // 正しい値が取得できているか確認
    expect(result).toBe(value);
  });
});
