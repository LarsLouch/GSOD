/* ==========================================
GALLERY CAROUSEL - Carrossel Automático
Substitui o grid da galeria por um
carrossel com slideshow automático,
navegação manual e indicadores
========================================== */

export class GalleryCarousel {
  constructor() {
    this.track = document.querySelector('.carousel-track');
    this.slides = document.querySelectorAll('.carousel-slide');
    if (!this.track || this.slides.length === 0) return;

    this.currentIndex = 0;
    this.totalSlides = this.slides.length;
    this.autoPlayInterval = null;
    this.autoPlayDelay = 4000; // 4 segundos entre slides
    this.isTransitioning = false;

    this.dotsContainer = document.querySelector('.carousel-dots');
    this.prevBtn = document.querySelector('.carousel-btn-prev');
    this.nextBtn = document.querySelector('.carousel-btn-next');
    this.counterCurrent = document.querySelector('.carousel-current');
    this.counterTotal = document.querySelector('.carousel-total');

    this.init();
  }

  init() {
    this.createDots();
    this.goToSlide(0, true);
    this.startAutoPlay();

    // Event listeners
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => {
        this.prevSlide();
        this.resetAutoPlay();
      });
    }
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => {
        this.nextSlide();
        this.resetAutoPlay();
      });
    }

    // Teclado
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        this.prevSlide();
        this.resetAutoPlay();
      }
      if (e.key === 'ArrowRight') {
        this.nextSlide();
        this.resetAutoPlay();
      }
    });

    // Pausar autoplay ao passar o mouse
    const carousel = document.querySelector('.carousel');
    if (carousel) {
      carousel.addEventListener('mouseenter', () => this.stopAutoPlay());
      carousel.addEventListener('mouseleave', () => this.startAutoPlay());
    }

    // Touch events para mobile
    let touchStartX = 0;
    let touchEndX = 0;
    if (carousel) {
      carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        this.stopAutoPlay();
      }, { passive: true });

      carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
          if (diff > 0) {
            this.nextSlide();
          } else {
            this.prevSlide();
          }
          this.resetAutoPlay();
        } else {
          this.startAutoPlay();
        }
      }, { passive: true });
    }
  }

  createDots() {
    if (!this.dotsContainer) return;
    this.dotsContainer.innerHTML = '';

    for (let i = 0; i < this.totalSlides; i++) {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot';
      dot.setAttribute('aria-label', `Ir para slide ${i + 1}`);
      dot.addEventListener('click', () => {
        this.goToSlide(i);
        this.resetAutoPlay();
      });
      this.dotsContainer.appendChild(dot);
    }
    this.dots = this.dotsContainer.querySelectorAll('.carousel-dot');
  }

  goToSlide(index, instant = false) {
    if (this.isTransitioning) return;
    if (index < 0) index = this.totalSlides - 1;
    if (index >= this.totalSlides) index = 0;

    this.isTransitioning = true;
    this.currentIndex = index;

    // Mover o track
    const offset = -index * 100;
    this.track.style.transition = instant ? 'none' : 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
    this.track.style.transform = `translateX(${offset}%)`;

    // Atualizar dots
    if (this.dots) {
      this.dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
    }

    // Atualizar contador
    if (this.counterCurrent) {
      this.counterCurrent.textContent = index + 1;
    }
    if (this.counterTotal) {
      this.counterTotal.textContent = this.totalSlides;
    }

    // Atualizar classe active no slide
    this.slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });

    setTimeout(() => {
      this.isTransitioning = false;
    }, instant ? 50 : 650);
  }

  nextSlide() {
    this.goToSlide(this.currentIndex + 1);
  }

  prevSlide() {
    this.goToSlide(this.currentIndex - 1);
  }

  startAutoPlay() {
    if (this.autoPlayInterval) return;
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, this.autoPlayDelay);
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }

  resetAutoPlay() {
    this.stopAutoPlay();
    this.startAutoPlay();
  }

  destroy() {
    this.stopAutoPlay();
  }
}