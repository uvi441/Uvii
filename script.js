// Firebase setup
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

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
console.log("Initializing Firebase...");
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
console.log("Firebase Initialized ✅");

// Reference to songs
const songsRef = ref(database, 'songs/');

onValue(songsRef, (snapshot) => {
  if (snapshot.exists()) {
    const songsData = snapshot.val();
    console.log("🎵 Songs fetched from Firebase:", songsData);

    const songContainer = document.getElementById('song-container');
    songContainer.innerHTML = '';

    Object.entries(songsData).forEach(([key, song]) => {
      const songCard = document.createElement('div');
      songCard.className = 'song-card';

      songCard.innerHTML = `
        <img src="${song.thumbnail}" alt="Thumbnail" />
        <h3>${song.title}</h3>
        <audio controls src="${song.audio_url}"></audio>
      `;

      songContainer.appendChild(songCard);
    });

  } else {
    console.warn("⚠️ No songs found in Firebase.");
    document.getElementById('song-container').innerText = "No songs found.";
  }
}, (error) => {
  console.error("❌ Error fetching songs:", error);
});
