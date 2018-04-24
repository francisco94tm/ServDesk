drop database if exists ServiceDesk;
create database ServiceDesk;
use ServiceDesk;
  
# # # # # # # # # # # # # # # # # # # # # # # # 

create table CaseType(
	id int not null auto_increment,
	name varchar(30),
	description varchar(500),
	primary key(id)
);

insert into CaseType values(1, 'Requerimiento','No tiene un alto impacto');
insert into CaseType values(2, 'Incidencia','Tiene un alto impacto'); 
insert into CaseType values(3, 'Problema','Es crítico');


# # # # # # # # # # # # # # # # # # # # # # # # 

create table RegisterMedium(
	id int not null auto_increment,
	name varchar(100),
	primary key(id)
);

insert into RegisterMedium values(1,'Telefónico');
insert into RegisterMedium values(2,'Email');
 
# # # # # # # # # # # # # # # # # # # # # # # # 

create table Status(
	id int not null auto_increment,
	name varchar(30),
	description varchar(100),
	status varchar(3),
	primary key(id)
);

insert into Status values(1,'Abierto','Caso abierto','A');
insert into Status values(2,'En proceso','Caso en proceso de solución','A');
insert into Status values(3,'Solucionado','Caso solucionado','A');
insert into Status values(4,'Cancelado','Caso cancelado','A'); 

# # # # # # # # # # # # # # # # # # # # # # # # 

create table ThreatType(
	id int not null auto_increment,
	name varchar(50) not null,
	description varchar(100) not null,
	primary key(id)
);

insert into ThreatType values(1,'Organizacional','Amenazas de tipo Organizacional');
insert into ThreatType values(2,'Tecnológica','Amenazas de tipo Tecnológica');
insert into ThreatType values(3,'Ambiental','Amenazas de tipo Ambiental');

# # # # # # # # # # # # # # # # # # # # # # # #

create table AgentThreat(
	id int not null auto_increment,
	id_threatType int not null,
	name varchar(50) not null,
	description varchar(100) not null,
	primary key (id, id_threatType),
	foreign key (id_threatType) references ThreatType(id)
);

insert into AgentThreat values(1,1,'Fraude','Fraude de proveedor');
insert into AgentThreat values(2,2,'Falla eléctrica','Falla eléctrica');
insert into AgentThreat values(3,3,'Sismo','Sismo');

# # # # # # # # # # # # # # # # # # # # # # # # 

create table Agent(
	id int not null auto_increment,
	name varchar(30),
	firstLastname varchar(30),
	secondLastname varchar(30),
	address varchar(50) not null,
	mobilephone varchar(30) not null,
	phone varchar(30) not null,
	email varchar(30) not null,
	id_level int not null,
	backup int,
	usr varchar(20) not null,
	pass varchar(10) not null,
	status varchar(3) not null,
	primary key(id),
	foreign key (id_level) references Level(id)
); 

insert into Agent values(1,'Orlando','Rocha','Montiel','Calle 1 colonia 1 ciudad de mexico','55555555555','55555555555','correo@dominio',2,2,'Especialista1','123','A');
insert into Agent values(2,'Francisco','Trejo','Martínez','Calle 1 colonia 1 ciudad de mexico','55555555555','55555555555','correo@dominio',1,1,'Agente1','123','A');
insert into Agent values(3,'Valeria','Mata','Cortés','Calle 1 colonia 1 ciudad de mexico','55555555555','55555555555','correo@dominio',3,1,'HotFix1','123','A');

# # # # # # # # # # # # # # # # # # # # # # # # 

create table BusinessUnit(
	id int not null auto_increment,
	name varchar(50) not null,
	description varchar(100) not null,
	primary key(id)
);

insert into BusinessUnit values(1,'ESCOM','Escuela Superior de Cómputo');
insert into BusinessUnit values(2,'ENCB','Escuela Nacional de Ciencias Biologicas');

# # # # # # # # # # # # # # # # # # # # # # # # 

create table Department(
	id int not null,
	id_businessUnit int not null,
	name varchar(50) not null,
	description varchar(100) not null,
	primary key(id, id_businessUnit),
	foreign key(id_businessUnit) references BusinessUnit(id)
);

insert into Department values(1,1,'Ciencias Sociales','Departamento de ciencias sociales');

# # # # # # # # # # # # # # # # # # # # # # # # 

create table Level(
	id int not null auto_increment, 
	name varchar(50) not null,
	description varchar(100),
	primary key(id)
);

