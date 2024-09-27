// クッキーにデータを保存する関数
function setCookie(name, value, days) {
  let expires = "";
  if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// クッキーの値を取得する関数
function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

// ログイン処理
//loginFormを取得して
//addEventListenerはHTMLのtypeを選択してボタンが押されたら発火する
document.getElementById('loginForm').addEventListener('submit', function(e) {
  //デフォルトで設定されている動作をキャンセルする
  e.preventDefault();
  //document.getElementByIdはemailのelement(HTMLから)を取得
  //valueユーザーが入力した値
  const email = document.getElementById('email').value;

  //ユーザーが入力した値を取得
  const password = document.getElementById('password').value;
  
  //クッキーからemailを取得
  const storedEmail = getCookie('email');
  //クッキーからパスワードを取得
  const storedPassword = getCookie('password');
  
  //ユーザーが設定したeメールとpssがクッキーと一致しているか確認
  if (email === storedEmail && password === storedPassword) {
      const username = getCookie('username');//クッキーから名前を取得
      const userIcon = getCookie('userIcon');//クッキーからアイコンを取得
      
      document.getElementById('loginForm').classList.add('hidden');
 //eメールかpssが間違っている表示
    } else {
      alert('Incorrect email or password');
  }
});


//新規アカウント作成ボタンを押すと発火
//新規アカウント作成ページに飛ばす
document.getElementById('createAccountButton').addEventListener('click', function() {
  window.location.href = 'register.html';  // アカウント作成ページへリダイレクト
});

