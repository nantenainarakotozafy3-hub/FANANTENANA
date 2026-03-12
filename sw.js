body {
    font-family: 'Segoe UI', Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #fcfcfc;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.logo-container { text-align: center; padding: 30px 0; width: 100%; }

.logo-home { 
    width: 200px;
    height: auto; 
    display: block;
    margin: 0 auto;
}

#search {
    width: 85%;
    max-width: 400px;
    padding: 12px 20px;
    border-radius: 25px;
    border: 1px solid #ddd;
    display: block;
    margin: 0 auto 20px auto;
    font-size: 16px;
    outline: none;
}

#songList {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    gap: 10px;
}

#songList li {
    background: linear-gradient(135deg, #00b4db, #0083b0);
    color: white;
    padding: 15px 30px;
    border-radius: 50px;
    width: max-content;
    min-width: 90%;
    white-space: nowrap;
    display: flex;
    align-items: center;
    gap: 20px;
    font-family: 'Tahoma', sans-serif;
    font-size: 18px;
    font-weight: bold;
    text-transform: uppercase;
    box-shadow: 0 4px 10px rgba(0,0,0,0.2);
}

#songList li::before {
    content: "🎵";
    font-size: 20px;
    flex-shrink: 0;
}

#songList li:active {
    transform: scale(0.98);
}

.fixed-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: white;
    z-index: 1000;
    border-bottom: 1px solid #eee;
    padding: 10px 0;
    text-align: center;
}

.logo-mini {
    width: 200px;
    height: auto;
    margin-bottom: 5px;
}

.player-controls {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin: 5px 0;
}

.back-icon {
    background: transparent;
    border: none;
    cursor: pointer;
    position: absolute;
    left: 15px;
    top: 15px;
    width: 35px;
    cursor: pointer;
}

.btn-icon img {
    width: 45px;
    height: 45px;
    background: transparent !important;
}

#songTitle {
    font-size: 1.2rem;
    margin: 5px 0;
    text-transform: uppercase;
    color: #2c3e50;
}

.lyrics-container {
    padding-top: 250px;
    padding-bottom: 50px;
    text-align: center;
}

#lyrics {
    margin-top: 50px;
    display: block;
    line-height: 1.8;
    white-space: pre-wrap;
    text-align: center;
    font-family: 'Tahoma', sans-serif;
    font-size: 18px;
    padding: 20px;
}

img { background: none !important; }
