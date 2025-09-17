document.addEventListener('DOMContentLoaded', () => {
    // Inicialização dos módulos
    if (window.initPlayer) initPlayer();
    if (window.initNoticias) initNoticias();
    if (window.initMural) initMural();
    if (window.initGaleria) initGaleria();
    if (window.initTop10) initTop10();
    // ...outros módulos...
});

// Exemplo de dados para renderização (pode ser substituído por fetch futuramente)
const noticias = [
  {
    titulo: "Acabou a espera: ouça o novo single da Avril Lavigne!",
    imagem: "src/src_files/avril-lavigne--300x400.jpg",
    data: "Em 10/10/2018",
    url: "#"
  },
  {
    titulo: "Imagine Dragons lança clipe com letra de “Zero”, trilha de “WiFi Ralph”. Assista!",
    imagem: "src/src_files/imaginedragons_04-300x400.jpg",
    data: "Em 10/10/2018",
    url: "#"
  },
  {
    titulo: "Assista ao trailer do novo documentário sobre a Amy Winehouse",
    imagem: "src/src_files/Amy-Winehouse-foi-roubada-300x400.jpg",
    data: "Em 10/10/2018",
    url: "#"
  }
];

const galeria = [
  { imagem: "src/src_files/71aHeYnlXL._SL1500_-150x150.jpg", url: "#" },
  { imagem: "src/src_files/20171215_071102_10272_5696-150x150.jpeg", url: "#" },
  { imagem: "src/src_files/a1351bb1-1733-4fd2-8c6f-00f47b15958e_rw_1920-150x150.jpg", url: "#" }
];

const top10 = [
  { pos: 1, artista: "Andy Gunner", musica: "Give Love", capa: "src/src_files/albumart-givelove-1400px-1200x1200.jpg" },
  { pos: 2, artista: "Gennea", musica: "Give a Music", capa: "src/src_files/magic-music-album-review-marquee-magazine.jpg" },
  { pos: 3, artista: "Nick Minaj", musica: "Pink Pinkest", capa: "src/src_files/Nicki-Minaj-The-Pinkprint-greatest-album-covers-billboard-1000x1000.jpg" }
];

// Renderiza notícias na home
function renderNoticias() {
  const container = document.getElementById('noticias');
  if (!container) return;
  let html = `<h2 class="titleModHome">Últimas notícias</h2><ul>`;
  noticias.forEach(n => {
    html += `
      <li>
        <div class="imgThumb"><img src="${n.imagem}" alt="${n.titulo}"></div>
        <div class="contetNoticias">
          <h3>${n.titulo}</h3>
          <p>${n.data}</p>
        </div>
      </li>
    `;
  });
  html += `</ul>`;
  container.innerHTML = html;
}

// Renderiza galeria de fotos
function renderGaleria() {
  const container = document.getElementById('galeria');
  if (!container) return;
  let html = `<h2 class="titleModHome">Galeria de Exemplo</h2><div class="gallery">`;
  galeria.forEach(foto => {
    html += `
      <div class="gallery-item">
        <a href="${foto.url}"><img src="${foto.imagem}" alt="Foto"></a>
      </div>
    `;
  });
  html += `</div>`;
  container.innerHTML = html;
}

// Renderiza Top 10
function renderTop10() {
  const container = document.getElementById('top10');
  if (!container) return;
  let html = `<h3 class="titleWidgets">Top 10</h3><div class="sepWidgets"></div>`;
  top10.forEach(item => {
    html += `
      <div class="containerTop">
        <div class="thumbImgTop"><img src="${item.capa}" alt="${item.artista}"></div>
        <div class="nomeCantor"><span>#${String(item.pos).padStart(2, '0')}:</span> ${item.artista}</div>
        <div class="musicaTop">Musica: ${item.musica}</div>
      </div>
    `;
  });
  container.innerHTML = html;
}

