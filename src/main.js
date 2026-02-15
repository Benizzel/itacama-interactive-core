/**
 * Main Entry Point
 * Orchestriert SVG Erstellung und Animationen
 */

import './style.css'
import { createCoreSVG } from './svg-builder.js';
import {initPageLoadAnimation} from "./animations.js";

// === INITIALISIERUNG ===

console.log('🚀 Itacama Interactive Core wird geladen...');

// SVG ins DOM einfügen
const wrapper = document.querySelector('#core-wrapper');
const svg = createCoreSVG();
wrapper.appendChild(svg);

console.log('✅ SVG erfolgreich geladen!');

// Animation starten
initPageLoadAnimation();

console.log('✨ Alles bereit!');
