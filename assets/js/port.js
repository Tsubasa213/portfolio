// 現在のページをハイライト
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
  const timelines = document.querySelectorAll('.timeline li');
  
  if (timelines.length > 0) {
    // Intersection Observerを使用して、要素が画面に表示されたらアニメーションを開始
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const borderLine = entry.target.querySelector('.border-line');
          borderLine.style.height = '100%';
          borderLine.style.transition = 'height 2s ease';
          observer.unobserve(entry.target);
        }
      });
    });
    
    timelines.forEach(timeline => {
      observer.observe(timeline);
    });
  }
  
  // カルーセルの自動切り替え（設定したい場合）
  const carousels = document.querySelectorAll('.carousel');
  if (carousels.length > 0) {
    // カルーセルの自動切り替えのコードがここに入ります
  }
  
  
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