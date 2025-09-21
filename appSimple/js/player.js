
const STREAM_URL = "https://stream.zeno.fm/cbzw2rbebfkuv";
const API_URL = `https://twj.es/free/?url=${STREAM_URL}`;
const FALLBACK_API_URL = `https://twj.es/metadata/?url=${STREAM_URL}`;
const DEFAULT_COVER_ART = "/img/cover.png";

let isPlaying = false;
let volume = 70;
let isMuted = false;
let isOpen = true;
let songData = {
  title: "Carregando...",
  artist: "Rádio Flix",
  albumArtUrl: DEFAULT_COVER_ART,
};
let history = [];
let currentSongTitle = null;

const cache = {};

async function getDataFromITunes(artist, title) {
  const text = `${artist} - ${title}`;
  const cacheKey = text.toLowerCase();
  if (cache[cacheKey]) {
    return cache[cacheKey];
  }

  try {
    const response = await fetch(`https://itunes.apple.com/search?limit=1&term=${encodeURIComponent(text)}`);
    if (!response.ok) {
      throw new Error("iTunes API request failed");
    }
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      const itunes = data.results[0];
      const results = {
        art: itunes.artworkUrl100 ? itunes.artworkUrl100.replace("100x100", "600x600") : DEFAULT_COVER_ART,
      };
      cache[cacheKey] = results;
      return results;
    }
  } catch (error) {
    console.error("Error fetching from iTunes API:", error);
  }

  return { art: DEFAULT_COVER_ART };
}

function renderPlayer() {
  const container = document.body;
  if (!container) return;

  const playerContainer = document.createElement('div');
  playerContainer.id = 'player-container';
  playerContainer.className = 'open';
  playerContainer.innerHTML = `
    <button id="player-toggle-button">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
    </button>
    <div class="player-content">
      <div class="album-art-container">
        <img src="${songData.albumArtUrl}" alt="Capa do álbum" class="album-art" id="album-art">
        <button class="play-pause-button" id="play-pause-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor" class="play-icon" style="display: block;"><path d="M5 4.5A2.5 2.5 0 0 1 7.5 2h9A2.5 2.5 0 0 1 19 4.5v15a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 5 19.5v-15Z"/></svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="pause-icon" style="display: none;"><path d="M6 4h4v16H6z"/><path d="M14 4h4v16h-4z"/></svg>
        </button>
      </div>
      <div class="song-info">
        <h2 class="song-title" id="song-title">${songData.title}</h2>
        <p class="song-artist" id="song-artist">${songData.artist}</p>
      </div>
      <div class="volume-controls">
        <div class="volume-slider-container">
            <button class="volume-button" id="volume-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5z"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
            </button>
            <input type="range" min="0" max="100" value="${volume}" class="volume-slider" id="volume-slider">
        </div>
        <span class="volume-label" id="volume-label">Volume ${volume}%</span>
      </div>
    </div>
    <div class="history-section">
      <h3 class="history-title">Histórico</h3>
      <div class="history-list" id="history-list">
        <p class="text-center text-muted-foreground text-sm">Histórico indisponível.</p>
      </div>
    </div>
    <div class="player-footer">
      <div class="footer-links">
        <a href="/requests" class="footer-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            <span>Peça sua música</span>
        </a>
        <a href="/charts" class="footer-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15V6"/><path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/><path d="M12 12H3"/><path d="M16 6H3"/><path d="M12 18H3"/></svg>
            <span>Top Músicas</span>
        </a>
      </div>
    </div>
    <audio id="audio-player" src="${STREAM_URL}" preload="auto"></audio>
  `;
  container.appendChild(playerContainer);
}

