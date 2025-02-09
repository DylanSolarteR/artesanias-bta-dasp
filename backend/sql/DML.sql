
-- CATEGORIAS
INSERT INTO category (name, description) VALUES ('Cerámica y Alfarería', 'Artículos como jarrones, platos, tazas y esculturas hechos a mano con arcilla o cerámica.');
INSERT INTO category (name, description) VALUES ('Textiles y Tejidos', 'Productos artesanales como mantas tejidas, ropa bordada, tapices y cojines decorativos.');
INSERT INTO category (name, description) VALUES ('Joyería Artesanal', 'Collares, pulseras, aretes y anillos elaborados a mano con materiales naturales o metales preciosos.');
INSERT INTO category (name, description) VALUES ('Cestería y Fibras', 'Cestas, sombreros, bolsos y decoraciones elaboradas con fibras naturales como mimbre y junco.');
INSERT INTO category (name, description) VALUES ('Madera Tallada', 'Objetos decorativos y funcionales como utensilios, muebles pequeños y esculturas, hechos de madera tallada.');

-- PRODUCTOS
-- INSERT INTO producto values (DEFAULT, $idBase, $nombre, $descripcion, $precio, $imagen, $idCategoria)

-- Producto Base 1: Jarrón Cerámico

INSERT INTO product VALUES (DEFAULT, 1, 'Jarrón Cerámico Rojo', 'Jarrón cerámico de color rojo.', 22000, 'jarron_ceramico_rojo.png', true, 1);
INSERT INTO product VALUES (DEFAULT, 1, 'Jarrón Cerámico Azul', 'Jarrón cerámico de color azul.', 23000, 'jarron_ceramico_azul.png', true, 1);
INSERT INTO product VALUES (DEFAULT, 1, 'Jarrón Cerámico Verde', 'Jarrón cerámico de color verde.', 24000, 'jarron_ceramico_verde.png', true, 1);
INSERT INTO product VALUES (DEFAULT, 1, 'Jarrón Cerámico Amarillo', 'Jarrón cerámico de color amarillo.', 25000, 'jarron_ceramico_amarillo.png', true, 1);
INSERT INTO product VALUES (DEFAULT, 1, 'Jarrón Cerámico Negro', 'Jarrón cerámico de color negro.', 26000, 'jarron_ceramico_negro.png', true, 1);

-- product Base 2: Taza Artesanal
INSERT INTO product VALUES (DEFAULT, 2, 'Taza Artesanal Rojo', 'Taza artesanal de cerámica roja.', 20000, 'taza_artesanal_rojo.png', true, 1);
INSERT INTO product VALUES (DEFAULT, 2, 'Taza Artesanal Azul', 'Taza artesanal de cerámica azul.', 21000, 'taza_artesanal_azul.png', true, 1);
INSERT INTO product VALUES (DEFAULT, 2, 'Taza Artesanal Verde', 'Taza artesanal de cerámica verde.', 22000, 'taza_artesanal_verde.png', true, 1);
INSERT INTO product VALUES (DEFAULT, 2, 'Taza Artesanal Amarillo', 'Taza artesanal de cerámica amarilla.', 23000, 'taza_artesanal_amarillo.png', true, 1);
INSERT INTO product VALUES (DEFAULT, 2, 'Taza Artesanal Negro', 'Taza artesanal de cerámica negra.', 24000, 'taza_artesanal_negro.png', true, 1);

-- product Base 3: Manta Tejida
INSERT INTO product VALUES (DEFAULT, 3, 'Manta Tejida Rojo', 'Manta tejida de lana roja.', 40000, 'manta_tejida_rojo.png', true, 2);
INSERT INTO product VALUES (DEFAULT, 3, 'Manta Tejida Azul', 'Manta tejida de lana azul.', 42000, 'manta_tejida_azul.png', true, 2);
INSERT INTO product VALUES (DEFAULT, 3, 'Manta Tejida Verde', 'Manta tejida de lana verde.', 44000, 'manta_tejida_verde.png', true, 2);
INSERT INTO product VALUES (DEFAULT, 3, 'Manta Tejida Amarillo', 'Manta tejida de lana amarilla.', 46000, 'manta_tejida_amarillo.png', true, 2);
INSERT INTO product VALUES (DEFAULT, 3, 'Manta Tejida Negro', 'Manta tejida de lana negra.', 48000, 'manta_tejida_negro.png', true, 2);

