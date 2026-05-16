/**
 * Info Box
 * Liest CMS-Daten aus dem DOM und zeigt Info-Box bei Bubble-Klick
 */

import { drawConnectorLine } from './connector-lines.js';

export function initInfoBox() {
    // 1. CMS-Daten aus DOM lesen
    const expertiseData = {};
    let activeRank = null;
    let resizeTimeout = null;

    // Selektiere jedes Element in expertise-data, das ein data-rank-Attribut hat
    document.querySelectorAll('#expertise-data [data-rank]').forEach(el => {
        const rank = el.dataset.rank;
        expertiseData[rank] = {
            title: el.dataset.title,
            teaser: el.dataset.teaser,
            slug: el.dataset.slug,
        };
    });

    function getBubbleRank(group) {
        return group.dataset.bubble;
    }

    function showInfoBox(rank) {
        const data = expertiseData[rank];
        if (!data) return;

        activeRank = rank;

        // Hide all boxes
        document.querySelectorAll('.info-box').forEach(box => {
            box.classList.add('info-box--hidden');
        });

        // Change content and show box
        const visibleBox = document.querySelector(`#info-box-${rank}`);
        if (!visibleBox) return;

        visibleBox.querySelector('.info-title').textContent = data.title;
        visibleBox.querySelector('.info-teaser').textContent = data.teaser;
        visibleBox.querySelector('.info-link').href = `https://www.itacama.ch/expertise/${data.slug}`; // fügt href Attribut hinzu

        visibleBox.classList.remove('info-box--hidden'); // damit Info-Box angezeigt wird
        drawConnectorLine(rank); // zeichnet die Verbindungslinie
    }

    function redrawConnectorLineAfterResize() {
        if (!activeRank) return;

        clearTimeout(resizeTimeout);

        resizeTimeout = setTimeout(() => {
            drawConnectorLine(activeRank);
        }, 10);
    }

    // 2. Klick und Tastatur auf jede Bubble
    document.querySelectorAll('.bubble-group').forEach(group => {
        const rank = getBubbleRank(group);
        const data = expertiseData[rank];

        if (data) {
            group.setAttribute('tabindex', '0');
            group.setAttribute('role', 'button');
            group.setAttribute('aria-label', `${data.title} anzeigen`);
        }

        group.addEventListener('click', () => {
            showInfoBox(rank);
        });

        group.addEventListener('keydown', event => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                showInfoBox(rank);
            }
        });
    });

    window.addEventListener('resize', redrawConnectorLineAfterResize);
}