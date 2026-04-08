const loggedUser = JSON.parse(sessionStorage.getItem('loggedUser'));
if (!loggedUser) window.location.href = 'index.html';
document.getElementById('welcome-user').innerText = `Olá, ${loggedUser.username}`;

function renderizarLivros(filtro = '') {
    const livros = JSON.parse(localStorage.getItem('livros')) || [];
    const container = document.getElementById('acervo');

    const filtrados = livros.filter(l =>
        l.titulo.toLowerCase().includes(filtro.toLowerCase()) ||
        l.autor.toLowerCase().includes(filtro.toLowerCase())
    );

    container.innerHTML = filtrados.map(l => `
        <div class="admin-section" style="border-top: 4px solid #7494ec;">
            <small style="color:#7494ec; font-weight:bold;">${l.categoria}</small>
            <h3 style="margin: 10px 0 5px 0;">${l.titulo}</h3>
            <p style="color:#666; font-size:14px;">${l.autor}</p>
            <hr style="margin:15px 0; border:0; border-top:1px solid #eee;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <span>Qtd: <strong>${l.estoque}</strong></span>
                <button class="btn" style="width: 100px; height: 35px; font-size: 13px;"
                    ${l.estoque <= 0 ? 'disabled style="background:#ccc"' : ''} 
                    onclick="emprestar(${l.id}, '${l.titulo}')">
                    ${l.estoque > 0 ? 'Requisitar' : 'Esgotado'}
                </button>
            </div>
        </div>
    `).join('');
}

function emprestar(id, titulo) {
    let livros = JSON.parse(localStorage.getItem('livros'));
    const index = livros.findIndex(l => l.id === id);

    if (livros[index].estoque > 0) {
        livros[index].estoque--;
        localStorage.setItem('livros', JSON.stringify(livros));

        const historico = JSON.parse(localStorage.getItem('historicoEmprestimos')) || [];
        historico.push({
            usuario: loggedUser.username,
            livro: titulo,
            data: new Date().toLocaleString('pt-BR')
        });
        localStorage.setItem('historicoEmprestimos', JSON.stringify(historico));

        alert(`Sucesso! Pegou "${titulo}" emprestado.`);
        renderizarLivros();
    }
}

function filterBooks() {
    renderizarLivros(document.getElementById('search').value);
}

function logout() {
    sessionStorage.removeItem('loggedUser');
    window.location.href = 'index.html';
}

renderizarLivros();