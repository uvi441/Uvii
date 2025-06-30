// --- START: On-Screen Console Code ---
// This code adds a toggleable console to your screen without changing HTML/CSS.
(function() {
  // Create the necessary elements dynamically
  const consoleContainer = document.createElement('div');
  const consoleHeader = document.createElement('div');
  const consoleOutput = document.createElement('div');
  const toggleButton = document.createElement('button');

  // Style the toggle button
  toggleButton.textContent = '🐞 Console';
  Object.assign(toggleButton.style, {
    position: 'fixed',
    bottom: '15px',
    right: '15px',
    padding: '8px 12px',
    backgroundColor: '#ff4757',
    color: 'white',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
    zIndex: '1001',
    boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
    fontSize: '14px'
  });

  // Style the console container
  Object.assign(consoleContainer.style, {
    position: 'fixed',
    bottom: '0',
    left: '0',
    width: '100%',
    height: '30vh',
    backgroundColor: '#2c2c2c',
    borderTop: '2px solid #555',
    zIndex: '1000',
    display: 'flex',
    flexDirection: 'column',
    transform: 'translateY(100%)', // Initially hidden
    transition: 'transform 0.3s ease-in-out'
  });

  // Style the header
  consoleHeader.textContent = 'On-Screen Console';
  Object.assign(consoleHeader.style, {
    backgroundColor: '#444',
    padding: '5px 10px',
    fontWeight: 'bold',
    color: '#eee'
  });

  // Style the output area
  Object.assign(consoleOutput.style, {
    flexGrow: '1',
    overflowY: 'auto',
    padding: '10px',
    fontFamily: 'monospace',
    fontSize: '14px',
    color: '#e0e0e0'
  });

  // Assemble the console
  consoleContainer.appendChild(consoleHeader);
  consoleContainer.appendChild(consoleOutput);

  // Add elements to the page body once the DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    document.body.appendChild(toggleButton);
    document.body.appendChild(consoleContainer);
  });
  
  const printToConsole = (args, level, color) => {
    const entry = document.createElement('div');
    const prefix = { log: '➡️', warn: '⚠️', error: '❌' };
    entry.textContent = `${prefix[level] || ''} ` + args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : arg).join(' ');
    entry.style.color = color;
    entry.style.borderBottom = '1px solid #444';
    entry.style.padding = '4px 0';
    consoleOutput.appendChild(entry);
    consoleOutput.scrollTop = consoleOutput.scrollHeight;
  };

  // Hijack console methods
  const originalLog = console.log;
  console.log = function(...args) {
    originalLog.apply(console, args);
    printToConsole(args, 'log', '#e0e0e0');
  };
  
  const originalWarn = console.warn;
  console.warn = function(...args) {
    originalWarn.apply(console, args);
    printToConsole(args, 'warn', '#f0e68c');
  };

  const originalError = console.error;
  console.error = function(...args) {
    originalError.apply(console, args);
    printToConsole(args, 'error', '#ff6b6b');
  };

  // Button functionality
  let isConsoleVisible = false;
  toggleButton.addEventListener('click', () => {
    isConsoleVisible = !isConsoleVisible;
    consoleContainer.style.transform = isConsoleVisible ? 'translateY(0)' : 'translateY(100%)';
  });

})();
// --- END: On-Screen Console Code ---


// --- YOUR ORIGINAL CODE STARTS HERE ---

console.log("🚀 script.js loaded");

const firebaseConfig = {
  apiKey: "AIzaSyDYJFmTyC0bg88stR33nBlhaZPz5ENtoCE",
  authDomain: "uvi-web-app-8ec1e.firebaseapp.com",
  databaseURL: "https://uvi-web-app-8ec1e-default-rtdb.firebaseio.com",
  projectId: "uvi-web-app-8ec1e",
  storageBucket: "uvi-web-app-8ec1e.appspot.com",
  messagingSenderId: "90541572237",
  appId: "1:90541572237:web:6f59215375cab9e545a2c4"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const container = document.getElementById('song-container');
console.log("📦 Container element found:", container);

function renderSong(title, thumbnail, audioUrl) {
  const card = document.createElement("div");
  card.className = "song-card";
  card.innerHTML = `
    <div class="thumb-wrapper">
      <img src="${thumbnail}" alt="${title}" class="thumb" />
    </div>
    <div class="song-info">
      <h4 class="song-title">${title}</h4>
      <audio controls class="audio-player" src="${audioUrl}"></audio>
    </div>
  `;
  container.appendChild(card);
  console.log("✅ Song rendered:", title);
}

// Fetch songs from Firebase
db.ref("songs").once("value", (snapshot) => {
  const songs = snapshot.val();
  console.log("📡 Firebase data received:", songs);

  if (songs) {
    Object.values(songs).forEach(song => {
      if (song.title && song.audio_url && song.thumbnail) {
        renderSong(song.title, song.thumbnail, song.audio_url);
      } else {
        console.warn("⚠️ Missing song fields:", song);
      }
    });
  } else {
    console.warn("⚠️ No songs in Firebase. Showing fallback.");
    renderFallback();
  }
}, (error) => {
  console.error("❌ Firebase fetch error:", error);
  renderFallback();
});

function renderFallback() {
  renderSong(
    "Fallback Song",
    "https://via.placeholder.com/300x300.png?text=Demo+Song",
    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  );
}
