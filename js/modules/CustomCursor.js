/* ==========================================
   CUSTOM CURSOR - Efeito de cursor neon
   ========================================== */

export class CustomCursor {
    constructor() {
        this.dot = document.querySelector('.cursor-dot');
        this.ring = document.querySelector('.cursor-ring');
        if (!this.dot || !this.ring) return;
        
        this.pos = { x: 0, y: 0 };
        this.target = { x: 0, y: 0 };
        this.dotSize = 8;
        this.ringSize = 40;
        
        this.bindEvents();
        this.animate();
    }

    bindEvents() {
        document.addEventListener('mousemove', (e) => {
            this.target.x = e.clientX;
            this.target.y = e.clientY;
        });

        const interactiveElements = document.querySelectorAll(
            'a, button, .cta-button, .gallery-item, .about-card, .feature, .game-cover, input, textarea, .stat-item'
        );
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.ring.classList.add('hover');
                this.dotSize = 4;
            });
            el.addEventListener('mouseleave', () => {
                this.ring.classList.remove('hover');
                this.dotSize = 8;
            });
        });
    }

    animate() {
        this.pos.x += (this.target.x - this.pos.x) * 0.15;
        this.pos.y += (this.target.y - this.pos.y) * 0.15;
        
        this.dot.style.left = `${this.target.x}px`;
        this.dot.style.top = `${this.target.y}px`;
        this.dot.style.width = `${this.dotSize}px`;
        this.dot.style.height = `${this.dotSize}px`;
        
        this.ring.style.left = `${this.pos.x}px`;
        this.ring.style.top = `${this.pos.y}px`;
        
        requestAnimationFrame(() => this.animate());
    }
}