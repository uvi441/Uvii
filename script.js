// Firebase config (replace with your new config if needed)
const firebaseConfig = {
  apiKey: "AIzaSyDhO9O7Pi7wmrvQ7sEwAJVCK81jLAOtax0",
  authDomain: "uvii-b71f2.firebaseapp.com",
  databaseURL: "https://uvii-b71f2-default-rtdb.firebaseio.com",
  projectId: "uvii-b71f2",
  storageBucket: "uvii-b71f2.appspot.com",
  messagingSenderId: "506161418878",
  appId: "1:506161418878:web:6a6cb6ed3d1f7f86aa3e2f",
  measurementId: "G-TJYR1NL9P4"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const songsContainer = document.getElementById("songs");
const audio = new Audio();
const miniPlayer = document.getElementById("mini-player");
const miniTitle = document.getElementById("mini-title");
const miniPlayBtn = document.getElementById("mini-play-btn");
const consoleBox = document.getElementById("console-box");

// Console logger
function log(msg) {
  console.log(msg);
  if (consoleBox) {
    consoleBox.innerText += msg + "\n";
    consoleBox.scrollTop = consoleBox.scrollHeight;
  }
}

// Load songs
function loadSongs() {
  log("Loading songs...");
  db.ref("songs").once("value", (snapshot) => {
    const data = snapshot.val();
    if (!data) return log("No songs found.");
    songsContainer.innerHTML = "";

    Object.values(data).forEach((song) => {
      const card = document.createElement("div");
      card.className = "song-card";
      card.innerHTML = `
        <img src="${song.thumbnail}" class="thumbnail" />
        <div class="title">${song.title}</div>
      `;
      card.onclick = () => playSong(song);
      songsContainer.appendChild(card);
    });

    log("Songs loaded: " + Object.keys(data).length);
  });
}

// Play song
function playSong(song) {
  log("Playing: " + song.title);
  audio.src = song.audio_url;
  audio.play();

  miniTitle.innerText = song.title;
  miniPlayBtn.innerText = "Pause";
  miniPlayer.style.display = "flex";
}

// Mini player control
miniPlayBtn.onclick = () => {
  if (audio.paused) {
    audio.play();
    miniPlayBtn.innerText = "Pause";
  } else {
    audio.pause();
    miniPlayBtn.innerText = "Play";
  }
};

// Init
loadSongs();
