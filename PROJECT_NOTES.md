
# Itacama Interactive Core – Projekt-Notizen
``` markdown
## Stand: 2026-05-16

Heute erledigt:

- Neuer Feature-Branch für CMS-/Accessibility-/Robustheits-Arbeiten wurde verwendet.
- `info-box.js` wurde robuster strukturiert:
  - State und DOM-Elemente stehen oben.
  - Guard Clauses prüfen, ob wichtige DOM-Elemente vorhanden sind.
  - CMS-Daten werden aus `#expertise-data` gelesen.
  - Unvollständige CMS-Datensätze werden per `console.warn()` gemeldet.
  - Bubbles ohne passende CMS-Daten oder Info-Box werden nicht aktiviert.
  - Event Listener stehen bewusst am Ende der Funktion.
- Accessibility wurde vorbereitet/erweitert:
  - `aria-controls`
  - `aria-expanded`
  - aktive Bubble-Klasse vorbereitet: `.bubble-group--active`
- Bug gefixt:
  - Falsche ID `#expertise-data-wrapper` wurde korrigiert zu `#expertise-data`.
  - Dadurch werden CMS-Daten wieder gefunden und Bubble-Klicks funktionieren wieder.

## Aktueller wichtiger Stand

Das Matching-System bleibt zentral:
```

text Bubble 2 → data-bubble="2" CMS-Daten 2 → data-rank="2" Info-Box 2 → id="info-box-2"```

Wenn eine dieser drei Stellen nicht zusammenpasst, wird die Bubble nicht korrekt aktiviert.

## Wichtige Lernnotiz: `querySelector`
```

javascript document.querySelector('#expertise-data')``` 

sucht exakt ein Element mit:
```

html id="expertise-data"```

Wenn im JavaScript versehentlich eine andere ID steht, z. B.:
```

javascript document.querySelector('#expertise-data-wrapper')``` 

und diese ID im HTML nicht existiert, ist das Ergebnis:
```

javascript null```

Dann greift die Guard Clause und `initInfoBox()` wird mit `return` beendet. Dadurch werden auch keine Event Listener registriert.

## Nächste Schritte

### 1. Webflow-CMS-Integration vorbereiten

Als nächstes soll geklärt werden, wie Webflow die CMS-Daten ausgibt.

Benötigte CMS-Felder:

- `Rank`
- `Title`
- `Teaser`
- `Slug`

Zielstruktur im HTML:
```

html
``` 

Zu prüfen:

- Wie werden Custom Attributes in Webflow gesetzt?
- Können CMS-Felder direkt in `data-*` Attribute eingefügt werden?
- Bleibt `#expertise-data` eindeutig?
- Wird die Collection List wirklich auf der Seite gerendert, auch wenn sie versteckt ist?
- Was passiert bei fehlenden oder leeren CMS-Feldern?

### 2. Code-Robustheit weiter verbessern

Mögliche nächste Verbesserungen:

- `main.js`: prüfen, ob `#core-wrapper` existiert, bevor SVG eingefügt wird.
- `connector-lines.js`: prüfen, ob `#interactive-wrapper` existiert, bevor das Overlay-SVG erstellt wird.
- `animations.js`: prüfen, ob `#core-wrapper` existiert, bevor `mouseleave` registriert wird.
- Konsolen-Warnungen vereinheitlichen.

### 3. Accessibility weiter verbessern

Mögliche nächste Verbesserungen:

- aktive Bubble sichtbar markieren:
  - `.bubble-group--active .bubble`
  - `.bubble-group--active .center-bubble`
- `aria-expanded` final testen.
- `aria-controls` final testen.
- Link-Text eventuell spezifischer machen:
  - statt `Mehr erfahren`
  - z. B. `Mehr über Produkt erfahren`
- Tastatur-Test:
  - Tab
  - Enter
  - Space
  - sichtbarer Fokus
  - aktive Auswahl

## Vorschlag für nächsten Chat

Zu Beginn sagen:

