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
  
  window.scrollTo(0, 0);
}

function goBack() {
  document.getElementById("songPage").style.display = "none";
  document.getElementById("home").style.display = "block";
}


document.getElementById("search").addEventListener("input", function() {
  const value = this.value.toLowerCase();
  const filtered = songs.filter(song =>
    song.title.toLowerCase().includes(value)
  );
  displaySongs(filtered);
});