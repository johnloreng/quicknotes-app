#!/usr/bin/env bash
# Run this script from inside the quicknotes-app directory:
#   bash setup-git.sh

set -e  # Exit immediately if any command fails

echo "▶ Initialising git repository..."
git init

# Configure a default identity if none is set (edit these or remove if you already have global config)
# git config user.name  "Your Name"
# git config user.email "you@example.com"

# ── Commit 1: HTML structure ──────────────────────────────────────────────────
echo ""
echo "▶ Commit 1/5 — HTML structure"
git add index.html
git commit -m "feat: add HTML5 skeleton and semantic page structure

- Valid DOCTYPE, lang, charset and viewport meta tags
- Semantic layout: header, main (two sections), footer
- note-form with note-input, note-category select and submit button
- search-input, notes-list, note-count and error-message elements"

# ── Commit 2: CSS styling ─────────────────────────────────────────────────────
echo ""
echo "▶ Commit 2/5 — CSS styling"
git add style.css
git commit -m "feat: add full stylesheet with layout, cards and responsive design

- box-sizing reset and CSS custom-property design system
- Dark glassmorphism theme for body, header, main and footer
- Flexbox form layout that stacks vertically on small screens
- Note cards with padding, border, border-radius and margin
- Visible :hover and :active transitions on all buttons
- Distinct border-left and gradient tint per category class
- @media (max-width: 600px) rule for mobile layout"

# ── Commit 3: Core JS — add, delete and render ────────────────────────────────
echo ""
echo "▶ Commit 3/5 — add, delete and render"
git add script.js
git commit -m "feat: implement note add/delete and render() function

- Notes stored as objects with id, text, category and createdAt
- render() rebuilds list with createElement/textContent (no innerHTML)
- handleAdd() creates note object with crypto.randomUUID()
- handleDelete() filters note by id and re-renders
- Notes sorted newest-first via Array.unshift()"

# ── Commit 4: localStorage persistence and validation ─────────────────────────
echo ""
echo "▶ Commit 4/5 — storage and validation"
git add script.js
git commit -m "feat: add localStorage persistence and input validation

- saveNotes() serialises notes array with JSON.stringify
- loadNotes() deserialises on init with JSON.parse (null-safe)
- Validation rejects empty notes and notes over 200 characters
- Error shown in #error-message via textContent; cleared on valid input
- Live character counter warns while typing beyond limit
- Correct count messages for 0, 1 and many notes"

# ── Commit 5: Search and README ───────────────────────────────────────────────
echo ""
echo "▶ Commit 5/5 — search feature and README"
git add script.js README.md
git commit -m "feat: add real-time search and project README

- handleSearch() filters notes by text or category on every input event
- 'No results' message shown safely via textContent when search has no matches
- README: project description, feature list, local run instructions
- README: 'What I Learned' section with 5 detailed reflections
- README: project structure overview"

echo ""
echo "✅ Done! 5 commits created. Run 'git log --oneline' to verify."
