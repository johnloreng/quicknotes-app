// ─── Element Selection via querySelector ────────────────────────────────────
const noteForm      = document.querySelector('#note-form');
const noteInput     = document.querySelector('#note-input');
const noteCategory  = document.querySelector('#note-category');
const searchInput   = document.querySelector('#search-input');
const notesList     = document.querySelector('#notes-list');
const noteCount     = document.querySelector('#note-count');
const errorMessage  = document.querySelector('#error-message');
const submitBtn     = document.querySelector('#submit-btn');
const clearAllBtn   = document.querySelector('#clear-all-btn');

// ─── Constants ───────────────────────────────────────────────────────────────
const STORAGE_KEY   = 'quicknotes_notes';
const MAX_LENGTH    = 200;

// ─── State: Notes Array of Objects ───────────────────────────────────────────
// Each note: { id, text, category, createdAt }
let notes = [];

// ─── localStorage Helpers ─────────────────────────────────────────────────────
function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

function loadNotes() {
  const stored = localStorage.getItem(STORAGE_KEY);
  notes = stored ? JSON.parse(stored) : [];
}

// ─── Count Message (zero / one / many) ───────────────────────────────────────
function getCountMessage(count) {
  if (count === 0) return 'You have no notes yet.';
  if (count === 1) return 'You have 1 note.';
  return `You have ${count} notes.`;
}

// ─── Validation ───────────────────────────────────────────────────────────────
function validate(text) {
  if (text.trim() === '') {
    return 'Please type a note first.';
  }
  if (text.trim().length > MAX_LENGTH) {
    return 'Notes must be 200 characters or fewer.';
  }
  return null; // valid
}

function showError(message) {
  errorMessage.textContent = message;
}

function clearError() {
  errorMessage.textContent = '';
}

// ─── Render Function ─────────────────────────────────────────────────────────
// Rebuilds the list from the notes array.
// Uses createElement and textContent — never innerHTML for user text.
function render(filterText = '') {
  // Clear existing list items
  while (notesList.firstChild) {
    notesList.removeChild(notesList.firstChild);
  }

  // Filter notes based on search query
  const query = filterText.trim().toLowerCase();
  const filtered = query
    ? notes.filter(note =>
        note.text.toLowerCase().includes(query)
      )
    : notes;

  // Update count based on total notes (not filtered), matching spec
  noteCount.textContent = getCountMessage(notes.length);

  if (filtered.length === 0 && notes.length > 0 && query) {
    const li = document.createElement('li');
    li.className = 'note-card';
    const noResult = document.createElement('p');
    noResult.textContent = 'No notes match your search.';
    noResult.style.color = 'var(--text-muted)';
    li.appendChild(noResult);
    notesList.appendChild(li);
    return;
  }

  // Build each note card using createElement and textContent only
  filtered.forEach(note => {
    const li = document.createElement('li');
    li.className = `category-${note.category}`;
    li.dataset.id = note.id;

    // Note body wrapper
    const body = document.createElement('div');
    body.className = 'note-body';

    // Note text — set via textContent (safe, never innerHTML)
    const textEl = document.createElement('p');
    textEl.className = 'note-text';
    textEl.textContent = note.text;

    // Note meta (category + date)
    const meta = document.createElement('div');
    meta.className = 'note-meta';

    const badge = document.createElement('span');
    badge.className = 'category-badge';
    badge.textContent = note.category.charAt(0).toUpperCase() + note.category.slice(1);

    const dateEl = document.createElement('span');
    dateEl.className = 'note-date';
    // createdAt is already a readable string — display it directly
    dateEl.textContent = note.createdAt;

    meta.appendChild(badge);
    meta.appendChild(dateEl);

    body.appendChild(textEl);
    body.appendChild(meta);

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.className = 'delete-note-btn';
    deleteBtn.textContent = 'Delete';
    deleteBtn.dataset.id = note.id;
    deleteBtn.setAttribute('aria-label', 'Delete note');
    deleteBtn.addEventListener('click', handleDelete);

    li.appendChild(body);
    li.appendChild(deleteBtn);

    notesList.appendChild(li);
  });
}

// ─── Add Feature ─────────────────────────────────────────────────────────────
function handleAdd(event) {
  event.preventDefault();
  clearError();

  const text     = noteInput.value;
  const category = noteCategory.value;
  const error    = validate(text);

  if (error) {
    showError(error);
    noteInput.focus();
    return;
  }

  // Build the note object — createdAt stored as a readable date/time string
  const now = new Date();
  const newNote = {
    id:        crypto.randomUUID(),
    text:      text.trim(),
    category:  category,
    createdAt: now.toLocaleString(undefined, {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    })
  };

  notes.unshift(newNote); // newest first
  saveNotes();
  render(searchInput.value);

  // Reset form
  noteInput.value = '';
  noteCategory.value = noteCategory.options[0].value;
  noteInput.focus();
}

// ─── Delete Feature ───────────────────────────────────────────────────────────
function handleDelete(event) {
  const id = event.currentTarget.dataset.id;
  notes = notes.filter(note => note.id !== id);
  saveNotes();
  render(searchInput.value);
}

// ─── Search Feature ───────────────────────────────────────────────────────────
function handleSearch(event) {
  render(event.target.value);
}

// ─── Clear All Feature ────────────────────────────────────────────────────────
function handleClearAll() {
  if (notes.length === 0) return; // nothing to clear
  const confirmed = confirm('Delete all notes?');
  if (!confirmed) return;
  notes = [];
  saveNotes();
  searchInput.value = '';
  clearError();
  render();
}

// ─── Event Listeners ─────────────────────────────────────────────────────────
noteForm.addEventListener('submit', handleAdd);
searchInput.addEventListener('input', handleSearch);
clearAllBtn.addEventListener('click', handleClearAll);

// Clear the error as soon as the user starts correcting their input
noteInput.addEventListener('input', () => {
  if (errorMessage.textContent !== '') {
    clearError();
  }
});

// ─── Initialisation ───────────────────────────────────────────────────────────
loadNotes();
render();
