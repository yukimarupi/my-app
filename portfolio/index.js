// JavaScriptファイル (script.js)

// ページロード後にテキストのフェードインをトリガー
window.addEventListener('load', () => {
    const profileText = document.getElementById('profileText');
    profileText.classList.add('opacity-100', 'transition-opacity', 'duration-1000');
  });
  
  // 経歴のリストにスクロール時アニメーション
  window.addEventListener('scroll', () => {
    const items = document.querySelectorAll('ul li');
    items.forEach((item, index) => {
      if (item.getBoundingClientRect().top < window.innerHeight) {
        item.style.setProperty('--i', index);
      }
    });
  });
  
  document.addEventListener('DOMContentLoaded', function () {
    const articleList = document.getElementById('qiita-articles');
  
    // 非同期でQiita APIからデータを取得
    async function fetchQiitaArticles() {
      try {
        // Qiitaのユーザー名を指定
        const idaten7240 = 'idaten7240';  
        const response = await fetch(`https://qiita.com/api/v2/users/${idaten7240}/items`);
        const articles = await response.json();
  
        // Qiita記事のリストを表示
        articles.forEach(article => {
          const listItem = document.createElement('li');
          const link = document.createElement('a');
          link.href = article.url;
          link.textContent = article.title;
          link.target = "_blank"; // 新しいタブで開く
          listItem.appendChild(link);
          articleList.appendChild(listItem);
        });
      } catch (error) {
        console.error('Qiita記事の取得に失敗しました:', error);
      }
    }
  
    // Qiita記事を取得して表示
    fetchQiitaArticles();
  });
  