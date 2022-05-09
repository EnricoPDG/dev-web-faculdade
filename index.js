const express = require('express');

const app = express();
app.use(express.json());

const routes = require('./routes/routes.js');
app.use('/api', routes)

const port = 3000;

app.listen(port, () => {
    console.log(`Server iniciado na porta ${port}`)
})

// Obtendo os parametros passados pela linha de comando
var userArgs = process.argv.slice(2);
var mongoURL = userArgs[0];
//Configurando a conexao com o Banco de Dados
var mongoose = require('mongoose');
mongoose.connect(mongoURL, {useNewUrlParser: true, useUnifiedTopology:
true});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', (error) => {
console.log(error)
})
db.once('connected', () => {
console.log('Database Connected');
})