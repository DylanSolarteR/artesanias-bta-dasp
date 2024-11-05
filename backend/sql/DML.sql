
-- CATEGORIAS
INSERT INTO categoria (nombre, descripcion) VALUES ('Cerámica y Alfarería', 'Artículos como jarrones, platos, tazas y esculturas hechos a mano con arcilla o cerámica.');
INSERT INTO categoria (nombre, descripcion) VALUES ('Textiles y Tejidos', 'Productos artesanales como mantas tejidas, ropa bordada, tapices y cojines decorativos.');
INSERT INTO categoria (nombre, descripcion) VALUES ('Joyería Artesanal', 'Collares, pulseras, aretes y anillos elaborados a mano con materiales naturales o metales preciosos.');
INSERT INTO categoria (nombre, descripcion) VALUES ('Cestería y Fibras', 'Cestas, sombreros, bolsos y decoraciones elaboradas con fibras naturales como mimbre y junco.');
INSERT INTO categoria (nombre, descripcion) VALUES ('Madera Tallada', 'Objetos decorativos y funcionales como utensilios, muebles pequeños y esculturas, hechos de madera tallada.');

-- PRODUCTOS
-- INSERT INTO producto values (DEFAULT, $idBase, $nombre, $descripcion, $precio, $imagen, $idCategoria)

-- Producto Base 1: Jarrón Cerámico
INSERT INTO producto VALUES (DEFAULT, 1, 'Jarrón Cerámico Rojo', 'Jarrón cerámico de color rojo.', 22000, 'jarron_ceramico_rojo.png', 1);
INSERT INTO producto VALUES (DEFAULT, 1, 'Jarrón Cerámico Azul', 'Jarrón cerámico de color azul.', 23000, 'jarron_ceramico_azul.png', 1);
INSERT INTO producto VALUES (DEFAULT, 1, 'Jarrón Cerámico Verde', 'Jarrón cerámico de color verde.', 24000, 'jarron_ceramico_verde.png', 1);
INSERT INTO producto VALUES (DEFAULT, 1, 'Jarrón Cerámico Amarillo', 'Jarrón cerámico de color amarillo.', 25000, 'jarron_ceramico_amarillo.png', 1);
INSERT INTO producto VALUES (DEFAULT, 1, 'Jarrón Cerámico Negro', 'Jarrón cerámico de color negro.', 26000, 'jarron_ceramico_negro.png', 1);

-- Producto Base 2: Taza Artesanal
INSERT INTO producto VALUES (DEFAULT, 2, 'Taza Artesanal Rojo', 'Taza artesanal de cerámica roja.', 20000, 'taza_artesanal_rojo.png', 1);
INSERT INTO producto VALUES (DEFAULT, 2, 'Taza Artesanal Azul', 'Taza artesanal de cerámica azul.', 21000, 'taza_artesanal_azul.png', 1);
INSERT INTO producto VALUES (DEFAULT, 2, 'Taza Artesanal Verde', 'Taza artesanal de cerámica verde.', 22000, 'taza_artesanal_verde.png', 1);
INSERT INTO producto VALUES (DEFAULT, 2, 'Taza Artesanal Amarillo', 'Taza artesanal de cerámica amarilla.', 23000, 'taza_artesanal_amarillo.png', 1);
INSERT INTO producto VALUES (DEFAULT, 2, 'Taza Artesanal Negro', 'Taza artesanal de cerámica negra.', 24000, 'taza_artesanal_negro.png', 1);

