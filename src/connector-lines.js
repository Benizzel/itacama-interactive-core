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

    // Mittelpunkte berechnen
    const bubbleCenterX = bubbleRect.left + bubbleRect.width / 2 - wrapperRect.left;
    const bubbleCenterY = bubbleRect.top + bubbleRect.height / 2 - wrapperRect.top;
    const boxCenterX = boxRect.left + boxRect.width / 2 - wrapperRect.left;
    const boxCenterY = boxRect.top + boxRect.height / 2 - wrapperRect.top;

    // Bestimmen, ob Info-Box links oder rechts von der Bubble liegt
    const infoBoxIsLeft = boxCenterX < bubbleCenterX;

    // Startpunkt: Kante der Info-Box (nicht Mitte)
    const x1 = infoBoxIsLeft
        ? boxRect.right - wrapperRect.left   // rechte Kante wenn Box links
        : boxRect.left - wrapperRect.left;   // linke Kante wenn Box rechts
    const y1 = boxCenterY;

    // Endpunkt: Mitte der Bubble
    const x2 = bubbleCenterX;
    const y2 = bubbleCenterY;

    // Geschwungene Linie (Bezier-Kurve) zeichnen
    const dx = x2 - x1;
    const curvePath = `M ${x1},${y1} C ${x1 + dx/2},${y1 - curveStrength} ${x2 - dx/2},${y2 - curveStrength} ${x2},${y2}`;

    overlaySVG.innerHTML = '';
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', curvePath);
    path.setAttribute('stroke', '#d4cfbd');
    path.setAttribute('stroke-width', '2');
    path.setAttribute('fill', 'none');
    path.setAttribute('opacity', '0.8');
    overlaySVG.appendChild(path);
}

export function clearConnectorLine() {
    const overlaySVG = document.querySelector('#connector-overlay');
    if (overlaySVG) overlaySVG.innerHTML = '';
}