insert into Level values(1, 'Agente', '');
insert into Level values(2, 'Especialista', '');
insert into Level values(3, 'HotFix', '');

# # # # # # # # # # # # # # # # # # # # # # # # 

create table Area(
	id int not null,
	id_department int not null,
	id_businessUnit int not null,
	name varchar(50) not null,
	description varchar(100) not null,
	primary key(id, id_department, id_businessUnit),
	foreign key(id_department) references Department(id),
	foreign key(id_businessUnit) references BusinessUnit(id)
);

insert into `Area` values(1,1,1,'Área 1','Área 1 del departamento');

# # # # # # # # # # # # # # # # # # # # # # # # 

create table Job(
	id int not null,
	id_area int not null,
	id_department int not null,
	id_businessUnit int not null,
	name varchar(50) not null,
	description varchar(100) not null,
	primary key(id, id_area,id_department,id_businessUnit),
	foreign key(id_area) references Area(id),
	foreign key(id_department) references Department(id),
	foreign key(id_businessUnit) references BusinessUnit(idf)
);

insert into Job values(1,1,1,1,'Profesor','Profesor de la materia');

# # # # # # # # # # # # # # # # # # # # # # # # 

create table Client(
	id int not null auto_increment,
	curp varchar(18),
	name varchar(30) not null,
	firstLastname varchar(30),
	secondLastname varchar(30),
	id_job int not null,
	id_area int not null,
	id_department int not null,
	id_businessUnit int not null,
	admissionDate datetime not null,
	mobilephone varchar(30) not null,
	phone varchar(30) not null,
	email varchar(30) not null,
	status varchar(3) not null,
	primary key(id),
	foreign key(id_job) references Job(id),
	foreign key(id_area) references Area(id),
	foreign key(id_department) references Department(id),
	foreign key(id_businessUnit) references BusinessUnit(id)
);

insert into Client values(1,'Juan','Perez','Rojas',1,1,1,1,'2017/02/01','6666666666','6666666666','cliente@dominio','A');

# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 
#																		#
#       	I N F R A S T R U C T U R E    D A T A						#
#																		#
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 

CREATE TABLE AssetRepository AssetRepository (
	id varchar(8) not null,
	name varchar(60) not null,
	description varchar(240) not null,
	type varchar(60) not null,
	state varchar(12) not null,
	configType varchar(60) not null,
	hwsw varchar(2) not null,
	infoType varchar(15) not null,
	configFile varchar(120) default null,
	supplier varchar(50) not null,
	warranty date not null,
	assetCost double not null,
	version_ float not null,
	configAuth varchar(6) default null,
	datetime_ datetime not null,
	relatedAssets varchar(200) not null,
	statePetition int(11) not null,
	primary key (id)
);

