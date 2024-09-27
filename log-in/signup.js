
//アカウント作成の関数
document.getElementById('signup-form').addEventListener('submit', function (event) {
    event.preventDefault();
    //入力されたeメールを取得
    const email = document.getElementById('email').value;
    //入力されたpssを取得   
    const password = document.getElementById('password').value;
   //入力されたユーザー名を取得
    const username = document.getElementById('username').value;
   //指定されたアイコンを取得
    const icon = document.getElementById('icon').value;
    
    // Cookieに情報を保存
    document.cookie = `email=${email}; path=/`;
    document.cookie = `password=${password}; path=/`;
    document.cookie = `username=${username}; path=/`;
    document.cookie = `icon=${icon}; path=/`;
    
    //アラート表示
    alert('アカウントが作成されました！');

    // ログインページへリダイレクト
    window.location.href = 'style.html';  
  });
  