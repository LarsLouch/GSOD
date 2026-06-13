/* ==========================================
   GALLERY LIGHTBOX - Galeria com expansão toggle
   Clique na imagem para expandir centralizada, clique novamente ou fora para fechar
   ========================================== */

export class GalleryLightbox {
    constructor() {
        this.items = document.querySelectorAll('.gallery-item');
        if (this.items.length === 0) return;
        
        this.expandedItem = null;
        this.overlay = null;
        
        this.init();
    }

    init() {
        this.items.forEach((item) => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleExpand(item);
            });
        });

        // Fechar com ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.expandedItem) {
                this.collapse();
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

        // Criar overlay escuro
        this.overlay = document.createElement('div');
        this.overlay.className = 'gallery-overlay';
        this.overlay.addEventListener('click', () => this.collapse());
        document.body.appendChild(this.overlay);

        // Pequeno delay para o overlay aparecer antes da imagem
        requestAnimationFrame(() => {
            this.overlay.classList.add('active');
        });

        // Expandir imagem
        item.classList.add('expanded');
        this.expandedItem = item;
        document.body.classList.add('scroll-lock');
    }

    collapse() {
        if (!this.expandedItem) return;

        this.expandedItem.classList.remove('expanded');
        
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