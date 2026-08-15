/**
 * SVG Builder
 * Erstellt das Interactive Core SVG Element
 */

export function createCoreSVG() {
    const svgNS = "http://www.w3.org/2000/svg";

    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("viewBox", "120 80 560 420");
    svg.setAttribute("class", "core-svg");

    // Defs (Gradients)
    svg.innerHTML = `
    <defs>
      <!-- Bubble Gradient -->
      <radialGradient id="bubbleGradient">
        <stop offset="0%" style="stop-color:#8b9e8f;stop-opacity:0.8" />
        <stop offset="100%" style="stop-color:#5a6b5c;stop-opacity:0.9" />
      </radialGradient>
  
      <!-- Center Gradient -->
      <radialGradient id="centerGradient">
        <stop offset="0%" style="stop-color:#f0C84a;stop-opacity:1" />
        <stop offset="50%" style="stop-color:#d4a843;stop-opacity:0.8" />
        <stop offset="100%" style="stop-color:#8b9e8f;stop-opacity:0" />
      </radialGradient>
  
      <!-- Glow Filter -->
      <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="6" result="blur"/>
        <feFlood flood-color="#f0C84a" flood-opacity="0.9" result="color"/>
        <feComposite in="color" in2="blur" operator="in" result="coloredBlur"/>
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

    <!-- BUBBLE 1: Oben -->
    <g class="bubble-group" data-bubble="1">
        <ellipse 
            class="bubble"
            cx="400"
            cy="220"
            rx="140"
            ry="120"
            fill="url(#bubbleGradient)"
            fill-opacity="0.75"
            transform="rotate(0 400 420)"
        />
        <text x="400" y="185" text-anchor="middle" fill="white" font-size="18" font-weight="bold" dominant-baseline="middle"> Organisation </text>
    </g>

    <!-- BUBBLE 2: Unten links --> 
    <g class="bubble-group" data-bubble="2">
        <ellipse 
            class="bubble"
            cx="300"
            cy="340"
            rx="140"
            ry="120"
            fill="url(#bubbleGradient)"
            fill-opacity="0.75"
            transform="rotate(0 400 420)"
        />   
        <text x="270" y="365" text-anchor="middle" fill="white" font-size="18" font-weight="bold" dominant-baseline="middle">Produkt</text>
        
    </g>
    
    <!-- BUBBLE 3: Unten rechts -->
    <g class="bubble-group" data-bubble="3">
        <ellipse
            class="bubble"
            cx="500"
            cy="340"
            rx="140"
            ry="120"
            fill="url(#bubbleGradient)"
            fill-opacity="0.75"
            transform="rotate(0 400 420)"
        />
        <text x="530" y="365" text-anchor="middle" fill="white" font-size="18" font-weight="bold" dominant-baseline="middle">Technik</text>
    </g>    

    
        <!-- BUBBLE 4: Center -->
    <g class="bubble-group" data-bubble="4">
        <ellipse
            class="center-bubble"
            cx="400"
            cy="300"
            rx="90"
            ry="90"
            fill="url(#centerGradient)"
        />
        <text x="400" y="290" text-anchor="middle" fill="white" font-size="18" font-weight="bold" dominant-baseline="middle">QUALITÄT &</text>
        <text x="400" y="312" text-anchor="middle" fill="white" font-size="18" font-weight="bold" dominant-baseline="middle">EXZELLENZ</text>
    </g>
       
  `;
    return svg;
}