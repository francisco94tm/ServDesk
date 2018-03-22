
create table Requeriment (
	--Autogenerado
	id int primary key auto_increment, 
	 --Se obtiene del catalogo tipo caso
	caseType int,
	 --Se obtiene de la infraestructura critica reportada
	hierarchy int,
	 --Lo ingresa el agente
	description varchar(500),
	--Autogenerado: el agente que registra
	author int,
	--Asignado por el agente que registra
	responsible int,
	--Asignado por el agente que registra
	receptor int,
	--Asignado por el agente que registra
	state int,
	--Registrado por el agente
	reason varchar(500),
	--Registrado por el agente
	client int,
	--Registrado por el agente
	registerMedium int,
	--Autogenerado
	registerDate datetime,
	--Autogenerado en la primera accion del responsable
	atentionDate datetime,
	--Autogenerado al cerrar el ticket
	solutionDate datetime,
	--Se tiene del inventario
	impact int, 
	 --Se tiene del inventario
	urgency int,
	--Se tiene del inventario
	priority int,
	--Estimado (5 dias habiles)
	maxAtentionDate datetime,
	--Estimado (5 dias habiles)
	maxSolutionDate datetime,
	--Registrada por el agente al pasar al estado En proceso
	solution varchar(500),
	 --Registrada por el agente al cerrar el caso
	cause varchar(500)
	-- FOREIGN KEY(tipoCaso) REFERENCES TipoCaso(idTipo),
	-- FOREIGN KEY(estado) REFERENCES Estado(idEstado),
	-- FOREIGN KEY(medioRegistro) REFERENCES MedioRegistro(idMedioRegistro)
);