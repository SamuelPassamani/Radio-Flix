function initEnquete() {
    const enqueteDiv = document.getElementById('enquete');
    enqueteDiv.innerHTML = `
        <h3 class="titleWidgets">Enquete</h3>
        <div class="sepWidgets"></div>
        <form class="enquete-form">
            <div>Como está o novo site?</div>
            <label><input type="radio" name="opcao" value="Top"> Top</label><br>
            <label><input type="radio" name="opcao" value="Bom"> Bom</label><br>
            <label><input type="radio" name="opcao" value="Mediano"> Mediano</label><br>
            <label><input type="radio" name="opcao" value="Ruim"> Ruim</label><br>
            <button type="submit">Votar</button>
        </form>
        <div class="enquete-msg" style="display:none;color:var(--cor-principal);margin-top:8px;">Obrigado pelo voto!</div>
        <div id="resultado-enquete" style="margin-top:10px;"></div>
        <button id="limpar-votos" style="margin-top:10px;background:#222;color:#fff;border:none;padding:6px 16px;border-radius:5px;cursor:pointer;">Limpar votos</button>
    `;
    let votos = { Top: 0, Bom: 0, Mediano: 0, Ruim: 0 };
    const form = enqueteDiv.querySelector('.enquete-form');
    const resultado = enqueteDiv.querySelector('#resultado-enquete');
    const msg = enqueteDiv.querySelector('.enquete-msg');
    const btnLimpar = enqueteDiv.querySelector('#limpar-votos');
    form.onsubmit = e => {
        e.preventDefault();
        const op = enqueteDiv.querySelector('input[name="opcao"]:checked');
        if (op) votos[op.value]++;
        msg.style.display = 'block';
        setTimeout(() => { msg.style.display = 'none'; }, 1200);
        render();
    };
    btnLimpar.onclick = function() {
        votos = { Top: 0, Bom: 0, Mediano: 0, Ruim: 0 };
        render();
    };
    function render() {
        resultado.innerHTML =
            `Top: ${votos.Top} | Bom: ${votos.Bom} | Mediano: ${votos.Mediano} | Ruim: ${votos.Ruim}`;
    }
    render();
}

window.initEnquete = initEnquete;
document.addEventListener('DOMContentLoaded', initEnquete);
