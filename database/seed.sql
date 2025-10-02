USE tienda_virtual;

-- Desactivar restricciones
SET FOREIGN_KEY_CHECKS = 0;

-- Limpiar tablas
DELETE FROM usuarios;
DELETE FROM productos;
DELETE FROM categorias;

-- Reactivar restricciones
SET FOREIGN_KEY_CHECKS = 1;

-- Insertar categorías
INSERT INTO categorias (nombre) VALUES 
('Ropa'),
('Accesorios'),
('Calzado'),
('Tecnología'),
('Hogar');

-- Insertar productos
INSERT INTO productos (nombre, descripcion, precio, stock, imagen, categoria_id) VALUES
('Camiseta básica', 'Camiseta de algodón unisex', 30000, 50, 'camiseta.jpg', 1),
('Chaqueta de cuero', 'Chaqueta estilo biker', 150000, 10, 'chaqueta.jpg', 1),
('Gorra deportiva', 'Gorra ajustable para hombre/mujer', 25000, 30, 'gorra.jpg', 2),
('Mochila casual', 'Mochila resistente para uso diario', 80000, 15, 'mochila.jpg', 2),
('Zapatillas casuales', 'Zapatillas cómodas para uso diario', 120000, 20, 'zapatillas.jpg', 3),
('Botas de montaña', 'Botas resistentes al agua', 220000, 12, 'botas.jpg', 3),
('Teléfono inteligente', 'Smartphone gama media', 900000, 25, 'telefono.jpg', 4),
('Auriculares inalámbricos', 'Bluetooth con cancelación de ruido', 250000, 40, 'audifonos.jpg', 4),
('Lámpara de escritorio', 'Luz LED con ajuste de intensidad', 60000, 35, 'lampara.jpg', 5),
('Juego de sábanas', 'Sábanas suaves de algodón', 95000, 18, 'sabanas.jpg', 5);

-- Insertar usuarios con contraseñas hasheadas (bcrypt cost 10)
-- admin123 => $2a$10$CwTycUXWue0Thq9StjUM0uJ8rSx7iEyxNuaCG2lKT9OAXoJ1Bs8eW
-- cliente123 => $2a$10$7EqJtq98hPqEX7fNZaFWoOe6byN1Nsni5jv4Zk2p2K6ZoRpmW1YyW

INSERT INTO usuarios (nombre, email, password_hash, rol) VALUES
('Administrador', 'admin@example.com', '$2a$10$CwTycUXWue0Thq9StjUM0uJ8rSx7iEyxNuaCG2lKT9OAXoJ1Bs8eW', 'admin'),
('Cliente de prueba', 'cliente@example.com', '$2a$10$7EqJtq98hPqEX7fNZaFWoOe6byN1Nsni5jv4Zk2p2K6ZoRpmW1YyW', 'cliente');
