// Firebase config
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

// Firebase init
import("https://www.gstatic.com/firebasejs/9.22.2/firebase-app-compat.js").then(async ({ initializeApp }) => {
  const app = initializeApp(firebaseConfig);

  const { getDatabase, ref, onValue } = await import("https://www.gstatic.com/firebasejs/9.22.2/firebase-database-compat.js");
  const db = getDatabase(app);

  const songList = document.getElementById("songList");
  const audioPlayer = document.getElementById("audioPlayer");
  const consoleBox = document.getElementById("consoleBox");

  function log(msg) {
    console.log(msg);
    consoleBox.innerHTML += `<div>> ${msg}</div>`;
    consoleBox.scrollTop = consoleBox.scrollHeight;
  }

  log("Fetching songs...");

  onValue(ref(db, "songs"), (snapshot) => {
    const data = snapshot.val();
    songList.innerHTML = "";

    if (!data) {
      log("No songs found in Firebase.");
      return;
    }

    Object.values(data).forEach((song) => {
      const card = document.createElement("div");
      card.className = "song-card";
      card.innerHTML = `
        <img src="${song.thumbnail}" alt="${song.title}" />
        <div class="song-title">${song.title}</div>
      `;

      card.addEventListener("click", () => {
        audioPlayer.src = song.audio_url;
        audioPlayer.play();
        log(`Now playing: ${song.title}`);
      });

      songList.appendChild(card);
    });

    log("Songs loaded successfully.");
  }, (error) => {
    log("Error fetching songs: " + error.message);
  });
});