-- Producto Base 3: Manta Tejida
INSERT INTO producto VALUES (DEFAULT, 3, 'Manta Tejida Rojo', 'Manta tejida de lana roja.', 40000, 'manta_tejida_rojo.png', 2);
INSERT INTO producto VALUES (DEFAULT, 3, 'Manta Tejida Azul', 'Manta tejida de lana azul.', 42000, 'manta_tejida_azul.png', 2);
INSERT INTO producto VALUES (DEFAULT, 3, 'Manta Tejida Verde', 'Manta tejida de lana verde.', 44000, 'manta_tejida_verde.png', 2);
INSERT INTO producto VALUES (DEFAULT, 3, 'Manta Tejida Amarillo', 'Manta tejida de lana amarilla.', 46000, 'manta_tejida_amarillo.png', 2);
INSERT INTO producto VALUES (DEFAULT, 3, 'Manta Tejida Negro', 'Manta tejida de lana negra.', 48000, 'manta_tejida_negro.png', 2);

-- Producto Base 4: Pulsera de Cuero
INSERT INTO producto VALUES (DEFAULT, 4, 'Pulsera Cuero Marrón', 'Pulsera de cuero marrón.', 22000, 'pulsera_cuero_marron.png', 3);
INSERT INTO producto VALUES (DEFAULT, 4, 'Pulsera Cuero Negro', 'Pulsera de cuero negro.', 24000, 'pulsera_cuero_negro.png', 3);
INSERT INTO producto VALUES (DEFAULT, 4, 'Pulsera Cuero Rojo', 'Pulsera de cuero rojo.', 26000, 'pulsera_cuero_rojo.png', 3);
INSERT INTO producto VALUES (DEFAULT, 4, 'Pulsera Cuero Verde', 'Pulsera de cuero verde.', 28000, 'pulsera_cuero_verde.png', 3);
INSERT INTO producto VALUES (DEFAULT, 4, 'Pulsera Cuero Azul', 'Pulsera de cuero azul.', 30000, 'pulsera_cuero_azul.png', 3);

-- Producto Base 5: Collares de Perlas
INSERT INTO producto VALUES (DEFAULT, 5, 'Collar Perlas Blancas', 'Collar de perlas blancas.', 50000, 'collar_perlas_blancas.png', 3);
INSERT INTO producto VALUES (DEFAULT, 5, 'Collar Perlas Negras', 'Collar de perlas negras.', 52000, 'collar_perlas_negras.png', 3);
INSERT INTO producto VALUES (DEFAULT, 5, 'Collar Perlas Rosadas', 'Collar de perlas rosadas.', 54000, 'collar_perlas_rosadas.png', 3);
INSERT INTO producto VALUES (DEFAULT, 5, 'Collar Perlas Azules', 'Collar de perlas azules.', 56000, 'collar_perlas_azules.png', 3);
INSERT INTO producto VALUES (DEFAULT, 5, 'Collar Perlas Rojas', 'Collar de perlas rojas.', 58000, 'collar_perlas_rojas.png', 3);

-- Producto Base 6: Cesta de Mimbre
INSERT INTO producto VALUES (DEFAULT, 6, 'Cesta Mimbre Grande', 'Cesta grande de mimbre.', 22000, 'cesta_mimbre_grande.png', 4);
INSERT INTO producto VALUES (DEFAULT, 6, 'Cesta Mimbre Pequeña', 'Cesta pequeña de mimbre.', 20000, 'cesta_mimbre_pequena.png', 4);
INSERT INTO producto VALUES (DEFAULT, 6, 'Cesta Mimbre Colorida', 'Cesta colorida de mimbre.', 25000, 'cesta_mimbre_colorida.png', 4);
INSERT INTO producto VALUES (DEFAULT, 6, 'Cesta Mimbre Natural', 'Cesta de mimbre natural.', 24000, 'cesta_mimbre_natural.png', 4);
INSERT INTO producto VALUES (DEFAULT, 6, 'Cesta Mimbre Decorativa', 'Cesta decorativa de mimbre.', 26000, 'cesta_mimbre_decorativa.png', 4);

