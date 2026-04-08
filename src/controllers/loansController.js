const Loan = require('../models/loan');
const Book = require('../models/book');

exports.createLoan = async (req, res) => {
    try {
        const { user, book, return_date } = req.body;

        // 1. Verificar se o livro existe e tem estoque disponível
        const targetBook = await Book.findById(book);
        if (!targetBook || targetBook.stock.available <= 0) {
            return res.status(400).json({ error: 'Livro indisponível para empréstimo.' });
        }

        // 2. Criar o empréstimo
        const newLoan = await Loan.create({
            user,
            book,
            return_date
        });

        // 3. Atualizar o estoque do livro (Subtrai 1)
        targetBook.stock.available -= 1;
        await targetBook.save();

        return res.status(201).json(newLoan);
    } catch (err) {
        return res.status(500).json({ error: 'Erro ao processar empréstimo: ' + err.message });
    }
};

exports.returnBook = async (req, res) => {
    try {
        const { id } = req.params; // ID do Empréstimo vindo da URL

        const loan = await Loan.findById(id);
        if (!loan || loan.status === 'returned') {
            return res.status(400).json({ error: 'Empréstimo não encontrado ou já devolvido.' });
        }

        // 1. Atualizar o status e a data de devolução do empréstimo
        loan.status = 'returned';
        loan.actual_return_date = Date.now();
        await loan.save();

        // 2. Devolver o livro ao estoque (Soma 1)
        const targetBook = await Book.findById(loan.book);
        if (targetBook) {
            targetBook.stock.available += 1;
            await targetBook.save();
        }

        return res.json({ message: 'Livro devolvido com sucesso!', loan });
    } catch (err) {
        return res.status(500).json({ error: 'Erro ao processar devolução: ' + err.message });
    }
};