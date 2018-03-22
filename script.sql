create database ServiceDesk;

use ServiceDesk;

create table TipoCaso(
	idTipo int primary key,
	nombre varchar(20),
	descripcion varchar(100)
);

create table MedioRegistro(
	idMedioRegistro int primary key,
	descripcion varchar(50)
);

create table Estado(
	idEstado int primary key,
	nombre varchar(20),
	descripcion varchar(50),
	estatus varchar(3)
);

create table Agente(
	numUsuario int primary key,
	nombre varchar(30),
	apellidoP varchar(30),
	apellidM varchar(30),
	nivel int,
	backup int
);

create table Cliente(
	numCliente int primary key,
	nombre varchar(30),
	apellidoP varchar(30),
	apellidM varchar(30),
	area int,
	departamento int,
	unidadNegocio int,
	fechaIngreso date,
	puesto int
);

create table Requerimiento(
	id int primary key auto_increment, --Autogenerado
	tipoCaso int, --Se obtiene del catalogo tipo caso
	jerarquia int, --Se obtiene de la infraestructura cr�tica reportada
	descripcion varchar(200), --Lo ingresa el agente
	autor int, --Autogenerado: el agente que registra
	responsable int,--Asignado por el agente que registra
	receptor int,--Asignado por el agente que registra
	estado int,--Asignado por el agente que registra, este cambiar� con cada acci�n por parte del agente
	razon varchar(200),--Registrado por el agente
	cliente int,--Registrado por el agente
	medioRegistro int,--Registrado por el agente
	fechaRegistro datetime,--Autogenerado
	fechaAtencion datetime,--Autogenerado en la primera accion del responsable
	fechaSolucion datetime,--Autogenerado al cerrar el ticket
	impacto int, --Se tiene del inventario
	urgencia int, --Se tiene del inventario
	prioridad int,--Se tiene del inventario
	fechaMaxAtencion datetime,--Estimado (5 d�as h�biles)
	fechaMaxSolucion datetime,--Estimado (5 d�as h�biles)
	solucion varchar(200),--Registrada por el agente al pasar al estado En proceso
	causa varchar(200) --Registrada por el agente al cerrar el caso
	-- FOREIGN KEY(tipoCaso) REFERENCES TipoCaso(idTipo),
	-- FOREIGN KEY(estado) REFERENCES Estado(idEstado),
	-- FOREIGN KEY(medioRegistro) REFERENCES MedioRegistro(idMedioRegistro)
);