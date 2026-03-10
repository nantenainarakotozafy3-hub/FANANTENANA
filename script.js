let songs = [];

fetch("lyrics.json")
  .then(response => response.json())
  .then(data => {

    songs = data.songs;

    songs.sort((a, b) => a.title.localeCompare(b.title));

    displaySongs(songs);
  });

function displaySongs(list) {
  const songList = document.getElementById("songList");
  songList.innerHTML = "";

  list.forEach((song) => {
    const li = document.createElement("li");
    li.textContent = song.title;
    li.onclick = () => openSong(song);
    songList.appendChild(li);
  });
}

function openSong(song) {
    document.getElementById("home").style.display = "none";
    document.getElementById("songPage").style.display = "block";
    document.getElementById("songTitle").textContent = song.title;
    document.getElementById("lyrics").textContent = song.lyrics.join("\n");

    const audioSource = document.getElementById("audioSource");
    const player = document.getElementById("audioPlayer");

    if (song.audio) {
        audioSource.src = "audio/" + song.audio;
        player.load();
    }
    window.scrollTo(0, 0);
}

function togglePlay() {
    const player = document.getElementById("audioPlayer");
    const icon = document.getElementById("playPauseIcon");

    if (player.paused) {
        player.play();
  
        icon.src = "pause.png"; 
    } else {
        player.pause();

        icon.src = "play.png";
    }
}

function stopAudio() {
    const player = document.getElementById("audioPlayer");
    const icon = document.getElementById("playPauseIcon");

    player.pause();
    player.currentTime = 0;

    icon.src = "play.png";
}

function goBack() {
    document.getElementById("home").style.display = "block";
    document.getElementById("songPage").style.display = "none";
    stopAudio();
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(() => console.log("Service Worker tafiditra!"))
      .catch(err => console.log("Olana SW:", err));
  });
}

document.getElementById("search").addEventListener("input", function() {
  const value = this.value.toLowerCase();
  const filtered = songs.filter(song =>
    song.title.toLowerCase().includes(value)
  );
  displaySongs(filtered);
});

