function initAdmin() {
    renderAdmin();
    renderHistory();
    renderUsers();
    updateStats();
}

function updateStats() {
    const livros = JSON.parse(localStorage.getItem('livros')) || [];
    const historico = JSON.parse(localStorage.getItem('historicoEmprestimos')) || [];
    const utilizadores = JSON.parse(localStorage.getItem('users')) || [];

    document.getElementById('stat-total-books').innerText = livros.length;
    document.getElementById('stat-total-loans').innerText = historico.length;
    document.getElementById('stat-total-users').innerText = utilizadores.length;
}

function renderAdmin() {
    const livros = JSON.parse(localStorage.getItem('livros')) || [];
    const tbody = document.getElementById('adminTable');

    tbody.innerHTML = livros.map(l => `
        <tr>
            <td><strong>${l.titulo}</strong><br><small>${l.autor}</small></td>
            <td><span style="background:#e8efff; color:#7494ec; padding:4px 10px; border-radius:15px; font-size:11px; font-weight:600;">${l.categoria}</span></td>
            <td>
                <button onclick="changeStock(${l.id}, -1)">-</button>
                <span style="margin: 0 10px; font-weight:bold;">${l.estoque}</span>
                <button onclick="changeStock(${l.id}, 1)">+</button>
            </td>
            <td>
                <button onclick="removeBook(${l.id})" style="color:red; background:none; border:none; cursor:pointer;"><i class="fa-solid fa-trash"></i></button>
            </td>
        </tr>
    `).join('');
    updateStats();
}

function addBook() {
    const title = document.getElementById('newTitle').value;
    const author = document.getElementById('newAuthor').value;
    const category = document.getElementById('newCategory').value;
    const stock = parseInt(document.getElementById('newStock').value);

    if (!title || !author || isNaN(stock) || category === "") {
        alert("Preencha todos os campos e selecione a categoria!");
        return;
    }

    const livros = JSON.parse(localStorage.getItem('livros')) || [];
    livros.push({ id: Date.now(), titulo: title, autor: author, categoria: category, estoque: stock });
    localStorage.setItem('livros', JSON.stringify(livros));

    document.getElementById('newTitle').value = '';
    document.getElementById('newAuthor').value = '';
    document.getElementById('newCategory').selectedIndex = 0;
    document.getElementById('newStock').value = '';
    renderAdmin();
}

function changeStock(id, amount) {
    let livros = JSON.parse(localStorage.getItem('livros'));
    const index = livros.findIndex(l => l.id === id);
    if (livros[index].estoque + amount >= 0) {
        livros[index].estoque += amount;
        localStorage.setItem('livros', JSON.stringify(livros));
        renderAdmin();
    }
}

function removeBook(id) {
    if (confirm("Eliminar livro?")) {
        let livros = JSON.parse(localStorage.getItem('livros'));
        livros = livros.filter(l => l.id !== id);
        localStorage.setItem('livros', JSON.stringify(livros));
        renderAdmin();
    }
}

function renderUsers() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const tbody = document.getElementById('usersTable');
    tbody.innerHTML = users.map(u => `
        <tr>
            <td>${u.username}</td>
            <td>${u.email}</td>
            <td><button onclick="removeUser('${u.email}')" style="color:red; background:none; border:none; cursor:pointer;"><i class="fa-solid fa-user-minus"></i></button></td>
        </tr>
    `).join('');
}

function removeUser(email) {
    if (confirm("Remover utilizador?")) {
        let users = JSON.parse(localStorage.getItem('users'));
        users = users.filter(u => u.email !== email);
        localStorage.setItem('users', JSON.stringify(users));
        renderUsers();
        updateStats();
    }
}

function renderHistory() {
    const historico = JSON.parse(localStorage.getItem('historicoEmprestimos')) || [];
    const tbody = document.getElementById('historyTable');
    tbody.innerHTML = historico.slice().reverse().map(h => `
        <tr>
            <td>${h.usuario}</td>
            <td>${h.livro}</td>
            <td>${h.data}</td>
        </tr>
    `).join('');
}

function clearHistory() {
    if (confirm("Limpar histórico?")) {
        localStorage.removeItem('historicoEmprestimos');
        renderHistory();
        updateStats();
    }
}

initAdmin();