// ログインフォームの処理
if (document.getElementById('loginForm')) {
  //HTMLの'loginForm'を確認
  document.getElementById('loginForm').addEventListener('submit', function (e) {
    //'loginForm'があった場合のイベントを追加
    console.log(`ログインフォームの処理`)
    e.preventDefault() //デフォルトの動作をキャンセルする

    const email = document.getElementById('email').value //ユーザーが入力したemailを取得
    console.log('email', email)
    const password = document.getElementById('password').value //ユーザーが入力したpasswordを取得
    console.log('password', password)
    const userId = document.getElementById('userId').value // ユーザーが入力したユーザーIDを取得
    const storedEmail = getCookie('email', userId)
    console.log(`storedEmail`, storedEmail)
    const storedPassword = getCookie('password', userId)

    if (email === storedEmail && password === storedPassword) {
      window.location.href = 'profile.html'
    } else {
      toastr.error('メールアドレスまたはパスワードが正しくありません。')
    }
  })
}

// アカウント作成フォームの処理
if (document.getElementById('accountForm'))
  //HTMLの'accountForm'を確認
  document
    .getElementById('accountForm')
    .addEventListener('submit', async function (e) {
      //'accountFormがあった場合のイベントを追加 //asyncを追加
      e.preventDefault() //デフォルトの動作をキャンセルする

      const email = document.getElementById('newEmail').value //ユーザーが入力したemailを取得
      console.log('email', email)
      const password = document.getElementById('newPassword').value //ユーザーが入力したpasswordを取得
      console.log('password', password)
      const username = document.getElementById('username').value //ユーザーが入力したユーザー名を取得
      console.log('username', username)
      const userId = document.getElementById('newUserId').value // ユーザーが入力したユーザーIDを取得
      console.log('userId', userId)
      const userIcon = document.getElementById('userIcon').files[0] //ユーザーが入力したアイコンを取得
      console.log('userIcon', userIcon)

      const formData = new FormData() //空のフォーム
      console.log('formData', formData)
      formData.append('image', userIcon) //サーバにユーザが指定したアイコンデータを送信する

      try {
        const response = await fetch(
          `https://api.imgbb.com/1/upload?key=c0f0b6237007dc47943f085d13b621c1`,
          {
            //アップロード先のURL

            method: 'POST',
            body: formData, //送信するデータ
          },
        )
        console.log('response', response)
        const data = await response.json()
        console.log('data', data)
        if (data.status === 200) {
          const imageUrl = data.data.url
          setCookie('userId', userId, 7)
          setCookie('email', email, 7, userId)
          setCookie('password', password, 7, userId)
          setCookie('username', username, 7, userId)
          setCookie('userIcon', imageUrl, 7, userId)
          toastr.success('アカウントが正常に作成されました。') //成功メッセージを表示
          window.location.href = 'login.html' //'login.html'に移動
        } else {
          throw new Error('Failed to upload image')
        }
      } catch (error) {
        console.error('Error uploading image:', error)
        toastr.error('画像のアップロードに失敗しました。')
      }
    })

// プロファイルページでユーザー情報を表示
if (window.location.pathname.includes('profile.html')) {
  // ログイン時
  const userId = getCookie('userId') // ユーザーIDを取得
  console.log('userId', userId)

  // プロファイル表示時
  const username = getCookie('username', userId) //ユーザー名を表示
  console.log('username', username)
  const userIcon = getCookie('userIcon', userId) //アイコンを表示
  console.log('userIcon', userIcon)

  if (username && userIcon) {
    //ユーザー名とアイコンが存在するか確認
    document.getElementById('displayName').textContent = username //クッキーから取得したユーザー名を表示
    document.getElementById('displayIcon').src = userIcon //クッキーから取得したアイコンを表示
  } else {
    window.location.href = 'login.html' //クッキーに情報がない場合'login.html'ページに移動
  }
}

// Cookieを設定する関数
function setCookie(name, value, days, userId) {
  const date = new Date()
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
  const expires = 'expires=' + date.toUTCString()
  document.cookie =
    userId + '_' + name + '=' + value + ';' + expires + ';path=/'
}

