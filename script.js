let songs = [];
const player = document.getElementById("audioPlayer");
const progressBar = document.getElementById("songProgressBar");
const icon = document.getElementById("playPauseIcon");

function checkAuth() {
    if (localStorage.getItem("isLoggedIn") === "true") {
        document.getElementById("loginPage").style.display = "none";
        document.getElementById("home").style.display = "block";
        loadData();
    } else {
        document.getElementById("loginPage").style.display = "flex";
        document.getElementById("home").style.display = "none";
    }
}

async function verifyCode() {
    const inputCode = document.getElementById("memberCode").value.trim().toUpperCase();
    const errorMsg = document.getElementById("loginError");
    const loginBtn = document.querySelector("#loginPage button");

    if (!inputCode) return;

    loginBtn.textContent = "Hamarinina...";
    loginBtn.disabled = true;

    try {
        const response = await fetch("access.json");
        const data = await response.json();
        
        if (data.validCodes.includes(inputCode)) {
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("userCode", inputCode);
            checkAuth();
        } else {
            errorMsg.style.display = "block";
            document.getElementById("memberCode").value = "";
        }
    } catch (err) {
        console.error("Fahadisoana:", err);
        alert("Nisy olana teo am-pamakiana ny lisitra.");
    } finally {
        loginBtn.textContent = "HIDITRA";
        loginBtn.disabled = false;
    }
}

document.getElementById("memberCode").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        verifyCode();
    }
});

function toggleVisibility() {
    const passwordInput = document.getElementById("memberCode");
    const eyeIcon = document.getElementById("eyeIcon");
    
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        eyeIcon.src = "hidden.png";
    } else {
        passwordInput.type = "password";
        eyeIcon.src = "show.png";
    }
}

function loadData() {
    fetch("lyrics.json")
      .then(response => response.json())
      .then(data => {
        songs = data.songs;
        songs.sort((a, b) => a.title.localeCompare(b.title));
        displaySongs(songs);
      })
      .catch(err => console.error("Tsy azo ny data:", err));
}

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

function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    let min = Math.floor(seconds / 60);
    let sec = Math.floor(seconds % 60);
    if (sec < 10) sec = "0" + sec;
    return min + ":" + sec;
}

if (progressBar) {
    progressBar.addEventListener("input", function() {
        if (player.duration) {
            const seekTime = (this.value / 100) * player.duration;
            player.currentTime = seekTime;
        }
    });
}

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

function logout() {
    if (confirm("Tena hivoaka ve ianao? Mila mampiditra kaody indray raha hiditra.")) {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userCode");
        location.reload();
    }
}

checkAuth();
