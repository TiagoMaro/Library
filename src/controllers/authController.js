const User = require('../models/user.js');

exports.register = async (req, res) => {
    try {
        const { email, cpf } = req.body;

        // Verifica se o email ou CPF já estão cadastrados
        const userExists = await User.findOne({ $or: [{ email }, { cpf }] });
        if (userExists) {
            return res.status(400).json({ error: 'Usuário ou CPF já cadastrado.' });
        }

        // Cria o novo usuário
        const user = await User.create(req.body);

        // Remove a senha do objeto de resposta por segurança
        user.password_hash = undefined;

        return res.status(201).json({
            message: 'Usuário criado com sucesso!',
            user
        });
    } catch (err) {
        return res.status(400).json({ error: 'Falha no registro: ' + err.message });
    }
};