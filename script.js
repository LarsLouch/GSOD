/* ==========================================
   O ÚLTIMO BRASILEIRO - Main Entry Point
   Importa e inicializa todos os módulos
   ========================================== */

'use strict';

import { ParticleSystem } from './js/modules/ParticleSystem.js';
import { CustomCursor } from './js/modules/CustomCursor.js';
import { TypingEffect } from './js/modules/TypingEffect.js';
import { HeroParticles } from './js/modules/HeroParticles.js';
import { ScrollReveal } from './js/modules/ScrollReveal.js';
import { AnimatedCounter } from './js/modules/AnimatedCounter.js';
import { NavbarScroll } from './js/modules/NavbarScroll.js';
import { ParallaxEffect } from './js/modules/ParallaxEffect.js';
import { GalleryLightbox } from './js/modules/GalleryLightbox.js';
import { SmoothScroll } from './js/modules/SmoothScroll.js';
import { ContactForm } from './js/modules/ContactForm.js';
import { CTAAction } from './js/modules/CTAAction.js';

document.addEventListener('DOMContentLoaded', () => {
    new ParticleSystem();
    new CustomCursor();
    new TypingEffect();
    new HeroParticles();
    new ScrollReveal();
    new AnimatedCounter();
    new NavbarScroll();
    new ParallaxEffect();
    new GalleryLightbox();
    new SmoothScroll();
    new ContactForm();
    new CTAAction();
    
    console.log('🚀 O Último Brasileiro - Efeitos Avançados Carregados!');
});