> Ich arbeite am Projekt `itacama-interactive-core`. Wir haben Accessibility-Grundlagen, Resize-Prob
```



Stand: 2026-05-15

## Projektkontext

Die Webseite `itacama.ch` ist auf Webflow gebaut.  
Dieses Projekt entwickelt ein Interactive-Element, das später in die Webflow-Webversion integriert werden soll.

Wichtige Rahmenbedingungen:

- Das Interactive-Element soll nur auf Desktop/Web angezeigt werden.
- Tablet und Mobile Breakpoints brauchen das Element nicht.
- Die `expertise-data` sollen später aus dem Webflow CMS kommen.
- Accessibility ist wichtig.
- Der Code soll verständlich bleiben, da das Projekt auch zum Lernen von Front-End-Programmierung dient.

## Aktuelle Projektstruktur

Wichtige Dateien:
```
text
src/
animations.js
connector-lines.js
info-box.js
main.js
style.css
svg-builder.js
index.html
```
## Rollen der Dateien

### `main.js`

Startpunkt des Projekts.

Aufgaben:

- CSS importieren
- SVG erzeugen
- SVG in `#core-wrapper` einfügen
- Info-Box-Logik starten
- Page-Load-Animation starten
- Hover-Animationen starten

### `svg-builder.js`

Erzeugt das SVG dynamisch per JavaScript.

Enthält:

- SVG `viewBox`
- Gradients
- Glow-Filter
- Decorative Lines
- Bubble-Gruppen
- Bubble-Texte

Wichtig:

- Jede klickbare Bubble-Gruppe hat ein `data-bubble` Attribut.
- Das `data-bubble` Attribut soll auf dem `<g class="bubble-group">` liegen.
- Das `data-bubble` Attribut auf den einzelnen `<ellipse>`-Elementen wurde als unnötig erkannt und soll entfernt bleiben.

Beispiel-Prinzip:
```
html
<g class="bubble-group" data-bubble="2">
<ellipse class="bubble" />
<text>PRODUKT</text>
</g>
```
### `info-box.js`

Liest Daten aus dem DOM und zeigt beim Klick oder Tastatur-Aktivieren die passende Info-Box.

Datenfluss:
```
text
Bubble data-bubble="2"
↓
group.dataset.bubble
↓
rank = "2"
↓
expertiseData[rank]
↓
Produkt-Daten
↓
Info-Box wird gefüllt
```
Wichtiges Matching-System:
```
text
Bubble 2 → data-bubble="2"
CMS-Daten 2 → data-rank="2"
Info-Box 2 → id="info-box-2"
```
### `connector-lines.js`

Zeichnet die Verbindungslinie zwischen aktiver Info-Box und aktiver Bubble.

Wichtig:

- Die Linie wird in ein Overlay-SVG mit `id="connector-overlay"` gezeichnet.
- Die Positionen werden mit `getBoundingClientRect()` gemessen.
- Die Linie muss bei Resize neu gezeichnet werden, weil sich Layout-Positionen ändern.

### `animations.js`

Steuert Animationen mit GSAP.

Enthält:

- Page-Load-Animation
- Hover-Animationen

Wichtig korrigiert:
```
javascript
bubble.setAttribute('filter', 'url(#glow)');
```
Die schliessende Klammer in `url(#glow)` ist wichtig.

### `style.css`

Steuert Layout, SVG-Grösse, Info-Boxen, Fokus-Stile und Breakpoints.

Wichtige Punkte:

- `.container` wurde auf `max-width: 1280px` angepasst.
- `#core-wrapper` hat eine Mindestbreite bekommen, damit das SVG auf Desktop gross bleibt.
- Das Interactive-Element wird unterhalb eines höheren Breakpoints ausgeblendet, damit keine Info-Box abgeschnitten wird.

## Accessibility-Stand

Die Bubbles sind inzwischen per Tastatur bedienbar.

Umgesetzt in `info-box.js`:

- `tabindex="0"`
- `role="button"`
- `aria-label`
- Aktivierung mit `Enter`
- Aktivierung mit `Space`

Prinzip:
```
text
Tab → Bubble bekommt Fokus
Enter/Space → Bubble wird aktiviert
```
Wichtig:

- Beim reinen Fokus durch `Tab` wird die Info-Box nicht automatisch geöffnet.
- Erst `Enter` oder `Space` ruft `showInfoBox(rank)` auf.
- Das entspricht dem Verhalten eines echten Buttons.

Fokus-Stil:

- Der blaue Browser-Fokusrahmen wurde entfernt.
- Stattdessen wird der vorhandene SVG-Glow verwendet.

CSS-Prinzip:
```
css
.bubble-group {
cursor: pointer;
outline: none;
}

.bubble-group:focus-visible .bubble,
.bubble-group:focus-visible .center-bubble {
filter: url(#glow);
}
```
Der Glow-Filter ist im SVG in `<defs>` definiert und wird per `url(#glow)` referenziert.

## Info-Box-Logik

Aktueller Grundaufbau in `info-box.js`:
```
javascript
import { drawConnectorLine } from './connector-lines.js';

export function initInfoBox() {
const expertiseData = {};
let activeRank = null;
let resizeTimeout = null;

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

        document.querySelectorAll('.info-box').forEach(box => {
            box.classList.add('info-box--hidden');
        });

        const visibleBox = document.querySelector(`#info-box-${rank}`);
        if (!visibleBox) return;

        visibleBox.querySelector('.info-title').textContent = data.title;
        visibleBox.querySelector('.info-teaser').textContent = data.teaser;
        visibleBox.querySelector('.info-link').href = `https://www.itacama.ch/expertise/${data.slug}`;

        visibleBox.classList.remove('info-box--hidden');
        drawConnectorLine(rank);
    }

    function redrawConnectorLineAfterResize() {
        if (!activeRank) return;

        clearTimeout(resizeTimeout);

        resizeTimeout = setTimeout(() => {
            drawConnectorLine(activeRank);
        }, 10);
    }

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
```
## Resize-Problem

Problem vorher:
```
text
Bubble klicken → Linie wird korrekt gezeichnet
Fenstergrösse ändern → Layout verschiebt sich
Linie bleibt auf alter Position
```
Lösung:

- Aktive Bubble wird in `activeRank` gespeichert.
- Beim Resize wird die Linie für `activeRank` neu gezeichnet.
- Resize wird mit kleinem Timeout debounced.

Aktueller Timeout:
```
javascript
}, 10);
```
Das funktioniert visuell sehr gut: Die Linie bleibt praktisch immer sauber.

## Desktop-Skalierung

Problem vorher:
```
text
Fenster wird kleiner → SVG wird sehr klein → Bubbles wirken verloren
```
Lösung:

- `#core-wrapper` bekommt eine Mindestbreite.
- SVG bleibt auf Desktop gross.
- Das Interactive-Element wird ausgeblendet, bevor Info-Boxen abgeschnitten werden.

Wichtiger CSS-Stand:
```
css
.container {
max-width: 1280px;
margin: 0 auto;
text-align: center;
}
```

```
css
#core-wrapper {
flex: 1 0 560px;
min-width: 560px;
overflow: visible;
}
```
Breakpoint wurde höher gesetzt als Webflow-Tablet-Breakpoint, weil das Element mehr Breite braucht.

Aktueller sinnvoller Stand:
```
css
@media (max-width: 1180px) {
#interactive-wrapper {
display: none;
}
}
```
Falls künftig wieder etwas abgeschnitten wird, Breakpoint testweise erhöhen:
```
css
@media (max-width: 1200px) {
#interactive-wrapper {
display: none;
}
}
```
## Warum Breakpoint über 991px?

Webflow Tablet startet typischerweise bei `991px` und kleiner.

Aber dieses Interactive-Element braucht mehr Platz als 992px, ungefähr:
```
text
Info links + Gap + SVG + Gap + Info rechts + Padding + Body Padding
```
Darum ist es sinnvoll, das Element bereits unter ca. `1180px` auszublenden.

## Offene nächste Schritte

### 1. Webflow-CMS-Integration vorbereiten

