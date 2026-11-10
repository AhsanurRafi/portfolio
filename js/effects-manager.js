/**
 * Visual Effects Manager (Always ON by Default)
 * Minimalist Tech Elegance Portfolio - Muhammad Ahsanur Rafi
 */
class EffectsManager {
  constructor() {
    this.config = (typeof window !== 'undefined' && window.EFFECTS_CONFIG) || {
      particles: true,
      magneticButtons: true,
    };

    this.mode = 'full'; // Always default ON

    // Active Instances
    this.particles = null;
    this.magnetic = null;

    this.handleReducedMotion = this.handleReducedMotion.bind(this);
  }

  isReducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  isTouchDevice() {
    return ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (window.matchMedia && window.matchMedia('(pointer: coarse)').matches);
  }

  init() {
    // Listen to OS prefers-reduced-motion changes for accessibility
    if (window.matchMedia) {
      window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', this.handleReducedMotion);
    }

    // Force minimal mode only if user explicitly prefers reduced motion in OS settings
    if (this.isReducedMotion()) {
      this.mode = 'minimal';
    } else {
      this.mode = 'full';
    }

    // Instantiate effect modules
    if (this.config.particles && typeof ParticleNetwork !== 'undefined') {
      this.particles = new ParticleNetwork('bg-particles');
    }
    if (this.config.magneticButtons && typeof MagneticButtons !== 'undefined' && !this.isTouchDevice()) {
      this.magnetic = new MagneticButtons();
    }

    // Always start with effects enabled
    if (this.mode === 'full') {
      this.enableEffects();
    } else {
      this.disableEffects();
    }
  }

  enableEffects() {
    this.mode = 'full';
    document.body.classList.add('mode-effects-full');
    document.body.classList.remove('mode-effects-minimal');

    if (this.particles) {
      if (!this.particles.canvas) {
        this.particles.init();
      } else {
        this.particles.start();
      }
    }

    if (this.magnetic && !this.isTouchDevice()) {
      this.magnetic.init();
    }
  }

  disableEffects() {
    this.mode = 'minimal';
    document.body.classList.add('mode-effects-minimal');
    document.body.classList.remove('mode-effects-full');

    if (this.particles) {
      this.particles.stop();
    }

    if (this.magnetic) {
      this.magnetic.destroy();
    }
  }

  handleReducedMotion(e) {
    if (e.matches) {
      this.disableEffects();
    } else {
      this.enableEffects();
    }
  }
}

// Global initialization on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  window.portfolioEffects = new EffectsManager();
  window.portfolioEffects.init();
});

if (typeof module !== 'undefined' && module.exports) {
  module.exports = EffectsManager;
} else if (typeof window !== 'undefined') {
  window.EffectsManager = EffectsManager;
}
