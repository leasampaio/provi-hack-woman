create database stepup;


create table usuarias(
	id_usuaria serial primary key,
	nome varchar(50),
	email varchar(30),
	senha varchar(20),
	area_interesse varchar(50),
	hab_tecnicas text, 
	outras_hab_tecnicas text, 
	hab_socioemocionais text, 
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
	hab_tecnicas text, 
	hab_socioemocionais text, 
	video_apresentacao varchar(50),
	ramo_atuacao varchar(30)
);


create table vagas (
	id_vagas serial primary key,
	area_tecnologica varchar(30),
	descricao_vaga text,
	empresa int references empresas(id_empresa)
);


insert into empresas (nome, email, senha, hab_tecnicas, hab_socioemocionais, video_apresentacao, ramo_atuacao)
values ('Exemplo Corporation', 'email@exemplo', '$2b$10$d.LvstbrTA074IfwGxJvj.RdFDcKUdSCJcFeXl9MhwJNTULUppo/G', 'habilidade tecnica 1; habilidade tecnica 2;habilidade tecnica 3;habilidade tecnica 4;habilidade tecnica 5;', 'habilidade 1; habilidade 2; habilidade 3 ; habilidade 4;habilidade 5;', 'https://www.youtube.com/watch?v=exemplo', 'Varejo');


insert into vagas (area_tecnologica, descricao_vaga, empresa)
values ('Desenvolvedor Back-End', 
'Javascript deve ser sua segunda língua, beleza? Além disso, experiência em Node.js é imprescindível - adotamos a stack MEAN. Você deve ser capaz de criar uma RESTful API, tendo em mente uma arquitetura modular. Ter conhecimento em cloud e visa?o de escalabilidade (AWS/Heroku).Familiaridade com git, bancos relacionais e nosql, react angular, são diferenciais.',
1);

insert into vagas (area_tecnologica, descricao_vaga, empresa)
values ('Desenvolvedor Front-End Jr', 
'Você irá atuar em nosso time como Desenvolver Web Front End em Angular, consumindo APIs REST. Habilidades necessárias: HTML5, JavaScript (JQuery, TypeScript, Angular e Node.js), CSS3 (e seus pré processadores LESS/SASS) e RESTful. Se você possui algum portfólio para nos mostrar, será ótimo, queremos conhecê-lo melhor! Pode ser através do GitHub, sites, etc. Também serão considerados diferenciais bons conhecimentos em Scrum e Kanban, experiência com utilização do Azure DevOps (ou ferramenta similar) e Git',
1);

insert into vagas (area_tecnologica, descricao_vaga, empresa)
values ('Designer UX/UI Jr', 
'stamos buscando talentos para expandir nosso time! Você será parte atuante na construção de aplicações web robustas e de grande relevância para o mercado. Se você possui facilidade para trabalhar em equipe e contribuir com seus pares, gosta de participar ativamente da definição de novas soluções, gosta de desafios e busca construir códigos eficientes, escaláveis e reutilizáveis, aqui é o lugar certo! Somos adeptos da cultura de utilização de métodos ágeis e automação, trabalhamos com Scrum e Microsoft Azure DevOps (com GIT). Você irá atuar em nosso time como Designer UX/UI, com foco em UI, nas seguintes atividades: Realizar pesquisas de benchmark para colher insights de soluções visuais. Criar interfaces visuais para nossos sistemas, apps e sites com alta qualidade e fidelidade. Explorar soluções visuais, criando diversas alternativas de layout para auxiliar na tomada de decisões. Criar componentes visuais como banners, botões, ícones, etc; que tenham escalabilidade e consistência, para serem reutilizados em nossos projetos e por outros designers. Comunicar, defender e debater soluções visuais com time de produto. Contribuir com o time de produto para propor melhorias para os projetos em andamento. Habilidades necessárias: Ter domínio de alguma ferramenta de prototipagem como Adobe XD, Figma, etc. Gestalt, teoria das cores e tipografia. Design responsivo e design para dispositivos móveis. Material design e estar atualizado com os principais padrões web do mercado. Se você possui algum portfólio para nos mostrar, será ótimo, queremos conhecê-lo melhor! Pode ser através do GitHub, sites, etc. Será considerado um diferencial nível superior em Desenho Industrial (Programação Visual ou Belas Artes), Design Digital ou áreas afins. Também serão considerados diferenciais bons conhecimentos em Scrum e Kanban, experiência com utilização do Azure DevOps (ou ferramenta similar) e Git',
1);



