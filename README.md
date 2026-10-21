## ⚠ ライセンスに関するご注意 / Important Notice

本リポジトリはすべてのファイルがMITライセンスではありません。構成要素ごとに異なる規約が適用されます。  
This repository is NOT entirely under the MIT License. Different terms apply to each component.

- **JavaScript, HTML**： MIT License (自由に利用可能 / Freely available for use)
- **CSS, JSON (cardDB.json等)**： 著作権留保 / All Rights Reserved (無断転載・複製禁止 / No reproduction or duplication)

詳細は `LICENSE` ファイルを必ずご確認ください。  
Please make sure to check the `LICENSE` file for full details.

**特に、CSSファイル、JSONファイルの権利が留保されている点にご注意ください。**  
たとえ動作テスト目的だったとしても、かならずCSSファイルとJSONファイルは自前で用意してください。  
もちろん、クラスセレクタやキーなど、データの構造に係る部分はそのまま踏襲していただいて結構ですが、装飾やデータの内容については、全て変更した上ご活用ください。  

**Please note that all rights to the CSS and JSON files are strictly reserved.**  
Even if your purpose is just to test the functionality, you must prepare your own CSS and JSON files. While you are welcome to reuse the data structure (such as class selectors and object keys) as a template, please ensure that all visual styling (decorations) and the actual data content are completely modified before deployment.

---

## 概要 / Overview

Bloggerにおいて、トレーディングカードゲームなどの**ファセットナビゲーション（条件絞り込み検索）**を実装するためのフロントエンド・システム一式（JavaScript, CSS, JSONデータ）を格納しているリポジトリです。

- `cardDB.json` を書き換えるだけで、ブログ側のカード情報（パラメータ、画像、ルールテキスト等）が自動的に更新されます。
- 外部サーバーを立てることなく、Bloggerの標準機能と組み合わせてリッチなカードデータベースを構築できます。

This repository contains a complete frontend system (JavaScript, CSS, and JSON data) for implementing **faceted navigation (advanced conditional search)** on Blogger websites, typically optimized for Trading Card Games (TCGs).

- Simply by updating `cardDB.json`, card information on the blog side (parameters, images, rule texts, etc.) will be automatically synchronized and updated.
- It enables you to build a rich card database integrated with Blogger's native features without the need to deploy an external backend server.

---

## 各ファイルの説明 / File Descriptions

### `[Faceted_Navigation.html]`  
ファセット検索を行うメインページです。`List.js` を使用しています。このページでしか使用されないCSSやJavaScriptのコードは、このHTMLソースコードの中に直接記述されています。  
The main page that executes the faceted search, powered by `List.js`. All CSS and JavaScript code exclusive to this search page are embedded directly within this HTML file.  

### `[DB_singlepage.html]`  
ファセット検索結果からリンクされる個別ページのテンプレートです。Bloggerの機能を使って、検索結果となるデータ1件ごとに1ページずつシングルページを作成してください。（そもそもファセット検索画面から個別ページにリンクしないようにすれば省力的です）  
A template for individual detail pages linked from the search results. Use Blogger's features to generate a single standalone page for each individual data entry. (Note: Skipping links from the search page to individual pages entirely can save deployment effort).  

### `[cardDB.json]`  
`Faceted_Navigation.html` から参照されるカードデータベースのJSONデータです。  
The card database JSON file referenced by `Faceted_Navigation.html`.  

### `[cardDBpage_script.js]`  
シングルページを開いた際に実行されるスクリプトです。JSONファイルを参照し、表示を最新の情報へと動的に書き換える操作を行います。  
A script executed when an individual single page is loaded. It fetches the JSON data and dynamically updates the page layout with the latest information.  

### `[cardDBpage_style.css]`  
シングルページに適用されるスタイルシートです。このファイルに関する権利は留保されている（MIT適用外）ので、装飾の値をすべて変更するか、あるいはご自身でスタイルシートを作成するようにしてください。  
The stylesheet applied to individual single pages. Since the rights to this file are strictly reserved (excluded from the MIT License), please completely modify the styling values or create your own custom stylesheet.  

### `[singlepage_generator.html]`  
シングルページのソースコードを生成するためのツールページです。Blogger上で実行した場合、Bloggerの仕様由来の不具合が発生し、無駄に空行が挿入されてしまいますが、生成されたソースコード自体は問題なく機能します。  
A utility tool page designed to generate the source code for the individual single pages. When executed within Blogger, a minor layout bug inherent to Blogger may inject unnecessary empty lines; however, the generated source code remains fully functional.  
