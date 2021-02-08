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

                //console.log(result.rows);

                if(result.rows.length > 0){
                    const empresa = result.rows[0];

                    bcrypt.compare(senha, empresa.senha, (error, isMatch) => {
                        if(error) {
                            //console.log(error);
                        }
                        if(isMatch){
                            return done(null, empresa);
                        } else {
                            return done(null, false, {message: "Senha está incorreta."});
                        }
                    });
                }else {
                    return done(null, false, {message: "Email não cadastrado"});
                }
            }
        );
    };

    passport.use(
        new LocalStrategy(
            {   
                usernameField: 'email',
                passwordField: 'senha',
            },
            authenticateUser
        )
    );

    passport.serializeUser((empresa, done) => done(null, empresa.id_empresa));

    passport.deserializeUser((id_empresa, done) => {
        pool.query(
            `SELECT * FROM empresas INNER JOIN vagas ON empresas.id_empresa = vagas.empresa 
            WHERE id_empresa = $1`,
            [id_empresa],
            (error, result) => {
                if(error) {
                    return done(error);
                }
                console.log(result.rows);
                return done(null, result.rows);
            }
        );
    });
}

module.exports = initialize;
