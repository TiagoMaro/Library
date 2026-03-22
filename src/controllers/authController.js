const User = require('../models/user.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        //Buscar usuário e incluir explicitamente a senha
        const user = await User.findOne({ email }).select('+password_hash');

        if (!user) {
            return res.status(401).json({ error: 'E-mail ou senha incorretos' });
        }
        
        // Verifica se o hash realmente existe antes de comparar
        if (!user.password_hash) {
            return res.status(500).json({ error: 'Erro interno: Senha não encontrada no registro.' });
        }
        
        //Comparar a senha enviada com o hash do banco
        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (!isMatch) {
            return res.status(401).json({ error: 'E-mail ou senha incorretos' });
        }

        //Gerar o Token JWT
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' } // Expira em 24 horas
        );

        //Retornar os dados
        user.password_hash = undefined;
        return res.json({ user, token });

    } catch (err) {
        return res.status(500).json({ error: 'Erro no servidor: ' + err.message });
    }
};