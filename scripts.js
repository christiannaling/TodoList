document.addEventListener("DOMContentLoaded", function() {
    const textarea = document.getElementById('note-textarea');
    const titleInput = document.getElementById('note-title');
    const saveBtn = document.getElementById('save-btn');
    const clearBtn = document.getElementById('clear-btn');
    const notesList = document.getElementById('notes-list');

    let currentNoteId = null;

    // Load saved notes from local storage
    loadSavedNotes();

    // Save note to local storage
    saveBtn.addEventListener('click', function() {
        const title = titleInput.value.trim();
        const content = textarea.value;

        if (title) {
            const note = { title, content };
            if (currentNoteId) {
                localStorage.setItem(currentNoteId, JSON.stringify(note));
            } else {
                const noteId = `note-${new Date().getTime()}`;
                localStorage.setItem(noteId, JSON.stringify(note));
            }
            alert('Note saved!');
            clearFields();
            loadSavedNotes();
        } else {
            alert('Please enter a title for your note.');
        }
    });

    // Clear note
    clearBtn.addEventListener('click', function() {
        clearFields();
    });

    // Load saved notes
    function loadSavedNotes() {
        notesList.innerHTML = '';
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith('note-')) {
                const note = JSON.parse(localStorage.getItem(key));
                const li = document.createElement('li');

                const noteTitle = document.createElement('span');
                noteTitle.textContent = note.title;
                noteTitle.classList.add('note-title');
                noteTitle.addEventListener('click', function() {
                    loadNoteForEditing(key, note);
                });

                const noteActions = document.createElement('div');
                noteActions.classList.add('note-actions');

                const editButton = document.createElement('button');
                editButton.textContent = 'Edit';
                editButton.addEventListener('click', function() {
                    loadNoteForEditing(key, note);
                });

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.classList.add('delete-btn');
                deleteButton.addEventListener('click', function() {
                    localStorage.removeItem(key);
                    loadSavedNotes();
                });

                noteActions.appendChild(editButton);
                noteActions.appendChild(deleteButton);

                li.appendChild(noteTitle);
                li.appendChild(noteActions);

                notesList.appendChild(li);
            }
        }
    }

    // Load note for editing
    function loadNoteForEditing(key, note) {
        currentNoteId = key;
        titleInput.value = note.title;
        textarea.value = note.content;
    }

    // Clear fields
    function clearFields() {
        currentNoteId = null;
        titleInput.value = '';
        textarea.value = '';
    }
});
