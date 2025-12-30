console.log('Interactive Core loaded!')

// Elemente selektieren
const segments = document.querySelectorAll('.core-segment')
const infoCard = document.getElementById('info-card')
const cardTitle = infoCard.querySelector('.info-card__title')
const cardText = infoCard.querySelector('.info-card__text')
const cardButton = infoCard.querySelector('.info-card__button')

// Content für jedes Segment
// TODO: Add to CMS
const segmentContent = {
    'produkt-strategie': {
        title: 'Produkt-Strategie',
        text: 'Produkt lorem ipsum dolor sit amet.',
        link: '/services/produkt-strategie',
        cardPosition: 'left'
    },
    'technik': {
        title: 'Technik',
        text: 'Technik lorem ipsum dolor sit amet.',
        link: '/services/technik',
        cardPosition: 'right'
    },
    'organisation': {
        title: 'Organisation',
        text: 'Organisation lorem ipsum dolor sit amet.',
        link: '/services/organisation',
        cardPosition: 'right'
    },
    'zentrum': {
        title: 'Qualität & Exzellenz',
        text: 'Qualität lorem ipsum dolor sit amet.',
        link: '/services/Qualitaet-Exzellenz',
        cardPosition: 'right'
    }
}

// Timeout für verzögertes Ausblenden
let hideTimeout = null

// Hilfsfunktion: Card anzeigen
function showCard(content, segment) {
    // Vorheriges Timeout abbrechen
    if (hideTimeout) {
        clearTimeout(hideTimeout)
        hideTimeout = null
    }

    // Inhalt setzen
    cardTitle.textContent = content.title
    cardText.textContent = content.text
    cardButton.href = content.link

    // Anzeigen (muss vor Positionsberechnung sein, damit Card Grösse hat)
    infoCard.hidden = false

    // Position berechnen
    const app = document.getElementById('app')
    const appRect = app.getBoundingClientRect()
    const segmentRect = segment.getBoundingClientRect()
    const cardRect = infoCard.getBoundingClientRect()

    // Segment-Position relativ zu #app
    const segmentTop = segmentRect.top - appRect.top
    const segmentLeft = segmentRect.left - appRect.left
    const segmentRight = segmentLeft + segmentRect.width

    // Card vertikal zum Segment zentrieren
    const top = segmentTop + (segmentRect.height / 2) - (cardRect.height / 2)

    // Card link oder rechts positionieren
    let left
    if (content.cardPosition === 'left') {
        left = segmentLeft - cardRect.width - 20 // 20px Abstand
    } else {
        left = segmentRight + 20 // 20px Abstand
    }

    infoCard.style.top = `${top}px`
    infoCard.style.left = `${left}px`
}

// Hilfsfunktion: Card verstecken (mit Verzögerung)
function hideCard() {
    hideTimeout = setTimeout(() => {
        infoCard.hidden = true
    }, 100) // 100ms Zeit um zur Card zu kommen
}

// Event Listeners für Segmente
segments.forEach(segment => {
    const id = segment.id
    const content = segmentContent[id]

    if (!content) return

    // Mouse events
    segment.addEventListener('mouseenter', () => showCard(content, segment))
    segment.addEventListener('mouseleave', hideCard)
    segment.addEventListener('click', () => {
        window.location.href = content.link
    })

    // Keyboard support
    segment.addEventListener('focus', () => showCard(content, segment))
    segment.addEventListener('blur', hideCard)
    segment.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault() // Verhindert scrollen bei Space
            window.location.href = content.link
        }
    })
})

// Event Listeners für die Card selbst
infoCard.addEventListener('mouseenter', () => {
    // Timeout abbrechen, wenn Maus auf Card kommt
    if (hideTimeout) {
        clearTimeout(hideTimeout)
        hideTimeout = null
    }
})

infoCard.addEventListener('mouseleave', hideCard)