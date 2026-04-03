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
      
      <!-- Bubble Gradient HOVER -->
      <radialGradient id="bubbleGradientHover">
        <stop offset="0%" style="stop-color:#f4d03f;stop-opacity:0.95" />
        <stop offset="100%" style="stop-color:#7a8d7c;stop-opacity:1" />
      </radialGradient>
      
      <!-- Center Gradient -->
      <radialGradient id="centerGradient">
        <stop offset="0%" style="stop-color:#f4f1e8;stop-opacity:1" />
        <stop offset="50%" style="stop-color:#d4cfbd;stop-opacity:0.8" />
        <stop offset="100%" style="stop-color:#8b9e8f;stop-opacity:0" />
      </radialGradient>
      
      <!-- Glow Filter (NEU!) -->
      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
        <!--Weichzeichner -->
        <feGaussianBlur stdDeviation="15" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>      
    </defs>
    
    <!-- DECORATIVE LINES -->
    <g class="decorative-lines">
      <path d="M 120 150 Q 200 180, 300 260" stroke="#d4cfbd" stroke-width="2" fill="none" opacity="0.6"/>
      <path d="M 680 150 Q 600 180, 500 260" stroke="#d4cfbd" stroke-width="2" fill="none" opacity="0.6"/>
      <path d="M 400 540 Q 400 480, 400 360" stroke="#d4cfbd" stroke-width="2" fill="none" opacity="0.6"/>
    </g>
    
    <!-- BUBBLES mit Glow -->
    
    <!-- BUBBLE 1: Organisation -->
    <g class="bubble-group" data-bubble="1">
      <ellipse class="bubble" cx="400" cy="420" rx="140" ry="120" fill="url(#bubbleGradient)" data-bubble="1" transform="rotate(0 400 420)"/>
      <text x="400" y="430" text-anchor="middle" fill="white" font-size="18" font-weight="bold">ORGANISATION</text>
    </g>
    
    <!-- BUBBLE 2: Produkt-Strategie --> 
    <g class="bubble-group" data-bubble="2">
        <ellipse class="bubble" cx="250" cy="200" rx="140" ry="120" fill="url(#bubbleGradient)" data-bubble="2" transform="rotate(-15 250 200)"/>
        <text x="250" y="200" text-anchor="middle" fill="white" font-size="18" font-weight="bold">PRODUKT-</text>
        <text x="250" y="220" text-anchor="middle" fill="white" font-size="18" font-weight="bold">STRATEGIE</text>
    </g>
    
    <!-- BUBBLE 3 CENTER Qualität -->
    <g class="bubble-group" data-bubble="3">
        <ellipse class="bubble" cx="400" cy="290" rx="120" ry="90" fill="url(#centerGradient)" data-bubble="3"/>
        <text x="400" y="285" text-anchor="middle" fill="#5a6b5c" font-size="20" font-weight="bold">QUALITÄT &</text>
        <text x="400" y="305" text-anchor="middle" fill="#5a6b5c" font-size="20" font-weight="bold">EXZELLENZ</text>
        
    </g>
    
    <!-- BUBBLE 4: Technik -->
    <g class="bubble-group" data-bubble="4">
      <ellipse class="bubble" cx="550" cy="200" rx="140" ry="120" fill="url(#bubbleGradient)" data-bubble="4" transform="rotate(15 550 200)"/>
      <text x="550" y="210" text-anchor="middle" fill="white" font-size="18" font-weight="bold">TECHNIK</text>
    </g>
       
  `;

    return svg;
}