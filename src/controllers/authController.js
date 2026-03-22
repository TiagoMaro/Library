const User = require('../models/user.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
    try {
        const { email, cpf } = req.body;

        //Verify if user exists 
        const userExists = await User.findOne({ $or: [{ email }, { cpf }] });
        if (userExists) {
            return res.status(400).json({ error: 'Usuário ou CPF já cadastrado.' });
        }

        //Create new user
        const user = await User.create(req.body);

        //Remove the password
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

        //Change the user and include the password hash
        const user = await User.findOne({ email }).select('+password_hash');

        if (!user) {
            return res.status(401).json({ error: 'E-mail ou senha incorretos' });
        }
        
        //Verify if a password hash exists
        if (!user.password_hash) {
            return res.status(500).json({ error: 'Erro interno: Senha não encontrada no registro.' });
        }

        //Compare the passwords
        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (!isMatch) {
            return res.status(401).json({ error: 'E-mail ou senha incorretos' });
        }

        //Generate Token JWT
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' } //1 day
        );

        //Return datas
        user.password_hash = undefined;
        return res.json({ user, token });

    } catch (err) {
        return res.status(500).json({ error: 'Erro no servidor: ' + err.message });
    }
};