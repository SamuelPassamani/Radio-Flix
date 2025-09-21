function initTop10() {
    const top10 = [
        { titulo: "Música 1", artista: "Artista 1", url: "musica1.mp3" },
        { titulo: "Música 2", artista: "Artista 2", url: "musica2.mp3" },
        // ...até 10
    ];
    const topDiv = document.getElementById('top10');
    topDiv.innerHTML = `
        <h3>Top 10 Músicas</h3>
        <ol>
            ${top10.map(m => `
                <li>
                    <span>${m.titulo} - ${m.artista}</span>
                    <audio controls src="${m.url}" style="vertical-align:middle;width:120px;"></audio>
                </li>
            `).join('')}
        </ol>
    `;
}

const top10Data = [
    { pos: 1, artista: "Andy Gunner", musica: "Give Love", capa: "src/src_files/albumart-givelove-1400px-1200x1200.jpg" },
    { pos: 2, artista: "Gennea", musica: "Give a Music", capa: "src/src_files/magic-music-album-review-marquee-magazine.jpg" },
    { pos: 3, artista: "Nick Minaj", musica: "Pink Pinkest", capa: "src/src_files/Nicki-Minaj-The-Pinkprint-greatest-album-covers-billboard-1000x1000.jpg" },
    { pos: 4, artista: "Big Sean", musica: "Let me know", capa: "src/src_files/cover_finally-famous.jpg" },
    { pos: 5, artista: "Dingdog", musica: "Urban Assault", capa: "src/src_files/Urban-Assault-trailer-music-album-cover.jpg" },
    { pos: 6, artista: "Linkin Park", musica: "Bleed it Out", capa: "src/src_files/20171215_071102_10272_5696.jpeg" },
    { pos: 7, artista: "Bon Jovi", musica: "Its My Life", capa: "src/src_files/First-Aid-Kit-Ruins-e1519715301105.jpg" },
    { pos: 8, artista: "Tiffany Le", musica: "Signature", capa: "src/src_files/CopyofMusicAlbumCoverTemplate.jpg" },
    { pos: 9, artista: "Run out", musica: "Dont Matter", capa: "src/src_files/Tame-Impala-Currents.jpg" },
    { pos: 10, artista: "Linkin Park", musica: "Numb", capa: "src/src_files/albumart-givelove-1400px-1200x1200.jpg" }
];

function renderTop10() {
    const container = document.getElementById('top10');
    if (!container) return;
    let html = `<h3 class="titleWidgets">Top 10</h3><div class="sepWidgets"></div>`;
    top10Data.forEach(item => {
        html += `
            <div class="containerTop secundarioTop">
                <div class="thumbImgTop"><div class="subAVideo"><img src="${item.capa}" width="100%"></div></div>
                <div class="nomeCantor"><span>#${String(item.pos).padStart(2, '0')}:</span> ${item.artista}</div>
                <div class="musicaTop">Musica: ${item.musica}</div>
            </div>
        `;
    });
    html += `<div class="clearfix"></div>`;
    container.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', renderTop10);