// Renderiza mural de recados (exemplo simples)
function renderMural() {
  const container = document.getElementById('mural-recados');
  if (!container) return;
  container.innerHTML = `
    <h3 class="titleWidgets">Mural de Recados</h3>
    <div class="sepWidgets"></div>
    <div class="mural-list">
      <div class="mural-item"><strong>João:</strong> Muito boa a rádio!</div>
      <div class="mural-item"><strong>Maria:</strong> Toca Raul!</div>
    </div>
    <form class="mural-form">
      <input type="text" name="nome" placeholder="Seu nome" required>
      <input type="text" name="mensagem" placeholder="Seu recado" required>
      <button type="submit">Enviar</button>
    </form>
  `;
  // Simula envio (sem backend)
  container.querySelector('.mural-form').onsubmit = function(e) {
    e.preventDefault();
    const nome = this.nome.value.trim();
    const msg = this.mensagem.value.trim();
    if (nome && msg) {
      const div = document.createElement('div');
      div.className = 'mural-item';
      div.innerHTML = `<strong>${nome}:</strong> ${msg}`;
      container.querySelector('.mural-list').appendChild(div);
      this.reset();
    }
  };
}

// Renderiza pedido de música (exemplo simples)
function renderPedidoMusica() {
    const container = document.getElementById('pedido-musica');
    if (!container) return;
    container.innerHTML = `
        <h3 class="titleWidgets">Peça sua música</h3>
        <div class="sepWidgets"></div>
        <div class="formPedidosWidget">
            <div class="titlePedidos">
                <i class="fas fa-envelope-open"></i> <span>Pedido de Música</span>
            </div>
            <div class="pedidoSucesso" style="display:none">Pedido enviado com sucesso! :)</div>
            <div class="contentPedidosControl">
                <p>Preencha os campos abaixo para submeter seu pedido de música:</p>
                <form class="formPedido">
                    <input type="text" name="nome" placeholder="Seu nome" required>
                    <input type="email" name="email" placeholder="Seu e-mail" required>
                    <input type="text" name="artista" placeholder="Nome do Artista" required>
                    <input type="text" name="musica" placeholder="Nome da Música" required>
                    <input type="text" name="mensagem" placeholder="Mensagem">
                    <span class="email-block" style="display:none;">
                        <label for="email">Leave this blank if you're human</label>
                        <input type="text" name="honey" autocomplete="off">
                    </span>
                    <button type="submit" class="btn-destaque" style="width:100%;margin-top:10px;">Enviar</button>
                </form>
            </div>
        </div>
        <a href="#" class="pedidoMusicaWidget">
            <div class="realContainerPedidos">
                <i class="fas fa-envelope-square"></i>
                <div class="containerTxtPedidos">Clique aqui e faça o seu <span>Pedido de Música</span></div>
            </div>
        </a>
    `;
    const form = container.querySelector('.formPedido');
    const sucesso = container.querySelector('.pedidoSucesso');
    form.onsubmit = function(e) {
        e.preventDefault();
        sucesso.style.display = 'block';
        setTimeout(() => {
            sucesso.style.display = 'none';
            form.reset();
        }, 1800);
    };
}

// Renderiza enquete (exemplo simples)
function renderEnquete() {
  const container = document.getElementById('enquete');
  if (!container) return;
  container.innerHTML = `
    <h3 class="titleWidgets">Enquete</h3>
    <div class="sepWidgets"></div>
    <form class="enquete-form">
      <div>Como está o novo site?</div>
      <label><input type="radio" name="voto" value="top"> Top</label><br>
      <label><input type="radio" name="voto" value="bom"> Bom</label><br>
      <label><input type="radio" name="voto" value="mediano"> Mediano</label><br>
      <label><input type="radio" name="voto" value="ruim"> Ruim</label><br>
      <button type="submit">Votar</button>
    </form>
    <div class="enquete-msg" style="display:none;color:var(--cor-principal);margin-top:8px;">Obrigado pelo voto!</div>
  `;
  container.querySelector('.enquete-form').onsubmit = function(e) {
    e.preventDefault();
    container.querySelector('.enquete-msg').style.display = 'block';
    setTimeout(() => {
      container.querySelector('.enquete-msg').style.display = 'none';
      this.reset();
    }, 1500);
  };
}

// Renderiza eventos
function renderEventos() {
    const eventos = [
        {
            titulo: "Show ao Vivo",
            imagem: "src/src_files/evento1.jpg",
            data: "25/05/2024",
            descricao: "Venha curtir o melhor do pop nacional com grandes atrações."
        },
        {
            titulo: "Festival de Rock",
            imagem: "src/src_files/evento2.jpg",
            data: "30/05/2024",
            descricao: "Bandas locais e convidados especiais. Entrada gratuita!"
        }
    ];
    const container = document.getElementById('widgetEventos');
    if (!container) return;
    container.innerHTML = eventos.map(ev => `
        <li>
            <div class="imgThumb"><img src="${ev.imagem}" alt="${ev.titulo}"></div>
            <div class="contentEventos">
                <h3>${ev.titulo}</h3>
                <div class="dataEvento">${ev.data}</div>
                <p>${ev.descricao}</p>
            </div>
        </li>
    `).join('');
}

