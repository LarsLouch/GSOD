/* ===========================================
   MouseGlow - Efeito de brilho que segue o mouse
   Cria um halo luminoso que se move com o cursor
   =========================================== */

'use strict';

export class MouseGlow {
    constructor() {
        this.glow = null;
        this.init();
    }

    init() {
        this.glow = document.createElement('div');
        this.glow.className = 'mouse-glow';
        document.body.appendChild(this.glow);

        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
        this.onMouseEnter = this.onMouseEnter.bind(this);

        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseleave', this.onMouseLeave);
        document.addEventListener('mouseenter', this.onMouseEnter);
    }

    onMouseMove(e) {
        requestAnimationFrame(() => {
            this.glow.style.left = e.clientX + 'px';
            this.glow.style.top = e.clientY + 'px';
        });
    }

    onMouseLeave() {
        this.glow.style.opacity = '0';
    }

    onMouseEnter() {
        this.glow.style.opacity = '1';
    }
}