// Cookieを取得する関数
function getCookie(name, userId) {
  const nameEQ = userId + '_' + name + '='
  const ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') c = c.substring(1)
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
  }
  return null
}

// TODOリストページの処理
if (window.location.pathname.includes('todo.html')) {
  document.getElementById('todoForm').addEventListener('submit', function (e) {
    console.log(`追加ボタンを押したら発火`)

    e.preventDefault() //デフォルトの動作をキャンセルする
    const taskName = document.getElementById('taskName').value //ユーザーが入力したタスク名を取得
    console.log(`taskName`, taskName)
    const taskDescription = document.getElementById('taskDescription').value //ユーザーが入力したタスクの説明文を取得
    console.log(`taskDescription`, taskDescription)
    const taskDeadline = document.getElementById('taskDeadline').value //ユーザーが入力した期限を取得
    console.log(`taskDeadline`, taskDeadline)

    const newTask = {
      //新しいタスクの作成と追加
      name: taskName, //ユーザーが入力したタスク名を保持
      description: taskDescription, //ユーザーが入力したタスクの説明を保持
      deadline: taskDeadline, //ユーザーが入力したタスクの期限を保持
    }

    console.log(`newTask`, newTask)

    addTask(newTask) //ユーザーがクリックすると新しいタスクを追加できる
    displayTasks() //更新されたタスクリストをユーザーに表示
  })
}

function addTask(task) {
  console.log(`addTask()`)
  const tasks = getTasks() //保存されているタスクのリストを返す
  console.log(`tasks`, tasks)
  tasks.push(task) //新しいタスクを追加
  console.log(`tasks`, tasks)
  saveTasks(tasks) //変更されたタスクを保存
}

function displayTasks() {
  console.log(`displayTasks`)
  const tasks = getTasks() //保存されている全てのタスクを取得
  console.log(`tasks`, tasks)
  const todoList = document.getElementById('todoList') //HTMLの'todoList'を取得
  console.log(`todoList`, todoList)
  todoList.innerHTML = '' // 'todoList'を空に設定して新たにタスクを表示する準備
  tasks.forEach((task, index) => {
    //タスクに対して処理を行うループ
    console.log(`task`, task)
    console.log(`index`, index)
    const taskElement = document.createElement('div') //各タスクの情報を囲むコンテナ
    console.log(`taskElement`, taskElement)
    taskElement.innerHTML = `     
                <p>タスク名: ${task.name}</p>
                <p>説明: ${task.description}</p>
                <p>期限: ${task.deadline}</p>
                <button onclick="deleteTask(${index})">削除</button>        
            ` //タスクの詳細（名前、説明、期限）と削除ボタンを含むHTMLを設定
    console.log(`taskElement`, taskElement)
    todoList.appendChild(taskElement) //画面上にタスクが表示される
    console.log(`todoList`, todoList)
  })
}
function deleteTask(index) {
  console.log(`deleteTask()`)
  const tasks = getTasks() //保存されているタスクを取得
  console.log(`tasks`, tasks)
  tasks.splice(index, 1) //１つのタスクを削除
  console.log(`tasks`, tasks)
  saveTasks(tasks) //更新されたタスクリストを再び保存
  displayTasks() //
}

function getTasks() {
  const userId = getCookie('userId') //ログインしているユーザーのIDをクッキーから取得
  console.log('userId', userId)
  const tasks = getCookie('tasks', userId) //ユーザーIDに紐づけられたクッキーを取得
  console.log('tasks', tasks)
  return tasks ? JSON.parse(tasks) : [] //タスクデータが存在しなければ[]を返す
}

function saveTasks(tasks) {
  const userId = getCookie('userId') //ユーザーIDの取得
  console.log('userId', userId)
  setCookie('tasks', JSON.stringify(tasks), 7, userId) //タスクの保存
}

// 既存の Cookie 操作関数 `setCookie` と `getCookie` はそのまま利用

// ページロード時にタスクを表示
window.onload = function () {
  if (window.location.pathname.includes('todo.html')) {
    displayTasks()
  }
}
