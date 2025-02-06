// Load flashcards from localStorage
let flashcards = JSON.parse(localStorage.getItem('flashcards')) || [];

// DOM Elements
const frontInput = document.getElementById('front');
const backInput = document.getElementById('back');
const groupInput = document.getElementById('group');
const createButton = document.getElementById('create-flashcard');
const flashcardsList = document.getElementById('flashcards-list');

// Render Flashcards
function renderFlashcards() {
  flashcardsList.innerHTML = '';
  flashcards.forEach((flashcard, index) => {
    const flashcardDiv = document.createElement('div');
    flashcardDiv.className = 'flashcard';
    flashcardDiv.innerHTML = `
      <h3>${flashcard.front}</h3>
      <p>${flashcard.back}</p>
      <p><strong>Group:</strong> ${flashcard.group}</p>
      <button onclick="editFlashcard(${index})" class="edit">Edit</button>
      <button onclick="deleteFlashcard(${index})">Delete</button>
    `;
    flashcardsList.appendChild(flashcardDiv);
  });
}

// Create Flashcard
createButton.addEventListener('click', () => {
  const front = frontInput.value.trim();
  const back = backInput.value.trim();
  const group = groupInput.value.trim();

  if (front && back && group) {
    flashcards.push({ front, back, group });
    localStorage.setItem('flashcards', JSON.stringify(flashcards));
    renderFlashcards();
    frontInput.value = '';
    backInput.value = '';
    groupInput.value = '';
  } else {
    alert('Please fill in all fields.');
  }
});

// Edit Flashcard
function editFlashcard(index) {
  const flashcard = flashcards[index];
  frontInput.value = flashcard.front;
  backInput.value = flashcard.back;
  groupInput.value = flashcard.group;

  createButton.textContent = 'Update Flashcard';
  createButton.onclick = () => {
    const front = frontInput.value.trim();
    const back = backInput.value.trim();
    const group = groupInput.value.trim();

    if (front && back && group) {
      flashcards[index] = { front, back, group };
      localStorage.setItem('flashcards', JSON.stringify(flashcards));
      renderFlashcards();
      createButton.textContent = 'Create Flashcard';
      createButton.onclick = createButton.onclick; // Reset the original functionality
      frontInput.value = '';
      backInput.value = '';
      groupInput.value = '';
    } else {
      alert('Please fill in all fields.');
    }
  };
}

// Delete Flashcard
function deleteFlashcard(index) {
  flashcards.splice(index, 1);
  localStorage.setItem('flashcards', JSON.stringify(flashcards));
  renderFlashcards();
}

// Initial Render
renderFlashcards();