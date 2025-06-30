document.addEventListener('DOMContentLoaded', () => {
  const splash = document.getElementById('splash');
  const home = document.querySelector('.home-screen');
  const now = document.getElementById('nowPlaying');
  const mini = document.getElementById('miniPlayer');
  const nowThumb = document.getElementById('nowThumb');
  const nowTitle = document.getElementById('nowTitle');
  const nowAudio = document.getElementById('nowAudio');
  const miniTitle = document.getElementById('miniTitle');
  const miniPlay = document.getElementById('miniPlay');
  const backButton = document.getElementById('backButton');

  const songs = [
    {
      title: "Sample Song",
      audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      thumbnail: "https://via.placeholder.com/150"
    }
  ];

  setTimeout(() => {
    splash.classList.add('hidden');
    home.classList.remove('hidden');
    renderSongs();
  }, 2000);

  function renderSongs() {
    const list = document.getElementById('songList');
    songs.forEach(song => {
      const div = document.createElement('div');
      div.className = 'song-card';
      div.innerHTML = \`
        <img src="\${song.thumbnail}" width="100%" />
        <h4>\${song.title}</h4>
      \`;
      div.onclick = () => {
        home.classList.add('hidden');
        now.classList.remove('hidden');
        nowTitle.innerText = song.title;
        nowThumb.src = song.thumbnail;
        nowAudio.src = song.audio_url;
        nowAudio.play();
        miniTitle.innerText = song.title;
        mini.classList.remove('hidden');
      };
      list.appendChild(div);
    });
  }

  backButton.onclick = () => {
    now.classList.add('hidden');
    home.classList.remove('hidden');
  };

  miniPlay.onclick = () => {
    nowAudio.paused ? nowAudio.play() : nowAudio.pause();
  };
});