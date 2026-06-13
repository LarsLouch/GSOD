/* ==========================================
   HERO PARTICLES - Partículas flutuantes no hero
   Versão otimizada (menos partículas)
   ========================================== */

export class HeroParticles {
    constructor() {
        this.container = document.getElementById('hero-particles');
        if (!this.container) return;
        
        this.colors = ['#e94560', '#00d4ff', '#ffd700', '#ff6b81'];
        this.createParticles();
    }

    createParticles() {
        // Reduzido de 30 para 15 partículas
        const count = 15;
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            const size = Math.random() * 4 + 2;
            const color = this.colors[Math.floor(Math.random() * this.colors.length)];
            const duration = Math.random() * 12 + 10;
            const delay = Math.random() * 15;
            const left = Math.random() * 100;
            
            particle.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${left}%;
                background: ${color};
                box-shadow: 0 0 ${size * 1.5}px ${color};
                animation-duration: ${duration}s;
                animation-delay: ${delay}s;
            `;
            
            this.container.appendChild(particle);
        }
    }
}