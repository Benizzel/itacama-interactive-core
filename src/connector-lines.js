export function drawConnectorLine(bubbleRank) {
    const wrapper = document.querySelector('#interactive-wrapper')

    // Overlay-SVG holen oder neu erstellen
    let overlaySVG = document.querySelector('#connector-overlay');
    if (!overlaySVG) {
        overlaySVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        overlaySVG.setAttribute('id', 'connector-overlay');
        wrapper.appendChild(overlaySVG);
    }
}

export function clearConnectorLine() {

}