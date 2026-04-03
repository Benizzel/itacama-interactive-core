/**
 * Main Entry Point
 * Orchestriert SVG Erstellung und Animationen
 */

import './style.css'
import { initInfoBox } from "./info-box.js";
import { createCoreSVG } from './svg-builder.js';
import { initHoverAnimations, initPageLoadAnimation } from "./animations.js";

// === INITIALISIERUNG ===

console.log('🚀 Itacama Interactive Core wird geladen...');

// SVG ins DOM einfügen
const wrapper = document.querySelector('#core-wrapper');
const svg = createCoreSVG();
wrapper.appendChild(svg);

console.log('✅ SVG erfolgreich geladen!');

// Animation starten
initInfoBox()
initPageLoadAnimation();
initHoverAnimations()

console.log('✨ Alles bereit!');
