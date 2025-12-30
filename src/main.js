import './style.css'

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
        link: '/services/produkt-strategie'
    },
    'technik': {
        title: 'Technik',
        text: 'Technik lorem ipsum dolor sit amet.',
        link: '/services/technik'
    },
    'organisation': {
        title: 'Organisation',
        text: 'Organisation lorem ipsum dolor sit amet.',
        link: '/services/organisation'
    },
    'zentrum': {
        title: 'Qualität & Exzellenz',
        text: 'Qualität lorem ipsum dolor sit amet.',
        link: '/services/Qualitaet-Exzellenz'
    }
}

// Event Listeners für jedes Segment
segments.forEach(segment => {
    const id = segment.id
    const content = segmentContent[id]

    // Fallback, wenn kein Content existiert
    if (!content) return

    // Mouse Enter - Card zeigen und positionieren
    segment.addEventListener('mouseenter', (event) => {
        cardTitle.textContent = content.title
        cardText.textContent = content.text
        cardButton.href = content.link

        // Card anzeigen
        infoCard.hidden = false

        // Position berechnen
        const app = document.getElementById('app')
        const appRect = app.getBoundingClientRect()

        // Mausposition relativ zum #app Container
        const x = event.clientX - appRect.left
        const y = event.clientY - appRect.top

        // Card positionieren (mit Offset, damit sie nicht unter der Maus ist)
        infoCard.style.left = `${x + 20}px`
        infoCard.style.top = `${y + 20}px`
    })

    // Mouse Leave - Card verstecken
    segment.addEventListener('mouseleave', () => {
        infoCard.hidden = true
    })

    // Click - Navigieren
    segment.addEventListener('click', () => {
        window.location.href = content.link
    })
})