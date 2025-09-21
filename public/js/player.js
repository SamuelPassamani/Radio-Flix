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
  bgImageUrl: DEFAULT_COVER_ART,
};
let history = [];
let currentSongTitle = null;

const cache = {};

// Adicionar estado para histórico infinito
let historySource = [];          // array normalizado com { song, artist }
let historyLoadedCount = 0;      // quantos itens já foram renderizados
const HISTORY_BATCH_SIZE = 10;   // quantos itens carregar por vez
let isLoadingHistory = false;
let historyScrollAttached = false;

async function getDataFromITunes(artist, title) {
  const text = `${artist} - ${title}`;
  const cacheKey = text.toLowerCase();
  if (cache[cacheKey]) {
    return cache[cacheKey];
  }
  try {
    const response = await fetch(`https://itunes.apple.com/search?limit=1&term=${encodeURIComponent(text)}`);
    if (!response.ok) throw new Error("iTunes API request failed");
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      const itunes = data.results[0];
      const results = {
        art: itunes.artworkUrl100 ? itunes.artworkUrl100.replace("100x100", "600x600") : DEFAULT_COVER_ART,
        cover: itunes.artworkUrl100 ? itunes.artworkUrl100.replace("100x100", "1500x1500") : DEFAULT_COVER_ART,
      };
      cache[cacheKey] = results;
      return results;
    }
  } catch (error) {
    console.error("Error fetching from iTunes API:", error);
  }
  return { art: DEFAULT_COVER_ART, cover: DEFAULT_COVER_ART };
}

// Função para buscar dados da música no iTunes e retornar a URL da capa
async function getAlbumArtFromITunes(songTitle, artistName) {
  const query = encodeURIComponent(`${songTitle} ${artistName}`);
  const url = `https://itunes.apple.com/search?term=${query}&entity=song&limit=1`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      // Usa a imagem de alta resolução
      return data.results[0].artworkUrl100.replace('100x100bb', '300x300bb');
    }
  } catch (e) {
    // Se falhar, retorna uma imagem padrão
    return 'src/src_files/default_cover.png';
  }
  return 'src/src_files/default_cover.png';
}

async function renderPlayer() {
  // Busca a capa correta usando o iTunes
  const albumArtUrl = await getAlbumArtFromITunes(songData.title, songData.artist);

  // Use o elemento já existente
  const playerContainer = document.getElementById('player-container');
  if (!playerContainer) return;

  playerContainer.className = 'open';

  playerContainer.innerHTML = `
    <!-- botão de minimizar/expandir (topo esquerdo) -->
    <button id="player-hide-button" class="player-hide-btn" aria-label="Minimizar player">◀</button>
    <button id="player-toggle-button" class="player-toggle-btn">
      <svg id="toggle-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
    </button>
    <div class="player-content">
      <div class="album-art-container group">
        <img src="${albumArtUrl}" alt="Capa do álbum" class="album-art" id="album-art">
        <img src="img/vinil.svg" alt="Vinil" class="vinyl" id="vinyl">
      </div>
      <div class="song-info">
        <h2 class="song-title" id="song-title" title="${songData.title}">${songData.title}</h2>
        <p class="song-artist" id="song-artist" title="${songData.artist}">${songData.artist}</p>
      </div>
      <!-- Botão play/pause centralizado acima do volume -->
      <div class="play-control-inline">
        <button class="play-pause-button inline" id="play-pause-button" aria-label="Tocar / Pausar">
          <img id="play-icon" src="img/play.svg" alt="Play" style="display:block;width:38px;height:38px;">
          <img id="pause-icon" src="img/pause.svg" alt="Pause" style="display:none;width:38px;height:38px;">
        </button>
      </div>
      <div class="volume-controls">
        <div class="volume-slider-container">
          <button class="volume-button" id="volume-button">
            <svg id="volume-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5z"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
          </button>
          <input type="range" min="0" max="100" value="${volume}" class="volume-slider" id="volume-slider">
        </div>
        <span class="volume-label" id="volume-label">Volume ${volume}%</span>
      </div>
    </div>
    <div class="history-section">
      <h3 class="history-title">MÚSICAS RECENTES:</h3>
      <div class="history-list" id="history-list">
        <p class="text-center text-muted-foreground text-sm">Histórico indisponível.</p>
      </div>
    </div>
    <div class="player-footer">
      <div class="footer-links">
        <a href="/requests" class="footer-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
          <span>Peça sua música</span>
        </a>
        <a href="/charts" class="footer-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15V6"/><path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/><path d="M12 12H3"/><path d="M16 6H3"/><path d="M12 18H3"/></svg>
          <span>Top Músicas</span>
        </a>
      </div>
    </div>
    <audio id="audio-player" src="${STREAM_URL}" preload="auto"></audio>
  `;

  // Chame os eventos após o HTML estar pronto
  setupPlayerEvents();
}

