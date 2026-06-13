/* ==========================================
   TYPING EFFECT - Frases com digitação animada
   ========================================== */

export class TypingEffect {
    constructor() {
        this.element = document.getElementById('typing-text');
        if (!this.element) return;
        
        this.phrases = [
            'Uma aventura épica de sobrevivência',
            'Reconstrua a civilização brasileira',
            'Sobreviva. Explore. Conquiste.',
            'O Brasil pós-apocalíptico espera por você',
            'Estratégia, coragem e determinação'
        ];
        this.currentPhrase = 0;
        this.currentChar = 0;
        this.isDeleting = false;
        this.isWaiting = false;
        
        this.type();
    }

    type() {
        const fullText = this.phrases[this.currentPhrase];
        
        if (this.isDeleting) {
            this.currentChar--;
        } else {
            this.currentChar++;
        }
        
        this.element.textContent = fullText.substring(0, this.currentChar);
        
        if (!this.isDeleting && this.currentChar === fullText.length) {
            this.isWaiting = true;
            setTimeout(() => {
                this.isDeleting = true;
                this.isWaiting = false;
                this.type();
            }, 2000);
            return;
        }
        
        if (this.isDeleting && this.currentChar === 0) {
            this.isDeleting = false;
            this.currentPhrase = (this.currentPhrase + 1) % this.phrases.length;
            setTimeout(() => this.type(), 500);
            return;
        }
        
        const speed = this.isDeleting ? 40 : 80;
        setTimeout(() => this.type(), speed);
    }
}