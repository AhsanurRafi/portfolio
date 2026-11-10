/**
 * Configuration Flags for Visual Effects (Mode Eksperimen)
 * Minimalist Tech Elegance Portfolio - Muhammad Ahsanur Rafi
 */
const EFFECTS_CONFIG = {
  particles: true,        // 1. Latar Partikel / Neural Network Canvas
  magneticButtons: true,  // 2. Magnetic Buttons (Subtle pull on CTA, Nav, Socials)
};

// Support both ES Module and Browser Global
if (typeof module !== 'undefined' && module.exports) {
  module.exports = EFFECTS_CONFIG;
} else if (typeof window !== 'undefined') {
  window.EFFECTS_CONFIG = EFFECTS_CONFIG;
}