// Renderiza grade de programação
function renderGradeProgramacao() {
    const grade = [
        { horario: "08:00", programa: "Manhã Flix", locutor: "João Silva" },
        { horario: "10:00", programa: "Hits do Momento", locutor: "Maria Souza" },
        { horario: "12:00", programa: "Almoço Musical", locutor: "Carlos Lima" },
        { horario: "14:00", programa: "Top 10", locutor: "Equipe Flix" }
    ];
    const container = document.getElementById('programacao');
    if (!container) return;
    let html = `<h2>Grade de Programação</h2><table class="grade-table"><thead><tr>
        <th>Horário</th><th>Programa</th><th>Locutor</th>
    </tr></thead><tbody>`;
    grade.forEach(item => {
        html += `<tr>
            <td>${item.horario}</td>
            <td class="programa">${item.programa}</td>
            <td class="locutor">${item.locutor}</td>
        </tr>`;
    });
    html += `</tbody></table>`;
    container.innerHTML = html;
}

// Renderiza blog
function renderBlog() {
    const blogPosts = [
        {
            titulo: "Bilheterias Estados Unidos: Venom estreia com força total",
            imagem: "src/src_files/venomending-blogroll-1538505459077_1280w-1-860x400.jpg",
            resumo: "Após ter tomado a primeira colocação de Gravidade no quesito bilheteiras das sessões pré-estreia deste mês, Venom também destronou o épico espacial de Alfonso Cuarón em termos de melhor abertura de...",
            url: "#",
            data: "Em 10/10/2018"
        },
        {
            titulo: "Rambo 5 ganha título oficial com referência ao primeiro filme",
            imagem: "src/src_files/feature-sylvester-stallone-pamer-teaser-poster-rambo-v-1300x500-860x400.jpg",
            resumo: "Sylvester Stallone está de volta como Rambo no quinto filme da franquia. Agora, o nome oficial do longa foi divulgado oficialmente: Rambo 5: Last Blood.",
            url: "#",
            data: "Em 10/10/2018"
        },
        {
            titulo: "Os Defensores: Charlie Cox diz que série foi muito lenta",
            imagem: "src/src_files/1502969861_479182_1503080386_noticia_normal-860x400.jpg",
            resumo: "A união de Demolidor, Jessica Jones, Luke Cage e Punho de Ferro culminou em Os Defensores, um dos crossovers mais antecipados do Universo Marvel.",
            url: "#",
            data: "Em 10/10/2018"
        }
    ];
    const container = document.getElementById('ultimas-musicas');
    if (!container) return;
    let html = `<h3 class="titleWidgets">Últimas do blog</h3><div class="sepWidgets"></div><ul class="widgetBlog">`;
    blogPosts.forEach(post => {
        html += `
            <li>
                <div class="imgThumb"><a href="${post.url}"><img src="${post.imagem}" alt="${post.titulo}"></a></div>
                <div class="contetNoticias">
                    <h4><a href="${post.url}">${post.titulo}</a></h4>
                    <p>${post.resumo} <a href="${post.url}">Leia mais</a></p>
                    <span class="finalBlogItem">${post.data}</span>
                </div>
            </li>
        `;
    });
    html += `</ul>`;
    container.innerHTML = html;
}

// Renderiza vídeo em destaque
function renderVideoDestaque() {
    const container = document.getElementById('videos-destaque');
    if (!container) return;
    container.innerHTML = `
        <h3 class="titleWidgets">Vídeo em destaque</h3>
        <div class="sepWidgets"></div>
        <iframe src="https://www.youtube.com/embed/0KSOMA3QBU0" width="100%" height="350" frameborder="0" allowfullscreen></iframe>
    `;
}

// Inicialização dos blocos
document.addEventListener('DOMContentLoaded', () => {
  renderNoticias();
  renderGaleria();
  renderTop10();
  renderMural();
  renderPedidoMusica();
  renderEnquete();
  renderEventos();
  renderGradeProgramacao();
  renderBlog();
  renderVideoDestaque();
});