INSERT INTO AssetRepository VALUES
('COTR1', 'HP - Stream Laptop 11-Y004LA ', 'Laptop de Trabajo', 'Laptop', 'Activo', 'Fábrica', 'HW', 'Confidencial', '/home/pepemejia/Desktop/infra.txt', 'Plaza de la Tecnología', '2019-05-03', 100, 1, 'ADAD2', '2018-02-27 00:00:00', 'Ninguno', 1),
('COTR10', 'Acer - Laptop Aspire ES1-533-P6A5', 'Laptop de Trabajo', 'Laptop', 'Activo', 'Fábrica', 'HW', 'Confidencial', '/home/pepemejia/Desktop/infra.txt', 'Plaza de la Tecnología', '2011-11-11', 1000, 1, 'ADAD2', '2018-02-27 00:00:00', 'Ninguno', 1),
('COTR11', 'Asus - Laptop X441UA-WX086T', 'Laptop de Trabajo', 'Laptop', 'Activo', 'Fábrica', 'HW', 'Confidencial', '/home/pepemejia/Desktop/infra.txt', 'Plaza de la Tecnología', '2013-12-08', 1100, 1, 'ADAD2', '2018-02-27 00:00:00', 'Ninguno', 1),
('COTR12', 'Lenovo - Laptop Ideapad 320-15IAP', 'Laptop de Trabajo', 'Laptop', 'Activo', 'Fábrica', 'HW', 'Confidencial', '/home/pepemejia/Desktop/infra.txt', 'Plaza de la Tecnología', '2018-04-20', 1200, 1, 'ADAD2', '2018-02-27 00:00:00', 'Ninguno', 1),
('COTR13', 'Acer - Laptop A315-51-34L7 ', 'Laptop de Trabajo', 'Laptop', 'Activo', 'Fábrica', 'HW', 'Confidencial', '/home/pepemejia/Desktop/infra.txt', 'Plaza de la Tecnología', '2014-09-16', 1300, 1, 'ADAD2', '2018-02-27 00:00:00', 'Ninguno', 1),
('COTR14', 'Acer - Laptop Aspire Swift1 SF113-31', 'Laptop de Trabajo', 'Laptop', 'Activo', 'Fábrica', 'HW', 'Confidencial', '/home/pepemejia/Desktop/infra.txt', 'Plaza de la Tecnología', '2022-02-22', 1400, 1, 'ADAD2', '2018-02-27 00:00:00', 'Ninguno', 1),
('COTR15', 'Asus - Laptop UX310UA-GL760T', 'Laptop de Trabajo', 'Laptop', 'Activo', 'Fábrica', 'HW', 'Confidencial', '/home/pepemejia/Desktop/infra.txt', 'Plaza de la Tecnología', '2019-10-11', 1500, 1, 'ADAD2', '2018-02-27 00:00:00', 'Ninguno', 1),
('ELECT1', 'Monitor Acer 123', 'Monitor pantalla LCD 20 pulgadas', 'Monitor', 'Activo', 'Inicializado', 'HW', 'Pública', '/var/www/html/Profig/Archivos_Conf/ELECT/ELECT1/1/infra.txt', 'Acer', '2020-09-17', 700, 1, 'BC0002', '2018-02-26 22:58:56', 'Ninguno,', 1),
('ELECT12', 'Router Lanix', 'Lanix router a 500 mbps', 'Router de Red', 'Activo', 'Inicializado', 'HW', 'Pública', '/var/www/html/Profig/Archivos_Conf/ELECT/ELECT12/1/infra.txt', 'Lanix', '2019-07-13', 1200, 1, 'BC0002', '2018-02-26 23:11:34', 'ELECT6,', 1),
('ELECT18', 'Servidor Web Apache', 'Servidor Web Apache versión 3', 'Servidor WEB', 'Activo', 'Modificado', 'SW', 'Reservada', '/var/www/html/Profig/Archivos_Conf/ELECT/ELECT18/1/infra.txt', 'Apache', '2013-10-07', 0, 1, 'BC0002', '2018-02-26 23:16:39', 'ELECT6,', 1),
('ELECT22', 'Impresora HP Photosmart C452', 'Impresora láser a color y escáner, cartuchos 49A HP', 'Impresora', 'Activo', 'Inicializado', 'HW', 'Confidencial', '/var/www/html/Profig/Archivos_Conf/ELECT/ELECT22/1/infra.txt', 'HP', '2018-05-16', 2500, 1, 'BC0002', '2018-02-26 23:21:52', 'ELECT6,', 1),
('ELECT27', 'Servidor Torre Acer 34', 'Servidor torre de 1 TB y 16 GB', 'Servidor Torre', 'Activo', 'Modificado', 'HW', 'Confidencial', '/var/www/html/Profig/Archivos_Conf/ELECT/ELECT27/1/infra.txt', 'Acer', '2019-08-15', 25000, 1, 'BC0002', '2018-02-26 23:25:23', 'ELECT12,ELECT18,', 1),
('ELECT31', 'Proteus 9', 'Software de diseño de circuitos digitales', 'Laptop', 'Activo', 'Inicializado', 'SW', 'Reservada', '/var/www/html/Profig/Archivos_Conf/ELECT/ELECT31/1/infra.txt', 'Proteus Software', '2018-05-04', 2000, 1, 'BC0002', '2018-02-26 23:36:12', 'ELECT6,', 1),
('ELECT6', 'Laptop MSI', 'Laptop de 16 GB RAM, 1 TB disco duro, 20 pulgadas', 'Laptop', 'Suspendido', 'Fabrica', 'HW', 'Pública', '/var/www/html/Profig/Archivos_Conf/ELECT/ELECT6/1.1//ELECT6.txt', 'MSI', '2019-07-18', 700, 1.1, 'BC0002', '2018-02-26 23:04:47', 'Ninguno,', 1),
('ReIC1', 'HP - Stream Laptop 11-Y004LA ', 'Laptop de Trabajo', 'Laptop', 'Activo', 'Fábrica', 'HW', 'Confidencial', '/home/pepemejia/Desktop/infra.txt', 'Plaza de la Tecnología', '2019-05-03', 100, 1, 'BC0003', '2018-02-27 00:00:00', 'Ninguno', 1),
('ReIC10', 'Acer - Laptop Aspire ES1-533-P6A5', 'Laptop de Trabajo', 'Laptop', 'Activo', 'Fábrica', 'HW', 'Confidencial', '/home/pepemejia/Desktop/infra.txt', 'Plaza de la Tecnología', '2011-11-11', 1000, 1, 'BC0003', '2018-02-27 00:00:00', 'Ninguno', 1),
('ReIC11', 'Asus - Laptop X441UA-WX086T', 'Laptop de Trabajo', 'Laptop', 'Activo', 'Fábrica', 'HW', 'Confidencial', '/home/pepemejia/Desktop/infra.txt', 'Plaza de la Tecnología', '2013-12-08', 1100, 1, 'BC0003', '2018-02-27 00:00:00', 'Ninguno', 1),
('ReIC12', 'Lenovo - Laptop Ideapad 320-15IAP', 'Laptop de Trabajo', 'Laptop', 'Activo', 'Fábrica', 'HW', 'Confidencial', '/home/pepemejia/Desktop/infra.txt', 'Plaza de la Tecnología', '2018-04-20', 1200, 1, 'BC0003', '2018-02-27 00:00:00', 'Ninguno', 1),
('ReIC13', 'Acer - Laptop A315-51-34L7 ', 'Laptop de Trabajo', 'Laptop', 'Activo', 'Fábrica', 'HW', 'Confidencial', '/home/pepemejia/Desktop/infra.txt', 'Plaza de la Tecnología', '2014-09-16', 1300, 1, 'BC0003', '2018-02-27 00:00:00', 'Ninguno', 1),
('ReIC14', 'Acer - Laptop Aspire Swift1 SF113-31', 'Laptop de Trabajo', 'Laptop', 'Activo', 'Fábrica', 'HW', 'Confidencial', '/home/pepemejia/Desktop/infra.txt', 'Plaza de la Tecnología', '2022-02-22', 1400, 1, 'BC0003', '2018-02-27 00:00:00', 'Ninguno', 1),
('ReIC15', 'Asus - Laptop UX310UA-GL760T', 'Laptop de Trabajo', 'Laptop', 'Activo', 'Fábrica', 'HW', 'Confidencial', '/home/pepemejia/Desktop/infra.txt', 'Plaza de la Tecnología', '2019-10-11', 1500, 1, 'BC0003', '2018-02-27 00:00:00', 'Ninguno', 1),
('SI1', 'HP - Stream Laptop 11-Y004LA ', 'Laptop de Trabajo', 'Laptop', 'Activo', 'Fábrica', 'HW', 'Confidencial', '/home/pepemejia/Desktop/infra.txt', 'Plaza de la Tecnología', '2019-05-03', 100, 1, 'ADAD2', '2018-02-27 00:00:00', 'Ninguno', 1),
('SI10', 'Acer - Laptop Aspire ES1-533-P6A5', 'Laptop de Trabajo', 'Laptop', 'Activo', 'Fábrica', 'HW', 'Confidencial', '/home/pepemejia/Desktop/infra.txt', 'Plaza de la Tecnología', '2011-11-11', 1000, 1, 'ADAD2', '2018-02-27 00:00:00', 'Ninguno', 1),
('SI11', 'Asus - Laptop X441UA-WX086T', 'Laptop de Trabajo', 'Laptop', 'Activo', 'Fábrica', 'HW', 'Confidencial', '/home/pepemejia/Desktop/infra.txt', 'Plaza de la Tecnología', '2013-12-08', 1100, 1, 'ADAD2', '2018-02-27 00:00:00', 'Ninguno', 1),
('SI12', 'Lenovo - Laptop Ideapad 320-15IAP', 'Laptop de Trabajo', 'Laptop', 'Activo', 'Fábrica', 'HW', 'Confidencial', '/home/pepemejia/Desktop/infra.txt', 'Plaza de la Tecnología', '2018-04-20', 1200, 1, 'ADAD2', '2018-02-27 00:00:00', 'Ninguno', 1),
('SI13', 'Acer - Laptop A315-51-34L7 ', 'Laptop de Trabajo', 'Laptop', 'Activo', 'Fábrica', 'HW', 'Confidencial', '/home/pepemejia/Desktop/infra.txt', 'Plaza de la Tecnología', '2014-09-16', 1300, 1, 'ADAD2', '2018-02-27 00:00:00', 'Ninguno', 1),
('SI14', 'Acer - Laptop Aspire Swift1 SF113-31', 'Laptop de Trabajo', 'Laptop', 'Activo', 'Fábrica', 'HW', 'Confidencial', '/home/pepemejia/Desktop/infra.txt', 'Plaza de la Tecnología', '2022-02-22', 1400, 1, 'ADAD2', '2018-02-27 00:00:00', 'Ninguno', 1),
('SI15', 'Asus - Laptop UX310UA-GL760T', 'Laptop de Trabajo', 'Laptop', 'Activo', 'Fábrica', 'HW', 'Confidencial', '/home/pepemejia/Desktop/infra.txt', 'Plaza de la Tecnología', '2019-10-11', 1500, 1, 'ADAD2', '2018-02-27 00:00:00', 'Ninguno', 1),
('SI5', 'Asus - Laptop X441NA-GA016T', 'Laptop de Trabajo', 'Laptop', 'Activo', 'Fábrica', 'HW', 'Confidencial', '/home/pepemejia/Desktop/infra.txt', 'Plaza de la Tecnología', '2020-08-01', 500, 1, 'ADAD2', '2018-02-27 00:00:00', 'Ninguno', 1),
('SI6', 'Asus - Laptop X441NA-GA015T', 'Laptop de Trabajo', 'Laptop', 'Activo', 'Fábrica', 'HW', 'Confidencial', '/home/pepemejia/Desktop/infra.txt', 'Plaza de la Tecnología', '2002-01-01', 600, 1, 'ADAD2', '2018-02-27 00:00:00', 'Ninguno', 1),
('SI7', 'Asus - Laptop X541NA-GO013T ', 'Laptop de Trabajo', 'Laptop', 'Activo', 'Fábrica', 'HW', 'Confidencial', '/home/pepemejia/Desktop/infra.txt', 'Plaza de la Tecnología', '2021-11-21', 700, 1, 'ADAD2', '2018-02-27 00:00:00', 'Ninguno', 1),
('SI8', 'Acer - Laptop ES1-533-P6H1 ', 'Laptop de Trabajo', 'Laptop', 'Activo', 'Fábrica', 'HW', 'Confidencial', '/home/pepemejia/Desktop/infra.txt', 'Plaza de la Tecnología', '2017-10-17', 800, 1, 'ADAD2', '2018-02-27 00:00:00', 'Ninguno', 1),
('SI9', 'HP - Laptop 15-BW014LA de 15,6', 'Laptop de Trabajo', 'Laptop', 'Activo', 'Fábrica', 'HW', 'Confidencial', '/home/pepemejia/Desktop/infra.txt', 'Plaza de la Tecnología', '2018-08-01', 900, 1, 'ADAD2', '2018-02-27 00:00:00', 'Ninguno', 1);

