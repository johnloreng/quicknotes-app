# QuickNotes App

## Description

QuickNotes is a lightweight, browser-based note-taking application built with vanilla HTML5, CSS3 and JavaScript — no frameworks, no build tools, no back-end. It lets you capture thoughts instantly, organise them by category (Personal, Work or Study), search through them in real time, and have them survive page refreshes thanks to `localStorage`. The entire app lives in three files (`index.html`, `style.css`, `script.js`) and opens directly in any modern browser.

---

## Features

- **Add notes** — type text, choose a category and click **Add Note**
- **Category labels** — Personal, Work and Study, each with its own colour
- **Delete a note** — click the **Delete** button on any card
- **Clear all notes** — one-click with a confirmation prompt
- **Real-time search** — filters notes by text as you type; shows *"No notes match your search."* when nothing matches
- **Validation** — empty input shows *"Please type a note first."*; over 200 characters shows *"Notes must be 200 characters or fewer."*
- **Persistent storage** — notes are saved to `localStorage` with `JSON.stringify` and reloaded with `JSON.parse` on every visit
- **Live note count** — *"You have no notes yet."* / *"You have 1 note."* / *"You have N notes."*
- **Responsive layout** — form controls stack vertically on screens ≤ 600 px

---

## How to Run Locally

No install or build step is required.

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/quicknotes-app.git
   cd quicknotes-app
   ```

2. Open `index.html` in any modern browser:
   - **Double-click** the file in Finder / File Explorer, **or**
   - Serve it with a local server to avoid file-protocol quirks:
     ```bash
     python3 -m http.server 8080
     # then open http://localhost:8080
     ```

3. Done — no `npm install`, no config, no compilation.

---

## What I Learned

1. **Safe DOM construction with `createElement` and `textContent`**  
   Building every note card with `document.createElement()` and setting text via `element.textContent` (never `innerHTML`) keeps user input safe from XSS injection. Separating developer-controlled markup from user data made this rule feel practical rather than theoretical.

2. **`localStorage` as a zero-dependency persistence layer**  
   Serialising the notes array with `JSON.stringify()` on every change and deserialising with `JSON.parse()` on load is a clean way to persist state without a back-end. Guarding `JSON.parse` against a `null` return value (first visit) taught me to always handle the empty-storage edge case.

3. **CSS custom properties for a consistent design system**  
   Defining all colours, spacing and transitions as `--variables` in `:root` meant every component stayed in sync automatically. Changing a single token (e.g. `--personal-color`) instantly updated every element that referenced it.

4. **Flexbox for adaptive form layouts**  
   Laying out the form as a `flex-direction: row; flex-wrap: wrap` container that switches to `flex-direction: column` inside a single `@media (max-width: 600px)` rule replaced what would otherwise have needed a full grid system.

5. **Semantic HTML and accessible form patterns**  
   Pairing every `<label for="">` with a matching element `id`, using `aria-live="polite"` on the error paragraph, and structuring content with `<header>`, `<main>`, `<section>` and `<footer>` added meaningful accessibility at almost zero extra cost.

---

## Project Structure

```
quicknotes-app/
├── index.html   # HTML5 structure: header, two sections, footer, form, list
├── style.css    # Layout, card styles, category colours, responsive rules
├── script.js    # App logic: state, render(), CRUD, search, validation, storage
└── README.md    # This file
```

---

## Git Commit History

| # | Commit message | What it covers |
|---|---|---|
| 1 | `Add page structure` | `index.html` — DOCTYPE, meta tags, semantic layout, `note-form`, `note-input`, `note-category` (Personal / Work / Study), `search-input`, `notes-list`, `note-count`, `error-message` |
| 2 | `Style layout and note cards` | `style.css` — box-sizing reset, coloured header, centred 700 px main column, white section cards, Flexbox form, note cards, per-category left-border colours, red error style, `@media (max-width: 600px)` |
| 3 | `Add notes with categories` | `script.js` — note object `{id, text, category, createdAt}`, `render()` with `createElement`/`textContent`, `handleAdd()` (clears input after adding), `handleDelete()`, category badge and date on each card |
| 4 | `Add validation, delete and count` | `script.js` — exact validation messages, per-note delete, count messages *"You have no notes yet." / "You have 1 note." / "You have N notes."* |
| 5 | `Add localStorage and search` | `script.js` — `saveNotes()` / `loadNotes()` with `JSON.stringify` / `JSON.parse`, real-time text search, *"No notes match your search."* |
| 6 | `Add README` | `README.md` — description, features, local run instructions, What I Learned, project structure, commit history |
