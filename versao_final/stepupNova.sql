create database stepup;


create table usuarias(
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
	escola varchar(50),
    justificativa_indicacao text,
    idiomas varchar(50),
    cidade varchar(50)
);


create table empresas(
	id_empresa serial primary key,
	nome varchar(50),
	email varchar(30),
	senha varchar(20),
	hab_tecnicas text, --não sei mais se precisa
	hab_socioemocionais text, --não sei mais se precisa
	video_apresentacao varchar(50),
	ramo_atuacao varchar(30)
);


create table vagas (
	id_vagas serial primary key,
	area_tecnologica varchar(30),
	descricao_vaga text,
	empresa int references empresas(id_empresa)
);




