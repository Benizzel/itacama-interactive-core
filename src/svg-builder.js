/**
 * SVG Builder
 * Erstellt das Interactive Core SVG Element
 */

export function createCoreSVG() {
    const svgNS = "http://www.w3.org/2000/svg";

    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("viewBox", "0 0 800 600");
    svg.setAttribute("class", "core-svg");

    // Defs (Gradients)
    svg.innerHTML = `
    <defs>
      <!-- Bubble Gradient -->
      <radialGradient id="bubbleGradient">
        <stop offset="0%" style="stop-color:#8b9e8f;stop-opacity:0.7" />
        <stop offset="100%" style="stop-color:#5a6b5c;stop-opacity:0.9" />
      </radialGradient>
      
      <!-- Center Gradient -->
      <radialGradient id="centerGradient">
        <stop offset="0%" style="stop-color:#f4f1e8;stop-opacity:1" />
        <stop offset="50%" style="stop-color:#d4cfbd;stop-opacity:0.8" />
        <stop offset="100%" style="stop-color:#8b9e8f;stop-opacity:0" />
      </radialGradient>
    </defs>
    
    <!-- Decorative Lines -->
    <g class="decorative-lines">
      <path d="M 120 150 Q 200 180, 300 260" stroke="#d4cfbd" stroke-width="2" fill="none" opacity="0.6"/>
      <path d="M 680 150 Q 600 180, 500 260" stroke="#d4cfbd" stroke-width="2" fill="none" opacity="0.6"/>
      <path d="M 400 540 Q 400 480, 400 360" stroke="#d4cfbd" stroke-width="2" fill="none" opacity="0.6"/>
    </g>
    
    <!-- Bubbles -->
    <ellipse cx="250" cy="200" rx="140" ry="120" fill="url(#bubbleGradient)" class="bubble" data-bubble="produkt" transform="rotate(-15 250 200)"/>
    <ellipse cx="550" cy="200" rx="140" ry="120" fill="url(#bubbleGradient)" class="bubble" data-bubble="technik" transform="rotate(15 550 200)"/>
    <ellipse cx="400" cy="420" rx="140" ry="120" fill="url(#bubbleGradient)" class="bubble" data-bubble="organisation" transform="rotate(0 400 420)"/>
    
    <!-- Center Glow -->
    <ellipse cx="400" cy="290" rx="120" ry="90" fill="url(#centerGradient)"/>
    
    <!-- Texte -->
    <text x="250" y="200" text-anchor="middle" fill="white" font-size="18" font-weight="bold">PRODUKT-</text>
    <text x="250" y="220" text-anchor="middle" fill="white" font-size="18" font-weight="bold">STRATEGIE</text>
    <text x="550" y="210" text-anchor="middle" fill="white" font-size="18" font-weight="bold">TECHNIK</text>
    <text x="400" y="430" text-anchor="middle" fill="white" font-size="18" font-weight="bold">ORGANISATION</text>
    <text x="400" y="285" text-anchor="middle" fill="#5a6b5c" font-size="20" font-weight="bold">QUALITÄT &</text>
    <text x="400" y="305" text-anchor="middle" fill="#5a6b5c" font-size="20" font-weight="bold">EXZELLENZ</text>
  `;

    return svg;
}