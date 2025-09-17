// Configuração do player
const STREAM_URL = "https://cast2.hoost.com.br:20000/stream";
const CAPA_IMG = "src/src_files/player.png";
const DISK_IMG = "src/src_files/disk.png";

// Renderiza o player no container
function renderPlayer() {
  const container = document.getElementById('player-container');
  if (!container) return;
  container.innerHTML = `
    <div id="superPlayer" style="right: -350px;">
      <div class="closeOpenPlay closed">
        <span class="equalizer"></span>
        <span class="closeIcon" style="display:none;">&#10006;</span>
      </div>
      <div class="imgPlayerCapa background">
        <img src="${CAPA_IMG}" alt="Capa Rádio">
      </div>
      <div class="contentPlayer">
        <div class="containerImg">
          <div class="nowPlaying">Tocando Agora</div>
          <div class="imgPlayCapa">
            <img src="${CAPA_IMG}" alt="Capa Rádio">
          </div>
          <div class="statusStream">
            <span class="status">Unknown - Hold the Line</span>
          </div>
          <div class="diskRotate"><img src="${DISK_IMG}" alt="Disco"></div>
        </div>
      </div>
      <div class="playPause playing">
        <span class="playIcon" style="display:none;">&#9654;</span>
        <span class="pauseIcon">&#10073;&#10073;</span>
      </div>
      <div id="slider">
        <span class="volDown">&#128266;</span>
        <input type="range" min="0" max="100" value="50" id="volumeRange" style="width:70%;">
        <span class="volUp">&#128264;</span>
      </div>
    </div>
    <audio id="player" src="${STREAM_URL}" autoplay></audio>
  `;
}

function setupPlayerEvents() {
  const superPlayer = document.getElementById('superPlayer');
  const audio = document.getElementById('player');
  const playPause = superPlayer.querySelector('.playPause');
  const playIcon = playPause.querySelector('.playIcon');
  const pauseIcon = playPause.querySelector('.pauseIcon');
  const closeBtn = superPlayer.querySelector('.closeOpenPlay');
  const equalizer = closeBtn.querySelector('.equalizer');
  const closeIcon = closeBtn.querySelector('.closeIcon');
  const slider = document.getElementById('slider');
  const volumeRange = slider.querySelector('#volumeRange');

  // Play/Pause
  playPause.onclick = function() {
    if (playPause.classList.contains('playing')) {
      audio.pause();
      playPause.classList.remove('playing');
      playPause.classList.add('stoped');
      playIcon.style.display = '';
      pauseIcon.style.display = 'none';
      equalizer.style.opacity = '0.3';
    } else {
      audio.play();
      playPause.classList.remove('stoped');
      playPause.classList.add('playing');
      playIcon.style.display = 'none';
      pauseIcon.style.display = '';
      equalizer.style.opacity = '1';
    }
  };

  // Abrir/fechar player lateral
  closeBtn.onclick = function() {
    if (closeBtn.classList.contains('open')) {
      superPlayer.style.right = '-350px';
      closeBtn.classList.remove('open');
      closeBtn.classList.add('closed');
      closeIcon.style.display = 'none';
      equalizer.style.display = '';
    } else {
      superPlayer.style.right = '0px';
      closeBtn.classList.remove('closed');
      closeBtn.classList.add('open');
      closeIcon.style.display = '';
      equalizer.style.display = 'none';
    }
  };

  // Volume
  volumeRange.oninput = function() {
    audio.volume = this.value / 100;
  };

  // Equalizer animação (CSS já faz, só garantir visibilidade)
  equalizer.style.opacity = '1';
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  renderPlayer();
  setTimeout(setupPlayerEvents, 100); // Aguarda renderização
});
