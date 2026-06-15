// Main JavaScript file - Loads all modules

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎮 O Último Brasileiro - JavaScript loaded');
    
    // Load all modules
    try {
        // Particle System
        if (typeof ParticleSystem !== 'undefined') {
            new ParticleSystem();
        }
        
        // Hero Particles
        if (typeof HeroParticles !== 'undefined') {
            new HeroParticles();
        }
        
        // Custom Cursor
        if (typeof CustomCursor !== 'undefined') {
            new CustomCursor();
        }
        
        // Parallax Effect
        if (typeof ParallaxEffect !== 'undefined') {
            new ParallaxEffect();
        }
        
        // Scroll Reveal
        if (typeof ScrollReveal !== 'undefined') {
            new ScrollReveal();
        }
        
        // Smooth Scroll
        if (typeof SmoothScroll !== 'undefined') {
            new SmoothScroll();
        }
        
        // Navbar Scroll
        if (typeof NavbarScroll !== 'undefined') {
            new NavbarScroll();
        }
        
        // Animated Counter
        if (typeof AnimatedCounter !== 'undefined') {
            new AnimatedCounter();
        }
        
        // Typing Effect
        if (typeof TypingEffect !== 'undefined') {
            new TypingEffect();
        }
        
        // Card Tilt 3D
        if (typeof CardTilt3D !== 'undefined') {
            new CardTilt3D();
        }
        
        // Gallery Carousel
        if (typeof GalleryCarousel !== 'undefined') {
            new GalleryCarousel();
        }
        
        // Gallery Lightbox
        if (typeof GalleryLightbox !== 'undefined') {
            new GalleryLightbox();
        }
        
        // CTA Action
        if (typeof CTAAction !== 'undefined') {
            new CTAAction();
        }
        
        // Contact Form
        if (typeof ContactForm !== 'undefined') {
            new ContactForm();
        }
        
        // Mouse Glow
        if (typeof MouseGlow !== 'undefined') {
            new MouseGlow();
        }
        
        console.log('✅ All modules loaded successfully');
        
    } catch (error) {
        console.error('❌ Error loading modules:', error);
    }
    
    // Initialize GSAP ScrollTrigger
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }
    
    // Initialize Splide
    if (typeof Splide !== 'undefined') {
        const splide = new Splide('#gallery-splide', {
            type: 'loop',
            perPage: 3,
            gap: '1rem',
            pagination: true,
            arrows: true,
            autoplay: true,
            interval: 3000,
            breakpoints: {
                1024: { perPage: 2 },
                640: { perPage: 1 }
            }
        }).mount();
    }
});

// Audio system for section transitions
const AudioSystem = {
    audio: null,
    currentSection: null,
    
    init() {
        this.audio = new Audio();
        this.audio.loop = true;
        this.audio.volume = 0.3;
        
        // Check if user has interacted before playing
        document.addEventListener('click', () => {
            if (this.audio.paused && !this.audio.muted) {
                this.audio.play().catch(e => console.log('Audio play blocked:', e));
            }
        }, { once: true });
        
        // Observe sections for audio changes
        this.setupSectionObserver();
    },
    
    setupSectionObserver() {
        const sections = document.querySelectorAll('section');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    
                    if (sectionId !== this.currentSection) {
                        this.changeAudioForSection(sectionId);
                        this.currentSection = sectionId;
                    }
                }
            });
        }, { threshold: 0.5 });
        
        sections.forEach(section => observer.observe(section));
    },
    
    changeAudioForSection(sectionId) {
        // Different audio for different sections
        const audioTracks = {
            'home': 'sounds/ambient-loop.mp3',
            'capa': 'sounds/ambient-loop.mp3',
            'sobre': 'sounds/ambient-loop.mp3',
            'jogabilidade': 'sounds/ambient-loop.mp3',
            'galeria': 'sounds/ambient-loop.mp3',
            'batalha': 'sounds/ambient-loop.mp3',
            'contato': 'sounds/ambient-loop.mp3'
        };
        
        if (audioTracks[sectionId] && this.audio.src !== audioTracks[sectionId]) {
            this.audio.src = audioTracks[sectionId];
            if (!this.audio.muted) {
                this.audio.play().catch(e => console.log('Audio play blocked:', e));
            }
        }
    }
};

// Initialize audio system
document.addEventListener('DOMContentLoaded', () => {
    AudioSystem.init();
});

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AudioSystem };
}