Aktuell kommen Daten aus Dummy-HTML:
```
html
<div id="expertise-data" style="display:none">
  <div data-rank="1" data-title="..." data-teaser="..." data-slug="..."></div>
</div>
```
Später soll Webflow CMS diese Struktur erzeugen.

Zu klären:

- Wie wird die Collection List in Webflow aufgebaut?
- Welche Felder braucht jedes CMS Item?
    - Rank
    - Title
    - Teaser
    - Slug
- Wie werden `data-*` Attribute in Webflow gesetzt?
- Gibt es Fallbacks, wenn Daten fehlen?

### 2. Robustheit verbessern

Mögliche spätere Verbesserungen:

- Fehlende DOM-Elemente sauberer behandeln
- Warnungen in der Konsole ausgeben, wenn CMS-Daten fehlen
- Prüfen, ob `wrapper` existiert, bevor SVG eingefügt wird
- Prüfen, ob `#expertise-data` vorhanden ist

### 3. Accessibility weiter verbessern

Mögliche nächste Verbesserungen:

- Aktive Bubble visuell markieren
- `aria-expanded` setzen
- `aria-controls` setzen
- Info-Boxen mit den Bubbles semantisch verbinden
- Prüfen, ob Screenreader-Verhalten angenehm ist
- Eventuell sichtbaren Fokus noch deutlicher gestalten

### 4. Desktop-only Webflow-Integration

Wenn in Webflow eingebettet:

- Script/CSS nur auf Desktop laden oder Element nur auf Desktop anzeigen
- Prüfen, ob Webflow eigene Klassen/Breakpoints Konflikte erzeugen
- Prüfen, ob `#interactive-wrapper`, `#core-wrapper`, `#expertise-data` IDs eindeutig bleiben

## Lernnotizen

### `data-*` Attribute

HTML:
```
html
<g data-bubble="2"></g>
```
JavaScript:
```
javascript
element.dataset.bubble
```
Ergebnis:
```
javascript
"2"
```
Wichtig:

- Werte aus `dataset` sind Strings.
- `"2"` funktioniert als Key für `expertiseData["2"]`.

### `querySelectorAll().forEach()`
```
javascript
document.querySelectorAll('.bubble-group').forEach(group => {
    // group ist jeweils eine einzelne Bubble-Gruppe
});
```
Bedeutung:
```
text
Finde alle Bubble-Gruppen und gehe sie einzeln durch.
```
### `getBoundingClientRect()`

Wird verwendet, um Positionen und Grössen im Browserfenster zu messen.

Beispiel:
```
javascript
const rect = element.getBoundingClientRect();
```
Liefert u. a.:

- `left`
- `top`
- `right`
- `bottom`
- `width`
- `height`

### Debouncing

Debouncing verhindert, dass eine Funktion zu oft ausgeführt wird.

Im Projekt verwendet für Resize:
```
javascript
clearTimeout(resizeTimeout);

resizeTimeout = setTimeout(() => {
    drawConnectorLine(activeRank);
}, 10);
```
Bedeutung:
```
text
Alten geplanten Aufruf abbrechen.
Neuen Aufruf in 10ms planen.
```
### SVG `<defs>`

In `<defs>` werden Dinge definiert, die später verwendet werden:

- Gradients
- Filter
- Masks

Beispiel:
```
html
<filter id="glow">
  ...
</filter>
```
Verwendung:
```
css
filter: url(#glow);
```
oder:
```
html
filter="url(#glow)"
```
## Wichtig für nächsten Chat

Zu Beginn des nächsten Chats sagen:

> Ich arbeite am Projekt `itacama-interactive-core`. Bitte lies diese Projekt-Notizen. Wir haben Accessibility, Resize-Problem und Desktop-Skalierung bereits gelöst. Als nächstes möchte ich mit Webflow-CMS-Integration / weiterer Accessibility / Code-Robustheit weitermachen.
```


Kleine Empfehlung: Speichere die Datei wirklich im Projektroot als:

```plain text
PROJECT_NOTES.md
```


Dann kannst du sie morgen im neuen Chat direkt als Kontext öffnen oder reinkopieren.