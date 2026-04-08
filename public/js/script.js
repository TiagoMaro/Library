const container = document.querySelector('.container');
const registerBtn = document.querySelector('.register-btn');
const loginBtn = document.querySelector('.login-btn');
const loginForm = document.querySelector('.form-box.login form');
const registerForm = document.querySelector('.form-box.register form');

// BANCO DE DADOS INICIAL (20 LIVROS)
if (!localStorage.getItem('livros')) {
    const catalogoGigante = [
        { id: 101, titulo: "Código Limpo", autor: "Robert C. Martin", categoria: "Programação", estoque: 15 },
        { id: 102, titulo: "O Senhor dos Anéis", autor: "J.R.R. Tolkien", categoria: "Literatura", estoque: 8 },
        { id: 103, titulo: "Breves Respostas para Grandes Questões", autor: "Stephen Hawking", categoria: "Ciências", estoque: 12 },
        { id: 104, titulo: "Sapiens: Uma Breve História", autor: "Yuval Noah Harari", categoria: "História", estoque: 20 },
        { id: 105, titulo: "Arquitetura Limpa", autor: "Robert C. Martin", categoria: "Programação", estoque: 10 },
        { id: 106, titulo: "Dom Casmurro", autor: "Machado de Assis", categoria: "Literatura", estoque: 5 },
        { id: 107, titulo: "O Gene Egoísta", autor: "Richard Dawkins", categoria: "Ciências", estoque: 7 },
        { id: 108, titulo: "A Era do Capital", autor: "Eric Hobsbawm", categoria: "História", estoque: 4 },
        { id: 109, titulo: "Design Patterns", autor: "Gang of Four", categoria: "Programação", estoque: 6 },
        { id: 110, titulo: "1984", autor: "George Orwell", categoria: "Literatura", estoque: 18 },
        { id: 111, titulo: "Cosmos", autor: "Carl Sagan", categoria: "Ciências", estoque: 15 },
        { id: 112, titulo: "Os Miseráveis", autor: "Victor Hugo", categoria: "Literatura", estoque: 3 },
        { id: 113, titulo: "Algoritmos", autor: "Thomas Cormen", categoria: "Programação", estoque: 9 },
        { id: 114, titulo: "O Diário de Anne Frank", autor: "Anne Frank", categoria: "História", estoque: 11 },
        { id: 115, titulo: "Aventuras de Alice", autor: "Lewis Carroll", categoria: "Literatura", estoque: 7 },
        { id: 116, titulo: "Grande Sertão: Veredas", autor: "Guimarães Rosa", categoria: "Literatura", estoque: 5 },
        { id: 117, titulo: "Uma Breve História do Tempo", autor: "Stephen Hawking", categoria: "Ciências", estoque: 14 },
        { id: 118, titulo: "A Arte da Guerra", autor: "Sun Tzu", categoria: "História", estoque: 25 },
        { id: 119, titulo: "Refatoração", autor: "Martin Fowler", categoria: "Programação", estoque: 8 },
        { id: 120, titulo: "O Pequeno Príncipe", autor: "Antoine de Saint-Exupéry", categoria: "Literatura", estoque: 30 }
    ];
    localStorage.setItem('livros', JSON.stringify(catalogoGigante));
}

function showMsg(text, type) {
    const msg = document.createElement('div');
    msg.classList.add('notification', type);
    msg.innerText = text;
    document.body.appendChild(msg);
    setTimeout(() => msg.classList.add('show'), 100);
    setTimeout(() => {
        msg.classList.remove('show');
        setTimeout(() => msg.remove(), 500);
    }, 3000);
}

registerBtn.addEventListener('click', () => container.classList.add('active'));
loginBtn.addEventListener('click', () => container.classList.remove('active'));

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = registerForm.querySelector('input[placeholder="Username"]').value;
    const email = registerForm.querySelector('input[placeholder="Email"]').value;
    const password = registerForm.querySelector('input[placeholder="Password"]').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.find(user => user.email === email)) {
        showMsg("E-mail já cadastrado!", "error");
    } else {
        users.push({ username, email, password, role: 'user' });
        localStorage.setItem('users', JSON.stringify(users));
        showMsg("Conta criada! ✨", "success");
        registerForm.reset();
        setTimeout(() => container.classList.remove('active'), 1500);
    }
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const usernameInput = loginForm.querySelector('input[placeholder="Username"]').value;
    const passwordInput = loginForm.querySelector('input[placeholder="Password"]').value;

    if (usernameInput === 'admin' && passwordInput === 'admin') {
        sessionStorage.setItem('loggedUser', JSON.stringify({ username: 'Admin', role: 'admin' }));
        window.location.href = 'admin.html';
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.username === usernameInput && u.password === passwordInput);

    if (user) {
        sessionStorage.setItem('loggedUser', JSON.stringify(user));
        showMsg("Login realizado!", "success");
        setTimeout(() => window.location.href = 'acervo.html', 1000);
    } else {
        showMsg("Dados incorretos!", "error");
    }
});