-- seed.sql - datos de ejemplo
USE tienda_virtual;

INSERT INTO categorias (nombre) VALUES ('Ropa'), ('Accesorios'), ('Calzado');

INSERT INTO productos (nombre, descripcion, precio, stock, imagen, categoria_id) VALUES
('Camiseta Algodón', 'Camiseta de algodón 100%', 25.00, 10, 'assets/camiseta.jpg', 1),
('Gorra Deportiva', 'Gorra unisex', 15.00, 20, 'assets/gorra.jpg', 2),
('Tenis Running', 'Tenis para correr', 80.00, 5, 'assets/tenis.jpg', 3);

-- Usuario de prueba (password: Prueba123!)
INSERT INTO usuarios (nombre, email, password_hash, rol) VALUES
('Aaron Trujillo', 'aaron@example.com', '$2b$12$a2ntWIE5/J211sanfpoKVOBMu9X0hdw3Sq14yqkx20An2KR7x4eLe', 'admin');
