/**
 * Info Box
 * Liest CMS-Daten aus dem DOM und zeigt Info-Box bei Bubble-Klick
 */

export function initInfoBox() {
    // 1. CMS-Daten aus DOM lesen
    const expertiseData = {};

    // Selektiere jedes Element in expertise-data, das ein data-rank-Attribut hat
    document.querySelectorAll('#expertise-data [data-rank]').forEach(el => {
        const rank = el.dataset.rank;
        expertiseData[rank] = {
            title: el.dataset.title,
            teaser: el.dataset.teaser,
            slug: el.dataset.slug,
        };
    });

    // 2. Info-Box Elemente
    const infoBox = document.getElementById('info-box');
    const infoTitle = document.getElementById('info-title');
    const infoTeaser = document.getElementById('info-teaser');
    const infoLink = document.getElementById('info-link');

    // 3. Klick auf jede Bubble
    document.querySelectorAll('.bubble-group').forEach(group => {
        group.addEventListener('click', () => {
            const rank = group.dataset.bubble; // z.B. "1", "2", ...
            const data = expertiseData[rank];
            if (!data) return;

            infoTitle.textContent = data.title;
            infoTeaser.textContent = data.teaser;
            infoLink.href = `https://www.itacama.ch/expertise/${data.slug}`;

            infoBox.classList.remove('info-box--hidden'); // damit Info-Box angezeigt wird
        });
    });
}