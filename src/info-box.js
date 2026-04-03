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

    // 2. Klick auf jede Bubble
    document.querySelectorAll('.bubble-group').forEach(group => {
        group.addEventListener('click', () => {
            const rank = group.dataset.bubble; // z.B. "1", "2", ...
            const data = expertiseData[rank];
            if (!data) return;

            // Hide all boxes
            document.querySelectorAll('.info-box').forEach(box => {
                box.classList.add('info-box--hidden');
            });

            // Change content and show box
            const visibleBox = document.querySelector(`#info-box-${rank}`)
            if (!visibleBox) return;

            visibleBox.querySelector('.info-title').textContent = data.title
            visibleBox.querySelector('.info-teaser').textContent = data.teaser;
            visibleBox.querySelector('.info-link').href = `https://www.itacama.ch/expertise/${data.slug}`; //fügt href Attribut hinzu

            visibleBox.classList.remove('info-box--hidden'); // damit Info-Box angezeigt wird
        });
    });
}