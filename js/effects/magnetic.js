/**
 * Magnetic Button Interaction Effect
 * Minimalist Tech Elegance Portfolio - Muhammad Ahsanur Rafi
 */
class MagneticButtons {
  constructor() {
    this.items = [];
    this.isActive = false;
    this.rafId = null;

    // Selectors for interactive magnetic targets
    this.selectors = [
      '.btn--primary',
      '.btn--outline',
      '.btn--nav-cv',
      '.btn--card',
      '.social-link'
    ];
  }

  isFinePointer() {
    return window.matchMedia && window.matchMedia('(pointer: fine)').matches;
  }

  init() {
    if (!this.isFinePointer()) return;

    this.isActive = true;
    const elements = document.querySelectorAll(this.selectors.join(', '));

    elements.forEach((el) => {
      // Find inner children (text, icons) for parallax layering
      const innerChildren = Array.from(el.children);

      const item = {
        element: el,
        children: innerChildren,
        rect: null,
        onMouseMove: null,
        onMouseLeave: null,
      };

      const handleMouseMove = (e) => {
        if (!this.isActive) return;

        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;

        // Max pull 8px
        const maxShift = 8;
        const shiftX = Math.max(-maxShift, Math.min(maxShift, (deltaX / (rect.width / 2)) * maxShift));
        const shiftY = Math.max(-maxShift, Math.min(maxShift, (deltaY / (rect.height / 2)) * maxShift));

        // Disable CSS transition during active mouse tracking for 1:1 responsiveness
        el.style.transition = 'none';
        el.style.transform = `translate3d(${shiftX.toFixed(2)}px, ${shiftY.toFixed(2)}px, 0)`;

        // Parallax depth for inner content (shift extra ~40%)
        innerChildren.forEach((child) => {
          child.style.transition = 'none';
          child.style.transform = `translate3d(${(shiftX * 0.45).toFixed(2)}px, ${(shiftY * 0.45).toFixed(2)}px, 0)`;
        });
      };

      const handleMouseLeave = () => {
        // Smooth return easing: cubic-bezier(0.22, 1, 0.36, 1)
        const returnTransition = 'transform 420ms cubic-bezier(0.22, 1, 0.36, 1)';
        el.style.transition = returnTransition;
        el.style.transform = 'translate3d(0, 0, 0)';

        innerChildren.forEach((child) => {
          child.style.transition = returnTransition;
          child.style.transform = 'translate3d(0, 0, 0)';
        });
      };

      el.addEventListener('mousemove', handleMouseMove, { passive: true });
      el.addEventListener('mouseleave', handleMouseLeave, { passive: true });

      item.onMouseMove = handleMouseMove;
      item.onMouseLeave = handleMouseLeave;
      this.items.push(item);
    });
  }

  destroy() {
    this.isActive = false;

    this.items.forEach((item) => {
      const el = item.element;
      el.removeEventListener('mousemove', item.onMouseMove);
      el.removeEventListener('mouseleave', item.onMouseLeave);

      el.style.transition = '';
      el.style.transform = '';

      item.children.forEach((child) => {
        child.style.transition = '';
        child.style.transform = '';
      });
    });

    this.items = [];
  }
}

// Support both ES Module and Browser Global
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MagneticButtons;
} else if (typeof window !== 'undefined') {
  window.MagneticButtons = MagneticButtons;
}

