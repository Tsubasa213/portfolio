document.addEventListener('DOMContentLoaded', function() {
  // 現在のURLに基づいてナビゲーションリンクのハイライト処理
  highlightCurrentNavLink();
  
  // ハンバーガーメニューの設定
  setupHamburgerMenu();
  
  // タイムラインのアニメーション設定（Careerページ用）
  setupTimelineAnimations();
  
  // 古いカルーセルをギャラリーに変換
  convertCarouselsToGalleries();
  
  // ギャラリー要素のアニメーション設定
  setupGalleryAnimations();
  
  // プロジェクト要素のアニメーション設定
  setupProjectAnimations();
  
  // モーダル要素の設定
  setupModalElement();
});

// 現在のURLに基づいてナビゲーションリンクをハイライトする関数
function highlightCurrentNavLink() {
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
}

// ハンバーガーメニューの設定
function setupHamburgerMenu() {
  const hamburgerBtn = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  
  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', function(e) {
      e.preventDefault();
      navMenu.classList.toggle('active');
      hamburgerBtn.classList.toggle('active');
    });
    
    const menuItems = document.querySelectorAll('.nav-menu a');
    menuItems.forEach(item => {
      item.addEventListener('click', function() {
        navMenu.classList.remove('active');
        hamburgerBtn.classList.remove('active');
      });
    });
    
    window.addEventListener('resize', function() {
      if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        hamburgerBtn.classList.remove('active');
      }
    });
  }
}

// タイムラインのアニメーション設定
function setupTimelineAnimations() {
  const timelineItems = document.querySelectorAll('.timeline > li');
  
  if (timelineItems.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
            observer.unobserve(entry.target);
          }, index * 200);
        }
      });
    }, {
      threshold: 0.2
    });
    
    timelineItems.forEach(item => {
      item.style.opacity = '0';
      item.style.transform = 'translateX(-30px)';
      item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      
      observer.observe(item);
    });
  }
}

// ギャラリー要素のアニメーション設定
function setupGalleryAnimations() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  if (galleryItems.length > 0) {
    const galleryObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            galleryObserver.unobserve(entry.target);
          }, index * 100);
        }
      });
    }, {
      threshold: 0.2
    });
    
    galleryItems.forEach(item => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(20px)';
      item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      
      galleryObserver.observe(item);
      
      // クリックイベントでモーダル表示
      item.addEventListener('click', function() {
        const imgSrc = this.querySelector('img').src;
        const altText = this.querySelector('img').alt;
        openModal(imgSrc, altText, this.dataset.index);
      });
    });
  }
}

// プロジェクト要素のアニメーション設定
function setupProjectAnimations() {
  const projects = document.querySelectorAll('.project');
  
  if (projects.length > 0) {
    const projectObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          projectObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });
    
    projects.forEach(project => {
      project.style.opacity = '0';
      project.style.transform = 'translateY(30px)';
      project.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
      
      projectObserver.observe(project);
    });
  }
}

// モーダル要素の設定
function setupModalElement() {
  let modal = document.getElementById('imageModal');
  
  if (!modal) {
    // モーダルがない場合は作成
    createModalElement();
    modal = document.getElementById('imageModal');
  }
  
  // モーダルを閉じる機能
  const closeBtn = modal.querySelector('.modal-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }
  
  // 背景クリックでも閉じられるように
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      closeModal();
    }
  });
  
  // キーボードでの操作
  document.addEventListener('keydown', function(e) {
    if (!modal.classList.contains('active')) return;
    
    if (e.key === 'Escape') {
      closeModal();
    } else if (e.key === 'ArrowRight') {
      navigateModal('next');
    } else if (e.key === 'ArrowLeft') {
      navigateModal('prev');
    }
  });
  
  // ナビゲーションボタン
  const prevBtn = modal.querySelector('.modal-prev');
  const nextBtn = modal.querySelector('.modal-next');
  
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', function() {
      navigateModal('prev');
    });
    
    nextBtn.addEventListener('click', function() {
      navigateModal('next');
    });
  }
}

// 古いカルーセルをギャラリーに変換する関数
function convertCarouselsToGalleries() {
  const carousels = document.querySelectorAll('.carousel');
  
  carousels.forEach((carousel, carouselIndex) => {
    const slides = carousel.querySelectorAll('.slide');
    if (slides.length === 0) return;
    
    // 新しいギャラリー要素を作成
    const gallery = document.createElement('div');
    gallery.className = 'gallery';
    
    slides.forEach((slide, index) => {
      const img = slide.querySelector('img');
      if (!img) return;
      
      const galleryItem = document.createElement('div');
      galleryItem.className = 'gallery-item';
      galleryItem.dataset.index = index + (carouselIndex * 100); // ユニークなインデックス
      
      const newImg = document.createElement('img');
      newImg.src = img.src;
      newImg.alt = img.alt;
      
      const caption = document.createElement('div');
      caption.className = 'gallery-caption';
      caption.textContent = img.alt;
      
      galleryItem.appendChild(newImg);
      galleryItem.appendChild(caption);
      gallery.appendChild(galleryItem);
    });
    
    // 古いカルーセルを新しいギャラリーに置き換え
    carousel.parentNode.replaceChild(gallery, carousel);
  });
}

// モーダル要素を作成する関数
function createModalElement() {
  const modalHTML = `
    <div id="imageModal" class="modal">
      <span class="modal-close">&times;</span>
      <img class="modal-content" id="modalImage">
      <div class="modal-caption" id="modalCaption"></div>
      <div class="modal-nav">
        <button class="modal-prev">&lt;</button>
        <button class="modal-next">&gt;</button>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// モーダルを開く関数
function openModal(imgSrc, altText, currentIndex) {
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  const caption = document.getElementById('modalCaption');
  
  if (modal && modalImg) {
    modalImg.src = imgSrc;
    modalImg.dataset.index = currentIndex;
    
    if (caption && altText) {
      caption.textContent = altText;
    }
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // スクロール防止
  }
}

// モーダルを閉じる関数
function closeModal() {
  const modal = document.getElementById('imageModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto'; // スクロール復活
  }
}

// モーダル内の画像切り替え関数
function navigateModal(direction) {
  const modalImg = document.getElementById('modalImage');
  const caption = document.getElementById('modalCaption');
  if (!modalImg) return;
  
  const currentIndex = parseInt(modalImg.dataset.index);
  const galleryItems = document.querySelectorAll('.gallery-item');
  const totalItems = galleryItems.length;
  
  if (totalItems === 0) return;
  
  let newIndex;
  if (direction === 'next') {
    newIndex = (currentIndex + 1) % totalItems;
  } else {
    newIndex = (currentIndex - 1 + totalItems) % totalItems;
  }
  
  const newItem = galleryItems[newIndex];
  const newImgSrc = newItem.querySelector('img').src;
  const newAltText = newItem.querySelector('img').alt;
  
  modalImg.src = newImgSrc;
  modalImg.dataset.index = newIndex;
  
  if (caption) {
    caption.textContent = newAltText;
  }
}