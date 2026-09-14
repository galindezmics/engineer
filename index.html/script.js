(function () {
  const root = document.documentElement;
  const switchBtn = document.getElementById('themeSwitch');
  const stateLabel = document.getElementById('themeState');

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    switchBtn.setAttribute('aria-pressed', theme === 'dark');
    stateLabel.textContent = theme === 'dark' ? 'Dark' : 'Light';
  }

  const saved = localStorage.getItem('mg-theme');
  if (saved) {
    applyTheme(saved);
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    applyTheme('dark');
  }

  switchBtn.addEventListener('click', function () {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('mg-theme', next);
  });
})();

document.addEventListener('DOMContentLoaded', function() {
  
  // --- 1. CAROUSEL LOGIC ---
  const track = document.getElementById('cert-track');
  const prevBtn = document.getElementById('cert-prev');
  const nextBtn = document.getElementById('cert-next');

  function isMobile() {
    return window.innerWidth <= 768;
  }

  if (nextBtn && prevBtn && track) {
    nextBtn.addEventListener('click', () => {
      if (isMobile()) {
        const tileWidth = track.querySelector('.cert-tile').offsetWidth;
        track.scrollBy({ left: tileWidth + 16, behavior: 'smooth' });
      } else {
        track.scrollBy({ left: 340, behavior: 'smooth' });
      }
    });

    prevBtn.addEventListener('click', () => {
      if (isMobile()) {
        const tileWidth = track.querySelector('.cert-tile').offsetWidth;
        track.scrollBy({ left: -(tileWidth + 16), behavior: 'smooth' });
      } else {
        track.scrollBy({ left: -340, behavior: 'smooth' });
      }
    });
  }

  // --- 2. MODAL LOGIC ---
  const modal = document.getElementById('cert-modal');
  const modalImg = document.getElementById('cert-modal-img');
  const modalCaption = document.getElementById('cert-modal-caption');
  const closeBtn = document.querySelector('.cert-modal-close');
  const certLinks = Array.from(document.querySelectorAll('.cert-link')); 
  let currentIndex = 0;

  function openModal(index) {
    currentIndex = index;
    const link = certLinks[currentIndex];
    modal.style.display = 'flex';
    modalImg.src = link.href;
    modalCaption.textContent = link.getAttribute('data-caption') || '';
  }

  certLinks.forEach((link, index) => {
    link.addEventListener('click', function(e) {
      e.preventDefault(); 
      openModal(index);
    });
  });

  // --- 3. MODAL PREV & NEXT ---
  const modalPrev = document.getElementById('modal-prev');
  const modalNext = document.getElementById('modal-next');

  modalNext.addEventListener('click', function() {
    if (currentIndex < certLinks.length - 1) {
      openModal(currentIndex + 1);
    } else {
      openModal(0); 
    }
  });

  modalPrev.addEventListener('click', function() {
    if (currentIndex > 0) {
      openModal(currentIndex - 1);
    } else {
      openModal(certLinks.length - 1);
    }
  });

  // --- 4. CLOSE MODAL ---
  closeBtn.addEventListener('click', function() {
    modal.style.display = 'none';
  });

  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

  document.addEventListener('keydown', function(e) {
    if (modal.style.display === 'flex') {
      if (e.key === 'Escape') {
        modal.style.display = 'none';
      } else if (e.key === 'ArrowRight') {
        modalNext.click();
      } else if (e.key === 'ArrowLeft') {
        modalPrev.click();
      }
    }
  });

  // --- 5. MOBILE MENU TOGGLE ---
  const menuToggle = document.getElementById('menuToggle');
  const siteNav = document.getElementById('siteNav');

  if (menuToggle && siteNav) {
    menuToggle.addEventListener('click', function() {
      menuToggle.classList.toggle('active');
      siteNav.classList.toggle('active');
    });

    siteNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        siteNav.classList.remove('active');
      });
    });
  }

});