function setupPlayerEvents() {
    const audio = document.getElementById('audio-player');
    const playerContainer = document.getElementById('player-container');
    const toggleButton = document.getElementById('player-toggle-button');
    const playPauseButton = document.getElementById('play-pause-button');
    const playIcon = playPauseButton.querySelector('.play-icon');
    const pauseIcon = playPauseButton.querySelector('.pause-icon');
    const albumArt = document.getElementById('album-art');
    const volumeSlider = document.getElementById('volume-slider');
    const volumeButton = document.getElementById('volume-button');
    const volumeLabel = document.getElementById('volume-label');
    
    function togglePlay() {
        if (audio.paused) {
            audio.load();
            audio.play().catch(e => console.error("Play error:", e));
        } else {
            audio.pause();
        }
    }

    function updatePlayPauseIcons(playing) {
        isPlaying = playing;
        if (isPlaying) {
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
            albumArt.classList.add('spinning');
        } else {
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
            albumArt.classList.remove('spinning');
        }
    }

    playPauseButton.addEventListener('click', togglePlay);
    audio.addEventListener('play', () => updatePlayPauseIcons(true));
    audio.addEventListener('pause', () => updatePlayPauseIcons(false));

    toggleButton.addEventListener('click', () => {
        isOpen = !isOpen;
        playerContainer.classList.toggle('open');
        const icon = isOpen ? 
            '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>' : 
            '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.22 16.22a7 7 0 0 0 9.56 0"/><path d="M8.83 11.67a3 3 0 0 0 4.34 0"/><path d="m12 8 0 0"/><path d="M19.78 16.22a7 7 0 0 0-9.56 0"/><path d="M15.17 11.67a3 3 0 0 0-4.34 0"/></svg>';
        toggleButton.innerHTML = icon;
    });

    function handleVolumeChange(vol) {
        volume = vol;
        if (isMuted && vol > 0) {
            isMuted = false;
        }
        audio.volume = isMuted ? 0 : volume / 100;
        volumeSlider.value = isMuted ? 0 : volume;
        volumeLabel.textContent = `Volume ${isMuted ? 0 : volume}%`;
        updateVolumeIcon();
    }
    
    function toggleMute() {
        isMuted = !isMuted;
        handleVolumeChange(isMuted ? 0 : volume || 50);
    }
    
    function updateVolumeIcon() {
        const icon = isMuted || volume === 0 ? 
            '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9 2 9 2 15 6 15 11 19 11 5z"/><line x1="22" x2="16" y1="9" y2="15"/><line x1="16" x2="22" y1="9" y2="15"/></svg>' : 
            '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5z"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>';
        volumeButton.innerHTML = icon;
    }

    volumeSlider.addEventListener('input', (e) => handleVolumeChange(parseInt(e.target.value, 10)));
    volumeButton.addEventListener('click', toggleMute);
    
    audio.volume = volume / 100;
    updateVolumeIcon();
}


async function fetchStreamingData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error(`Error fetching streaming data from ${url}:`, error);
    return null;
  }
}

async function updateSongData() {
  let data = await fetchStreamingData(API_URL) || await fetchStreamingData(FALLBACK_API_URL);
  if (data) {
    const songTitle = data.songtitle || (typeof data.song === "object" ? data.song.title : data.song) || "Música Desconhecida";
    const artistName = (typeof data.artist === "object" ? data.artist.title : data.artist) || "Artista Desconhecido";
    
    if (songTitle !== currentSongTitle) {
      currentSongTitle = songTitle;
      const { art } = await getDataFromITunes(artistName, songTitle);
      
      songData = { title: songTitle, artist: artistName, albumArtUrl: art };
      document.getElementById('song-title').textContent = songData.title;
      document.getElementById('song-title').title = songData.title;
      document.getElementById('song-artist').textContent = songData.artist;
      document.getElementById('song-artist').title = songData.artist;
      document.getElementById('album-art').src = songData.albumArtUrl;

      const historyArray = data.song_history || data.history || [];
      const historyList = document.getElementById('history-list');
      historyList.innerHTML = ''; // Clear previous history

      if(historyArray.length > 0) {
          const formattedHistory = await Promise.all(
            historyArray.slice(0, 4).map(async (item) => {
              const histSong = item.song?.title || item.song || "N/A";
              const histArtist = item.song?.artist || item.artist || "N/A";
              const { art: histArt } = await getDataFromITunes(histArtist, histSong);
              return { song: histSong, artist: histArtist, albumArtUrl: histArt };
            })
          );

          formattedHistory.forEach(track => {
            const itemEl = document.createElement('div');
            itemEl.className = 'history-item';
            itemEl.innerHTML = `
                <div class="history-album-art">
                    <img src="${track.albumArtUrl}" alt="Capa de ${track.song}">
                </div>
                <div class="history-song-info">
                    <p class="history-song-title">${track.song}</p>
                    <p class="history-song-artist">${track.artist}</p>
                </div>
            `;
            historyList.appendChild(itemEl);
          });
      } else {
          historyList.innerHTML = '<p class="text-center text-muted-foreground text-sm">Histórico indisponível.</p>';
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderPlayer();
  setupPlayerEvents();
  updateSongData();
  setInterval(updateSongData, 10000);
});

    