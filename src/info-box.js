/**
 * Info Box
 * Liest CMS-Daten aus dem DOM und zeigt Info-Box bei Bubble-Klick
 */

import { drawConnectorLine } from './connector-lines.js';

export function initInfoBox() {
    // === 1. STATE UND DOM-ELEMENTE ===
    const expertiseData = {};
    let activeRank = null;
    let resizeTimeout = null;

    const expertiseDataWrapper = document.querySelector('#expertise-data');
    const bubbleGroups = document.querySelectorAll('.bubble-group');
    const infoBoxes = document.querySelectorAll('.info-box');

    // === 2. GUARD CLAUSES / ABBRUCH WENN BASIS FEHLT ===
    if (!expertiseDataWrapper) {
        console.warn('CMS-Daten konnten nicht gefunden werden. #expertise-data fehlt.');
        return;
    }

    if(!bubbleGroups.length) {
        console.warn('Keine Bubble-Gruppen gefunden: . bubblegroup fehlt');
        return;
    }

    // === 3. CMS-DATEN AUS DOM EINLESEN ===
    expertiseDataWrapper.querySelectorAll('[data-rank]').forEach(el => {
        const rank = el.dataset.rank;
        const title = el.dataset.title;
        const teaser = el.dataset.teaser;
        const slug = el.dataset.slug;

        if (!rank || !title || !teaser || !slug) {
            console.warn('Unvollständiger CMS-Datensatz wurde übersprungen:', {
                rank,
                title,
                teaser,
                slug,
            });
            return;
        }

        // Daten in JavaScript Objekt speichern mit Key = Rank
        expertiseData[rank] = {
            title,
            teaser,
            slug,
        };
    });

    // === 4. KLEINE HILFSFUNKTIONEN ===
    function getBubbleRank(group) {
        return group.dataset.bubble;
    }

    function getInfoBox(rank) {
        return document.querySelector(`#info-box-${rank}`);
    }

    // === 5. UI-HILFSFUNKTIONEN ===
    function resetActiveBubbles() {
        bubbleGroups.forEach(group => {
            group.classList.remove('bubble-group--active');
            group.setAttribute('aria-expanded', 'false');
        });
    }

    function hideAllInfoBoxes() {
        infoBoxes.forEach(box => {
            box.classList.add('info-box--hidden');
        });
    }

    function updateInfoBoxContent(infoBox, data) {
        const titleElement = infoBox.querySelector('.info-title');
        const teaserElement = infoBox.querySelector('.info-teaser');
        const linkElement = infoBox.querySelector('.info-link');

        if (!titleElement || !teaserElement || !linkElement) {
            console.warn('Info-Box ist unvollständig. Erwartet werden . info-title, . info-teaser und . info-link.');
            return false;
        }

        titleElement.textContent = data.title;
        teaserElement.textContent = data.teaser
        linkElement.href = `https://www.itacama.ch/expertise/${data.slug}`;
        linkElement.textContent = 'Mehr erfahren';

        return true;
    }

    // === 6. HAUPTFUNKTION ===
    function showInfoBox(rank) {
        const data = expertiseData[rank];

        if (!data) {
            console.warn(`Keine CMS-Daten für Bubble mit rank "${rank}" gefunden.`);
            return;
        }

        const visibleBox = getInfoBox(rank);

        if (!visibleBox) {
            console.warn(`Keine passende Info-Box gefunden: #info-box-${rank}`)
            return;
        }

        const activeBubble = document.querySelector(`.bubble-group[data-bubble="${rank}"]`);

        activeRank = rank;

        hideAllInfoBoxes();
        resetActiveBubbles();

        const contentWasUpdated = updateInfoBoxContent(visibleBox, data);

        if (!contentWasUpdated) return;

        visibleBox.classList.remove('info-box--hidden');

        if (activeBubble) {
            activeBubble.classList.add('bubble-group--active');
            activeBubble.setAttribute('aria-expanded', 'true');
        }

        drawConnectorLine(rank);
    }

    // === 7. RESIZE / NEBENLOGIK ===
    function redrawConnectorLineAfterResize() {
        if (!activeRank) return;

        clearTimeout(resizeTimeout);

        resizeTimeout = setTimeout(() => {
            drawConnectorLine(activeRank);
        }, 10);
    }

    // === 8. EVENTS REGISTRIEREN ===
    bubbleGroups.forEach(group => {
        const rank = getBubbleRank(group);
        const data = expertiseData[rank];
        const infoBox = getInfoBox(rank);

        if (!rank) {
            console.warn('Bubble ohne data-bubble gefunden und übersprungen:', group);
            return;
        }

        if (!data) {
            console.warn(`Bubble "${rank}" hat keine passenden CMS-Daten und wird nicht aktiviert.`);
            return;
        }

        if (!infoBox) {
            console.warn(`Bubble "${rank}" hat keine passende Info-Box #info-box-${rank} und wird nicht aktiviert.`);
            return;
        }

        group.setAttribute('tabindex', '0');
        group.setAttribute('role', 'button');
        group.setAttribute('aria-label', `${data.title} anzeigen`);
        group.setAttribute('aria-controls', `info-box-${rank}`);
        group.setAttribute('aria-expanded', 'false');

        // Click
        group.addEventListener('click', () => {
            showInfoBox(rank);
        });

        // Enter / Space
        group.addEventListener('keydown', event => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                showInfoBox(rank);
            }
        });
    });

    window.addEventListener('resize', redrawConnectorLineAfterResize);
}