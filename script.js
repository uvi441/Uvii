// script.js

// 1. Import Firebase SDK import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js"; import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

// 2. Your Firebase Config (replace with yours) const firebaseConfig = { apiKey: "AIzaSyDhO9O7Pi7wmrvQ7sEwAJVCK81jLAOtax0", authDomain: "uvii-b71f2.firebaseapp.com", databaseURL: "https://uvii-b71f2-default-rtdb.firebaseio.com", projectId: "uvii-b71f2", storageBucket: "uvii-b71f2.appspot.com", messagingSenderId: "506161418878", appId: "1:506161418878:web:6a6cb6ed3d1f7f86aa3e2f", measurementId: "G-TJYR1NL9P4" };

// 3. Initialize Firebase const app = initializeApp(firebaseConfig); const db = getDatabase(app);

// 4. Function to render songs in UI function renderSongs(songs) { const songList = document.getElementById("song-list"); songList.innerHTML = ""; songs.forEach((song) => { const songCard = document.createElement("div"); songCard.className = "song-card"; songCard.innerHTML = <img src="${song.thumbnail}" class="thumbnail" /> <div class="info"> <h3>${song.title}</h3> <audio controls src="${song.audio_url}"></audio> </div>; songList.appendChild(songCard); }); }

// 5. Fetch songs from Firebase Realtime DB const songsRef = ref(db, "songs"); onValue(songsRef, (snapshot) => { const data = snapshot.val(); if (data) { const songsArray = Object.values(data); renderSongs(songsArray); } });

