const db = require('../database/connection');

const listarVagas = async(empresa) => {
    const query = {
        text: `SELECT * FROM vagas INNER JOIN empresas ON ;`,
        value: [empresa.id_empresa]
    }
    const result = await db.query(query);
    return result;
}

module.exports = listarVagas;