# # # # # # # # # # # # # # # # # # # # # # # # 

create table Request(
	id int not null auto_increment, -- Autogenerado
	id_caseType int not null, -- Se obtiene del catalogo tipo caso
	infrastructure varchar(8) not null, -- Se obtiene de la infraestructura crítica reportada
	subject varchar(50),
	description varchar(500) not null, -- Lo ingresa el agente
	author int not null, -- Autogenerado: el agente que registra
	responsable int not null,-- Asignado por el agente que registra
	id_status int default 1,-- Asignado por el agente que registra, este cambiará con cada acción por parte del agente
	id_agentThreat int not null,-- Registrado por el agente del catalogo de amenazas
	id_client int,-- Registrado por el agente
	id_registerMedium int not null,-- Registrado por el agente del catalogo de medios de registro
	registerDate datetime,-- Autogenerado al insertar
	atentionDate datetime,-- Generado por sistema en la primera accion del responsable
	solutionDate datetime,-- Generado por sistema al cerrar el ticket es decir al actualizar el estatus a 'SOLUCIONADO'
	-- urgencia int not null,-- Asignado por el agente
	-- prioridad int not null,-- Se tiene del inventario
	maxAtentionDate datetime, -- Estimado 5 días
	maxSolutionDate datetime, -- Estimado 5 días
	solution varchar(300),-- Registrada por el agente al pasar al estado En proceso antes de registrar el estado Solucionado
	id_realAgentThreat int,-- Registrada por el agente al solucionar el caso
	primary key (id),
	foreign key (id_caseType) references CaseType(id),
	foreign key (author) references Agent(id),
	foreign key (responsable) references Agent(id),
	foreign key (id_status) references Status(id),
	foreign key (id_agentThreat) references AgentThreat(id),
	foreign key (id_client) references Client(id),
	foreign key (id_registerMedium) references RegisterMedium(id),
	foreign key (id_realAgentThreat) references AgentThreat(id),
	foreign key (infrastructure) references AssetRepository(id)
);

