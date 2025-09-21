function renderMural() {
    const muralDiv = document.getElementById('mural-recados');
    if (!muralDiv) return;
    muralDiv.innerHTML = `
        <h3 class="titleWidgets">Mural de Recados</h3>
        <div class="sepWidgets"></div>
        <div class="mural-list"></div>
        <form class="mural-form">
            <input type="text" name="nome" placeholder="Seu nome" required>
            <input type="email" name="email" placeholder="Seu e-mail (gera avatar)" required>
            <input type="text" name="mensagem" placeholder="Seu recado" required>
            <button type="submit" class="btn-destaque" style="width:100%;margin-top:10px;">Enviar</button>
        </form>
    `;
    // Função para gerar avatar colorido (hash simples do e-mail)
    function avatar(email) {
        if (!email) return 'src/src_files/nocover.png';
        let hash = 0;
        for (let i = 0; i < email.length; i++) hash = email.charCodeAt(i) + ((hash << 5) - hash);
        const colors = ['f6e2a0','2f9fbc','5b8b3b','655608','e2ed7b'];
        return `src/src_files/${colors[Math.abs(hash)%colors.length]}.png`;
    }
    // Recados de exemplo
    const recados = [
        { nome: "João Jola", email: "joao@email.com", mensagem: "Muito boa a rádio!", data: "22/08/2023 11:01" },
        { nome: "Maria", email: "maria@email.com", mensagem: "Toca Raul!", data: "25/04/2024 16:51" }
    ];
    const lista = muralDiv.querySelector('.mural-list');
    const form = muralDiv.querySelector('.mural-form');
    function renderLista() {
        lista.innerHTML = recados.map(r => `
            <div class="mural-item" style="display:flex;align-items:center;background:var(--cor-bg-sec);border-radius:8px;padding:10px;margin-bottom:10px;box-shadow:0 1px 4px #0002;">
                <img src="${avatar(r.email)}" alt="avatar" style="width:48px;height:48px;border-radius:50%;margin-right:12px;border:2px solid var(--cor-principal);">
                <div>
                    <strong>${r.nome}</strong>
                    <div style="font-size:0.85em;color:var(--cor-texto-sec);">${r.data || ''}</div>
                    <div style="margin-top:4px;">${r.mensagem}</div>
                </div>
            </div>
        `).join('');
    }
    form.onsubmit = e => {
        e.preventDefault();
        const nome = form.nome.value.trim();
        const email = form.email.value.trim();
        const mensagem = form.mensagem.value.trim();
        if (nome && email && mensagem) {
            const now = new Date();
            const data = now.toLocaleDateString('pt-BR') + ' ' + now.toLocaleTimeString('pt-BR').slice(0,5);
            recados.unshift({ nome, email, mensagem, data });
            form.reset();
            renderLista();
        }
    };
    renderLista();
}

document.addEventListener('DOMContentLoaded', renderMural);
