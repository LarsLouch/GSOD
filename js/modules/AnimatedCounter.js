/* ==========================================
   ANIMATED COUNTER - Contagem animada dos stats
   ========================================== */

export class AnimatedCounter {
    constructor() {
        this.counters = document.querySelectorAll('.stat-number');
        if (this.counters.length === 0) return;
        
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        this.counters.forEach(counter => observer.observe(counter));
    }

    animateCounter(element) {
        const target = parseInt(element.dataset.target);
        const duration = 2000;
        const step = Math.max(Math.floor(target / 60), 1);
        let current = 0;
        
        const update = () => {
            current += step;
            if (current >= target) {
                element.textContent = target.toLocaleString('pt-BR');
                return;
            }
            
            if (target >= 1000) {
                element.textContent = current.toLocaleString('pt-BR');
            } else {
                element.textContent = current;
            }
            
            setTimeout(update, duration / (target / step));
        };
        
        update();
    }
}