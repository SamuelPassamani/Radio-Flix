function initNoticias() {
    const noticiasData = [
        {
            titulo: "Acabou a espera: ouça o novo single da Avril Lavigne!",
            img: "src/src_files/avril-lavigne--300x400.jpg",
            url: "#",
            data: "Em 10/10/2018"
        },
        {
            titulo: "Imagine Dragons lança clipe com letra de “Zero”, trilha de “WiFi Ralph”. Assista!",
            img: "src/src_files/imaginedragons_04-300x400.jpg",
            url: "#",
            data: "Em 10/10/2018"
        },
        {
            titulo: "Assista ao trailer do novo documentário sobre a Amy Winehouse",
            img: "src/src_files/Amy-Winehouse-foi-roubada-300x400.jpg",
            url: "#",
            data: "Em 10/10/2018"
        }
    ];

    // Renderiza bloco principal de notícias
    function renderNoticiasHome() {
        const noticiasDiv = document.getElementById('noticias');
        if (!noticiasDiv) return;
        let html = `<h2 class="titleModHome">Últimas notícias</h2><ul>`;
        noticiasData.forEach(n => {
            html += `
            <li>
                <div class="imgThumb"><a href="${n.url}"><img src="${n.img}" alt="${n.titulo}"></a></div>
                <div class="contetNoticias">
                    <h3><a href="${n.url}">${n.titulo}</a></h3>
                    <p>${n.data}</p>
                </div>
            </li>
            `;
        });
        html += `</ul>`;
        noticiasDiv.innerHTML = html;
    }

    // Renderiza widget central de notícias
    function renderNoticiasWidget() {
        const widgetDiv = document.getElementById('noticias-destaque');
        if (!widgetDiv) return;
        let html = `<h3 class="titleWidgets">Últimas notícias</h3><div class="sepWidgets"></div><ul id="widgetNoticias">`;
        noticiasData.forEach(n => {
            html += `
            <li>
                <div class="widgetNoticiasInner">
                    <div class="imgThumb"><a href="${n.url}"><img src="${n.img.replace('300x400', '255x125')}" alt="${n.titulo}"></a></div>
                    <div class="contetNoticias">
                        <strong>Música, </strong>
                        <h3><a href="${n.url}">${n.titulo}</a></h3>
                        <p>${n.data}</p>
                    </div>
                </div>
            </li>
            `;
        });
        html += `</ul>`;
        widgetDiv.innerHTML = html;
    }

    // Inicialização
    document.addEventListener('DOMContentLoaded', () => {
        renderNoticiasHome();
        renderNoticiasWidget();
    });
}
