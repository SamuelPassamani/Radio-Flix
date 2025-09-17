const fotosGaleria = [
    { imagem: "src/src_files/71aHeYnlXL._SL1500_-150x150.jpg", full: "src/src_files/71aHeYnlXL._SL1500_.jpg" },
    { imagem: "src/src_files/20171215_071102_10272_5696-150x150.jpeg", full: "src/src_files/20171215_071102_10272_5696.jpeg" },
    { imagem: "src/src_files/a1351bb1-1733-4fd2-8c6f-00f47b15958e_rw_1920-150x150.jpg", full: "src/src_files/a1351bb1-1733-4fd2-8c6f-00f47b15958e_rw_1920.jpg" },
    { imagem: "src/src_files/albumart-givelove-1400px-1200x1200-150x150.jpg", full: "src/src_files/albumart-givelove-1400px-1200x1200.jpg" },
    { imagem: "src/src_files/Album-Cover-1024x1024-150x150.jpg", full: "src/src_files/Album-Cover-1024x1024.jpg" },
    { imagem: "src/src_files/Chill-Music2-150x150.jpg", full: "src/src_files/Chill-Music2.jpg" }
];

function renderGaleria() {
    const galeriaDiv = document.getElementById('galeria');
    if (!galeriaDiv) return;
    let html = `<h2 class="titleModHome">Galeria de Exemplo</h2><div class="gallery">`;
    fotosGaleria.forEach(foto => {
        html += `
            <div class="gallery-item">
                <a href="${foto.full}" class="lightbox"><img src="${foto.imagem}" alt="Foto"></a>
            </div>
        `;
    });
    html += `</div>`;
    // Lightbox container
    html += `
        <div id="lightbox-modal" style="display:none;position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.85);z-index:9999;align-items:center;justify-content:center;">
            <span id="lightbox-close" style="position:absolute;top:30px;right:40px;font-size:2.5rem;color:#fff;cursor:pointer;">&times;</span>
            <img id="lightbox-img" src="" style="max-width:90vw;max-height:80vh;border-radius:10px;box-shadow:0 2px 16px #0008;">
        </div>
    `;
    galeriaDiv.innerHTML = html;

    // Lightbox JS
    const links = galeriaDiv.querySelectorAll('.lightbox');
    const modal = galeriaDiv.querySelector('#lightbox-modal');
    const img = galeriaDiv.querySelector('#lightbox-img');
    const closeBtn = galeriaDiv.querySelector('#lightbox-close');
    links.forEach(link => {
        link.onclick = function(e) {
            e.preventDefault();
            img.src = this.href;
            modal.style.display = 'flex';
        };
    });
    closeBtn.onclick = function() {
        modal.style.display = 'none';
        img.src = '';
    };
    modal.onclick = function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            img.src = '';
        }
    };
}

document.addEventListener('DOMContentLoaded', renderGaleria);
