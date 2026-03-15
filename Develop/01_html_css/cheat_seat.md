<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ページタイトル</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    </body>
</html>
<header>ロゴやナビゲーションを入れる頭の部分</header>

<nav>主要なリンクメニュー（グローバルナビ）</nav>

<main>
    <section>
        <h2>セクション見出し</h2>
        <p>コンテンツのまとまり（区切り）を定義します。</p>
    </section>

    <article>独立した記事やブログ投稿などに使います。</article>

    <aside>サイドバーや補足情報、広告など。</aside>

</main>

<footer>コピーライトやリンク集を入れる足の部分</footer>

<h1>大見出し（1ページに原則1つ）</h1>
<h2>中見出し</h2>
<h3>小見出し</h3>

<p>段落。一般的な文章を記述します。</p>

<a href="https://example.com" target="_blank" rel="noopener">リンク（別タブで開く設定）</a>

<ul>
    <li>箇条書き（順序なし）のアイテム1</li>
    <li>アイテム2</li>
</ul>

<ol>
    <li>順序ありリスト（1, 2, 3...）</li>
</ol>

<img src="path/to/image.jpg" alt="画像の説明（読み上げやエラー時に表示）">

<form action="/api/submit" method="POST">
    <label for="user-name">お名前：</label>
    <input type="text" id="user-name" name="username" placeholder="例：エンジニア太郎">

    <label for="user-email">メール：</label>
    <input type="email" id="user-email" name="email" required>

    <button type="submit">送信する</button>

</form>

<div class="container">
    意味を持たない汎用的な箱。
    主に Flexbox などのレイアウト調整用に多用します。
</div>

<span class="highlight">
    文章の一部分だけを囲って色を変えたい時などに使います。
</span>

■ CSS：レイアウトの決定版
① Flexbox（横・縦の整列）
「親要素」に書くプロパティです。

display: flex;：中身を並べる（開始合図）。

flex-direction: column;：中身を「縦」に並べる（スマホ版で多用）。

justify-content: center;：主軸（横）の中央揃え。

align-items: center;：交差軸（縦）の中央揃え。

gap: 20px;：要素間の隙間。marginより管理が楽。

② Position（自由な配置）
position: relative;：親要素に指定（基準点にする）。

position: absolute;：子要素に指定。親を基準に top: 10px; right: 10px; のように自由に配置。

z-index: 10;：要素の重なり順。数字が大きいほど手前に来る。

③ 必須の初期設定（Reset）
これをCSSの冒頭に書くだけで、ブラウザごとの表示のズレを防げます。

- {
  margin: 0;
  padding: 0;
  box-sizing: border-box; /_ paddingを含めたサイズ計算にする（超重要） _/
  }

img {
max-width: 100%; /_ 画像が親要素を突き抜けないようにする _/
display: block;
}

■ CSS：レスポンシブの書き方（Mobile First）
/_ PC版のスタイルを先に書く（またはその逆） _/
.card { width: 33.3%; }

/_ タブレット・スマホ用の設定 _/
@media (max-width: 1024px) {
.card { width: 50%; } /_ 幅を半分にする _/
}

@media (max-width: 768px) {
.card { width: 100%; } /_ 幅をいっぱいにする _/
}
