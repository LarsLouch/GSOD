/* ==========================================
PARTICLE SYSTEM - Background Particles
Versão otimizada para performance
========================================== */

export class ParticleSystem {
  constructor() {
    this.canvas = document.getElementById('particles-canvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.mouse = { x: null, y: null, radius: 150 };
    this.colors = ['#e94560', '#00d4ff', '#ffd700', '#ff6b81', '#66e3ff'];
    this.animationId = null;
    this.isVisible = true;

    this.init();
    this.animate();
    this.bindEvents();
  }

  init() {
    this.resize();
    this.createParticles();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createParticles() {
    // Reduzir partículas para melhor performance
    const count = Math.min(Math.floor(window.innerWidth * 0.04), 40);
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 2.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        color: this.colors[Math.floor(Math.random() * this.colors.length)],
        opacity: Math.random() * 0.3 + 0.05,
        life: Math.random() * 100 + 50,
        maxLife: Math.random() * 100 + 50,
        pulse: Math.random() * Math.PI * 2,
      });
    }
  }

  animate() {
    if (!this.isVisible) {
      this.animationId = requestAnimationFrame(() => this.animate());
      return;
    }

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (const p of this.particles) {
      p.x += p.speedX;
      p.y += p.speedY;

      p.pulse += 0.03;
      const pulseSize = p.size + Math.sin(p.pulse) * 0.3;

      // Mouse interaction (simplified)
      if (this.mouse.x !== null) {
        const dx = p.x - this.mouse.x;
        const dy = p.y - this.mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < this.mouse.radius && dist > 0) {
          const force = (this.mouse.radius - dist) / this.mouse.radius;
          p.x += (dx / dist) * force * 1.5;
          p.y += (dy / dist) * force * 1.5;
        }
      }

      // Life cycle
      p.life--;
      if (p.life <= 0) {
        p.life = p.maxLife;
        p.x = Math.random() * this.canvas.width;
        p.y = Math.random() * this.canvas.height;
      }

      // Wrap edges
      if (p.x < 0) p.x = this.canvas.width;
      if (p.x > this.canvas.width) p.x = 0;
      if (p.y < 0) p.y = this.canvas.height;
      if (p.y > this.canvas.height) p.y = 0;

      // Draw particle (single pass - removed glow for performance)
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, pulseSize, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color;
      this.ctx.globalAlpha = p.opacity;
      this.ctx.fill();
      this.ctx.globalAlpha = 1;
    }

    // Removido connectParticles() - era O(n²) e consumia muita CPU
    this.animationId = requestAnimationFrame(() => this.animate());
  }

  bindEvents() {
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => this.resize(), 200);
    });

    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });

    // Pausar animação quando a página não está visível
    document.addEventListener('visibilitychange', () => {
      this.isVisible = !document.hidden;
    });
  }
}