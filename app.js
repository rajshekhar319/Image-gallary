document.addEventListener('DOMContentLoaded', () => {
    const galleryImages = [...document.querySelectorAll('.gallery img')];
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const btnClose = document.getElementById('lb-close');
    const btnPrev = document.getElementById('lb-prev');
    const btnNext = document.getElementById('lb-next');
    const info = document.getElementById('lb-info');
    const filterButtons = [...document.querySelectorAll('.filters button')];
  
    let visibleImages = [...galleryImages];
    let currentIndex = 0;
  
    function updateInfo() {
      if (visibleImages.length) {
        info.textContent = `Image ${currentIndex + 1} of ${visibleImages.length}`;
      } else {
        info.textContent = '';
      }
    }
  
    function openLightbox(index) {
      currentIndex = index;
      lightboxImg.src = visibleImages[currentIndex].src;
      lightbox.style.display = 'flex';
      updateInfo();
      toggleArrows();
    }
  
    function closeLightbox() {
      lightbox.style.display = 'none';
      lightboxImg.src = '';
    }
  
    function changeImage(dir) {
      currentIndex = (currentIndex + dir + visibleImages.length) % visibleImages.length;
      lightboxImg.src = visibleImages[currentIndex].src;
      updateInfo();
      toggleArrows();
    }
  
    function toggleArrows() {
      btnPrev.style.display = btnNext.style.display = visibleImages.length > 1 ? 'block' : 'none';
    }
  
    galleryImages.forEach((img, idx) => {
      img.addEventListener('click', () => {
        const vIdx = visibleImages.indexOf(img);
        if (vIdx !== -1) openLightbox(vIdx);
      });
    });
  
    btnClose.addEventListener('click', closeLightbox);
    btnPrev.addEventListener('click', () => changeImage(-1));
    btnNext.addEventListener('click', () => changeImage(1));
    document.addEventListener('keydown', e => {
      if (lightbox.style.display === 'flex') {
        if (e.key === 'ArrowLeft') changeImage(-1);
        if (e.key === 'ArrowRight') changeImage(1);
        if (e.key === 'Escape') closeLightbox();
      }
    });
  
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.getAttribute('data-cat');
        visibleImages = [];
        galleryImages.forEach(img => {
          if (cat === 'all' || img.classList.contains(cat)) {
            img.style.display = '';
            visibleImages.push(img);
          } else {
            img.style.display = 'none';
          }
        });
        closeLightbox();
        updateInfo();
      });
    });
  
    filterButtons[0].click();
  });