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
  if (!songList) return;
  
  songList.innerHTML = "";
  list.forEach((song) => {
    const li = document.createElement("li");
    li.className = "song-item";
    li.innerHTML = `<span class="music-emoji">🎵</span><span class="song-name">${song.title}</span>`;
    li.onclick = () => openSong(song);
    songList.appendChild(li);
  });
}

function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    let min = Math.floor(seconds / 60);
    let sec = Math.floor(seconds % 60);
    if (sec < 10) sec = "0" + sec;
    return min + ":" + sec;
}

function openSong(song) {
    document.getElementById("home").style.display = "none";
    document.getElementById("songPage").style.display = "block";
    document.getElementById("songTitle").textContent = song.title;
    document.getElementById("lyrics").innerText = song.lyrics.join("\n");

    const curTime = document.getElementById("currentTime");
    const durTime = document.getElementById("durationTime");
    if (curTime) curTime.textContent = "0:00";
    if (durTime) durTime.textContent = "0:00";

    if (song.audio) {
        player.src = "AUDIO/" + song.audio; 
        player.load();
    } else {
        player.src = "";
    }
    
    if (icon) icon.src = "play.png";
    if (progressBar) progressBar.value = 0;
    window.scrollTo(0, 0);
}

player.addEventListener("timeupdate", () => {
    if (player.duration) {
        const progress = (player.currentTime / player.duration) * 100;
        if (progressBar) progressBar.value = progress;

        const curTime = document.getElementById("currentTime");
        const durTime = document.getElementById("durationTime");
        if (curTime) curTime.textContent = formatTime(player.currentTime);
        if (durTime) durTime.textContent = formatTime(player.duration);
    }
});

function togglePlay() {
    if (!player.src || player.src.includes("undefined") || player.src === window.location.href) {
        alert("Mbola tsy nisy hira nampidirina!");
        return;
    }

    if (player.paused) {
        player.play()
            .then(() => { if (icon) icon.src = "pause.png"; })
            .catch(err => { console.error("Error play:", err); });
    } else {
        player.pause();
        if (icon) icon.src = "play.png";
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

const searchEl = document.getElementById("search");
if (searchEl) {
    searchEl.addEventListener("input", function() {
        const value = this.value.toLowerCase();
        const filtered = songs.filter(song => song.title.toLowerCase().includes(value));
        displaySongs(filtered);
    });
}
