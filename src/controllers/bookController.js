const Book = require('../models/book.js');

//Create new book, if exists the system return a error "Este livro já está cadastro" - "This book already exists"
exports.createBook = async (req, res) => {
    try {
        const { title, author } = req.body;

        //Verify if book exists
        const bookExists = await Book.findOne({ title, author });
        if (bookExists) {
            return res.status(400).json({ error: 'Este livro já está cadastrado' });
        }

        const book = await Book.create(req.body);
        return res.status(201).json(book);
    } catch (err) {
        return res.status(400).json({ error: 'Erro ao cadastrar livro: ' + err.message });
    }
};

//List the books
exports.listBooks = async (req, res) => {
    try {
        const books = await Book.find();
        return res.json(books);
    } catch (err) {
        return res.status(500).json({ error: 'Erro ao buscar livros.' }); //Error to list the books
    }
};