create trigger `Request_INSERT` before insert on  `Request` 
	for each row set 
		new.registerDate = now(), 
		new.maxAtentionDate = adddate(now(),interval 5 day),
		new.maxSolutionDate =  adddate(now(),interval 5 day);

insert into Request(id_caseType, infrastructure, description, author, responsable, id_agentThreat, id_client, id_registerMedium)
	values(1,'COTR1','Un Requerimiento','Descripción de un Requerimiento',2,1,1,1,1);

# # # # # # # # # # # # # # # # # # # # # # # # 

create table ThreatImpact(
	id int not null,
	lowerValue double not null,
	upperValue double not null,
	impactLevel varchar(50) not null,
	weighing float not null,
	primary key(id)
);

insert into ThreatImpact values(1,0.1,2.0,'Insignificante',2);
insert into ThreatImpact values(2,2.1,4.0,'Mínimo',4);
insert into ThreatImpact values(3,4.1,6.0,'Regular',6);
insert into ThreatImpact values(4,6.1,8.0,'Alto',8);
insert into ThreatImpact values(5,8.1,10.0,'Desastroso',10);

# # # # # # # # # # # # # # # # # # # # # # # # 

create table ThreatExists(
	id int not null,
	lowerValue double not null,
	upperValue double not null,
	probability varchar(50) not null,
	weighing float not null,
	primary key(id)
);

