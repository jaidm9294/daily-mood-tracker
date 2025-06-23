// script.js

const emojiButtons = document.querySelectorAll('.emoji');
const submitButton = document.getElementById('submitMood');
const quoteText = document.getElementById('quoteText');
const saveQuoteButton = document.getElementById('saveQuote');
const shareQuoteButton = document.getElementById('shareQuote');
const moodList = document.getElementById('moodList');
const clearDataButton = document.getElementById('clearData');

let selectedMood = null;
let currentQuote = '';

const quotes = {
  happy: [
    "Keep shining, the world needs your light!",
    "Happiness is contagious — spread it!",
    "Enjoy the little things in life."
  ],
  sad: [
    "Every storm runs out of rain.",
    "Tough times never last, but tough people do.",
    "You’re not alone. Better days are coming."
  ],
  angry: [
    "Breathe in calm, breathe out chaos.",
    "Let go of what you can't control.",
    "Inner peace begins the moment you choose not to allow another person to control your emotions."
  ],
  relaxed: [
    "Peace is the highest happiness.",
    "Just breathe and enjoy the moment.",
    "Relaxation is the key to recharge."
  ],
  anxious: [
    "You are stronger than your anxiety.",
    "One step at a time is progress.",
    "Courage doesn’t always roar."
  ],
  excited: [
    "Your energy is electric — own it!",
    "Go make some epic memories!",
    "The best is yet to come."
  ],
  bored: [
    "Try something new today.",
    "Your boredom is the canvas for creativity.",
    "Every moment holds a possibility."
  ],
  tired: [
    "Rest is productive too.",
    "Pause. Breathe. Reset.",
    "You deserve some rest, champion."
  ],
  motivated: [
    "Dream big, start small, act now.",
    "Push yourself — no one else will do it for you.",
    "Today is your opportunity to build the tomorrow you want."
  ]
};

emojiButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    emojiButtons.forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    selectedMood = btn.getAttribute('data-mood');
  });
});

submitButton.addEventListener('click', () => {
  if (!selectedMood) {
    alert("Please select your mood first.");
    return;
  }
  const today = new Date().toLocaleDateString();
  const quoteList = quotes[selectedMood];
  const randomQuote = quoteList[Math.floor(Math.random() * quoteList.length)];
  currentQuote = randomQuote;

  // Display quote
  quoteText.textContent = randomQuote;

  // Save to localStorage
  const storedMoods = JSON.parse(localStorage.getItem('moods')) || [];
  storedMoods.push({ date: today, mood: selectedMood, quote: randomQuote });
  localStorage.setItem('moods', JSON.stringify(storedMoods));

  // Update UI
  updateMoodHistory();
});

saveQuoteButton.addEventListener('click', () => {
  if (!currentQuote) {
    alert("No quote to save yet.");
    return;
  }
  alert("Quote saved locally!");
});

shareQuoteButton.addEventListener('click', () => {
  if (!currentQuote) {
    alert("No quote to share yet.");
    return;
  }
  const shareText = `Mood: ${selectedMood}\nQuote: \"${currentQuote}\"`;
  navigator.clipboard.writeText(shareText)
    .then(() => alert("Quote copied to clipboard!"))
    .catch(() => alert("Failed to copy quote."));
});

clearDataButton.addEventListener('click', () => {
  if (confirm("Are you sure you want to delete all your mood history?")) {
    localStorage.removeItem('moods');
    updateMoodHistory();
  }
});

function updateMoodHistory() {
    const storedMoods = JSON.parse(localStorage.getItem('moods')) || [];
    moodList.innerHTML = '';
    storedMoods.slice().reverse().forEach(entry => {
      const li = document.createElement('li');
      li.innerHTML = `<strong>${entry.date}</strong>: ${entry.mood} ${getEmojiForMood(entry.mood)}<br><em>“${entry.quote}”</em>`;
      moodList.appendChild(li);
    });
  }
  

function getEmojiForMood(mood) {
  const emojiMap = {
    happy: '😊', sad: '😢', angry: '😠', relaxed: '😌', anxious: '😟',
    excited: '🤩', bored: '🥱', tired: '😴', motivated: '💪'
  };
  return emojiMap[mood] || '';
}

// On load
updateMoodHistory();// script.js