-- product Base 4: Pulsera de Cuero
INSERT INTO product VALUES (DEFAULT, 4, 'Pulsera Cuero Marrón', 'Pulsera de cuero marrón.', 22000, 'pulsera_cuero_marron.png', true, 3);
INSERT INTO product VALUES (DEFAULT, 4, 'Pulsera Cuero Negro', 'Pulsera de cuero negro.', 24000, 'pulsera_cuero_negro.png', true, 3);
INSERT INTO product VALUES (DEFAULT, 4, 'Pulsera Cuero Rojo', 'Pulsera de cuero rojo.', 26000, 'pulsera_cuero_rojo.png', true, 3);
INSERT INTO product VALUES (DEFAULT, 4, 'Pulsera Cuero Verde', 'Pulsera de cuero verde.', 28000, 'pulsera_cuero_verde.png', true, 3);
INSERT INTO product VALUES (DEFAULT, 4, 'Pulsera Cuero Azul', 'Pulsera de cuero azul.', 30000, 'pulsera_cuero_azul.png', true, 3);

-- product Base 5: Collares de Perlas
INSERT INTO product VALUES (DEFAULT, 5, 'Collar Perlas Blancas', 'Collar de perlas blancas.', 50000, 'collar_perlas_blancas.png', true, 3);
INSERT INTO product VALUES (DEFAULT, 5, 'Collar Perlas Negras', 'Collar de perlas negras.', 52000, 'collar_perlas_negras.png', true, 3);
INSERT INTO product VALUES (DEFAULT, 5, 'Collar Perlas Rosadas', 'Collar de perlas rosadas.', 54000, 'collar_perlas_rosadas.png', true, 3);
INSERT INTO product VALUES (DEFAULT, 5, 'Collar Perlas Azules', 'Collar de perlas azules.', 56000, 'collar_perlas_azules.png', true, 3);
INSERT INTO product VALUES (DEFAULT, 5, 'Collar Perlas Rojas', 'Collar de perlas rojas.', 58000, 'collar_perlas_rojas.png', true, 3);

-- product Base 6: Cesta de Mimbre
INSERT INTO product VALUES (DEFAULT, 6, 'Cesta Mimbre Grande', 'Cesta grande de mimbre.', 22000, 'cesta_mimbre_grande.png', true, 4);
INSERT INTO product VALUES (DEFAULT, 6, 'Cesta Mimbre Pequeña', 'Cesta pequeña de mimbre.', 20000, 'cesta_mimbre_pequena.png', true, 4);
INSERT INTO product VALUES (DEFAULT, 6, 'Cesta Mimbre Colorida', 'Cesta colorida de mimbre.', 25000, 'cesta_mimbre_colorida.png', true, 4);
INSERT INTO product VALUES (DEFAULT, 6, 'Cesta Mimbre Natural', 'Cesta de mimbre natural.', 24000, 'cesta_mimbre_natural.png', true, 4);
INSERT INTO product VALUES (DEFAULT, 6, 'Cesta Mimbre Decorativa', 'Cesta decorativa de mimbre.', 26000, 'cesta_mimbre_decorativa.png', true, 4);

-- product Base 7: Silla de Cestería
INSERT INTO product VALUES (DEFAULT, 7, 'Silla Cestería Natural', 'Silla decorativa de cestería natural.', 90000, 'silla_cesteria_natural.png', true, 2);
INSERT INTO product VALUES (DEFAULT, 7, 'Silla Cestería Blanca', 'Silla de cestería blanca.', 92000, 'silla_cesteria_blanca.png', true, 2);
INSERT INTO product VALUES (DEFAULT, 7, 'Silla Cestería Negra', 'Silla de cestería negra.', 94000, 'silla_cesteria_negra.png', true, 2);
INSERT INTO product VALUES (DEFAULT, 7, 'Silla Cestería Verde', 'Silla de cestería verde.', 96000, 'silla_cesteria_verde.png', true, 2);
INSERT INTO product VALUES (DEFAULT, 7, 'Silla Cestería Amarilla', 'Silla de cestería amarilla.', 98000, 'silla_cesteria_amarilla.png', true, 2);

