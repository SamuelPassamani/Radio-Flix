// Slider/banner principal
const sliderBanners = [
    {
        img: "img/slider-1.png",
        link: "#"
    },
    {
        img: "img/slider-2.png",
        link: "#"
    },
    {
        img: "img/slider-3.png",
        link: "#"
    }
];

function renderSlider() {
    const slider = document.getElementById('slider-home');
    if (!slider) return;
    // Salva navegação e pager antes de sobrescrever o HTML
    const nav = slider.querySelector('.slider-nav');
    const pager = slider.querySelector('.slider-pager');
    // Remove slides antigos
    slider.innerHTML = '';
    // Adiciona slides
    sliderBanners.forEach((b, i) => {
        const slideDiv = document.createElement('div');
        slideDiv.className = 'slide';
        slideDiv.setAttribute('data-index', i);
        slideDiv.style.display = i === 0 ? 'block' : 'none';
        slideDiv.style.position = 'absolute';
        slideDiv.style.left = '0';
        slideDiv.style.top = '0';
        slideDiv.style.width = '100%';
        slideDiv.style.height = '100%';
        slideDiv.innerHTML = `
            <a href="${b.link}" style="display:flex;justify-content:center;align-items:center;width:100%;height:100%;">
                <img src="${b.img}" alt="Banner ${i+1}" style="width:100%;max-width:1170px;height:100%;object-fit:cover;display:block;">
            </a>
        `;
        slider.appendChild(slideDiv);
    });
    // Re-adiciona navegação e pager
    if (nav) slider.appendChild(nav);
    if (pager) slider.appendChild(pager);
    renderSliderNav(sliderBanners.length);
}

function renderSliderNav(total) {
    const slider = document.getElementById('slider-home');
    const pager = slider.querySelector('.slider-pager');
    let pagerHtml = '';
    for (let i = 0; i < total; i++) {
        pagerHtml += `<span class="pager-dot${i === 0 ? ' active' : ''}" data-index="${i}"></span>`;
    }
    pager.innerHTML = pagerHtml;
}

function setupSliderEvents() {
    const slider = document.getElementById('slider-home');
    const slides = slider.querySelectorAll('.slide');
    const prevBtn = slider.querySelector('.slider-prev');
    const nextBtn = slider.querySelector('.slider-next');
    const pagerDots = slider.querySelectorAll('.pager-dot');
    let current = 0;
    function showSlide(idx) {
        slides.forEach((s, i) => {
            s.style.display = i === idx ? 'block' : 'none';
        });
        pagerDots.forEach((d, i) => {
            d.classList.toggle('active', i === idx);
        });
        current = idx;
    }
    prevBtn.onclick = () => showSlide((current - 1 + slides.length) % slides.length);
    nextBtn.onclick = () => showSlide((current + 1) % slides.length);
    pagerDots.forEach(dot => {
        dot.onclick = () => showSlide(Number(dot.dataset.index));
    });
    // Auto-slide
    setInterval(() => showSlide((current + 1) % slides.length), 6000);
}

// Carrossel de notícias (horizontal)
const noticiasCarousel = [
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
    },
    {
        titulo: "Beyoncé é eleita a mulher mais poderosa do mundo da música. Veja a lista!",
        img: "src/src_files/beyonce_knowles_4-normal-300x400.jpg",
        url: "#",
        data: "Em 10/10/2018"
    }
];

function renderNewsCarousel() {
    const newsDiv = document.getElementById('news-carousel');
    if (!newsDiv) return;
    const groupSize = window.innerWidth < 900 ? 2 : 3;
    let html = `<div class="news-carousel-wrapper">`;
    for (let i = 0; i < noticiasCarousel.length; i += groupSize) {
        html += `<div class="news-slide-group" data-index="${Math.floor(i/groupSize)}" style="display:${i === 0 ? 'flex' : 'none'};gap:24px;">`;
        for (let j = i; j < i + groupSize && j < noticiasCarousel.length; j++) {
            const n = noticiasCarousel[j];
            html += `
                <div class="news-slide" style="flex:1;">
                    <div class="imgThumb"><a href="${n.url}"><img src="${n.img}" alt="${n.titulo}"></a></div>
                    <div class="contetNoticias">
                        <h3><a href="${n.url}">${n.titulo}</a></h3>
                        <p>${n.data}</p>
                    </div>
                </div>
            `;
        }
        html += `</div>`;
    }
    html += `
        <div class="news-nav">
            <button class="news-prev">&lt;</button>
            <button class="news-next">&gt;</button>
        </div>
        <div class="news-pager"></div>
    </div>`;
    newsDiv.innerHTML = html;
    renderNewsPager(Math.ceil(noticiasCarousel.length / groupSize));
}

function setupNewsCarouselEvents() {
    const newsDiv = document.getElementById('news-carousel');
    const groups = newsDiv.querySelectorAll('.news-slide-group');
    const prevBtn = newsDiv.querySelector('.news-prev');
    const nextBtn = newsDiv.querySelector('.news-next');
    const pagerDots = newsDiv.querySelectorAll('.news-dot');
    let current = 0;
    function showGroup(idx) {
        groups.forEach((g, i) => {
            g.style.display = i === idx ? 'flex' : 'none';
        });
        pagerDots.forEach((d, i) => {
            d.classList.toggle('active', i === idx);
        });
        current = idx;
    }
    prevBtn.onclick = () => showGroup((current - 1 + groups.length) % groups.length);
    nextBtn.onclick = () => showGroup((current + 1) % groups.length);
    pagerDots.forEach(dot => {
        dot.onclick = () => showGroup(Number(dot.dataset.index));
    });
    setInterval(() => showGroup((current + 1) % groups.length), 7000);
}

function renderNewsPager(total) {
    const newsDiv = document.getElementById('news-carousel');
    const pager = newsDiv.querySelector('.news-pager');
    let pagerHtml = '';
    for (let i = 0; i < total; i++) {
        pagerHtml += `<span class="news-dot${i === 0 ? ' active' : ''}" data-index="${i}"></span>`;
    }
    pager.innerHTML = pagerHtml;
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    renderSlider();
    setupSliderEvents();
    renderNewsCarousel();
    setupNewsCarouselEvents();
});
