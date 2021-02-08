const express = require('express');
const bodyParser = require('body-parser');
const { pool } = require('./dbConfig');
const bcrypt = require('bcrypt');
const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport');
require('dotenv').config()
const app = express();

const PORT = process.env.PORT || 8080;

const inicializePassport = require('./passportConfig');
inicializePassport(passport);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.set("view engine", "ejs");


app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,

}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/empresa/cadastrar', checkAuthenticated, (req, res) => {
    res.render("cadastro");
})

app.get('/empresa/login', checkAuthenticated, (req, res) => {
    res.render("login");
})

app.get('/empresa/dashboard', checkNotAuthenticated, (req, res) => {
    console.log(req.isAuthenticated());
    
    dados = req.user;
    //console.log(dados);
    res.render("dashboard" , dados);

})

app.post('/empresa/usuarias', async (req, res) => {

    const { area } = req.body;
    //console.log(area); 
    //var resultado; 
    await pool.query(
        'SELECT * FROM usuarias', (error, result) => {
            if (error) {
                throw error;
            }
            
/*          const resultado = result.rows
            console.log(resultado)
            return resultado */
       
        res.render("usuarias", {resultado: result.rows}); 
    }) 
                  
})

app.get('/empresa/logout', (req, res) => {
    req.logout();
    res.redirect('/empresa/login');
})

app.post('/empresa/cadastrar', async (req, res) => {
    let { nome, email, senha, hab_tecnicas, hab_socioemocionais, video_apresentacao, ramo_atuacao } = req.body;
    
    //console.log({ nome, email, senha, hab_tecnicas, hab_socioemocionais, video_apresentacao, ramo_atuacao })

    let errors = [];

    if (!nome || !email || !senha){
        errors.push({message: "Preencha os campos obrigatórios"})
    }

    if (senha.length < 6){
        errors.push({message: "A senha precisa ter no mínimo 6 caracteres"})
    }

    if(errors.length > 0){
        res.render('cadastro', { errors });
    } else {

        let hashedSenha = await bcrypt.hash(senha, 10);

        pool.query(
            `SELECT * FROM empresas
            WHERE email = $1`, 
            [email], 
            (error, result) => {
                if (error) {
                    throw error;
                }

                console.log(result.rows)

                if(result.rows.length > 0) {
                    errors.push({message: "Email já está cadastrado."});
                    res.render('cadastro', { errors });
                } else {
                    pool.query(
                        `INSERT INTO empresas (nome, email, senha, hab_tecnicas, hab_socioemocionais, video_apresentacao, ramo_atuacao) 
                        VALUES ($1, $2, $3, $4, $5, $6, $7)
                        RETURNING id_empresa, senha`,
                        [nome, email, hashedSenha, hab_tecnicas, hab_socioemocionais, video_apresentacao, ramo_atuacao],
                        (error, result) => {
                            if(error) {
                                throw error;
                            }
                            console.log(result.rows);
                            req.flash('info', "Cadastrado com sucesso!");
                            res.redirect('/empresa/login');
                        }
                        
                    )
                }
                
            }
        )
    }

});

app.post('/empresa/login', passport.authenticate("local", {
    successRedirect: '/empresa/dashboard',
    failureRedirect: '/empresa/login',
    failureFlash: true
}));

function checkAuthenticated(req, res, next) {
    if(req.isAuthenticated()){
        return res.redirect("/empresa/dashboard");
    }
    next();
}

function checkNotAuthenticated(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/empresa/login");
}



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})