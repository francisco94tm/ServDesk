create database ServiceDesk;

use ServiceDesk;

# # # # # # # # # # # # # # # # # # # # # # # # 

create table CaseType(
	id int primary key auto_increment,
	name varchar(30),
	description varchar(500)
);

insert into CaseType values(1, 'Requerimiento','No tiene un alto impacto');
insert into CaseType values(2, 'Incidencia','Tiene un alto impacto'); 
insert into CaseType values(3, 'Problema','Es crítico');

# # # # # # # # # # # # # # # # # # # # # # # # 

create table RegisterMedium(
	id int primary key auto_increment,
	name varchar(100)
);

insert into RegisterMedium values(1,'Telefónico');
insert into RegisterMedium values(2,'Email');

# # # # # # # # # # # # # # # # # # # # # # # # 

create table Status(
	id int primary key,
	name varchar(30),
	description varchar(100),
	status varchar(3)
);

insert into Status values(1,'Abierto','Caso abierto','A');
insert into Status values(2,'En proceso','Caso en proceso de solucion','A');
insert into Status values(3,'Solucionado','Caso solucionado','A');
insert into Status values(4,'Cancelado','Caso cancelado','A');
insert into Status values(5,'Duplicado','Caso duplicado','A');

# # # # # # # # # # # # # # # # # # # # # # # # 

create table Agent(
	id int primary key auto_increment,
	name varchar(30),
	firstLastname varchar(30),
	secondLastname varchar(30),
	level int,
	backup int
);

insert into Agent values(1,'Orlando','Rocha','Montiel',2,2);
insert into Agent values(2,'Francisco','Trejo','Martinez',1,1);
insert into Agent values(3,'Valeria','Mata','Cortes',3,1);

# # # # # # # # # # # # # # # # # # # # # # # # 

create table Client(
	id int primary key auto_increment,
	name varchar(30),
	firstLastname varchar(30),
	secondLastname varchar(30),
	area_ int,
	department int,
	bussinessUnit int,
	admissionDate datetime,
	job int
);

insert into Client values(1,'Juan','Perez','Rojas',1,1,3,'2017-02-01 00:00:00',1);

# # # # # # # # # # # # # # # # # # # # # # # # 

create table Requeriment (
	id int primary key auto_increment, 
	caseType int,
	hierarchy int,
	description varchar(500),
	author int,
	responsible int,
	receptor int,
	state int,
	reason varchar(500),
	client int,
	registerMedium int,
	registerDate datetime,
	atentionDate datetime,
	solutionDate datetime,
	impact int, 
	urgency int,
	priority int,
	maxAtentionDate datetime,
	maxSolutionDate datetime,
	solution varchar(500),
	cause varchar(500)
);


# # # # # # # # # # # # # # # # # # # # # # # # 

create table Theme(
	id int primary key auto_increment,
	name varchar(30),
	url varchar(100)
);

insert into Theme values(1,'Oscuro','css/dark-theme.css');
insert into Theme values(2,'Claro', 'css/clear-theme.css');

# # # # # # # # # # # # # # # # # # # # # # # # 

create table Impact(
	id int primary key auto_increment,
	name varchar(30)
);

insert into Impact values(-1, 'Sin impacto');
insert into Impact values(1, 'Bajo impacto');
insert into Impact values(2, 'Medio impacto');
insert into Impact values(3, 'Alto impacto');
insert into Impact values(4, 'Muy alto impacto');

# # # # # # # # # # # # # # # # # # # # # # # #  

create table Priority(
	id int primary key auto_increment,
	name varchar(30)
);

insert into Priority values(-1, 'Sin prioridad');
insert into Priority values(1, 'Baja prioridad');
insert into Priority values(2, 'Media prioridad');
insert into Priority values(3, 'Alta prioridad');
insert into Priority values(4, 'Muy alta prioridad');

# # # # # # # # # # # # # # # # # # # # # # # #  

create table Urgency(
	id int primary key auto_increment,
	name varchar(30)
);

insert into Urgency values(-1, 'Sin urgencia');
insert into Urgency values(1, 'Baja urgencia');
insert into Urgency values(2, 'Media urgencia');
insert into Urgency values(3, 'Alta urgencia');
insert into Urgency values(4, 'Muy alta urgencia');
