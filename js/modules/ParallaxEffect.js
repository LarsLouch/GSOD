/* ==========================================
   PARALLAX EFFECT - Efeito parallax no hero
   ========================================== */

export class ParallaxEffect {
    constructor() {
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            
            if (hero) {
                const heroBg = hero.querySelector('.hero-bg');
                const heroContent = hero.querySelector('.hero-content');
                
                if (heroBg && scrolled < hero.offsetHeight) {
                    heroBg.style.transform = `translateY(${scrolled * 0.3}px) scale(1.1)`;
                }
                
                if (heroContent && scrolled < hero.offsetHeight * 0.8) {
                    heroContent.style.opacity = 1 - (scrolled / (hero.offsetHeight * 0.8));
                    heroContent.style.transform = `translateY(${scrolled * 0.15}px)`;
                }
            }
        }, { passive: true });
    }
}