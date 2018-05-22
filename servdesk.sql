-- phpMyAdmin SQL Dump
-- version 4.5.5.1
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 22-05-2018 a las 08:07:32
-- Versión del servidor: 5.7.11
-- Versión de PHP: 7.0.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `servicedesk`
--
drop database if exists ServDesk;
create database ServDesk CHARACTER SET utf8 COLLATE utf8_general_ci;
use ServDesk;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `agent`
--

CREATE TABLE `agent` (
  `id` int(11) NOT NULL,
  `name` varchar(30) DEFAULT NULL,
  `firstLastname` varchar(30) DEFAULT NULL,
  `secondLastname` varchar(30) DEFAULT NULL,
  `address` varchar(50) NOT NULL,
  `mobilephone` varchar(30) NOT NULL,
  `phone` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `id_level` int(11) DEFAULT NULL,
  `backup` int(11) DEFAULT NULL,
  `usr` varchar(20) DEFAULT NULL,
  `pass` varchar(10) DEFAULT NULL,
  `status` int(3) DEFAULT NULL,
  `id_theme` int(11) NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `agent`
--

INSERT INTO `agent` (`id`, `name`, `firstLastname`, `secondLastname`, `address`, `mobilephone`, `phone`, `email`, `id_level`, `backup`, `usr`, `pass`, `status`, `id_theme`) VALUES
(1, 'Orlando', 'Rocha', 'Montiel', 'Calle 1 colonia 1 ciudad de mexico', '55555555555', '55555555555', 'correo@dominio', 2, 2, 'Especialista1', '123', 1, 1),
(2, 'Francisco', 'Trejo', 'Martínez', 'Calle 1 colonia 1 ciudad de mexico', '55555555555', '55555555555', 'correo@dominio', 1, 1, 'Agente1', '123', 1, 1),
(3, 'Valeria', 'Mata', 'Cortés', 'Calle 1 colonia 1 ciudad de mexico', '55555555555', '55555555555', 'correo@dominio', 3, 1, 'HotFix1', '123', 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `agentthreat`
--

CREATE TABLE `agentthreat` (
  `id` int(11) NOT NULL,
  `id_threatType` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `agentthreat`
--

INSERT INTO `agentthreat` (`id`, `id_threatType`, `name`, `description`) VALUES
(4, 1, 'Fraude', 'Fraude de proveedor'),
(5, 2, 'Falla eléctrica', 'Falla eléctrica'),
(6, 3, 'Sismo', 'Sismo'),
(7, 2, 'Acceso no autorizado', 'Acceso ilegal a los sistemas'),
(8, 1, 'Ingenieria social', 'Ingenieria social'),
(9, 2, 'Codigo malicioso', 'Codigo malicioso'),
(10, 1, 'Suplantacion de identidad', 'Suplantacion de identidad'),
(11, 2, 'Negacion de servicio', 'Negacion de servicio'),
(12, 2, 'Crackeo de contraseña', 'Crackeo de contraseña'),
(13, 2, 'Modificacion de datos', 'Modificacion de datos');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `area`
--

CREATE TABLE `area` (
  `id` int(11) NOT NULL,
  `id_department` int(11) NOT NULL,
  `id_businessUnit` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `area`
--

INSERT INTO `area` (`id`, `id_department`, `id_businessUnit`, `name`, `description`) VALUES
(1, 1, 1, 'Área 1', 'Área 1 del departamento');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `assetrepository`
--

CREATE TABLE `assetrepository` (
  `id` varchar(8) NOT NULL,
  `name` varchar(60) NOT NULL,
  `description` varchar(240) NOT NULL,
  `type` varchar(60) NOT NULL,
  `state` varchar(12) NOT NULL,
  `configType` varchar(60) NOT NULL,
  `hwsw` varchar(2) NOT NULL,
  `infoType` varchar(15) NOT NULL,
  `configFile` varchar(120) DEFAULT NULL,
  `supplier` varchar(50) NOT NULL,
  `warranty` date NOT NULL,
  `assetCost` double NOT NULL,
  `version_` float NOT NULL,
  `configAuth` varchar(6) DEFAULT NULL,
  `datetime_` datetime NOT NULL,
  `relatedAssets` varchar(200) NOT NULL,
  `statePetition` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `assetrepository`
--

INSERT INTO `assetrepository` (`id`, `name`, `description`, `type`, `state`, `configType`, `hwsw`, `infoType`, `configFile`, `supplier`, `warranty`, `assetCost`, `version_`, `configAuth`, `datetime_`, `relatedAssets`, `statePetition`) VALUES
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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `businessunit`
--

CREATE TABLE `businessunit` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `businessunit`
--

INSERT INTO `businessunit` (`id`, `name`, `description`) VALUES
(1, 'ESCOM', 'Escuela Superior de Cómputo'),
(2, 'ENCB', 'Escuela Nacional de Ciencias Biologicas');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `casetype`
--

CREATE TABLE `casetype` (
  `id` int(11) NOT NULL,
  `name` varchar(30) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `casetype`
--

INSERT INTO `casetype` (`id`, `name`, `description`) VALUES
(1, 'Requerimiento', 'No tiene alto impacto'),
(2, 'Incidencia', 'Tiene alto impacto'),
(3, 'Problema', 'Es crítico'),
(4, 'Fallo', 'Es muy crítico');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `client`
--

CREATE TABLE `client` (
  `id` int(11) NOT NULL,
  `curp` varchar(18) DEFAULT NULL,
  `name` varchar(30) NOT NULL,
  `firstLastname` varchar(30) DEFAULT NULL,
  `secondLastname` varchar(30) DEFAULT NULL,
  `id_job` int(11) NOT NULL,
  `id_area` int(11) NOT NULL,
  `id_department` int(11) NOT NULL,
  `id_businessUnit` int(11) NOT NULL,
  `admissionDate` datetime NOT NULL,
  `mobilephone` varchar(30) NOT NULL,
  `phone` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `id_status` int(3) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `client`
--

INSERT INTO `client` (`id`, `curp`, `name`, `firstLastname`, `secondLastname`, `id_job`, `id_area`, `id_department`, `id_businessUnit`, `admissionDate`, `mobilephone`, `phone`, `email`, `id_status`) VALUES
(1, 'XXXXXXXXX', 'Juan', 'Perez', 'Rojas', 1, 1, 1, 1, '2017-02-01 00:00:00', '6666666666', '6666666666', 'cliente@dominio', 1),
(2, 'XXXXXXXXX', 'Ingrid', 'De la Cruz', 'Martínez', 1, 1, 1, 1, '2018-04-19 11:44:05', '55555555', '55555555', 'ingrid@email.com', 1),
(3, 'XXXXXXXXX', 'Laura', 'León', 'Romo', 1, 1, 1, 1, '2018-04-19 16:29:25', '55555555', '55555555', 'correo@correo.com', 2),
(4, 'TEMF941013HDFRRR05', 'Jesús', 'Lopez', 'Perez', 1, 1, 1, 1, '2018-05-02 11:09:35', '5555555555', '555555555', 'frtrma@outlook.com', 1),
(5, 'TEMA000516HDFRRLA9', 'Alfredo', 'Trejo', 'Martínez', 1, 1, 1, 1, '2018-05-02 11:15:10', '55555555', '55555555', 'alfredo@email.com', 1),
(6, 'TEMF941013HDFRRR0X', 'Ricardo', 'Coronado', 'Del Valle', 1, 1, 1, 1, '2018-05-13 16:26:29', '55555555', '55555555', 'f@f.com', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientstatus`
--

CREATE TABLE `clientstatus` (
  `id` int(3) NOT NULL,
  `name` varchar(30) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `clientstatus`
--

INSERT INTO `clientstatus` (`id`, `name`) VALUES
(1, 'Activo'),
(2, 'Bloqueado'),
(3, 'Cancelado'),
(4, 'Inactivo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `department`
--

CREATE TABLE `department` (
  `id` int(11) NOT NULL,
  `id_businessUnit` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `department`
--

INSERT INTO `department` (`id`, `id_businessUnit`, `name`, `description`) VALUES
(1, 1, 'Ciencias Sociales', 'Departamento de ciencias sociales');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `infrastructurevulnerability`
--

CREATE TABLE `infrastructurevulnerability` (
  `id` int(11) NOT NULL,
  `lowerValue` double NOT NULL,
  `upperValue` double NOT NULL,
  `level` varchar(50) NOT NULL,
  `weighing` float NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `infrastructurevulnerability`
--

INSERT INTO `infrastructurevulnerability` (`id`, `lowerValue`, `upperValue`, `level`, `weighing`) VALUES
(1, 0, 0.1, 'Protección reforzada', 0.1),
(2, 0.11, 0.3, 'Protección normal', 0.3),
(3, 0.31, 0.5, 'Medianamente protegido', 0.5),
(4, 0.51, 0.7, 'Muy poca protección', 0.7),
(5, 0.71, 1, 'Sin protección', 0.9);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `job`
--

CREATE TABLE `job` (
  `id` int(11) NOT NULL,
  `id_area` int(11) NOT NULL,
  `id_department` int(11) NOT NULL,
  `id_businessUnit` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `job`
--

INSERT INTO `job` (`id`, `id_area`, `id_department`, `id_businessUnit`, `name`, `description`) VALUES
(1, 1, 1, 1, 'Profesor', 'Profesor de la materia');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `level`
--

CREATE TABLE `level` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `description` varchar(100) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `level`
--

INSERT INTO `level` (`id`, `name`, `description`) VALUES
(1, 'Administrador', ''),
(2, 'Agente', ''),
(3, 'HotFix', ''),
(4, 'Cliente', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registermedium`
--

CREATE TABLE `registermedium` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `registermedium`
--

INSERT INTO `registermedium` (`id`, `name`) VALUES
(1, 'Teléfono'),
(2, 'Correo Electrónico');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `request`
--

CREATE TABLE `request` (
  `id` int(11) NOT NULL,
  `id_caseType` int(11) NOT NULL,
  `infrastructure` varchar(8) NOT NULL,
  `subject` varchar(50) NOT NULL,
  `description` varchar(500) NOT NULL,
  `author` int(11) NOT NULL,
  `responsable` int(11) NOT NULL,
  `id_status` int(11) DEFAULT '1',
  `id_agentThreat` int(11) NOT NULL,
  `id_client` int(11) DEFAULT NULL,
  `id_registerMedium` int(11) NOT NULL,
  `registerDate` datetime DEFAULT NULL,
  `atentionDate` datetime DEFAULT NULL,
  `solutionDate` datetime DEFAULT NULL,
  `maxAtentionDate` datetime DEFAULT NULL,
  `maxSolutionDate` datetime DEFAULT NULL,
  `solution` varchar(300) DEFAULT NULL,
  `id_realAgentThreat` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `request`
--

INSERT INTO `request` (`id`, `id_caseType`, `infrastructure`, `subject`, `description`, `author`, `responsable`, `id_status`, `id_agentThreat`, `id_client`, `id_registerMedium`, `registerDate`, `atentionDate`, `solutionDate`, `maxAtentionDate`, `maxSolutionDate`, `solution`, `id_realAgentThreat`) VALUES
(1, 1, 'COTR1', 'Req:', 'El usuario indica que no tiene acceso a internet', 2, 1, 3, 5, 1, 1, '2018-04-26 10:12:40', '2018-05-01 10:12:40', '2018-05-01 10:12:40', '2018-05-01 10:12:40', '2018-05-01 10:12:40', NULL, NULL),
(2, 1, 'COTR10', 'Req', 'El usuario indica que su monitor no sirve', 1, 1, 3, 5, 1, 1, '2018-04-11 10:12:40', '2018-05-01 10:12:40', '2018-05-01 10:12:40', '2018-05-01 10:12:40', '2018-05-01 10:12:40', NULL, NULL),
(3, 2, 'COTR1', 'Pagina.', 'El usuario indica que la pagina web no carga', 1, 2, 3, 11, 1, 1, '2018-04-26 10:12:40', '2018-05-01 10:12:40', '2018-05-01 10:12:40', '2018-05-01 10:12:40', '2018-05-01 10:12:40', NULL, NULL),
(4, 3, 'ELECT18', 'Problema', 'El usuario indica que no tiene acceso a la pagina web', 1, 1, 3, 11, 1, 1, '2018-04-26 10:12:40', '2018-05-01 10:12:40', '2018-05-01 10:12:40', '2018-05-01 10:12:40', '2018-05-01 10:12:40', NULL, NULL),
(5, 2, 'SI5', 'Contraseña', 'El usuario indica que no puede acceder a su maquina', 1, 1, 3, 12, 1, 1, '2018-04-26 10:12:40', '2018-04-27 10:34:40', '2018-04-28 16:23:06', '2018-05-01 10:12:40', '2018-05-01 10:12:40', NULL, NULL),
(6, 3, 'ELECT18', 'Servidor', 'El servidor está abajo', 1, 3, 3, 11, 1, 1, '2018-04-26 10:12:40', '2018-05-01 10:12:40', '2018-05-01 10:12:40', '2018-05-01 10:12:40', '2018-05-01 10:12:40', NULL, NULL),
(7, 1, 'ELECT1', 'Monitor no enciende', 'No encience el monitor', 1, 2, 3, 5, 1, 1, '2018-04-26 10:12:40', '2018-05-01 10:12:40', '2018-05-21 10:12:40', '2018-05-01 10:12:40', '2018-05-01 10:12:40', NULL, NULL),
(8, 1, 'ELECT1', 'Monitor descompuesto', 'El usuario solicita un nuevo monitor', 1, 2, 1, 5, 3, 1, '2018-04-26 10:12:40', NULL, NULL, '2018-05-01 10:12:40', '2018-05-01 10:12:40', NULL, NULL),
(9, 1, 'COTR1', 'Req', 'No responde el teclado', 1, 1, 3, 5, 1, 2, '2018-04-26 10:12:40', '2018-05-01 10:12:40', '2018-05-01 10:12:40', '2018-05-01 10:12:40', '2018-05-01 10:12:40', NULL, NULL),
(10, 2, 'COTR1', 'Req', 'El usuario indica que no enciende su equipo', 1, 1, 3, 5, 1, 2, '2018-04-26 10:12:40', '2018-05-01 10:12:40', '2018-05-01 10:12:40', '2018-05-01 10:12:40', '2018-05-01 10:12:40', NULL, NULL),
(11, 1, 'COTR1', 'Cable de máquina', 'Cable de la maquina descompuesto', 1, 2, 3, 6, 1, 2, '2018-04-13 10:41:40', '2018-04-27 10:12:40', '2018-05-01 10:12:40', '2018-05-01 10:12:40', '2018-05-01 10:12:40', NULL, NULL),
(12, 2, 'COTR1', 'Req', 'El usuario indica que su maquina estaba encendida y no tiene archivos', 1, 3, 3, 7, 1, 1, '2018-04-26 10:12:40', '2018-05-01 10:12:40', '2018-05-01 10:12:40', '2018-05-01 10:12:40', '2018-05-01 10:12:40', NULL, NULL),
(13, 2, 'COTR1', 'Requerimiento', 'Usuario indica que le robaron sus examenes', 1, 2, 3, 7, 1, 1, '2018-04-26 10:12:40', '2018-05-01 10:12:40', '2018-05-01 10:12:40', '2018-05-01 10:12:40', '2018-05-01 10:12:40', NULL, NULL),
(14, 2, 'COTR1', 'Req', 'Maquina fuera de servicio', 1, 1, 3, 13, 1, 1, '2018-04-26 10:12:40', '2018-05-01 10:12:40', '2018-05-01 10:12:40', '2018-05-01 10:12:40', '2018-05-01 10:12:40', NULL, NULL),
(15, 3, 'COTR1', 'Suplantación', 'Usaron su máquina sin permiso', 1, 2, 2, 8, 1, 2, '2018-03-26 10:12:40', '2018-05-01 10:12:40', NULL, '2018-05-01 10:12:40', '2018-05-01 10:12:40', NULL, NULL),
(16, 1, 'COTR1', 'Pérdida de datos', 'Perdida de datos', 1, 2, 3, 13, 1, 1, '2018-04-26 10:12:40', '2018-05-01 10:12:40', '2018-05-01 10:12:40', '2018-05-01 10:12:40', '2018-05-01 10:12:40', NULL, NULL),
(21, 2, 'COTR10', 'Urgente', 'Urge resolver este problema', 2, 1, 1, 5, 1, 2, '2018-05-03 13:58:41', NULL, NULL, '2018-05-08 13:58:41', '2018-05-08 13:58:41', NULL, NULL),
(22, 3, 'COTR10', 'Prueba', 'Prueba prueba', 2, 2, 3, 9, 2, 2, '2018-05-03 15:51:38', '2018-05-08 15:51:38', '2018-05-08 15:51:38', '2018-05-08 15:51:38', '2018-05-08 15:51:38', NULL, NULL),
(23, 3, 'ELECT6', 'Fraude', 'Fraude', 2, 2, 4, 4, 5, 1, '2018-05-03 15:55:30', NULL, NULL, '2018-05-08 15:55:30', '2018-05-08 15:55:30', NULL, NULL),
(24, 4, 'COTR11', 'Caso', 'gfdgdfhg', 2, 1, 3, 10, 1, 3, '2018-05-06 17:17:26', '2018-05-11 17:17:26', '2018-05-11 17:17:26', '2018-05-11 17:17:26', '2018-05-11 17:17:26', NULL, NULL),
(25, 1, 'COTR10', 'Ayuda', 'Descripción del caso', 2, 2, 4, 4, 4, 1, '2018-05-13 19:45:25', NULL, NULL, '2018-05-18 19:45:25', '2018-05-18 19:45:25', NULL, NULL),
(26, 1, 'COTR10', 'Para Orlando', 'Brief description', 2, 1, 1, 5, 2, 2, '2018-05-09 11:46:03', NULL, NULL, '2018-05-18 19:46:03', '2018-05-18 19:46:03', NULL, NULL);

--
-- Disparadores `request`
--
DELIMITER $$
CREATE TRIGGER `Request_INSERT` BEFORE INSERT ON `request` FOR EACH ROW set 
		new.registerDate = now(), 
		new.maxAtentionDate = adddate(now(),interval 5 day),
		new.maxSolutionDate =  adddate(now(),interval 5 day)
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `riskmatrix`
--

CREATE TABLE `riskmatrix` (
  `id` int(11) NOT NULL,
  `id_probability` float NOT NULL,
  `id_impact` int(11) NOT NULL,
  `result` float NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `riskmatrix`
--

INSERT INTO `riskmatrix` (`id`, `id_probability`, `id_impact`, `result`) VALUES
(1, 1, 1, 0.2),
(2, 1, 2, 0.4),
(3, 1, 3, 0.6),
(4, 1, 4, 0.8),
(5, 1, 5, 1),
(6, 2, 1, 0.6),
(7, 2, 2, 1.2),
(8, 2, 3, 1.8),
(9, 2, 4, 2.4),
(10, 2, 5, 3),
(11, 3, 1, 1),
(12, 3, 2, 2),
(13, 3, 3, 3),
(14, 3, 4, 4),
(15, 3, 5, 5),
(16, 4, 1, 1.4),
(17, 4, 2, 2.8),
(18, 4, 3, 4.2),
(19, 4, 4, 5.6),
(20, 4, 5, 7),
(21, 5, 1, 1.8),
(22, 5, 2, 3.6),
(23, 5, 3, 6.4),
(24, 5, 4, 7.2),
(25, 5, 5, 9);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `status`
--

CREATE TABLE `status` (
  `id` int(11) NOT NULL,
  `name` varchar(30) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  `status` varchar(3) DEFAULT NULL,
  `icon` varchar(30) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `status`
--

INSERT INTO `status` (`id`, `name`, `description`, `status`, `icon`) VALUES
(1, 'Abierto', 'Caso abierto', 'A', 'new_releases'),
(2, 'En proceso', 'Caso en proceso de solución', 'A', 'schedule'),
(3, 'Solucionado', 'Caso solucionado', 'A', 'done'),
(4, 'Cancelado', 'Caso cancelado', 'A', 'clear');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `theme`
--

CREATE TABLE `theme` (
  `id` int(11) NOT NULL,
  `name` varchar(30) DEFAULT NULL,
  `url` varchar(100) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `theme`
--

INSERT INTO `theme` (`id`, `name`, `url`) VALUES
(1, 'Oscuro', 'assets/css/dark-theme.css'),
(2, 'Claro', 'assets/css/clear-theme.css');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `threatcapacity`
--

CREATE TABLE `threatcapacity` (
  `id` int(11) NOT NULL,
  `lowerValue` double NOT NULL,
  `upperValue` double NOT NULL,
  `level` varchar(50) NOT NULL,
  `weighing` float NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `threatcapacity`
--

INSERT INTO `threatcapacity` (`id`, `lowerValue`, `upperValue`, `level`, `weighing`) VALUES
(1, 0, 0.1, 'Los recursos son casi nulos', 0.1),
(2, 0.11, 0.3, 'Cuenta con muy pocos recursos', 0.3),
(3, 0.31, 0.5, 'Los recursos son regulares', 0.5),
(4, 0.51, 0.7, 'Cuenta con muchos recursos', 0.7),
(5, 0.71, 1, 'Los recursos son superiores', 0.9);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `threatexists`
--

CREATE TABLE `threatexists` (
  `id` int(11) NOT NULL,
  `lowerValue` double NOT NULL,
  `upperValue` double NOT NULL,
  `probability` varchar(50) NOT NULL,
  `weighing` float NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `threatexists`
--

INSERT INTO `threatexists` (`id`, `lowerValue`, `upperValue`, `probability`, `weighing`) VALUES
(1, 0, 0.1, 'Casi imposible', 0.1),
(2, 0.11, 0.3, 'Poco probable', 0.3),
(3, 0.31, 0.5, 'Probable', 0.5),
(4, 0.51, 0.7, 'Muy posible', 0.7),
(5, 0.71, 1, 'Casi seguro', 0.9);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `threatimpact`
--

CREATE TABLE `threatimpact` (
  `id` int(11) NOT NULL,
  `lowerValue` double NOT NULL,
  `upperValue` double NOT NULL,
  `impactLevel` varchar(50) NOT NULL,
  `weighing` float NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `threatimpact`
--

INSERT INTO `threatimpact` (`id`, `lowerValue`, `upperValue`, `impactLevel`, `weighing`) VALUES
(1, 0.1, 2, 'Insignificante', 2),
(2, 2.1, 4, 'Mínimo', 4),
(3, 4.1, 6, 'Regular', 6),
(4, 6.1, 8, 'Alto', 8),
(5, 8.1, 10, 'Desastroso', 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `threatinterest`
--

CREATE TABLE `threatinterest` (
  `id` int(11) NOT NULL,
  `lowerValue` double NOT NULL,
  `upperValue` double NOT NULL,
  `probability` varchar(50) NOT NULL,
  `weighing` float NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `threatinterest`
--

INSERT INTO `threatinterest` (`id`, `lowerValue`, `upperValue`, `probability`, `weighing`) VALUES
(1, 0, 0.1, 'Casi no genera', 0.1),
(2, 0.11, 0.3, 'Se genera poco', 0.3),
(3, 0.31, 0.5, 'Se genera regular', 0.5),
(4, 0.51, 0.7, 'Se genera mucho', 0.7),
(5, 0.71, 1, 'Es incontrolable', 0.9);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `threattype`
--

CREATE TABLE `threattype` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `threattype`
--

INSERT INTO `threattype` (`id`, `name`, `description`) VALUES
(1, 'Organizacional', 'Amenazas de tipo Organizacional'),
(2, 'Tecnológica', 'Amenazas de tipo Tecnológica'),
(3, 'Ambiental', 'Amenazas de tipo Ambiental');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `agent`
--
ALTER TABLE `agent`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_level` (`id_level`);

--
-- Indices de la tabla `agentthreat`
--
ALTER TABLE `agentthreat`
  ADD PRIMARY KEY (`id`,`id_threatType`),
  ADD KEY `id_threatType` (`id_threatType`);

--
-- Indices de la tabla `area`
--
ALTER TABLE `area`
  ADD PRIMARY KEY (`id`,`id_department`,`id_businessUnit`),
  ADD KEY `id_department` (`id_department`),
  ADD KEY `id_businessUnit` (`id_businessUnit`);

--
-- Indices de la tabla `assetrepository`
--
ALTER TABLE `assetrepository`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `businessunit`
--
ALTER TABLE `businessunit`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `casetype`
--
ALTER TABLE `casetype`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_job` (`id_job`),
  ADD KEY `id_area` (`id_area`),
  ADD KEY `id_department` (`id_department`),
  ADD KEY `id_businessUnit` (`id_businessUnit`);

--
-- Indices de la tabla `clientstatus`
--
ALTER TABLE `clientstatus`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`id`,`id_businessUnit`),
  ADD KEY `id_businessUnit` (`id_businessUnit`);

--
-- Indices de la tabla `infrastructurevulnerability`
--
ALTER TABLE `infrastructurevulnerability`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `job`
--
ALTER TABLE `job`
  ADD PRIMARY KEY (`id`,`id_area`,`id_department`,`id_businessUnit`),
  ADD KEY `id_area` (`id_area`),
  ADD KEY `id_department` (`id_department`),
  ADD KEY `id_businessUnit` (`id_businessUnit`);

--
-- Indices de la tabla `level`
--
ALTER TABLE `level`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `registermedium`
--
ALTER TABLE `registermedium`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `request`
--
ALTER TABLE `request`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_caseType` (`id_caseType`),
  ADD KEY `author` (`author`),
  ADD KEY `responsable` (`responsable`),
  ADD KEY `id_status` (`id_status`),
  ADD KEY `id_agentThreat` (`id_agentThreat`),
  ADD KEY `id_client` (`id_client`),
  ADD KEY `id_registerMedium` (`id_registerMedium`),
  ADD KEY `id_realAgentThreat` (`id_realAgentThreat`),
  ADD KEY `infrastructure` (`infrastructure`);

--
-- Indices de la tabla `riskmatrix`
--
ALTER TABLE `riskmatrix`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `status`
--
ALTER TABLE `status`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `theme`
--
ALTER TABLE `theme`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `threatcapacity`
--
ALTER TABLE `threatcapacity`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `threatexists`
--
ALTER TABLE `threatexists`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `threatimpact`
--
ALTER TABLE `threatimpact`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `threatinterest`
--
ALTER TABLE `threatinterest`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `threattype`
--
ALTER TABLE `threattype`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `agent`
--
ALTER TABLE `agent`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT de la tabla `agentthreat`
--
ALTER TABLE `agentthreat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT de la tabla `businessunit`
--
ALTER TABLE `businessunit`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `casetype`
--
ALTER TABLE `casetype`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `client`
--
ALTER TABLE `client`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT de la tabla `clientstatus`
--
ALTER TABLE `clientstatus`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `level`
--
ALTER TABLE `level`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `registermedium`
--
ALTER TABLE `registermedium`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `request`
--
ALTER TABLE `request`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;
--
-- AUTO_INCREMENT de la tabla `riskmatrix`
--
ALTER TABLE `riskmatrix`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
--
-- AUTO_INCREMENT de la tabla `status`
--
ALTER TABLE `status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `theme`
--
ALTER TABLE `theme`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `threattype`
--
ALTER TABLE `threattype`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
