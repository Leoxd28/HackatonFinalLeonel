# Proyecto Final - Backend Ecommerce

Este proyecto implementa el **backend de un ecommerce** usando **NodeJS, Express, MySQL, JWT y Programación Orientada a Objetos (POO)**.

Cumple con los lineamientos de:
- CRUD de productos, categorías y órdenes.
- Gestión de datos en base de datos MySQL.
- Autenticación y autorización con **JWT**.
- Uso de **POO** mediante clases de modelo y servicio.
- Pruebas básicas automatizadas con **Jest** y **Supertest**.

## Tecnologías principales

- NodeJS + NPM
- Express
- MySQL (mysql2)
- JWT (jsonwebtoken)
- bcryptjs (hash de contraseñas)
- express-validator (validaciones)
- Jest + Supertest (pruebas)

## Instalación

1. Clona el repositorio o descomprime la carpeta.

2. Instala dependencias:

```bash
npm install
```

3. Crea la base de datos y tablas en MySQL:

```bash
mysql -u root -p < src/models/schema.sql
```

4. Copia el archivo `.env.example` a `.env` y completa tus datos:

```bash
cp .env.example .env
```

Configura:

- `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`
- `JWT_SECRET` (una cadena segura)
- `JWT_EXPIRES_IN` (por ejemplo `1d`)

## Ejecutar el servidor

```bash
npm run dev
```

El backend estará en: `http://localhost:4000`

## Endpoints principales

### Auth

- `POST /api/auth/register`
  - body: `{ "name", "email", "password" }`
- `POST /api/auth/login`
  - body: `{ "email", "password" }`
- `GET /api/auth/profile`
  - Header: `Authorization: Bearer <token>`

### Categorías

- `GET /api/categories`
- `POST /api/categories` (requiere token de admin)
- `PUT /api/categories/:id` (admin)
- `DELETE /api/categories/:id` (admin)

### Productos

- `GET /api/products`
- `GET /api/products/:id`
- `POST /api/products` (admin)
- `PUT /api/products/:id` (admin)
- `DELETE /api/products/:id` (admin)

### Órdenes

- `POST /api/orders`
  - body: `{ "items": [ { "product_id": 1, "quantity": 2 }, ... ] }`
  - requiere token (cliente)
- `GET /api/orders`
  - lista órdenes del usuario logueado
- `GET /api/orders/:id`
  - detalle de una orden del usuario

## Pruebas

Se incluye un ejemplo de prueba con Jest y Supertest.

Para ejecutarlas:

```bash
npm test
```

## POO y conceptos avanzados

- Clase `BaseModel` con métodos comunes: `findAll`, `findById`, `deleteById`.
- Modelos que heredan de la clase base: `User`, `Category`, `Product`, `Order`.
- Servicio `AuthService` que encapsula lógica de negocio para autenticación.
- Middleware de autenticación y autorización con JWT (`authMiddleware`).
- Uso de `view` y `function` en MySQL para consultas avanzadas.

Este proyecto está listo para subirse a **GitHub** y ser presentado como **Proyecto Final de Backend Ecommerce**.
