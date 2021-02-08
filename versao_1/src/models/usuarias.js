const db = require('../database/connection');

const obterUsuarias = async() => {
    const query = "SELECT * FROM usuarias";
    const result = await db.query(query);
    return result
}

const obterUsuariasVaga = async(vaga) => {
    const query = {
        text: `SELECT * FROM usuarias WHERE area_interesse = '$1'`,
        values:[vaga.area_tecnologica]
    };
    const result = await db.query(query);
    return result;
}

const obterUsuariasPorEmail = async(email) => {
    const query = {
        text: `SELECT * FROM usuarias WHERE email = '$1'`,
        values:[email]
    };

    const result = await db.query(query);
    return result;
}



module.exports = { 
    obterUsuarias, 
    obterUsuariasVaga,
    obterUsuariasPorEmail
};