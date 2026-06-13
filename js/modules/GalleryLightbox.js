/* ==========================================
   GALLERY LIGHTBOX - Galeria com expansão toggle
   Clique na imagem para expandir, clique novamente para fechar
   ========================================== */

export class GalleryLightbox {
    constructor() {
        this.items = document.querySelectorAll('.gallery-item');
        if (this.items.length === 0) return;
        
        this.expandedItem = null;
        
        this.init();
    }

    init() {
        this.items.forEach((item) => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleExpand(item);
            });
        });

        // Click fora para fechar
        document.addEventListener('click', (e) => {
            if (this.expandedItem && !this.expandedItem.contains(e.target)) {
                this.collapse();
            }
        });

        // Tecla ESC para fechar
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
        // Fecha qualquer item já expandido
        if (this.expandedItem) {
            this.expandedItem.classList.remove('expanded');
        }
        
        item.classList.add('expanded');
        this.expandedItem = item;
        document.body.style.overflow = 'hidden';
    }

    collapse() {
        if (this.expandedItem) {
            this.expandedItem.classList.remove('expanded');
            this.expandedItem = null;
            document.body.style.overflow = '';
        }
    }
}