/**
 * Neural Network Particle Background Effect
 * Minimalist Tech Elegance Portfolio - Muhammad Ahsanur Rafi
 */
class ParticleNetwork {
  constructor(canvasId = 'bg-particles') {
    this.canvasId = canvasId;
    this.canvas = null;
    this.ctx = null;
    this.particles = [];
    this.animationFrameId = null;
    this.isRunning = false;
    this.mouseX = -9999;
    this.mouseY = -9999;
    this.isHoveringWindow = false;

    // Responsive configuration
    this.config = {
      maxDist: 115,          // Max distance to draw connection lines
      mouseRadius: 120,      // Cursor influence radius
      repelForce: 0.8,       // Gentle repulsion strength
      baseSpeed: 0.35,       // Particle drift speed
      minRadius: 1.0,
      maxRadius: 2.0,
      particleAlphaMin: 0.12,
      particleAlphaMax: 0.28,
      lineAlphaBase: 0.16,
    };

    this.accentRgb = '94, 234, 212'; // Fallback teal

    // Bind methods
    this.loop = this.loop.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
  }

  init() {
    this.canvas = document.getElementById(this.canvasId);
    if (!this.canvas) {
      this.canvas = document.createElement('canvas');
      this.canvas.id = this.canvasId;
      this.canvas.className = 'bg-particles';
      this.canvas.setAttribute('aria-hidden', 'true');
      document.body.prepend(this.canvas);
    }

    this.ctx = this.canvas.getContext('2d', { alpha: true });
    if (!this.ctx) return;

    this.updateAccentColor();
    this.handleResize();

    // Event listeners
    window.addEventListener('resize', this.handleResize, { passive: true });
    window.addEventListener('mousemove', this.handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', this.handleMouseLeave);
    document.addEventListener('visibilitychange', this.handleVisibilityChange);

    this.start();
  }

  updateAccentColor() {
    this.accentRgb = '94, 234, 212';
  }

  getTargetParticleCount() {
    const width = window.innerWidth;
    if (width < 768) return 0;       // Off on mobile for performance & battery
    if (width < 1024) return 32;     // Tablet
    return 68;                       // Desktop
  }

  createParticles() {
    const count = this.getTargetParticleCount();
    this.particles = [];
    const w = this.canvas.width / (window.devicePixelRatio || 1);
    const h = this.canvas.height / (window.devicePixelRatio || 1);

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = (0.15 + Math.random() * (this.config.baseSpeed - 0.15));
      this.particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: this.config.minRadius + Math.random() * (this.config.maxRadius - this.config.minRadius),
        alpha: this.config.particleAlphaMin + Math.random() * (this.config.particleAlphaMax - this.config.particleAlphaMin),
        pulseSpeed: 0.015 + Math.random() * 0.02,
        pulseVal: Math.random() * Math.PI * 2,
      });
    }
  }

  handleResize() {
    if (!this.canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;

    this.canvas.width = w * dpr;
    this.canvas.height = h * dpr;
    this.canvas.style.width = `${w}px`;
    this.canvas.style.height = `${h}px`;

    if (this.ctx) {
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      this.ctx.scale(dpr, dpr);
    }

    this.createParticles();
  }

  handleMouseMove(e) {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
    this.isHoveringWindow = true;
  }

  handleMouseLeave() {
    this.isHoveringWindow = false;
    this.mouseX = -9999;
    this.mouseY = -9999;
  }

  handleVisibilityChange() {
    if (document.hidden) {
      this.pause();
    } else if (this.isRunning) {
      this.start();
    }
  }

  start() {
    this.isRunning = true;
    if (this.canvas) {
      this.canvas.style.opacity = '1';
    }
    if (!this.animationFrameId) {
      this.animationFrameId = requestAnimationFrame(this.loop);
    }
  }

  pause() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  stop() {
    this.isRunning = false;
    this.pause();
    if (this.canvas) {
      this.canvas.style.opacity = '0';
      if (this.ctx) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      }
    }
  }

  destroy() {
    this.stop();
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseleave', this.handleMouseLeave);
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);

    if (this.themeObserver) {
      this.themeObserver.disconnect();
      this.themeObserver = null;
    }

    if (this.canvas && this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
      this.canvas = null;
      this.ctx = null;
    }
  }

  loop() {
    if (!this.isRunning) return;

    const w = window.innerWidth;
    const h = window.innerHeight;
    const ctx = this.ctx;
    if (!ctx) return;

    ctx.clearRect(0, 0, w, h);

    const particles = this.particles;
    const len = particles.length;
    const maxDist = this.config.maxDist;
    const maxDistSq = maxDist * maxDist;
    const mouseRadius = this.config.mouseRadius;
    const mouseRadiusSq = mouseRadius * mouseRadius;

    // Update & draw particles
    for (let i = 0; i < len; i++) {
      const p = particles[i];

      // Mouse repulsion
      if (this.isHoveringWindow) {
        const dx = p.x - this.mouseX;
        const dy = p.y - this.mouseY;
        const distSq = dx * dx + dy * dy;

        if (distSq < mouseRadiusSq && distSq > 0) {
          const dist = Math.sqrt(distSq);
          const force = (1 - dist / mouseRadius) * this.config.repelForce;
          p.x += (dx / dist) * force * 1.5;
          p.y += (dy / dist) * force * 1.5;
        }
      }

      // Drift motion
      p.x += p.vx;
      p.y += p.vy;

      // Wrap around edges smoothly
      if (p.x < -10) p.x = w + 10;
      else if (p.x > w + 10) p.x = -10;
      if (p.y < -10) p.y = h + 10;
      else if (p.y > h + 10) p.y = -10;

      // Subtle pulse
      p.pulseVal += p.pulseSpeed;
      const currentAlpha = p.alpha * (0.8 + 0.2 * Math.sin(p.pulseVal));

      // Draw dot
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.accentRgb}, ${currentAlpha.toFixed(3)})`;
      ctx.fill();

      // Draw connections
      for (let j = i + 1; j < len; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const distSq = dx * dx + dy * dy;

        if (distSq < maxDistSq) {
          const dist = Math.sqrt(distSq);
          const lineAlpha = (1 - dist / maxDist) * this.config.lineAlphaBase;

          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(${this.accentRgb}, ${lineAlpha.toFixed(3)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    this.animationFrameId = requestAnimationFrame(this.loop);
  }
}

// Support both ES Module and Browser Global
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ParticleNetwork;
} else if (typeof window !== 'undefined') {
  window.ParticleNetwork = ParticleNetwork;
}

