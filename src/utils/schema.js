const database = require('./database');

/**
 * criação das querys das tabelas
 */

const schema = {
	1: `CREATE TABLE IF NOT EXISTS usuarias(
        id_usuaria serial primary key,
        nome varchar(50),
        email varchar(30),
        senha varchar(20),
        area_interesse varchar(50),
        hab_tecnicas text, --habilidades tecnicas multiplos valores
        outras_hab_tecnicas text, --outras habilidades tecnicas multiplos valores
        hab_socioemocionais text, --habilidades socioemocionais multiplos valores
        sobre_voce text,
        portfolio varchar(50),
        linkedin varchar(50),
        formacao varchar(20),
        experiencias text,
        trabalho_voluntario text,
        video_apresentacao varchar(50),
        descricao_empresa text,
        mudanca_cidade varchar(10),
        ramo_atuacao varchar(30) -- ??
    );`,
	2: `CREATE TABLE IF NOT EXISTS clientes(
		id SERIAL PRIMARY KEY,
		idUser VARCHAR (50) NOT NULL,
		nome VARCHAR(255) NOT NULL,
		email VARCHAR(100) NOT NULL,
		cpf VARCHAR(50) NOT NULL,
		tel VARCHAR(50) NOT NULL,
	);`
};

/**
 * Função de dropar tabelas no banco
 */
const drop = async (nomeTabela) => {
	if(nomeTabela){
		await database.query(`DROP TABLE ${nomeTabela}`);
		console.log("Tabela Deletada");
	}
};

/**
 * Função de subir tabelas para o banco
 * @param {*} indiceTabela 
 */
const up = async (indiceTabela = null) => {
	if(!indiceTabela){
		for(const value in schema){
			const result = await database.query({ text: schema[value]});
			console.log(result);
		}
	}else{
		const result = await database.query({ text: schema[indiceTabela]});
		console.log(result);
	}
	console.log('Migração Concluída');
};
module.exports = {drop, up }
/**
 * Rode up() para subir todas as tabelas ou up(indiceDaTabela) para subir uma tabela específica
 * Rode drop("nomeDaTabela") para excluir uma das tabela armazenadas no banco 
 */

//up();
//up(1);
//drop('users');