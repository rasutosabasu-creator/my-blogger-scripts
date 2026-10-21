## ⚠ライセンスに関するご注意 / Important Notice

本リポジトリはすべてのファイルがMITライセンスではありません。構成要素ごとに異なる規約が適用されます。<br>
This repository is NOT entirely under the MIT License. Different terms apply to each component.

- JavaScript, HTML： MIT License (自由に利用可能)
- CSS, JSON (cardDB.json等)： 著作権留保 / All Rights Reserved (無断転載・複製禁止)

詳細は [LICENSE]ファイルを必ずご確認ください。

**特に、CSSファイル、JSONファイルの権利が留保されている点にご注意ください。**<br>
たとえ動作テスト目的だったとしても、かならずCSSファイルとJSONファイルは自前で用意してください。<br>
当然、クラスセレクタやキーなど、データの構造に係る部分はそのまま踏襲していただいて結構なのですが、装飾やデータの内容については、全て変更した上ご活用ください。
<br><br><br>

## 概要
Bloggerにおいて、トレーディングカードゲームなどの**ファセットナビゲーション（条件絞り込み検索）**を実装するためのフロントエンド・システム一式（JavaScript, CSS, JSONデータ）を格納しているリポジトリです。
- `cardDB.json` を書き換えるだけで、ブログ側のカード情報（パラメータ、画像、ルールテキスト等）が自動的に更新されます。
- 外部サーバーを立てることなく、Bloggerの標準機能と組み合わせてリッチなカードデータベースを構築できます。
<br><br><br>
  
## 各ファイルの説明
**[Faceted_Navigation.html]**<br>
ファセット検索を行うページです。List.jsを使用しています。<br>
このページでしか使用されないCSS,JavaScriptのコードは、このHTMLソースコードの中に直接記述されています。

**[Faceted_Navigation.html]**<br>
ファセット検索結果からリンクされる個別ページのテンプレートです。Bloggerの機能で、検索結果となるデータ一件ごとに1ページずつシングルページを作成してください。
（そもそもファセット検索画面から個別ページにリンクしないようにすれば省力的です）

**[cardDB.json]**<br>
[Faceted_Navigation.html][Faceted_Navigation.html]から参照されるJSONです。

**[cardDBpage_script.js]**<br>
[Faceted_Navigation.html]のシングルページを開いた際に実行されるスクリプトです。JSONファイルを参照し、最新の情報へと書き換える操作を行います。

**[cardDBpage_style.css]**<br>
[Faceted_Navigation.html]のシングルページに適用されるスタイルシートです。<br>
このファイルに関する権利は留保されている（MIT適用外）なので、装飾の値をすべて変更するか、あるいは自身でスタイルシートを作成するようにしてください。

**[singlepage_generator.html]**<br>
[Faceted_Navigation.html]のシングルページのソースコードを生成するページです。<br>
Blogger上で実行した場合、Bloggerの仕様由来（？）の不具合が発生し、無駄に空行が挿入されてしまいますが、生成されたソースコードは問題なく機能します。
