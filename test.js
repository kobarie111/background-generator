// 背景画像のパスを指定
const images = {
  "bg1.jpg": { src: "img/zoombg_posi_1_integlity.png", caption: "GROWTH VERSE VALUE │ INTEGRITY [White]" },
  "bg2.jpg": { src: "img/zoombg_posi_2_deepdive.png", caption: "GROWTH VERSE VALUE │ DEEP DIVE [White]" },
  "bg3.jpg": { src: "img/zoombg_posi_3_ours.png", caption: "GROWTH VERSE VALUE │ OURS [White]" },
  "bg4.jpg": { src: "img/zoombg_posi_4_wildspeed.png", caption: "GROWTH VERSE VALUE │ OURS [White]" },
  "bg5.jpg": { src: "img/zoombg_posi_5_lastmanship.png", caption: "GROWTH VERSE VALUE │ OURS [White]" },
  "bg6.jpg": { src: "img/zoombg_nega_1_integlity.png", caption: "GROWTH VERSE VALUE │ INTEGRITY [Navy]" },
  "bg7.jpg": { src: "img/zoombg_nega_2_deepdive.png", caption: "GROWTH VERSE VALUE │ DEEP DIVE [Navy]" },
  "bg8.jpg": { src: "img/zoombg_nega_3_ours.png", caption: "GROWTH VERSE VALUE │ OURS [Navy]" },
  "bg9.jpg": { src: "img/zoombg_nega_4_wildspeed.png", caption: "GROWTH VERSE VALUE │ WILD SPEED [Navy]" },
  "bg10.jpg": { src: "img/zoombg_nega_5_lastmanship.png", caption: "GROWTH VERSE VALUE │ LASTMANSHIP [Navy]" },
};

// 要素の取得
const canvas = document.getElementById("previewCanvas");
const ctx = canvas.getContext("2d");
const firstNameInput = document.getElementById("firstNameInput");
const lastNameInput = document.getElementById("lastNameInput");
const fnameAlphabetInput = document.getElementById("fnameAlphabetInput");
const lnameAlphabetInput = document.getElementById("lnameAlphabetInput");
const deptInput = document.getElementById("deptInput");
const titleInput = document.getElementById("titleInput");
const downloadButton = document.getElementById("downloadButton");
const thumbnailContainer = document.getElementById("thumbnailContainer");
const captionElement = document.getElementById("caption"); // キャプション要素

// 現在の背景画像を保持する変数
let currentBackground = "bg1.jpg";

// リアルタイム描画のためのイベントリスナーを追加
[firstNameInput, lastNameInput, fnameAlphabetInput, lnameAlphabetInput, deptInput, titleInput].forEach(input => {
  input.addEventListener('input', drawPreview);
});

// 初期表示: 背景画像をプレビューエリアに描画
window.onload = function () {
        drawPreview();
  };

// プレビュー描画関数
function drawPreview() {
    const imagePath = images[currentBackground].src; // 選択中の画像パスを取得
    const imageCaption = images[currentBackground].caption; // 選択中のキャプションを取得
    const image = new Image();

    // クロスオリジン属性を設定
    image.crossOrigin = "anonymous";
    image.src = imagePath;

    // 背景画像を描画
    image.onload = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // キャンバスをクリア
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        
        // 入力されたテキストを描画
        const firstname = firstNameInput.value;
        const lastname = lastNameInput.value;
        const fnamealphabet = fnameAlphabetInput.value;
        const lnamealphabet = lnameAlphabetInput.value;
        const dept = deptInput.value;
        const title = titleInput.value;

        ctx.font = "600 64px 'Noto Sans JP', sans-serif";
        ctx.fillStyle = "#172051";
        ctx.textAlign = "left";

        const letterSpacing = 6; // 文字間を開けるためのスペース
        const nameGap = 40;       // 苗字と名前の間のスペース

        // 苗字（firstname）
        let xPosition = 80; // 描画開始位置
        for (let i = 0; i < firstname.length; i++) {
            ctx.fillText(firstname[i], xPosition, 140);
            xPosition += ctx.measureText(firstname[i]).width + letterSpacing;
        }
        // 苗字と名前の間のスペースを追加
        xPosition += nameGap;

        // 名前（lastname）
        for (let i = 0; i < lastname.length; i++) {
            ctx.fillText(lastname[i], xPosition , 140);
            xPosition += ctx.measureText(lastname[i]).width + letterSpacing;
        }

         // ヨミガナの設定
         ctx.font = "400 28px 'Inter', sans-serif";

        // 苗字ヨミガナ（fnamealphabet）
        let xPositon2 = 80; // 描画開始位置
        for (let i = 0; i < fnamealphabet.length; i++) {
            ctx.fillText(fnamealphabet[i], xPositon2, 190);
            xPositon2 += ctx.measureText(fnamealphabet[i]).width + letterSpacing;
        }

        xPositon2 += nameGap;

        //名前ヨミガナ（lnamealphabet）
        for (let i = 0; i < lnamealphabet.length; i++) {
          ctx.fillText(lnamealphabet[i], xPositon2 , 190);
          xPositon2 += ctx.measureText(lnamealphabet[i]).width + letterSpacing;
        } 

        ctx.font = "700 32px 'Inter', sans-serif";

        ctx.fillText('株式会社GROWTH VERSE', 80, 250)

        // 所属・役職の設定
        ctx.font = "400 24px 'Noto Sans JP', sans-serif";

        // 部署名
        ctx.fillText(dept, 80, 300);

        // 役職・職種
        ctx.fillText(title, 80, 330);

        // キャプションを更新
        captionElement.textContent = imageCaption;

        /*
        // 苗字
        ctx.fillText(firstname, 80, 140);
        // 名前
        ctx.fillText(lastname, 80 + ctx.measureText(firstname).width + 30, 140);
        */
    };
}

// サムネイルをクリックしたときに背景を切り替える処理
thumbnailContainer.addEventListener("click", (event) => {
    const target = event.target;
    if (target.classList.contains("thumbnail")) {
      // 新しい背景画像に切り替え
      currentBackground = target.getAttribute("data-bg");
      drawPreview();
    }
  });

// ダウンロード機能
downloadButton.addEventListener("click", () => {
    try {
      const link = document.createElement("a"); // <a> タグを作成
      link.download = "zoom-background.png"; // ダウンロード名を指定
      link.href = canvas.toDataURL("image/png"); // データURLを取得して設定
      link.click(); // 自動クリックでダウンロードを実行
    } catch (error) {
      console.error("ダウンロードに失敗しました:", error);
      alert("画像のダウンロードに失敗しました。コンソールをご確認ください。");
    }
  });
  
// イベントリスナーを追加
downloadButton.addEventListener("click", downloadImage);

// 初期描画
drawPreview();