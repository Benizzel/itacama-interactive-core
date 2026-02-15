/**
 * GSAP Animations
 * Page Load und Hover Animationen
 */

import { gsap } from 'gsap';

/**
 * Page Load Animation
 * Animiert Bubbles, Center und Lines beim Seitenaufruf
 */
export function initPageLoadAnimation() {
    // Warten, bis SVG im DOM ist
    setTimeout(() => {
        console.log('🎬 Starte Page Load Animationen...');

        const bubbles = document.querySelectorAll('.bubble');
        const centerGlow = document.querySelector('ellipse[fill="url(#centerGradient)"]');
        const lines = document.querySelectorAll('.decorative-lines path');

        lines.forEach(p => {
            const len = p.getTotalLength();
            gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
        });

        gsap.fromTo(
            bubbles,
            { opacity: 0, scale: 0, transformOrigin: '50% 50%' },
            { opacity: 1, scale: 1, duration: 1, stagger: 0.2, ease: 'back.out(1.7)' }
        );

        gsap.fromTo(
            centerGlow,
            { opacity: 0, scale: 0, transformOrigin: '50% 50%' },
            { opacity: 1, scale: 1, duration: 0.8, delay: 0.5 }
        );

        gsap.from(lines, {
            strokeDashoffset: 1000,
            duration: 1.5,
            stagger: 0.15,
            ease: 'power2.out'
        });

        console.log('✅ Page Load Animation durchgeführt.')
    }, 100);
}