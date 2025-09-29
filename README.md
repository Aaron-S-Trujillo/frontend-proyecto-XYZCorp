# Tienda Virtual - Paquete completo

Contenido del paquete (listo para usar, falta importar la base de datos en MySQL Workbench):

- /backend : servidor Node.js (Express) con rutas de auth, products, orders.
- /frontend : páginas HTML, CSS y JS (index, login, register, carrito).
- /database : db_schema.sql y seed.sql para crear y poblar la base de datos.
- Instrucciones rápidas:
  1. Importa `database/db_schema.sql` en MySQL Workbench.
  2. Importa `database/seed.sql` (opcional, contiene datos de prueba).
  3. En `backend`, crear archivo `.env` copiando `.env.example` y ajustar variables (DB connection).
  4. Ejecutar en backend: `npm install` y luego `npm start`.
  5. Abrir `frontend/index.html` en el navegador (o servirlo con Live Server).

Usuario de prueba incluido en seed:
- email: aaron@example.com
- password: Prueba123!

Generado: 2025-09-25T12:29:43.032303 UTC
