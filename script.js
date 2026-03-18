let songs = [];
const player = document.getElementById("audioPlayer");
const progressBar = document.getElementById("songProgressBar");
const icon = document.getElementById("playPauseIcon");

fetch("lyrics.json")
  .then(response => response.json())
  .then(data => {
    songs = data.songs;
    songs.sort((a, b) => a.title.localeCompare(b.title));
    displaySongs(songs);
  })
  .catch(err => console.error("Tsy azo ny data:", err));

function displaySongs(list) {
  const songList = document.getElementById("songList");
  songList.innerHTML = "";
  list.forEach((song) => {
    const li = document.createElement("li");
    li.className = "song-item";
    li.innerHTML = `<span class="music-emoji">🎵</span><span class="song-name">${song.title}</span>`;
    li.onclick = () => openSong(song);
    songList.appendChild(li);
  });
}

function openSong(song) {
    document.getElementById("home").style.display = "none";
    document.getElementById("songPage").style.display = "block";
    document.getElementById("songTitle").textContent = song.title;
    document.getElementById("lyrics").innerText = song.lyrics.join("\n");

    if (song.audio) {
        player.src = "AUDIO/" + song.audio; 
        player.load();
    } else {
        player.src = "";
    }
    
    icon.src = "play.png";
    progressBar.value = 0;
    window.scrollTo(0, 0);
}

player.addEventListener("timeupdate", () => {
    if (player.duration) {
        const progress = (player.currentTime / player.duration) * 100;
        progressBar.value = progress;
    }
});

progressBar.addEventListener("input", () => {
    if (player.duration) {
        const seekTime = (progressBar.value / 100) * player.duration;
        player.currentTime = seekTime;
    }
});

function togglePlay() {
    if (!player.src || player.src.includes("undefined") || player.src === window.location.href) {
        alert("Mbola tsy nisy hira nampidirina!");
        return;
    }

    if (player.paused) {
        player.play()
            .then(() => { icon.src = "pause.png"; })
            .catch(err => { alert("Tsy afaka mandefa ny feonkira: " + err.message); });
    } else {
        player.pause();
        icon.src = "play.png";
    }
}

function stopAudio() {
    if (player) {
        player.pause();
        player.currentTime = 0;
        if (icon) icon.src = "play.png";
        if (progressBar) progressBar.value = 0;
    }
}

function goBack() {
    document.getElementById("home").style.display = "block";
    document.getElementById("songPage").style.display = "none";
    stopAudio();
}

document.getElementById("search").addEventListener("input", function() {
  const value = this.value.toLowerCase();
  const filtered = songs.filter(song => song.title.toLowerCase().includes(value));
  displaySongs(filtered);
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(() => console.log("Service Worker tafiditra!"))
      .catch(err => console.log("Olana SW:", err));
  });
}