-- Producto Base 7: Silla de Cestería
INSERT INTO producto VALUES (DEFAULT, 7, 'Silla Cestería Natural', 'Silla decorativa de cestería natural.', 90000, 'silla_cesteria_natural.png', 2);
INSERT INTO producto VALUES (DEFAULT, 7, 'Silla Cestería Blanca', 'Silla de cestería blanca.', 92000, 'silla_cesteria_blanca.png', 2);
INSERT INTO producto VALUES (DEFAULT, 7, 'Silla Cestería Negra', 'Silla de cestería negra.', 94000, 'silla_cesteria_negra.png', 2);
INSERT INTO producto VALUES (DEFAULT, 7, 'Silla Cestería Verde', 'Silla de cestería verde.', 96000, 'silla_cesteria_verde.png', 2);
INSERT INTO producto VALUES (DEFAULT, 7, 'Silla Cestería Amarilla', 'Silla de cestería amarilla.', 98000, 'silla_cesteria_amarilla.png', 2);

-- Producto Base 8: Decoración de Madera
INSERT INTO producto VALUES (DEFAULT, 8, 'Decoración Madera Pino', 'Decoración de pino tallada a mano.', 35000, 'decoracion_madera_pino.png', 5);
INSERT INTO producto VALUES (DEFAULT, 8, 'Decoración Madera Roble', 'Decoración de roble tallada a mano.', 37000, 'decoracion_madera_roble.png', 5);
INSERT INTO producto VALUES (DEFAULT, 8, 'Decoración Madera Caoba', 'Decoración de caoba tallada a mano.', 39000, 'decoracion_madera_caoba.png', 5);
INSERT INTO producto VALUES (DEFAULT, 8, 'Decoración Madera Nogal', 'Decoración de nogal tallada a mano.', 41000, 'decoracion_madera_nogal.png', 5);
INSERT INTO producto VALUES (DEFAULT, 8, 'Decoración Madera Abeto', 'Decoración de abeto tallada a mano.', 43000, 'decoracion_madera_abeto.png', 5);

-- Producto Base 9: Mesa de Madera
INSERT INTO producto VALUES (DEFAULT, 9, 'Mesa Madera Pequeña', 'Mesa pequeña de madera hecha a mano.', 80000, 'mesa_madera_pequena.png', 5);
INSERT INTO producto VALUES (DEFAULT, 9, 'Mesa Madera Grande', 'Mesa grande de madera hecha a mano.', 90000, 'mesa_madera_grande.png', 5);
INSERT INTO producto VALUES (DEFAULT, 9, 'Mesa Madera Rústica', 'Mesa rústica de madera hecha a mano.', 75000, 'mesa_madera_rustica.png', 5);
INSERT INTO producto VALUES (DEFAULT, 9, 'Mesa Madera Moderna', 'Mesa moderna de madera hecha a mano.', 85000, 'mesa_madera_moderna.png', 5);
INSERT INTO producto VALUES (DEFAULT, 9, 'Mesa Madera Clásica', 'Mesa clásica de madera hecha a mano.', 92000, 'mesa_madera_classica.png', 5);

-- Producto Base 10: Bolso de Tela
INSERT INTO producto VALUES (DEFAULT, 10, 'Bolso Tela Verde', 'Bolso de tela verde.', 20000, 'bolso_tela_verde.png', 4);
INSERT INTO producto VALUES (DEFAULT, 10, 'Bolso Tela Azul', 'Bolso de tela azul.', 21000, 'bolso_tela_azul.png', 4);
INSERT INTO producto VALUES (DEFAULT, 10, 'Bolso Tela Rojo', 'Bolso de tela rojo.', 22000, 'bolso_tela_rojo.png', 4);
INSERT INTO producto VALUES (DEFAULT, 10, 'Bolso Tela Amarillo', 'Bolso de tela amarillo.', 23000, 'bolso_tela_amarillo.png', 4);
INSERT INTO producto VALUES (DEFAULT, 10, 'Bolso Tela Negro', 'Bolso de tela negro.', 24000, 'bolso_tela_negro.png', 4);
