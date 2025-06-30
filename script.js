
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
const songFeed = document.getElementById('songFeed');
const audioPlayer = document.getElementById('audioPlayer');

function loadSongs() {
  db.ref('songs').once('value', snapshot => {
    const data = snapshot.val();
    songFeed.innerHTML = '';

    Object.values(data).forEach((song, index) => {
      const card = document.createElement('div');
      card.className = 'song-card';
      card.innerHTML = \`
        <img src="\${song.thumbnail}" alt="cover" />
        <h2>\${song.title}</h2>
        <p>\${song.category || 'Unknown'}</p>
        <button class="like-btn">❤️ Like</button>
      \`;
      card.addEventListener('click', () => {
        audioPlayer.src = song.audio_url;
        audioPlayer.play();
      });
      songFeed.appendChild(card);
    });
  });
}

window.onload = loadSongs;
