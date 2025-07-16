# 🛒 Proyecto Tienda Aguiles

Este proyecto es una aplicación fullstack para la gestión de una tienda de libros. Incluye:

- **Frontend**: Aplicación web desarrollada en Angular (`frontend-app`)
- **Backend**: API REST construida con Node.js, Express y Prisma ORM (`backend`)
- **Base de datos**: MySQL

---

## 📁 Estructura del proyecto

ProyectoTiendaAguiles/
├── backend/ # API REST con Express, Prisma, MySQL
├── frontend-app/ # Aplicación Angular (interfaz de usuario)
├── public/ # Recursos públicos
├── .gitignore
└── README.md

---

## 🚀 Funcionalidades principales

### Frontend
- Registro, actualización y eliminación de libros, autores, editoriales y clientes.
- Registro y gestión de facturas.
- Reportes de ventas, bestsellers, libros de baja rotación.
- Interfaz moderna con validaciones y modales de selección.

### Backend
- API RESTful organizada por capas (Controller → Service → Repository)
- Prisma ORM para manipular la base de datos MySQL
- Rutas separadas para cada entidad
- Migrations con Prisma

---

## 🛠️ Tecnologías utilizadas

| Frontend        | Backend            | Base de datos |
|-----------------|--------------------|----------------|
| Angular 20.x    | Node.js + Express  | MySQL          |
| TypeScript      | Prisma ORM         |                |
| HTML / CSS      | REST API           |                |

---

## ▶️ Cómo ejecutar el proyecto localmente

### 🔧 Requisitos previos

- Node.js y npm
- MySQL
- Angular CLI (`npm install -g @angular/cli`)
- Prisma CLI (`npx prisma`)

---


### 1. Clonar el repositorio

```bash
git clone https://github.com/Andres146-a/ProyectoLibroRepo.git
cd ProyectoLibroRepo
```
---

### 2. Configurar la base de datos
Crea una base de datos MySQL (por ejemplo, tienda_libros) y configura la conexión en:

backend/.env

Ejemplo de .env:
```bash
DATABASE_URL="mysql://usuario:contraseña@localhost:3306/tienda_libros"
```
---
## 3. Backend

cd backend
npm install
npx prisma generate
npx prisma migrate dev
npm run dev


El backend estará disponible en http://localhost:3000/.


##4. Frontend
cd ../frontend-app
npm install
ng serve

La aplicación se abrirá en http://localhost:4200/.


Scripts útiles
Ejecutar servidor backend: npm run dev

Ejecutar servidor frontend: ng serve

Generar Prisma Client: npx prisma generate

Crear migraciones: npx prisma migrate dev --name nombre_migracion



