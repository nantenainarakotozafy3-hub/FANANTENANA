body {
    margin: 0;
    padding: 0;
    padding-bottom: env(safe-area-inset-bottom);
    background-color: white;
    font-family: 'Tahoma', sans-serif;
}

.logo-container {
    display: flex;
    justify-content: center;
    padding: 30px 0 10px 0;
}

.logo-home {
    width: 200px;
    height: auto;
}

.search-section {
    display: flex;
    justify-content: center;
    margin-bottom: 25px;
}

#search {
    width: 80%;
    max-width: 350px;
    padding: 10px 15px 10px 35px;
    border-radius: 10px;
    border: 1px solid #87CEEB;
    font-size: 16px;
    outline: none;
}

#songList {
    list-style: none;
    padding: 0 0 80px 0;
    margin: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
}

#songList li {
    background-color: #0097c2;
    color: white;
    width: 85%;
    max-width: 400px;
    padding: 12px 25px;
    border-radius: 35px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 20px;
    font-weight: bold;
    text-transform: uppercase;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    cursor: pointer;
}

.fixed-header {
    background-color: white;
    padding: 2px 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 1000;
    border-bottom: 2px solid #0097c2;
}

.header-top-row {
    width: 100%;
    position: relative;
    height: 0;
}

.back-icon {
    position: absolute;
    top: 5px;
    left: 5px;
    width: 45px;
    height: auto;
    cursor: pointer;
    z-index: 1010;
}

.logo-mini {
    width: 130px; 
    height: auto;
    margin-top: 0 !important;
    padding-top: 0 !important;
}

.mini-player {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin: 5px 0; 
}

.btn-icon {
    background: transparent;
    border: none;
    padding: 0;
    cursor: pointer;
    outline: none;
}

.btn-icon img {
    width: 60px;
    height: 60px;
}

.title-container {
    border: 2px solid #87CEEB;
    border-radius: 10px;
    padding: 2px 15px;
    margin: 5px 0;
}

.header-title {
    color: #0097c2;
    font-size: 20px;
    margin: 0;
    text-transform: uppercase;
    text-align: center;
}

.lyrics-container {
    padding-top: 5px;
    text-align: center;
}

#lyrics {
    font-size: 19px;
    line-height: 1.8;
    white-space: pre-wrap;
    padding: 0 20px;
}
