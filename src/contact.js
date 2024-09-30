document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // フォームのデフォルトの送信を防止

    var form = this;
    var button = form.querySelector('button[type="submit"]');

    // 送信ボタンを無効にして、送信中の状態を表示
    button.disabled = true;
    button.innerText = '送信中...';

    // Formspreeにフォームデータを送信
    fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: {
            'Accept': 'application/json'
        },
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            alert('お問い合わせありがとうございます！');
            form.reset(); // フォームをリセット
        } else {
            alert('送信に失敗しました。');
        }
    })
    .catch(error => {
        alert('エラーが発生しました。');
    })
    .finally(() => {
        // 送信ボタンを再び有効にし、元のテキストに戻す
        button.disabled = false;
        button.innerText = '送信';
    });
});
