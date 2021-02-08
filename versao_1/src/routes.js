const { Router } = require('express');
const Usuarias = require('./models/usuarias')
const routes = new Router;

routes.get('/', (req, res) => {
    res.json({mensagem: 'Tudo ok!'})
});

routes.post('/authenticate', );


module.exports = routes;