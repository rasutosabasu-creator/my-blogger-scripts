(function () {

  'use strict';


  /* =========================================================
     設定
     ========================================================= */

  const DATA_URL =
    'https://gist.githubusercontent.com/rasutosabasu-creator/5f7f0441b68debeb59005c53d7338086/raw/gistfile1.txt';


  /* =========================================================
     HTMLエスケープ
     ========================================================= */

  function escapeHTML(value) {

    if (value === null || value === undefined) {
      return '';
    }

    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');

  }


  /* =========================================================
     URL安全化
     ========================================================= */

  function safeURL(value) {

    if (!value) {
      return '';
    }

    const url = String(value).trim();

    /*
     * http / https のみ許可
     */
    if (/^https?:\/\//i.test(url)) {
      return escapeHTML(url);
    }

    return '';

  }


  /* =========================================================
     改行処理
     ========================================================= */

  function formatText(value) {

    if (
      value === null ||
      value === undefined ||
      value === ''
    ) {
      return '';
    }

    return escapeHTML(value)
      .replace(/\r\n/g, '\n')
      .replace(/\r/g, '\n')
      .replace(/\n/g, '<br>');

  }


  /* =========================================================
     サブタイプ生成
     ========================================================= */

  function createSubtypes(value) {

    if (!value) {
      return '';
    }

    const subtypes = String(value)
      .split(',')
      .map(function (item) {
        return item.trim();
      })
      .filter(Boolean);

    if (!subtypes.length) {
      return '';
    }

    return subtypes
      .map(function (subtype) {

        return `
          <span class="gist-card__subtype">
            ${escapeHTML(subtype)}
          </span>
        `;

      })
      .join('');

  }


  /* =========================================================
     カード生成
     ========================================================= */

  function createCard(item) {

    const imageURL = safeURL(item.image);
    const linkURL = safeURL(item.link);
    const materialURL = safeURL(item.material);


    /*
     * 数値系データ
     *
     * 空文字の場合は表示しない
     */

    const stats = [];

    if (
      item.value !== undefined &&
      item.value !== null &&
      String(item.value).trim() !== ''
    ) {
      stats.push(`
        <div class="gist-card__stat">
          バリュー：${escapeHTML(item.value)}
        </div>
      `);
    }

    if (
      item.power !== undefined &&
      item.power !== null &&
      String(item.power).trim() !== ''
    ) {
      stats.push(`
        <div class="gist-card__stat">
          パワー：${escapeHTML(item.power)} (＋${escapeHTML(item.plus)})
        </div>
      `);
    }

  


    /*
     * 画像
     */

    const imageHTML = imageURL
      ? `
        <div class="gist-card__image">
          <img
            src="${imageURL}"
            alt="${escapeHTML(item.名前 || '')}"
            loading="lazy"
          >
        </div>
      `
      : '';


    /*
     * タイプ
     */

    const typeHTML = item.type
      ? `
        <div class="gist-card__type">
          カードタイプ：${escapeHTML(item.type)}
        </div>
      `
      : '';


    /*
     * サブタイプ
     */

    const subtypeHTML = item.subtype
      ? `
        <div class="gist-card__subtypes">
          サブタイプ：${createSubtypes(item.subtype)}
        </div>
      `
      : '';


    /*
     * ルールテキスト
     */

    const ruletextHTML = item.ruletext
      ? `
        <div class="gist-card__ruletext">
          ${formatText(item.ruletext)}
        </div>
      `
      : '';

    
	/*
	 * 裁定情報
     */

    const changeHTML = item.ruling
      ? `
        <div class="gist-card__change">
          <div class="gist-card__stat">裁定情報</div>

          <div class="gist-card__ruling-content">
            ${formatText(item.ruling)}
          </div>
        </div>
      `
      : '';
    
    
    /*
     * 裁定情報
     */

    const rulingHTML = item.ruling
      ? `
        <div class="gist-card__ruling">
          <div class="gist-card__stat">裁定情報</div>

          <div class="gist-card__ruling-content">
            ${formatText(item.ruling)}
          </div>
        </div>
      `
      : '';


    /*
     * 使用素材情報
     */

    const materialHTML = item.material
      ? `
        <div class="gist-card__links">
     使用素材：${materialURL}
        </div>
      `
      : '';


    /*
     * イラストレーター
     */

    const illustratorHTML = item.illustrator
      ? `
        <div class="gist-card__illustrator">
          Illust：${escapeHTML(item.illustrator)}
        </div>
      `
      : '';
    
    
	/*
     * 変身
     */

	let changeButtonHtml = ''; 

	if (item.change) {
  	const safeChangeUrl = escapeHTML(item.change); 
  
  	changeButtonHtml = `
    	<button type="button" class="gist-card-copy" onclick="location.href='${safeChangeUrl}'">
      	変身前／後を表示する
    	</button>
  	`;
	}
    

    return `

      <article
        class="gist-card-container"
        data-card-id="${escapeHTML(item.ID)}"
      >

        <div class="gist-card__inner">

          ${imageHTML}

          <div class="gist-card__content">

            <h2 class="gist-card__name">
              <div class="cardname_main">${escapeHTML(item.名前 || '')}</div>
              <div class="cardname_ruby">${escapeHTML(item.ruby || '')}</div>
            </h2>

		

            ${
              item.description
                ? `
                  <p class="gist-card__description">
                    ${formatText(item.description)}
                  </p>
                `
                : ''
            }
            
            ${illustratorHTML}

            ${typeHTML}
            ${subtypeHTML}
            
            ${
              stats.length
                ? `
                  <div class="gist-card__stats">
                    ${stats.join('')}
                  </div>
                `
                : ''
            }

            ${ruletextHTML}
            ${changeButtonHtml}
            ${rulingHTML}
            ${materialHTML}

          </div>

        </div>

      </article>

    `;

  }


  /* =========================================================
     JSON取得
     ========================================================= */

  async function fetchData() {

    const response = await fetch(
      DATA_URL + '?t=' + Date.now(),
      {
        cache: 'no-store'
      }
    );

    if (!response.ok) {
      throw new Error(
        'データの取得に失敗しました。HTTP status: ' +
        response.status
      );
    }

    return await response.json();

  }


  /* =========================================================
     データ読み込み
     ========================================================= */

  async function loadData(targetId) {

    /*
     * targetId が指定されていれば、
     * そのIDを表示対象として扱います。
     *
     * targetId が指定されていない場合は、
     * ページ上にあるすべてのカードを更新します。
     */

    let containers;

    if (targetId !== undefined && targetId !== null) {

      const container =
        document.querySelector(
          '.gist-card-container[data-card-id]'
        );

      containers = container
        ? [container]
        : [];

    } else {

      containers =
        Array.from(
          document.querySelectorAll(
            '.gist-card-container[data-card-id]'
          )
        );

    }


    if (!containers.length) {
      return false;
    }


    let data;

    try {

      data = await fetchData();

    } catch (error) {

      console.error(
        'Gistデータの取得に失敗しました。',
        error
      );

      /*
       * Gistが取得できなかった場合は、
       * 既に表示されている静的HTMLを残します。
       */

      return false;

    }


    if (!Array.isArray(data)) {

      console.error(
        'GistのJSONデータが配列ではありません。'
      );

      return false;

    }


    let updated = false;


    /*
     * 各カードを更新
     */

    containers.forEach(function (container) {

      /*
       * ID指定で切り替える場合は入力されたID、
       * 通常の初期読み込みではdata-card-idを使用します。
       */

      const currentId =
        targetId !== undefined && targetId !== null
          ? targetId
          : container.dataset.cardId;


      /*
       * JSONから該当IDを検索
       */

      const item = data.find(function (item) {

        return String(item.ID) === String(currentId);

      });


      /*
       * IDが見つからない場合
       *
       * 既存の静的HTMLは消しません。
       */

      if (!item) {

        console.warn(
          '指定されたIDのデータが見つかりません:',
          currentId
        );

        return;

      }


      /*
       * DOM操作でHTML生成（CreateCard）を実行
       *
       * カード全体を最新HTMLへ交換します。
       */

      container.outerHTML =
        createCard(item);

      updated = true;

    });


    return updated;

  }


  /* =========================================================
     IDを指定してカードを切り替える
     ========================================================= */

  async function switchCardById() {

    const input =
      document.getElementById(
        'gistCardIdInput'
      );


    if (!input) {
      return;
    }


    const targetId =
      input.value.trim();


    /*
     * ID未入力
     */

    if (!targetId) {

      alert(
        'カードIDを入力してください。'
      );

      input.focus();

      return;

    }


    /*
     * Gistから指定IDのカードを取得して表示
     */

    const updated =
      await loadData(targetId);


    /*
     * 指定IDが見つからなかった場合
     */

    if (!updated) {

      alert(
        '指定されたIDのカードが見つかりませんでした。'
      );

      input.focus();

    }

  }



  /* =========================================================
     コピー処理
     ========================================================= */

  async function copyText(text) {

    /*
     * Clipboard API
     */

    if (
      navigator.clipboard &&
      window.isSecureContext
    ) {

      await navigator.clipboard.writeText(text);

      return;

    }


    /*
     * Clipboard APIが使えない場合の
     * フォールバック
     */

    const textarea =
      document.createElement('textarea');

    textarea.value = text;

    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    textarea.style.top = '0';
    textarea.style.opacity = '0';

    document.body.appendChild(textarea);

    textarea.focus();
    textarea.select();

    const successful =
      document.execCommand('copy');

    textarea.remove();

    if (!successful) {
      throw new Error(
        'コピーに失敗しました。'
      );
    }

  }


  /* =========================================================
     生成HTML＋CSSをコピー
     ========================================================= */

  async function copyGeneratedContent() {

    /*
     * 現在ページに表示されている
     * gist-card-containerだけを取得
     */

    const cards =
      Array.from(
        document.querySelectorAll(
          '.gist-card-container'
        )
      );


    if (!cards.length) {

      alert(
        'コピーするカードがありません。'
      );

      return;

    }


    /*
     * カードHTML
     */

    const html =
      cards
        .map(function (card) {

          return card.outerHTML.trim();

        })
        .join('\n\n');


    /*
     * CSS取得
     */

    const cssElement =
      document.getElementById(
        'gist-card-css'
      );


    const css =
      cssElement
        ? cssElement.textContent.trim()
        : '';


    /*
     * コピーする内容
     */

    const output = `

<style>
${css}
</style>

${html}

    `.trim();


    try {

      await copyText(output);

      alert(
        'HTML＋CSSをコピーしました。'
      );

    } catch (error) {

      console.error(
        'コピーに失敗しました。',
        error
      );

      alert(
        'コピーに失敗しました。'
      );

    }

  }


  /* =========================================================
     初期化
     ========================================================= */

  function initialize() {

    /*
     * コピーボタン
     */

    const copyButton =
      document.getElementById(
        'gistCardCopyButton'
      );


    if (copyButton) {

      copyButton.addEventListener(
        'click',
        copyGeneratedContent
      );

    }


    /*
     * ID切り替えボタン
     */

    const switchButton =
      document.getElementById(
        'gistCardSwitchButton'
      );


    if (switchButton) {

      switchButton.addEventListener(
        'click',
        switchCardById
      );

    }


    /*
     * ID入力欄
     *
     * Enterキーでも切り替えられるようにします。
     */

    const idInput =
      document.getElementById(
        'gistCardIdInput'
      );


    if (idInput) {

      idInput.addEventListener(
        'keydown',
        function (event) {

          if (event.key === 'Enter') {

            event.preventDefault();

            switchCardById();

          }

        }
      );

    }


    /*
     * JSON読み込み
     */

    loadData();

  }


  /* =========================================================
     初期化を実行・DOM操作を実行（DOMContentLoaded対応）
     ========================================================= */

  if (
    document.readyState === 'loading'
  ) {

    document.addEventListener(
      'DOMContentLoaded',
      initialize
    );

  } else {

    initialize();

  }

})();
