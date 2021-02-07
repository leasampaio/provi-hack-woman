const LocalStrategy = require('passport-local').Strategy;
const { pool } = require('./dbConfig');
const bcrypt = require('bcrypt');

function initialize(passport){
    console.log("Inicializado");
    
    const authenticateUser = (email, senha, done) => {
        console.log(email, senha);
        pool.query(
            `SELECT * FROM empresas WHERE email = $1`,
            [email],
            (error, result) => {
                if(error) {
                    throw error;
                }

                console.log(result.rows);

                if(result.rows.length > 0){
                    const empresa = result.rows[0];

                    bcrypt.compare(senha, empresa.senha, (error, isMatch) => {
                        if(error) {
                            console.log(error);
                        }
                        if(isMatch){
                            return done(null, empresa);
                        } else {
                            return done(null, false, {mensagem: "Senha está incorreta."});
                        }
                    });
                }else {
                    return done(null, false, {mensagem: "Email não cadastrado"});
                }
            }
        );
    };

    passport.use(
        new LocalStrategy(
            {   
                usernameFild: "email",
                passwordFild: "senha",
            },
            authenticateUser
        )
    );

    passport.serializeUser((empresa, done) => done(null, empresa.id_empresa));

    passport.deserializeUser((id_empresa, done) => {
        pool.query(
            `SELECT * FROM empresas WHERE id_empresa = $1`,
            [id_empresa],
            (error, result) => {
                if(error) {
                    return done(error);
                }
                console.log(`ID is ${result.rows[0].id_empresa}`);
                return done(null, result.row[0]);
            }
        );
    });
}

module.exports = initialize;