-- product Base 8: Decoración de Madera
INSERT INTO product VALUES (DEFAULT, 8, 'Decoración Madera Pino', 'Decoración de pino tallada a mano.', 35000, 'decoracion_madera_pino.png', true, 5);
INSERT INTO product VALUES (DEFAULT, 8, 'Decoración Madera Roble', 'Decoración de roble tallada a mano.', 37000, 'decoracion_madera_roble.png', true, 5);
INSERT INTO product VALUES (DEFAULT, 8, 'Decoración Madera Caoba', 'Decoración de caoba tallada a mano.', 39000, 'decoracion_madera_caoba.png', true, 5);
INSERT INTO product VALUES (DEFAULT, 8, 'Decoración Madera Nogal', 'Decoración de nogal tallada a mano.', 41000, 'decoracion_madera_nogal.png', true, 5);
INSERT INTO product VALUES (DEFAULT, 8, 'Decoración Madera Abeto', 'Decoración de abeto tallada a mano.', 43000, 'decoracion_madera_abeto.png', true, 5);

-- product Base 9: Mesa de Madera
INSERT INTO product VALUES (DEFAULT, 9, 'Mesa Madera Pequeña', 'Mesa pequeña de madera hecha a mano.', 80000, 'mesa_madera_pequena.png', true, 5);
INSERT INTO product VALUES (DEFAULT, 9, 'Mesa Madera Grande', 'Mesa grande de madera hecha a mano.', 90000, 'mesa_madera_grande.png', true, 5);
INSERT INTO product VALUES (DEFAULT, 9, 'Mesa Madera Rústica', 'Mesa rústica de madera hecha a mano.', 75000, 'mesa_madera_rustica.png', true, 5);
INSERT INTO product VALUES (DEFAULT, 9, 'Mesa Madera Moderna', 'Mesa moderna de madera hecha a mano.', 85000, 'mesa_madera_moderna.png', true, 5);
INSERT INTO product VALUES (DEFAULT, 9, 'Mesa Madera Clásica', 'Mesa clásica de madera hecha a mano.', 92000, 'mesa_madera_classica.png', true, 5);

-- product Base 10: Bolso de Tela
INSERT INTO product VALUES (DEFAULT, 10, 'Bolso Tela Verde', 'Bolso de tela verde.', 20000, 'bolso_tela_verde.png', true, 4);
INSERT INTO product VALUES (DEFAULT, 10, 'Bolso Tela Azul', 'Bolso de tela azul.', 21000, 'bolso_tela_azul.png', true, 4);
INSERT INTO product VALUES (DEFAULT, 10, 'Bolso Tela Rojo', 'Bolso de tela rojo.', 22000, 'bolso_tela_rojo.png', true, 4);
INSERT INTO product VALUES (DEFAULT, 10, 'Bolso Tela Amarillo', 'Bolso de tela amarillo.', 23000, 'bolso_tela_amarillo.png', true, 4);
INSERT INTO product VALUES (DEFAULT, 10, 'Bolso Tela Negro', 'Bolso de tela negro.', 24000, 'bolso_tela_negro.png', true, 4);


-- Departamentos
INSERT INTO department VALUES (DEFAULT, 'Amazonas'),
	(DEFAULT, 'Antioquía'),
	(DEFAULT, 'Arauca'),
	(DEFAULT, 'Atlántico'),
	(DEFAULT, 'Bolívar'),
	(DEFAULT, 'Boyacá'),
	(DEFAULT, 'Caldas'),
	(DEFAULT, 'Caquetá'),
	(DEFAULT, 'Casanare'),
	(DEFAULT, 'Cauca'),
	(DEFAULT, 'Cesar'),
	(DEFAULT, 'Chocó'),
	(DEFAULT, 'Córdoba'),
	(DEFAULT, 'Cundinamarca'),
	(DEFAULT, 'Guainía'),
	(DEFAULT, 'Guaviare'),
	(DEFAULT, 'Huila'),
	(DEFAULT, 'La Guajira'),
	(DEFAULT, 'Magdalena'),
	(DEFAULT, 'Meta'),
	(DEFAULT, 'Nariño'),
	(DEFAULT, 'Norte de Santander'),
	(DEFAULT, 'Putumayo'),
	(DEFAULT, 'Quindío'),
	(DEFAULT, 'Risaralda'),
	(DEFAULT, 'San Andrés y Providencia'),
	(DEFAULT, 'Santander'),
	(DEFAULT, 'Sucre'),
	(DEFAULT, 'Tolima'),
	(DEFAULT, 'Valle del Cauca'),
	(DEFAULT, 'Vaupés'),
	(DEFAULT, 'Vichada');
	
