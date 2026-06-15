/* ==========================================
CONTACT FORM - Formulário de contato
========================================== */

export class ContactForm {
  constructor() {
    this.form = document.querySelector('.contact-form');
    if (!this.form) return;

    this.init();
  }

  init() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = this.form.querySelector('input[type="text"]').value;
      const email = this.form.querySelector('input[type="email"]').value;
      const message = this.form.querySelector('textarea').value;

      console.log('Formulário enviado:', { name, email, message });

      const btn = this.form.querySelector('button');
      const originalText = btn.textContent;
      btn.textContent = '✓ Mensagem Enviada!';
      btn.style.background = 'linear-gradient(135deg, #00d4ff, #00a8cc)';

      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        this.form.reset();
      }, 3000);
    });

    this.form.querySelectorAll('input, textarea').forEach(field => {
      field.addEventListener('focus', function() {
        this.parentElement?.classList.add('focused');
      });
      field.addEventListener('blur', function() {
        if (!this.value) {
          this.parentElement?.classList.remove('focused');
        }
      });
    });
  }
}