/* ===========================================
CardTilt3D - Efeito de inclinação 3D nos cards
Segue o mouse criando perspectiva cinematográfica
========================================== */

'use strict';

export class CardTilt3D {
  constructor() {
    this.cards = document.querySelectorAll('.about-card, .feature, .stat-item, .game-cover');
    this.init();
  }

  init() {
    if (window.innerWidth < 768) return;

    this.cards.forEach(card => {
      card.classList.add('card-tilt');

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;

        requestAnimationFrame(() => {
          card.style.transform = `
            perspective(800px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            scale3d(1.02, 1.02, 1.02)
          `;

          // Efeito de brilho que acompanha o mouse no card
          const glareX = (x / rect.width) * 100;
          const glareY = (y / rect.height) * 100;
          card.style.setProperty('--glare-x', `${glareX}%`);
          card.style.setProperty('--glare-y', `${glareY}%`);
        });
      });

      card.addEventListener('mouseleave', () => {
        requestAnimationFrame(() => {
          card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
      });
    });
  }
}