--- Punto fisico
INSERT INTO physical_location VALUES (DEFAULT, 'Av. La Esmeralda #44-100', '2123213', true, 4.6511008, -74.0971553, 'https://lh3.googleusercontent.com/p/AF1QipN1P14OzJgiEpNaK5pBptwZoXsZQR-5Hm8n2OL7=s680-w680-h510');
INSERT INTO physical_location VALUES (DEFAULT, 'Aut SUR No. 50-11, C.P 11001', '312231', true, 4.5939012, -74.1347491, 'https://artesaniasbucket.s3.us-east-2.amazonaws.com/default_loc_image.webp');
-- Default employees
INSERT INTO employee values (DEFAULT, null, 'gasnoble@helios.com', 'Gas', 'Noble', '1123', 'administrator', '$2a$12$17yT0ne3NTuCqZo7Ifgzqu5k8U1rppaWU2UEP6sbv5iNiGpsp3iJC', 'CC', '1001');
INSERT INTO employee values (DEFAULT, 1, 'james@soliban.com', 'James', 'Soliban', '313444', 'manager', '$2a$12$RYBjQk5rNfwy1bLNLLfgYuaKaW82fookwo7wVj1MZ9co0x3JEc5fa', 'CC', '1002');
INSERT INTO employee values (DEFAULT, 1, 'joseveles285@gmail.com', 'José', 'Vélez', '3135555', 'cashier', '$2a$12$RYBjQk5rNfwy1bLNLLfgYuaKaW82fookwo7wVj1MZ9co0x3JEc5fa', 'CC', '1003');


--- Inventario (provicional) más adelante se expandirá
INSERT INTO inventory (pk_fk_product, pk_fk_physical_location, quantity, display_quantity) 
						 VALUES (1, 1, 50, 15), 
								(2, 1, 75, 10), 
								(1, 2, 50, 15),
								(2, 2, 23, 3),
								(3, 2, 25, 5), 
								(4, 2, 38, 6);