function setupPlayerEvents() {
  const audio = document.getElementById('audio-player');
  const playerContainer = document.getElementById('player-container');
  const toggleButton = document.getElementById('player-toggle-button');
  const toggleIcon = document.getElementById('toggle-icon');
  const playPauseButton = document.getElementById('play-pause-button');
  const playIcon = document.getElementById('play-icon');
  const pauseIcon = document.getElementById('pause-icon');
  const albumArt = document.getElementById('album-art');
  const vinyl = document.getElementById('vinyl'); // <-- nova referência ao vinil
  const volumeSlider = document.getElementById('volume-slider');
  const volumeButton = document.getElementById('volume-button');
  const volumeLabel = document.getElementById('volume-label');

  // referência à sidebar (pode não existir)
  const sidebarPlayer = document.getElementById('sidebar-player');

  // botão minimizar/expandir
  const hideBtn = document.getElementById('player-hide-button');
  if (hideBtn) {
    // define ícone inicial conforme estado
    hideBtn.textContent = playerContainer.classList.contains('collapsed') ? '▶' : '◀';
    // garantir estado inicial da sidebar se já houver classe collapsed
    if (sidebarPlayer) {
      if (playerContainer.classList.contains('collapsed')) {
        sidebarPlayer.classList.add('hidden-by-main');
      } else {
        sidebarPlayer.classList.remove('hidden-by-main');
      }
    }
    hideBtn.addEventListener('click', () => {
      playerContainer.classList.toggle('collapsed');
      const collapsed = playerContainer.classList.contains('collapsed');
      // atualiza ícone do botão (◀ = minimizar, ▶ = expandir)
      hideBtn.textContent = collapsed ? '▶' : '◀';
      // não altera o estado de reprodução: áudio continua tocando se já estiver

      // Esconde/mostra a sidebar para evitar duplicação do player
      if (sidebarPlayer) {
        if (collapsed) {
          sidebarPlayer.classList.add('hidden-by-main');
        } else {
          sidebarPlayer.classList.remove('hidden-by-main');
        }
      }
    });
  }

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
      // ativa rotação do vinil (não a capa)
      if (vinyl) vinyl.style.animationPlayState = 'running';
      // garante que a capa fique estática (remove qualquer classe de rotação)
      if (albumArt) albumArt.classList.remove('spinning');
    } else {
      playIcon.style.display = 'block';
      pauseIcon.style.display = 'none';
      if (vinyl) vinyl.style.animationPlayState = 'paused';
      if (albumArt) albumArt.classList.remove('spinning');
    }
  }

  // ao inicializar, pausar animação do vinil caso não esteja tocando ainda
  if (vinyl) {
    // start paused until audio.play() fires
    vinyl.style.animationPlayState = 'paused';
  }

  playPauseButton.addEventListener('click', togglePlay);
  audio.addEventListener('play', () => updatePlayPauseIcons(true));
  audio.addEventListener('pause', () => updatePlayPauseIcons(false));

  toggleButton.addEventListener('click', () => {
    isOpen = !isOpen;
    playerContainer.classList.toggle('open');
    toggleIcon.innerHTML = isOpen ?
      '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>' :
      '<path d="M4.22 16.22a7 7 0 0 0 9.56 0"/><path d="M8.83 11.67a3 3 0 0 0 4.34 0"/><path d="m12 8 0 0"/><path d="M19.78 16.22a7 7 0 0 0-9.56 0"/><path d="M15.17 11.67a3 3 0 0 0-4.34 0"/>';
  });

  function handleVolumeChange(vol) {
    volume = vol;
    if (isMuted && vol > 0) isMuted = false;
    audio.volume = isMuted ? 0 : volume / 100;
    volumeSlider.value = isMuted ? 0 : volume;
    volumeLabel.textContent = `Volume ${isMuted ? 0 : volume}%`;
    updateVolumeIcon();

    // Atualiza o preenchimento do slider (todas plataformas)
    const percent = ((isMuted ? 0 : volume) / 100) * 100;
    volumeSlider.style.setProperty('--volume-fill', percent + '%');
  }

  function toggleMute() {
    isMuted = !isMuted;
    handleVolumeChange(isMuted ? 0 : volume || 50);
  }

  function updateVolumeIcon() {
    volumeButton.innerHTML = (isMuted || volume === 0) ?
      '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5 6 9 2 9 2 15 6 15 11 19 11 5z"/><line x1="22" x2="16" y1="9" y2="15"/><line x1="16" x2="22" y1="9" y2="15"/></svg>' :
      '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5z"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>';
  }

  volumeSlider.addEventListener('input', (e) => handleVolumeChange(parseInt(e.target.value, 10)));
  volumeButton.addEventListener('click', toggleMute);

  audio.volume = volume / 100;
  updateVolumeIcon();
  audio.play().catch(e => {});

  // Inicializa preenchimento do slider com o volume atual (necessary for first paint)
  if (volumeSlider) {
    const initialPercent = ((isMuted ? 0 : volume) / 100) * 100;
    volumeSlider.style.setProperty('--volume-fill', initialPercent + '%');
  }
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
    let songTitle = data.songtitle || (typeof data.song === "object" ? data.song.title : data.song) || "Música Desconhecida";
    let artistName = (typeof data.artist === "object" ? data.artist.title : data.artist) || "Artista Desconhecido";

    // Remover artista do título se já estiver no final (casos comuns de duplicidade)
    if (
      songTitle &&
      artistName &&
      (
        songTitle.trim().toUpperCase().endsWith(artistName.trim().toUpperCase()) ||
        songTitle.trim().toUpperCase().endsWith("- " + artistName.trim().toUpperCase())
      )
    ) {
      // Remove o artista do final do título
      songTitle = songTitle.slice(0, songTitle.toUpperCase().lastIndexOf(artistName.trim().toUpperCase())).replace(/[-\s]+$/, "");
    }

    if (songTitle !== currentSongTitle) {
      currentSongTitle = songTitle;

      // Preferir getAlbumArtFromITunes para imagem dinâmica da capa (maior qualidade quando disponível)
      let albumArt = DEFAULT_COVER_ART;
      try {
        const artFromSearch = await getAlbumArtFromITunes(songTitle, artistName);
        if (artFromSearch) albumArt = artFromSearch;
      } catch (e) {
        // fallback para getDataFromITunes se necessário
        try {
          const { art } = await getDataFromITunes(artistName, songTitle);
          if (art) albumArt = art;
        } catch (e2) {}
      }

      // também pedimos metadados maiores (capa de fundo) via getDataFromITunes para bg se quiser
      const { cover } = await getDataFromITunes(artistName, songTitle).catch(()=>({cover: DEFAULT_COVER_ART}));

      songData = { title: songTitle, artist: artistName, albumArtUrl: albumArt, bgImageUrl: cover || DEFAULT_COVER_ART };

      // Atualiza DOM
      const titleEl = document.getElementById('song-title');
      const artistEl = document.getElementById('song-artist');
      const albumArtEl = document.getElementById('album-art');

      if (titleEl) { titleEl.textContent = songData.title; titleEl.title = songData.title; }
      if (artistEl) { artistEl.textContent = songData.artist; artistEl.title = songData.artist; }
      if (albumArtEl) { albumArtEl.src = songData.albumArtUrl; }
      
      // Histórico: normaliza e armazena TODO o array, sem limite
      const historyArrayRaw = data.song_history || data.history || [];
      historySource = historyArrayRaw.map(item => {
        const histSong = item?.song?.title || item?.song || (typeof item === 'string' ? item : "N/A");
        const histArtist = item?.song?.artist || item?.artist || (typeof item === 'string' ? "" : "N/A");
        return { song: histSong, artist: histArtist };
      });

      // Reinicia contadores e lista no DOM
      const historyList = document.getElementById('history-list');
      historyList.innerHTML = '';
      historyLoadedCount = 0;

      if (historySource.length > 0) {
        // Carrega o primeiro lote
        await loadNextHistoryBatch();

        // Anexa listener de scroll (garantindo único listener por elemento)
        if (!historyList.__infiniteScrollAttached) {
          const onHistoryScroll = async () => {
            if (isLoadingHistory) return;
            if (historyList.scrollTop + historyList.clientHeight >= historyList.scrollHeight - 50) {
              if (historyLoadedCount < historySource.length) {
                await loadNextHistoryBatch();
              }
            }
          };
          historyList.addEventListener('scroll', onHistoryScroll);
          historyList.__infiniteScrollAttached = true;
        }

        // Se ainda não há scrollbar (conteúdo pequeno), carregar lotes automaticamente até preencher ou terminar
        // (fallback para quando o usuário não pode rolar internamente)
        // Nota: loadNextHistoryBatch já atualiza historyLoadedCount e isLoadingHistory
        while (historyLoadedCount < historySource.length && historyList.scrollHeight <= historyList.clientHeight) {
          await loadNextHistoryBatch();
          // pequena pausa para renderização (ajuda evitar loop muito apertado)
          await new Promise(r => setTimeout(r, 60));
        }
      } else {
        historyList.innerHTML = '<p class="text-center text-muted-foreground text-sm">Histórico indisponível.</p>';
      }
    }
  }
}

