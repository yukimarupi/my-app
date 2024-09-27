// ログインフォームの処理
if (document.getElementById('loginForm')) {  //HTMLの'loginForm'を確認
    document.getElementById('loginForm').addEventListener('submit', function(e) {  //'loginForm'があった場合のイベントを追加
        e.preventDefault();                 //デフォルトの動作をキャンセルする
        const email = document.getElementById('email').value;  //ユーザーが入力したemailを取得
        const password = document.getElementById('password').value;  //ユーザーが入力したpasswordを取得
        const storedEmail = getCookie('email');    //クッキーに保存されたemailを取得
        const storedPassword = getCookie('password');    //クッキーに保存されたpasswordを取得
        //JavaScript ファイルのアラート部分をトースト通知で置き換える
        if (email === storedEmail && password === storedPassword) {
            window.location.href = 'profile.html';  // 一致している場合 profile.html へリダイレクト
        } else {
            toastr.error('メールアドレスまたはパスワードが正しくありません。');  // トースト通知でエラーメッセージを表示
        }
    });
}


// アカウント作成フォームの処理
if (document.getElementById('accountForm'))     //HTMLの'accountForm'を確認
    document.getElementById('accountForm').addEventListener('submit', async function(e) {    //'accountFormがあった場合のイベントを追加 //asyncを追加
        e.preventDefault();              //デフォルトの動作をキャンセルする

        const email = document.getElementById('newEmail').value;    //ユーザーが入力したemailを取得
        const password = document.getElementById('newPassword').value;    //ユーザーが入力したpasswordを取得
        const username = document.getElementById('username').value;    //ユーザーが入力したユーザー名を取得
        const userIcon = document.getElementById('userIcon').files[0];    //ユーザーが入力したアイコンを取得
        //追加部分
        const formData = new FormData();     //空のフォーム
        formData.append('image', userIcon);


        try {
            const response = await fetch(`https://api.imgbb.com/1/upload?key=c0f0b6237007dc47943f085d13b621c1`, {　//アップロード先のURL
                method: 'POST',
                body: formData     //送信するデータ
            });
            const data = await response.json();
            if (data.status === 200) {
                const imageUrl = data.data.url;
                setCookie('email', email, 7);     //ユーザーが入力したemailをクッキーに保存
                setCookie('password', password, 7);     //ユーザーが入力したpasswordをクッキーに保存
                setCookie('username', username, 7);     //ユーザーが入力したをユーザー名クッキーに保存
                setCookie('userIcon', imageUrl, 7);     //ユーザーが入力したアイコンをクッキーに保存
                toastr.success('アカウントが正常に作成されました。');     //アカウントが作成されたことを表示
                window.location.href = 'login.html';     //アカウント作成後login.htmlページにに移動
            } else {
                throw new Error('Failed to upload image');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            toastr.error('画像のアップロードに失敗しました。');
        }
    });

// プロファイルページでユーザー情報を表示
if (window.location.pathname.includes('profile.html')) {
    const username = getCookie('username');     //クッキーに保存されたユーザー名を取得
    const userIcon = getCookie('userIcon');     //クッキーに保存されたアイコンを取得

    if (username && userIcon) {     //ユーザー名とアイコンが存在するか確認
        document.getElementById('displayName').textContent = username;     //クッキーから取得したユーザー名を表示
        document.getElementById('displayIcon').src = userIcon;     //クッキーから取得したアイコンを表示
    } else {
        window.location.href = 'login.html';     //クッキーに情報がない場合'login.html'ページに移動
    }
}


// Cookieを設定する関数
function setCookie(name, value, days) {     //クッキーを設定するための関数(ユーザー名, 値, 保存期間)
    const date = new Date();     //Dateオブジェクトを作成
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));     //クッキーの有効期限を設定
    const expires = "expires=" + date.toUTCString();     //クッキーの有効期限をexpiresに変換 //日時を文字列に変換
    document.cookie = name + "=" + value + ";" + expires + ";path=/";     //クッキーを作成(名前、値、有効期限、サイト全体で有効であることを指定)
}

// Cookieを取得する関数
function getCookie(name) {     //クッキーの名前を引数として受け取る
    const nameEQ = name + "=";     //クッキーの名前を作る
    const ca = document.cookie.split(';');     //クッキー全体を分割
    for (let i = 0; i < ca.length; i++) {     //各クッキーをループで確認
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);     //クッキー名が一致するか確認
    }     //ループが終えてもクッキーが届かなかった場合nullを返す

    return null;
}