INSERT INTO purchase (date, total_price, email, name, doc_type, identification, telephone, is_physical_purchase) VALUES
('2025-01-14 05:54:15', 46164, 'cliente1@mail.com', 'Juan Pérez', 'CC', '123456789', '3015550001', FALSE),
('2025-01-24 05:54:15', 256449, 'cliente2@mail.com', 'María Gómez', 'TI', '987654321', '3025550002', FALSE),
('2025-01-25 05:54:15', 47802, 'cliente3@mail.com', 'Luis Rodríguez', 'CC', '159753486', '3035550003', FALSE),
('2025-01-15 05:54:15', 139940, 'cliente4@mail.com', 'Ana López', 'CE', '357159753', '3045550004', FALSE),
('2025-02-07 05:54:15', 125045, 'cliente5@mail.com', 'Carlos Martínez', 'CC', '852369741', '3055550005', FALSE),
('2025-01-18 05:54:15', 23817, 'cliente6@mail.com', 'Laura Fernández', 'TI', '951357456', '3065550006', FALSE),
('2025-02-05 05:54:15', 186924, 'cliente7@mail.com', 'Jorge Herrera', 'CE', '147258369', '3075550007', FALSE),
('2025-01-21 05:54:15', 90590, 'cliente8@mail.com', 'Mónica Ramírez', 'CC', '369852741', '3085550008', FALSE),
('2025-01-19 05:54:15', 127203, 'cliente9@mail.com', 'Fernando Castro', 'TI', '258147369', '3095550009', FALSE),
('2025-02-02 05:54:15', 57824, 'cliente10@mail.com', 'Sofía Vargas', 'CE', '753951852', '3105550010', FALSE),
('2025-01-30 05:54:15', 87416, 'cliente11@mail.com', 'Pedro Suárez', 'CC', '123123123', '3115550011', FALSE),
('2025-02-06 05:54:15', 39760, 'cliente12@mail.com', 'Diana Ríos', 'TI', '456456456', '3125550012', FALSE),
('2025-01-22 05:54:15', 218850, 'cliente13@mail.com', 'Andrés Nieto', 'CE', '789789789', '3135550013', FALSE),
('2025-01-27 05:54:15', 86512, 'cliente14@mail.com', 'Beatriz Mejía', 'CC', '321321321', '3145550014', FALSE),
('2025-01-23 05:54:15', 63309, 'cliente15@mail.com', 'Raúl Estévez', 'TI', '654654654', '3155550015', FALSE),
('2025-01-29 05:54:15', 94505, 'cliente16@mail.com', 'Elena Castaño', 'CE', '987987987', '3165550016', FALSE),
('2025-01-26 05:54:15', 105496, 'cliente17@mail.com', 'Germán Palacios', 'CC', '741852963', '3175550017', FALSE),
('2025-02-04 05:54:15', 78932, 'cliente18@mail.com', 'Cecilia Gómez', 'TI', '369147258', '3185550018', FALSE),
('2025-02-01 05:54:15', 40722, 'cliente19@mail.com', 'Daniel Quintero', 'CE', '852741963', '3195550019', FALSE),
('2025-01-28 05:54:15', 62932, 'cliente20@mail.com', 'Gloria Santos', 'CC', '147369258', '3205550020', FALSE);
('2025-02-09 10:15:00', 150000, 'juan.perez@example.com', 'Juan Pérez', 'CC', '1012345678', '3001234567', TRUE),
('2025-02-09 11:20:00', 220000, 'maria.gomez@example.com', 'María Gómez', 'TI', '1023456789', '3102345678', TRUE),
('2025-02-09 12:35:00', 175000, 'carlos.lopez@example.com', 'Carlos López', 'CC', '1034567890', '3203456789', TRUE),
('2025-02-09 13:50:00', 198000, 'ana.martinez@example.com', 'Ana Martínez', 'CE', '1045678901', '3304567890', TRUE),
('2025-02-09 14:10:00', 250000, 'pedro.fernandez@example.com', 'Pedro Fernández', 'CC', '1056789012', '3405678901', TRUE),
('2025-02-09 15:25:00', 135000, 'luisa.rodriguez@example.com', 'Luisa Rodríguez', 'TI', '1067890123', '3506789012', TRUE),
('2025-02-09 16:40:00', 189000, 'david.moreno@example.com', 'David Moreno', 'CC', '1078901234', '3607890123', TRUE),
('2025-02-09 17:55:00', 210000, 'laura.ramirez@example.com', 'Laura Ramírez', 'CE', '1089012345', '3708901234', TRUE),
('2025-02-09 18:30:00', 280000, 'andres.sanchez@example.com', 'Andrés Sánchez', 'CC', '1090123456', '3809012345', TRUE),
('2025-02-09 19:45:00', 160000, 'carolina.torres@example.com', 'Carolina Torres', 'TI', '1101234567', '3900123456', TRUE),
('2025-02-09 20:10:00', 195000, 'jorge.diaz@example.com', 'Jorge Díaz', 'CC', '1112345678', '3001234578', TRUE),
('2025-02-09 21:20:00', 225000, 'sofia.castillo@example.com', 'Sofía Castillo', 'CE', '1123456789', '3102345789', TRUE),
('2025-02-09 22:35:00', 145000, 'ricardo.gutierrez@example.com', 'Ricardo Gutiérrez', 'CC', '1134567890', '3203456790', TRUE),
('2025-02-09 23:50:00', 270000, 'valentina.mendez@example.com', 'Valentina Méndez', 'TI', '1145678901', '3304567891', TRUE),
('2025-02-10 08:10:00', 305000, 'oscar.romero@example.com', 'Óscar Romero', 'CC', '1156789012', '3405678902', TRUE),
('2025-02-10 09:25:00', 180000, 'paula.arias@example.com', 'Paula Arias', 'CE', '1167890123', '3506789013', TRUE),
('2025-02-10 10:40:00', 215000, 'gustavo.navarro@example.com', 'Gustavo Navarro', 'CC', '1178901234', '3607890124', TRUE),
('2025-02-10 11:55:00', 240000, 'angela.vera@example.com', 'Ángela Vera', 'TI', '1189012345', '3708901235', TRUE),
('2025-02-10 12:30:00', 275000, 'roberto.rios@example.com', 'Roberto Ríos', 'CC', '1190123456', '3809012346', TRUE),
('2025-02-10 13:45:00', 200000, 'daniela.cortes@example.com', 'Daniela Cortés', 'CE', '1201234567', '3900123457', TRUE);