// Função para carregar e renderizar o próximo lote de histórico
async function loadNextHistoryBatch() {
  if (isLoadingHistory) return;
  if (!historySource || historyLoadedCount >= historySource.length) return;
  isLoadingHistory = true;

  const nextSlice = historySource.slice(historyLoadedCount, historyLoadedCount + HISTORY_BATCH_SIZE);
  // Busca capas do iTunes em paralelo para os itens do lote
  const enriched = await Promise.all(nextSlice.map(async (item) => {
    try {
      const { art } = await getDataFromITunes(item.artist || '', item.song || '');
      return { ...item, albumArtUrl: art || DEFAULT_COVER_ART };
    } catch (e) {
      return { ...item, albumArtUrl: DEFAULT_COVER_ART };
    }
  }));

  // Renderiza os itens no DOM
  const historyList = document.getElementById('history-list');
  enriched.forEach(track => {
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

  historyLoadedCount += enriched.length;
  isLoadingHistory = false;

  // Após inserir itens, se ainda não existir scrollbar e houver mais itens, carregue mais (fallback)
  if (historyLoadedCount < historySource.length && historyList.scrollHeight <= historyList.clientHeight) {
    // chama novamente; use await para evitar concorrência
    // (a chamada em updateSongData também lida com esse caso; aqui é segurança extra)
    await loadNextHistoryBatch();
  }
}

// Player Sidebar - Aparência inspirada no app de referência

const playerData = {
  cover: "img/cover.png",
  title: "NOSSA MÚSICA - MC Cabelinho",
  artist: "MC Cabelinho/Gloria Groove/Dallas",
  volume: 70,
  history: [
    {
      cover: "img/cover1.png",
      title: "Pilantra",
      artist: "Jão/Anitta"
    },
    {
      cover: "img/cover2.png",
      title: "APENAS UM NENÉM",
      artist: "Gloria Groove/Marina Sena"
    },
    {
      cover: "img/cover3.png",
      title: "Penetra - Pedro Sampaio Remix",
      artist: "Pabllo Vittar/O Kannalha/PEDRO Sampaio"
    },
    {
      cover: "img/cover4.png",
      title: "SERELA",
      artist: "Lia Clark/Pabllo Vittar"
    }
  ]
};

function renderSidebarPlayer() {
  const container = document.getElementById('sidebar-player');
  if (!container) return;
  container.innerHTML = `
    <div class="player-cover">
      <img src="${playerData.cover}" alt="Capa">
    </div>
    <div class="player-title">${playerData.title}</div>
    <div class="player-artist">${playerData.artist}</div>
    <div class="player-controls">
      <button class="player-btn" id="player-prev"><i class="fas fa-step-backward"></i></button>
      <button class="player-btn" id="player-play"><i class="fas fa-play"></i></button>
      <button class="player-btn" id="player-next"><i class="fas fa-step-forward"></i></button>
    </div>
    <div class="player-volume">
      <i class="fas fa-volume-down"></i>
      <input type="range" id="player-volume" min="0" max="100" value="${playerData.volume}">
      <span class="player-volume-value">${playerData.volume}%</span>
      <i class="fas fa-volume-up"></i>
    </div>
    <div class="player-history-title">MÚSICAS RECENTES</div>
    <div class="player-history-list">
      ${playerData.history.map(h => `
        <div class="player-history-item">
          <div class="history-cover"><img src="${h.cover}" alt="Capa"></div>
          <div class="history-info">
            <div class="history-title">${h.title}</div>
            <div class="history-artist">${h.artist}</div>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  // Controles de volume
  const volumeInput = container.querySelector('#player-volume');
  const volumeValue = container.querySelector('.player-volume-value');
  volumeInput.addEventListener('input', function () {
    volumeValue.textContent = `${this.value}%`;
    // Aqui você pode ajustar o volume do áudio real se necessário
  });

  // Botão play/pause
  const playBtn = container.querySelector('#player-play');
  let isPlaying = false;
  playBtn.addEventListener('click', function () {
    isPlaying = !isPlaying;
    playBtn.innerHTML = `<i class="fas fa-${isPlaying ? 'pause' : 'play'}"></i>`;
    // Aqui você pode controlar o áudio real se necessário
  });

  // Botões prev/next (apenas efeito visual)
  container.querySelector('#player-prev').addEventListener('click', function () {
    // Implementar ação de música anterior se necessário
  });
  container.querySelector('#player-next').addEventListener('click', function () {
    // Implementar ação de próxima música se necessário
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  await renderPlayer();
  updateSongData();
  setInterval(updateSongData, 10000);
  renderSidebarPlayer();
});
