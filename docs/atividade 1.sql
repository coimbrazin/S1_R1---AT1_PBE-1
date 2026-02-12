create database loja;

use loja;

create table if not exists categorias (
    idCategoria int auto_increment primary key,
    descricaoCategoria varchar(100) not null,
    dataCad timestamp default current_timestamp
);

create table if not exists produtos(
	idProduto int auto_increment primary key,
    idCategoria int not null,
    nomeProduto varchar (50) not null,
    valorProduto decimal(10,2) not null,
    vinculoImagem varchar(255) not null,
    dataCad timestamp default current_timestamp,
    
    constraint fk_produtos_categorias
		foreign key (idCategoria) references categorias (idCategoria)
);

