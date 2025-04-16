// 既存のDOMContentLoadedイベントリスナーの中に追加します
document.addEventListener('DOMContentLoaded', function() {
  const currentLocation = window.location.pathname;
  const navLinks = document.querySelectorAll('.main-nav a');
  
  navLinks.forEach(link => {
    const linkPath = new URL(link.href).pathname;
    // パスの一部が一致するか確認（サブフォルダも含む）
    if (currentLocation.includes(linkPath) && linkPath !== '/index.html') {
      link.classList.add('active');
    } else if (currentLocation === '/' && linkPath === '/index.html') {
      link.classList.add('active');
    }
  });
  
  // タイムラインのアニメーション（Careerページ用）
  const timelineItems = document.querySelectorAll('.timeline > li');
  
  if (timelineItems.length > 0) {
    // 初期状態ですべての要素を非表示にする
    timelineItems.forEach(item => {
      item.style.opacity = '0';
      item.style.transform = 'translateX(-30px)';
      item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Intersection Observerを使用して、要素が画面に表示されたらアニメーションを開始
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // 遅延を設定して順番に表示させる
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
            
            // オプション: マーカーと線のアニメーション
            const marker = entry.target.querySelector(':after');
            const line = entry.target.querySelector(':before');
            if (marker) marker.style.animation = 'pulse 2s infinite';
            
            observer.unobserve(entry.target);
          }, index * 200); // 各要素に200msの遅延を追加
        }
      });
    }, {
      threshold: 0.2 // 要素の20%が見えたらアニメーション開始
    });
    
    timelineItems.forEach(item => {
      observer.observe(item);
    });
  }
  
  // タイムラインの日付が点滅するエフェクト
  const timelineDates = document.querySelectorAll('.timeline-date');
  timelineDates.forEach(date => {
    date.addEventListener('mouseenter', function() {
      this.style.textShadow = '0 0 10px #96fff8, 0 0 20px #96fff8';
      this.style.transition = 'text-shadow 0.3s ease';
    });
    
    date.addEventListener('mouseleave', function() {
      this.style.textShadow = 'none';
    });
  });
  
  // タイムラインコンテンツのホバーエフェクト強化
  const timelineContents = document.querySelectorAll('.timeline-content');
  timelineContents.forEach(content => {
    content.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px)';
      this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.4)';
      this.style.borderLeft = '4px solid #fff';
    });
    
    content.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(-5px)';
      this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.3)';
      this.style.borderLeft = '4px solid #96fff8';
    });
  });

  // ハンバーガーメニューの機能
  console.log("ハンバーガーメニューの初期化"); // デバッグ用
  const hamburgerBtn = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  
  console.log("ハンバーガーボタン:", hamburgerBtn); // デバッグ用
  console.log("ナビメニュー:", navMenu); // デバッグ用
  
  if (hamburgerBtn && navMenu) {
    // ハンバーガーボタンのクリックイベント
    hamburgerBtn.addEventListener('click', function(e) {
      console.log("ハンバーガーボタンがクリックされました"); // デバッグ用
      e.preventDefault(); // イベントのデフォルト動作を防止
      navMenu.classList.toggle('active');
      hamburgerBtn.classList.toggle('active');
    });
    
    // メニュー項目をクリックしたらメニューを閉じる
    const menuItems = document.querySelectorAll('.nav-menu a');
    menuItems.forEach(item => {
      item.addEventListener('click', function() {
        navMenu.classList.remove('active');
        hamburgerBtn.classList.remove('active');
      });
    });
    
    // ウィンドウサイズ変更時にメニューの状態をリセット
    window.addEventListener('resize', function() {
      if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        hamburgerBtn.classList.remove('active');
      }
    });
  } else {
    console.error("ハンバーガーメニューの要素が見つかりません"); // デバッグ用
  }
});

// タイムラインのドットがキラキラ光るアニメーション用のCSSを追加
const style = document.createElement('style');
style.textContent = `
  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(150, 255, 248, 0.7);
    }
    70% {
      box-shadow: 0 0 0 10px rgba(150, 255, 248, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(150, 255, 248, 0);
    }
  }
  
  .timeline > li:after {
    animation: pulse 2s infinite;
  }
`;
document.head.appendChild(style);