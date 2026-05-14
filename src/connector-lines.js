/**
 * Connector Lines
 * Legt ein Overlay-SVG und zeichnet im Overlay Linie für Verbindung zwischen Bubble und Info-Box
 */

export function drawConnectorLine(bubbleRank) {
    const wrapper = document.querySelector('#interactive-wrapper')

    // Overlay-SVG holen oder neu erstellen
    // muss let sein weil ich Variable im if ggf. ändere
    let overlaySVG = document.querySelector('#connector-overlay');
    if (!overlaySVG) {
        //w3 Adresse ist Namespace, damit der Browser weiss, dass es sich um ein SVG handelt und nicht ein html-Tag
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

    // SVG-Grösse auf Wrappergrösse setzen (Standard wäre 300*150px und würde von CSS gestreckt)
    overlaySVG.setAttribute('width', wrapperRect.width.toString());
    overlaySVG.setAttribute('height', wrapperRect.height.toString());

    // Mittelpunkte relativ zum Wrapper berechnen
    const x1 = bubbleRect.left + bubbleRect.width / 2 - wrapperRect.left;
    const y1 = bubbleRect.top + bubbleRect.height / 2 - wrapperRect.top;
    const x2 = boxRect.left + boxRect.width / 2 - wrapperRect.left;
    const y2 = boxRect.top + boxRect.height / 2 - wrapperRect.top;

    // Linie zeichnen
    overlaySVG.innerHTML = '';
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', x1.toString());
    line.setAttribute('y1', y1.toString());
    line.setAttribute('x2', x2.toString());
    line.setAttribute('y2', y2.toString());
    line.setAttribute('stroke', '#d4cfbd');
    line.setAttribute('stroke-width', '2');
    line.setAttribute('opacity', '0.8');
    console.log('Bubble:', x1, y1, '| InfoBox:', x2, y2);
    console.log('wrapperRect:', wrapperRect.left, wrapperRect.top, wrapperRect.width);
    console.log('bubbleRect raw:', bubbleRect.left, bubbleRect.top);
    console.log('boxRect raw:', boxRect.left, boxRect.top);
    overlaySVG.appendChild(line);
}

export function clearConnectorLine() {
    const overlaySVG = document.querySelector('#connector-overlay');
    if (overlaySVG) overlaySVG.innerHTML = '';
}