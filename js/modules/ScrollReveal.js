/* ==========================================
   SCROLL REVEAL - Animação ao scroll (Intersection Observer)
   ========================================== */

export class ScrollReveal {
    constructor() {
        this.revealElements = document.querySelectorAll('.reveal');
        if (this.revealElements.length === 0) return;
        
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.dataset.delay || 0;
                    setTimeout(() => {
                        entry.target.classList.add('active');
                    }, delay);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        this.revealElements.forEach((el, index) => {
            el.dataset.delay = (index % 4) * 100;
            observer.observe(el);
        });
    }
}