insert into ThreatExists values(1,0,0.1,'Casi imposible',0.1);
insert into ThreatExists values(2,0.11,0.3,'Poco probable',0.3);
insert into ThreatExists values(3,0.31,0.5,'Probable',0.5);
insert into ThreatExists values(4,0.51,0.7,'Muy posible',0.7);
insert into ThreatExists values(5,0.71,0.9,'Casi seguro',0.9);

# # # # # # # # # # # # # # # # # # # # # # # # 

create table ThreatInterest(
	id int not null,
	lowerValue double not null,
	upperValue double not null,
	probability varchar(50) not null,
	weighing float not null,
	primary key(id)
);

insert into ThreatInterest values(1,0,0.1,'Casi no genera',0.1);
insert into ThreatInterest values(2,0.11,0.3,'Se genera poco',0.3);
insert into ThreatInterest values(3,0.31,0.5,'Se genera regular',0.5);
insert into ThreatInterest values(4,0.51,0.7,'Se genera mucho',0.7);
insert into ThreatInterest values(5,0.71,0.9,'Es incontrolable',0.9);

# # # # # # # # # # # # # # # # # # # # # # # # 

create table ThreatCapacity(
	id int not null,
	lowerValue double not null,
	upperValue double not null,
	level varchar(50) not null,
	weighing float not null,
	primary key(id)
);

insert into ThreatCapacity values(1,0,0.1,'Los recursos son casi nulos',0.1);
insert into ThreatCapacity values(2,0.11,0.3,'Cuenta con muy pocos recursos',0.3);
insert into ThreatCapacity values(3,0.31,0.5,'Los recursos son regulares',0.5);
insert into ThreatCapacity values(4,0.51,0.7,'Cuenta con muchos recursos',0.7);
insert into ThreatCapacity values(5,0.71,0.9,'Los recursos son superiores',0.9);

# # # # # # # # # # # # # # # # # # # # # # # # 

create table InfrastructureVulnerability(
	id int not null,
	lowerValue double not null,
	upperValue double not null,
	level varchar(50) not null,
	weighing float not null,
	primary key(id)
);

insert into InfrastructureVulnerability values(1,0,0.1,'Protección reforzada',0.1);
insert into InfrastructureVulnerability values(2,0.11,0.3,'Protección normal',0.3);
insert into InfrastructureVulnerability values(3,0.31,0.5,'Medianamente protegido',0.5);
insert into InfrastructureVulnerability values(4,0.51,0.7,'Muy poca protección',0.7);
insert into InfrastructureVulnerability values(5,0.71,0.9,'Sin protección',0.9);
 

# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 
#																		#
#       	C U S T O M I Z A T I O N  									#
#																		#
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 

create table Theme(
	id int primary key auto_increment,
	name varchar(30),
	url varchar(100)
);

insert into Theme values(1,'Oscuro','css/dark-theme.css');
insert into Theme values(2,'Claro', 'css/clear-theme.css');