INSERT INTO ecommerce_purchase (pk_fk_purchase, fk_department, delivery_address, zip_code, is_complete)
VALUES 
    (1, 5, 'Calle 123 #45-67, Bogotá', 11001, FALSE), 
    (2, 8, 'Carrera 50 #12-34, Medellín', 05001, TRUE), 
    (3, 3, 'Avenida Siempre Viva 742, Cali', 76001, FALSE), 
    (4, 1, 'Calle 9 #8-76, Barranquilla', 08001, TRUE), 
    (5, 4, 'Diagonal 22 #45-89, Bucaramanga', 68001, FALSE),
    (6, 6, 'Carrera 15 #100-23, Cartagena', 13001, TRUE),
    (7, 7, 'Transversal 55 #98-12, Manizales', 17001, FALSE),
    (8, 9, 'Calle 30 #20-50, Cúcuta', 54001, TRUE),
    (9, 2, 'Carrera 80 #45-67, Pereira', 66001, FALSE),
    (10, 10, 'Calle 5 #67-90, Villavicencio', 50001, TRUE),
    (11, 2, 'Carrera 45 #23-12, Ibagué', 73001, FALSE),
    (12, 3, 'Avenida 68 #45-98, Neiva', 41001, TRUE),
    (13, 4, 'Calle 12 #30-45, Pasto', 52001, FALSE),
    (14, 5, 'Diagonal 77 #12-34, Tunja', 15001, TRUE),
    (15, 6, 'Carrera 50 #10-76, Montería', 23001, FALSE),
    (16, 7, 'Calle 33 #25-89, Popayán', 19001, TRUE),
    (17, 8, 'Transversal 9 #50-23, Armenia', 63001, FALSE),
    (18, 9, 'Avenida Caracas #100-50, Santa Marta', 47001, TRUE),
    (19, 10, 'Carrera 11 #67-32, Valledupar', 20001, FALSE),
    (20, 1, 'Calle 89 #12-65, Sincelejo', 70001, TRUE);

INSERT INTO physical_purchase (pk_fk_purchase, fk_employee)
VALUES 
    (21, 3),
    (22, 3),
    (23, 3),
    (24, 3),
    (25, 3),
    (26, 3),
    (27, 3),
    (28, 3),
    (29, 3),
    (30, 3),
    (31, 3),
    (32, 3),
    (33, 3),
    (34, 3),
    (35, 3),
    (36, 3),
    (37, 3),
    (38, 3),
    (39, 3),
    (40, 3);

--product in purchase

INSERT INTO product_in_purchase (pk_fk_product, pk_fk_purchase, quantity, unit_price) VALUES
(1, 1, 2, 50000),
(2, 1, 3, 30000),
(3, 2, 1, 120000),
(4, 2, 5, 45000),
(5, 3, 2, 60000),
(6, 3, 4, 75000),
(7, 4, 3, 95000),
(8, 5, 1, 110000),
(9, 6, 2, 42000),
(10, 7, 5, 58000),
(1, 8, 3, 67000),
(2, 9, 1, 99000),
(3, 10, 4, 34000),
(4, 11, 2, 88000),
(5, 12, 3, 76000),
(6, 13, 1, 120000),
(7, 14, 4, 49000),
(8, 15, 2, 64000),
(9, 16, 3, 85000),
(10, 17, 1, 101000),
(1, 18, 5, 46000),
(2, 19, 3, 92000),
(3, 20, 2, 73000),
(4, 21, 4, 52000),
(5, 22, 1, 99000),
(6, 23, 5, 48000),
(7, 24, 2, 110000),
(8, 25, 3, 60000),
(9, 26, 1, 95000),
(10, 27, 4, 85000),
(1, 28, 2, 47000),
(2, 29, 3, 123000),
(3, 30, 5, 75000),
(4, 31, 1, 91000),
(5, 32, 2, 98000),
(6, 33, 3, 41000),
(7, 34, 4, 59000),
(8, 35, 5, 72000),
(9, 36, 1, 88000),
(10, 37, 3, 65000),
(1, 38, 2, 70000),
(2, 39, 4, 99000),
(3, 40, 1, 113000);
 
