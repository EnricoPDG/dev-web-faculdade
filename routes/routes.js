const express = require('express');
const router = express.Router()
module.exports = router;

//Post Method
const taskModel = require('../models/task');
router.post('/post', async (req, res) => {
    const data = new taskModel({
        description: req.body.description,
        done: req.body.done
    })
    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Get all Method
router.get('/getAll', verificaJWT, async (req, res, next) => {
    {
        try {
            const data = await taskModel.find();
            res.json(data)
        }
        catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
})

//Get by ID Method
router.get('/getOne/:id', async (req, res) => {
    try {
        const data = await taskModel.findById(req.params.id);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await taskModel.findByIdAndDelete(id)
        //res.send(`Document with ${data.description} has been deleted..`)
        res.send(data)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Update by ID Method
router.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };
        const result = await taskModel.findByIdAndUpdate(
            id, updatedData, options
        )
        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Autenticacao
var jwt = require('jsonwebtoken');
router.post('/login', (req, res, next) => {
    if (req.body.nome === 'branqs' && req.body.senha === '1234') {
        const token = jwt.sign({ id: req.body.nome }, 'segredo',
            { expiresIn: 300 });
        return res.json({ auth: true, token: token });
    }
    res.status(500).json({ message: 'Login invalido!' });
})

//Autorizacao
function verificaUsuarioSenha(req, res, next) {
    if (req.body.nome !== 'branqs' || req.body.senha !== '1234') {
        return res.status(401).json({ auth: false, message: 'Usuario ou Senha incorreta' });
    }
    next();
}

//Nova forma de Autorizacao
function verificaJWT(req, res, next) {
    const token = req.headers['id-token'];
    if (!token) return res.status(401).json({
        auth: false, message:
            'Token nao fornecido'
    });
    jwt.verify(token, 'segredo', function (err, decoded) {
        if (err) return res.status(500).json({
            auth: false, message:
                'Falha para autenticar token.'
        });
        next();
    });
}