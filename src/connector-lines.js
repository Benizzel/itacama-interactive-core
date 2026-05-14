export function drawConnectorLine(bubbleRank) {
    const wrapper = document.querySelector('#interactive-wrapper')

    // Overlay-SVG holen oder neu erstellen
    // muss let sein weil ich Variable im if ggf. ändere
    let overlaySVG = document.querySelector('#connector-overlay');
    if (!overlaySVG) {
        //w3 Adresse ist Namespace, damit der Browser weiß, dass es sich um ein SVG handelt und nicht ein html-Tag
        overlaySVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        overlaySVG.setAttribute('id', 'connector-overlay');
        wrapper.appendChild(overlaySVG);
    }

    // Elemente finden
    const bubbleGroup = document.querySelector(`.bubble-group[data-bubble="${bubbleRank}"]`);
    const infoBox = document.querySelector(`#info-box-${bubbleRank}`);
    if (!bubbleGroup || !infoBox) return;

    // Positionen messen
    // getBoundingClientRect() misst ein Element und gibt mir die genaue Position im Browserfenster zurück
    const wrapperRect = wrapper.getBoundingClientRect();
    const bubbleRect = bubbleGroup.getBoundingClientRect();
    const boxRect = infoBox.getBoundingClientRect();

    // Mittelpunkte relativ zum Wrapper berechnen
    const x1 = bubbleRect.left + bubbleRect.width / 2 - wrapperRect.left;
    const y1 = bubbleRect.top + bubbleRect.height / 2 - wrapperRect.top;
    const x2 = boxRect.left + boxRect.width / 2 - wrapperRect.left;
    const y2 = boxRect.top + boxRect.height / 2 - wrapperRect.top;

    // Linie zeichnen
    overlaySVG.innerHTML = '';
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', x1);
    line.setAttribute('y1', y1);
    line.setAttribute('x2', x2);
    line.setAttribute('y2', y2);
    line.setAttribute('stroke', '#d4cfbd');
    line.setAttribute('stroke-width', '2');
    line.setAttribute('opacity', '0.8');
    overlaySVG.appendChild(line);
}

export function clearConnectorLine() {
    const overlaySVG = document.querySelector('#connector-overlay');
    if (overlaySVG) overlaySVG.innerHTML = '';
}