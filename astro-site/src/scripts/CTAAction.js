/* ==========================================
CTA ACTION - Ação do botão "Jogar Agora"
========================================== */

export class CTAAction {
  constructor() {
    this.btn = document.querySelector('.cta-button');
    if (!this.btn) return;

    this.btn.addEventListener('click', () => {
      this.btn.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.btn.style.transform = '';
      }, 200);

      this.showOverlay();
    });
  }

  showOverlay() {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      backdrop-filter: blur(10px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      opacity: 0;
      transition: opacity 0.3s;
    `;

    const msg = document.createElement('div');
    msg.style.cssText = `
      text-align: center;
      color: white;
      padding: 3rem;
      border-radius: 20px;
      background: linear-gradient(135deg, rgba(233, 69, 96, 0.2), rgba(0, 212, 255, 0.2));
      border: 1px solid rgba(233, 69, 96, 0.3);
      max-width: 500px;
      transform: scale(0.8);
      transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    `;

    msg.innerHTML = `
      <h2 style="color: #e94560; margin-bottom: 1rem; font-size: 2rem;">🚀 Em Breve!</h2>
      <p style="color: #b0b0c8; font-size: 1.1rem; line-height: 1.8;">
        O jogo <strong style="color: #fff;">O Último Brasileiro</strong> ainda está em desenvolvimento.<br>
        Fique ligado para novidades!
      </p>
      <button style="
        margin-top: 2rem;
        padding: 0.8rem 2rem;
        background: #e94560;
        color: white;
        border: none;
        border-radius: 50px;
        font-size: 1rem;
        cursor: pointer;
        transition: all 0.3s;
      " onmouseover="this.style.background='#c23152'" onmouseout="this.style.background='#e94560'">Fechar</button>
    `;

    overlay.appendChild(msg);
    document.body.appendChild(overlay);

    requestAnimationFrame(() => {
      overlay.style.opacity = '1';
      msg.style.transform = 'scale(1)';
    });

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay || e.target.tagName === 'BUTTON') {
        overlay.style.opacity = '0';
        msg.style.transform = 'scale(0.8)';
        setTimeout(() => document.body.removeChild(overlay), 300);
      }
    });
  }
}