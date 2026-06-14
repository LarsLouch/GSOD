/* ==========================================
   GALLERY LIGHTBOX CINEMÁTICO
   Expansão com efeitos imersivos de outro mundo:
   - Partículas ao expandir/recolher
   - Brilho neon pulsante na borda
   - Efeito warp/portal ao abrir
   - Legenda animada com o alt da imagem
   - Controles de navegação (anterior/próxima)
   ========================================== */

export class GalleryLightbox {
    constructor() {
        this.items = document.querySelectorAll('.gallery-item');
        if (this.items.length === 0) return;
        
        this.expandedItem = null;
        this.overlay = null;
        this.caption = null;
        this.navPrev = null;
        this.navNext = null;
        this.currentIndex = -1;
        
        this.init();
    }

    init() {
        this.items.forEach((item, index) => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.currentIndex = index;
                this.toggleExpand(item);
            });
        });

        // Fechar com ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.expandedItem) {
                this.collapse();
            }
            // Navegação com setas
            if (this.expandedItem) {
                if (e.key === 'ArrowRight') this.nextImage();
                if (e.key === 'ArrowLeft') this.prevImage();
            }
        });
    }

    toggleExpand(item) {
        if (this.expandedItem === item) {
            this.collapse();
        } else {
            this.expand(item);
        }
    }

    expand(item) {
        // Fechar expansão anterior se houver
        if (this.expandedItem) {
            this.collapse();
        }

        // Criar overlay escuro c/ efeito cinematográfico
        this.overlay = document.createElement('div');
        this.overlay.className = 'gallery-overlay';
        this.overlay.addEventListener('click', (e) => {
            // Só fecha se clicar no overlay, não nos controles
            if (e.target === this.overlay) this.collapse();
        });
        document.body.appendChild(this.overlay);

        // Criar legenda
        this.caption = document.createElement('div');
        this.caption.className = 'gallery-caption';
        this.caption.textContent = item.getAttribute('alt') || '';
        document.body.appendChild(this.caption);

        // Criar controles de navegação
        this.createNavControls();

        // Animar overlay com delay
        requestAnimationFrame(() => {
            this.overlay.classList.add('active');
            // Mostrar legenda e navegação junto com a expansão
            setTimeout(() => {
                if (this.caption) this.caption.classList.add('active');
                if (this.navPrev) this.navPrev.classList.add('active');
                if (this.navNext) this.navNext.classList.add('active');
            }, 200);
        });

        // Expandir imagem
        item.classList.add('expanded');
        this.expandedItem = item;
        document.body.classList.add('scroll-lock');

        // Efeito de partículas ao expandir (via classe CSS)
        this.spawnParticles(item, 12);
    }

    createNavControls() {
        // Botão anterior
        this.navPrev = document.createElement('button');
        this.navPrev.className = 'gallery-nav gallery-nav-prev';
        this.navPrev.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
        `;
        this.navPrev.setAttribute('aria-label', 'Imagem anterior');
        this.navPrev.addEventListener('click', (e) => {
            e.stopPropagation();
            this.prevImage();
        });
        document.body.appendChild(this.navPrev);

        // Botão próximo
        this.navNext = document.createElement('button');
        this.navNext.className = 'gallery-nav gallery-nav-next';
        this.navNext.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
        `;
        this.navNext.setAttribute('aria-label', 'Próxima imagem');
        this.navNext.addEventListener('click', (e) => {
            e.stopPropagation();
            this.nextImage();
        });
        document.body.appendChild(this.navNext);

        this.updateNavButtons();
    }

    updateNavButtons() {
        if (!this.navPrev || !this.navNext) return;
        this.navPrev.classList.toggle('hidden', this.currentIndex <= 0);
        this.navNext.classList.toggle('hidden', this.currentIndex >= this.items.length - 1);
    }

    nextImage() {
        if (this.currentIndex >= this.items.length - 1) return;
        this.currentIndex++;
        this.switchToImage(this.currentIndex);
    }

    prevImage() {
        if (this.currentIndex <= 0) return;
        this.currentIndex--;
        this.switchToImage(this.currentIndex);
    }

    switchToImage(index) {
        const newItem = this.items[index];
        if (!newItem || newItem === this.expandedItem) return;

        // Efeito de partículas na troca
        if (this.expandedItem) {
            this.spawnParticles(this.expandedItem, 8);
            this.expandedItem.classList.remove('expanded');
        }

        // Forçar reflow para a animação funcionar
        void newItem.offsetWidth;

        newItem.classList.add('expanded');
        this.expandedItem = newItem;

        // Atualizar legenda
        if (this.caption) {
            this.caption.style.opacity = '0';
            setTimeout(() => {
                if (this.caption) {
                    this.caption.textContent = newItem.getAttribute('alt') || '';
                    this.caption.style.opacity = '1';
                }
            }, 150);
        }

        // Partículas na nova imagem
        setTimeout(() => this.spawnParticles(newItem, 6), 100);

        this.updateNavButtons();
    }

    spawnParticles(item, count = 10) {
        const rect = item.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;

        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = 'gallery-particle';
            
            const angle = (Math.PI * 2 / count) * i + (Math.random() - 0.5) * 0.5;
            const distance = 80 + Math.random() * 120;
            const dx = Math.cos(angle) * distance;
            const dy = Math.sin(angle) * distance;
            const size = 3 + Math.random() * 6;
            
            particle.style.cssText = `
                left: ${cx}px;
                top: ${cy}px;
                width: ${size}px;
                height: ${size}px;
                --dx: ${dx}px;
                --dy: ${dy}px;
                background: ${['var(--primary)', 'var(--secondary)', 'var(--purple)', 'var(--accent)'][Math.floor(Math.random() * 4)]};
            `;
            
            document.body.appendChild(particle);
            
            // Forçar reflow e iniciar animação
            requestAnimationFrame(() => {
                particle.classList.add('active');
            });
            
            // Remover após animação
            setTimeout(() => {
                if (particle.parentNode) particle.parentNode.removeChild(particle);
            }, 1000);
        }
    }

    collapse() {
        if (!this.expandedItem) return;

        // Partículas ao fechar
        this.spawnParticles(this.expandedItem, 8);

        this.expandedItem.classList.remove('expanded');

        // Remover legenda
        if (this.caption) {
            this.caption.classList.remove('active');
            setTimeout(() => {
                if (this.caption && this.caption.parentNode) {
                    document.body.removeChild(this.caption);
                }
                this.caption = null;
            }, 300);
        }

        // Remover navegação
        if (this.navPrev) {
            this.navPrev.classList.remove('active');
            setTimeout(() => {
                if (this.navPrev && this.navPrev.parentNode) {
                    document.body.removeChild(this.navPrev);
                }
                this.navPrev = null;
            }, 300);
        }
        if (this.navNext) {
            this.navNext.classList.remove('active');
            setTimeout(() => {
                if (this.navNext && this.navNext.parentNode) {
                    document.body.removeChild(this.navNext);
                }
                this.navNext = null;
            }, 300);
        }

        // Remover overlay
        if (this.overlay) {
            this.overlay.classList.remove('active');
            setTimeout(() => {
                if (this.overlay && this.overlay.parentNode) {
                    document.body.removeChild(this.overlay);
                }
                this.overlay = null;
            }, 300);
        }

        document.body.classList.remove('scroll-lock');
        this.expandedItem = null;
    }
}
