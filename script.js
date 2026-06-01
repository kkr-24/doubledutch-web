/* ====================================
   ダブルダッチ紹介サイト - JavaScript
   ==================================== */

/* ========== ページ読み込み時の初期化 ========== */
document.addEventListener('DOMContentLoaded', function() {
    console.log('ページ読み込み完了！');
    
    // LocalStorageからカウント数を取得して表示
    updateCounterDisplay();
    
    // スムーススクロール機能を初期化
    setupSmoothScroll();
});

/* ========== スムーススクロール機能 ========== */
function setupSmoothScroll() {
    // ナビゲーションリンクのクリック時にスムーススクロール
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // クリックされたリンクのhref属性を取得
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            // スムーススクロール
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/* ========== 「詳しく見る」ボタン機能 ========== */
const scrollBtn = document.getElementById('scrollBtn');
if (scrollBtn) {
    scrollBtn.addEventListener('click', function() {
        // 特徴セクションへスムーススクロール
        const featuresSection = document.getElementById('features');
        if (featuresSection) {
            featuresSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}

/* ========== 「ダブルダッチ好きです」ボタン機能 ========== */
const likeBtn = document.getElementById('likeBtn');
if (likeBtn) {
    likeBtn.addEventListener('click', function() {
        // クリック時にボタンをアニメーション
        this.style.transform = 'scale(0.95)';
        
        // アニメーション後に戻す
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 100);
        
        // LocalStorageから現在のいいね数を取得
        let likeCount = localStorage.getItem('likeCount');
        likeCount = likeCount ? parseInt(likeCount) + 1 : 1;
        
        // LocalStorageに保存
        localStorage.setItem('likeCount', likeCount);
        
        // 表示を更新
        updateCounterDisplay();
        
        // フィードバックメッセージを表示
        showFeedback('ありがとう！❤️');
    });
}

/* ========== 「やってみたい」ボタン機能 ========== */
const tryBtn = document.getElementById('tryBtn');
if (tryBtn) {
    tryBtn.addEventListener('click', function() {
        // クリック時にボタンをアニメーション
        this.style.transform = 'scale(0.95)';
        
        // アニメーション後に戻す
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 100);
        
        // LocalStorageから現在の「やってみたい」数を取得
        let tryCount = localStorage.getItem('tryCount');
        tryCount = tryCount ? parseInt(tryCount) + 1 : 1;
        
        // LocalStorageに保存
        localStorage.setItem('tryCount', tryCount);
        
        // 表示を更新
        updateCounterDisplay();
        
        // フィードバックメッセージを表示
        showFeedback('一緒に始めよう！🎯');
    });
}

/* ========== カウンター表示の更新 ========== */
function updateCounterDisplay() {
    // LocalStorageからカウント数を取得
    const likeCount = localStorage.getItem('likeCount') || '0';
    const tryCount = localStorage.getItem('tryCount') || '0';
    
    // HTMLに反映
    const likeCountElement = document.getElementById('likeCount');
    const tryCountElement = document.getElementById('tryCount');
    
    if (likeCountElement) {
        likeCountElement.textContent = `いいね: ${likeCount}`;
    }
    
    if (tryCountElement) {
        tryCountElement.textContent = `やってみたい: ${tryCount}`;
    }
}

/* ========== フィードバックメッセージ表示 ========== */
function showFeedback(message) {
    // メッセージ用のdiv要素を作成
    const feedback = document.createElement('div');
    feedback.textContent = message;
    
    // スタイルを設定（インラインCSS）
    feedback.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        font-size: 1.2rem;
        z-index: 1000;
        animation: fadeInOut 2s ease-in-out;
    `;
    
    // ボディに追加
    document.body.appendChild(feedback);
    
    // 2秒後に削除
    setTimeout(() => {
        feedback.remove();
    }, 2000);
}

/* ========== フェードインアウトアニメーション（JavaScriptで動的追加） ========== */
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInOut {
        0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
        }
        50% {
            opacity: 1;
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
        }
    }
`;
document.head.appendChild(style);

/* ========== スクロール時のアニメーション ========== */
const observerOptions = {
    threshold: 0.1,      // 要素の10%がビューポートに入ったときに発火
    rootMargin: '0px 0px -50px 0px'  // 下から50pxの位置で発火
};

// IntersectionObserverコールバック
const observerCallback = (entries) => {
    entries.forEach(entry => {
        // 要素がビューポートに入ったら
        if (entry.isIntersecting) {
            // アニメーション用のクラスを追加
            entry.target.classList.add('fade-in');
        }
    });
};

// IntersectionObserverを作成
const observer = new IntersectionObserver(observerCallback, observerOptions);

// すべてのカード要素に観察を設定
const cardElements = document.querySelectorAll(
    '.feature-card, .image-card'
);

cardElements.forEach(card => {
    observer.observe(card);
});

/* ========== 追加のCSSアニメーション定義 ========== */
const fadeInStyle = document.createElement('style');
fadeInStyle.textContent = `
    .feature-card,
    .image-card {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .feature-card.fade-in,
    .image-card.fade-in {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(fadeInStyle);

/* ========== スクロール位置に応じたナビゲーション効果 ========== */
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    
    // スクロール位置が100pxを超えたらシャドウを追加
    if (window.scrollY > 100) {
        navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

console.log('JavaScriptが正常に読み込まれました！ダブルダッチの魅力を楽しんでください！');