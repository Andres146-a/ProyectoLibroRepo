# 🛒 Proyecto Tienda Aguiles

Este proyecto es una aplicación fullstack para la gestión de una tienda de libros. Incluye:

- **Frontend**: Aplicación web desarrollada en Angular (`frontend-app`)
- **Backend**: API REST construida con Node.js, Express y Prisma ORM (`backend`)
- **Base de datos**: MySQL

---

## 📁 Estructura del proyecto
```bash
ProyectoTiendaAguiles/
├── backend/ # API REST con Express, Prisma, MySQL
├── frontend-app/ # Aplicación Angular (interfaz de usuario)
├── public/ # Recursos públicos
├── .gitignore
└── README.md

---
```
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
### 3. Backend

cd backend
npm install
npx prisma generate
npx prisma migrate dev
npm run dev


El backend estará disponible en http://localhost:3000/.


### 4. Frontend
cd ../frontend-app
npm install
ng serve

La aplicación se abrirá en http://localhost:4200/.


### Scripts útiles
Ejecutar servidor backend: npm run dev

Ejecutar servidor frontend: ng serve

Generar Prisma Client: npx prisma generate

Crear migraciones: npx prisma migrate dev --name nombre_migracion


## CAPTURAS
### VISTA: AUTOR - (Opcion Todos)
<img width="1843" height="968" alt="image" src="https://github.com/user-attachments/assets/7e90aa2a-3050-474d-b6e8-85fca8a58e54" />

### VISTA AUTOR - (Opcion Registrar - Actualizar - ELiminar - Todos)

REGISTRAR:

<img width="1843" height="968" alt="image" src="https://github.com/user-attachments/assets/e0b42afd-2aed-41f8-bc4e-cc4f7cb1e695" />

ACTUALIZAR: 

<img width="1843" height="968" alt="image" src="https://github.com/user-attachments/assets/770c4fd8-c40d-482c-94b8-a60f25954c7c" />
<img width="1843" height="968" alt="image" src="https://github.com/user-attachments/assets/2d0e3619-90df-4596-8941-3bc544862869" />

ELIMINAR: 

<img width="1843" height="968" alt="image" src="https://github.com/user-attachments/assets/5c15ca1b-d6d5-4639-a7e5-88646520ea71" />

### VISTA: LIBRO - (Opcion Todos)

<img width="1843" height="968" alt="image" src="https://github.com/user-attachments/assets/d145e7ff-a5c2-4d16-bd17-7c459b9522e9" />
<img width="1843" height="968" alt="image" src="https://github.com/user-attachments/assets/354aaf5e-c977-46f8-8afa-8be540e7e00d" />

### VISTA AUTOR - (Opcion Registrar - Actualizar - Eliminar - Todos)

REGISTRAR:

<img width="1843" height="968" alt="image" src="https://github.com/user-attachments/assets/539835a2-5a50-4b1d-abb8-76bbb8588afe" />

ACTUALIZAR: 

<img width="1843" height="968" alt="image" src="https://github.com/user-attachments/assets/bb299246-9cbb-4722-ba95-25137024bbf4" />
<img width="1843" height="968" alt="image" src="https://github.com/user-attachments/assets/17a7c0b7-d57a-424f-9a28-93a5b440b643" />
<img width="1843" height="968" alt="image" src="https://github.com/user-attachments/assets/2704b6b4-75a1-4f3c-9d75-e02c89e0f164" />
<img width="1843" height="968" alt="image" src="https://github.com/user-attachments/assets/e924565a-1175-45a6-ab0e-fdaca7525b55" />

ELIMINAR: 

<img width="1843" height="968" alt="image" src="https://github.com/user-attachments/assets/cb0cc606-a03a-41d4-b942-debb01816a0e" />


### VISTA: CLIENTE - (Opcion Todos)

<img width="1843" height="968" alt="image" src="https://github.com/user-attachments/assets/d3e17d1b-7bf7-41fd-b271-03ad5239e9c3" />

<img width="1843" height="968" alt="image" src="https://github.com/user-attachments/assets/9d658d6f-c783-4ab4-8a62-a587ff7f6e09" />


### VISTA CLIENTE - (Opcion Registrar - Actualizar - Eliminar - Todos)

REGISTRAR:

<img width="1843" height="968" alt="image" src="https://github.com/user-attachments/assets/eb4deba9-67a7-46e4-afb9-70c2fdca0207" />

ACTUALIZAR: 
<img width="1843" height="968" alt="image" src="https://github.com/user-attachments/assets/db4c2243-cfb7-4453-8dff-f107cf7c6e92" />

<img width="1843" height="968" alt="image" src="https://github.com/user-attachments/assets/04178793-1a81-48e1-8e53-34bdbbe747d5" />

ELIMINAR: 

<img width="1843" height="968" alt="image" src="https://github.com/user-attachments/assets/a051a836-e4e5-4438-8ab6-1c13369c4255" />

### VISTA: EDITORIAL - (Opcion Todos)

### VISTA EDITORAL - (Opcion Registrar - Actualizar - Eliminar - Todos)

REGISTRAR:
<img width="1843" height="968" alt="image" src="https://github.com/user-attachments/assets/2ebe6ed3-23d4-4e18-9ab6-593273d3d5fb" />

ACTUALIZAR: 
<img width="1843" height="968" alt="image" src="https://github.com/user-attachments/assets/5b9c6a4c-368a-4f5b-bb95-1f940b367193" />
<img width="1843" height="968" alt="image" src="https://github.com/user-attachments/assets/1bcc006e-853b-4e99-9697-2932efb8cfbe" />

ELIMINAR: 
<img width="1843" height="968" alt="image" src="https://github.com/user-attachments/assets/66ac3574-8f67-433f-8309-14156b24dec5" />

### VISTA: FACTURA

<img width="1843" height="968" alt="image" src="https://github.com/user-attachments/assets/4f998299-b923-44b0-9aed-46a1f5b09663" />
<img width="1843" height="968" alt="image" src="https://github.com/user-attachments/assets/17d4988d-b423-4c61-9b68-b65599b4b780" />
<img width="1843" height="968" alt="image" src="https://github.com/user-attachments/assets/40819451-2688-4819-928d-ff96673e138c" />
<img width="1843" height="968" alt="image" src="https://github.com/user-attachments/assets/f92415b6-4c09-4673-892a-2cbd0a1b3479" />
<img width="1843" height="968" alt="image" src="https://github.com/user-attachments/assets/48c59aba-3d00-4843-a3db-85ed979a0b5c" />

### VISTA: REPORTES

<img width="1843" height="968" alt="image" src="https://github.com/user-attachments/assets/b7f6557f-34b0-4d5a-866a-5cad8df17724" />

### VISTA REPORTES - (REPORTES DE VENTAS MENSUALES - LIBROS DE BAJA ROTACION - LIBROS MAS VENDIDOS POR CATEGORIA - LIBROS BEST SELLERS)

### EPORTES DE VENTAS MENSUALES
<img width="1843" height="968" alt="image" src="https://github.com/user-attachments/assets/d467d26b-23c9-46a9-a307-4f8b65ac16ed" />
<img width="1843" height="968" alt="image" src="https://github.com/user-attachments/assets/0ea3625c-d6ee-420a-a0e3-eed91b8f1f99" />

### LIBROS DE BAJA ROTACION
<img width="1843" height="968" alt="image" src="https://github.com/user-attachments/assets/9c028661-fa08-4e33-bf54-5fe34cdcb3c5" />

### LIBROS MAS VENDIDOS POR CATEGORIA
<img width="1843" height="968" alt="image" src="https://github.com/user-attachments/assets/7b7399b0-39ee-4396-93b0-9585e304d295" />
<img width="1843" height="968" alt="image" src="https://github.com/user-attachments/assets/b6edbecf-7bee-476a-bc12-5c289c0f7ee1" />
<img width="1843" height="968" alt="image" src="https://github.com/user-attachments/assets/1c004971-9a3c-4a58-b348-28231a5a1655" />
<img width="1843" height="968" alt="image" src="https://github.com/user-attachments/assets/f79a4730-3353-4577-88dd-135b7ebd06f2" />

### LIBROS BEST SELLERS

<img width="1843" height="968" alt="image" src="https://github.com/user-attachments/assets/e1fa881d-dcc1-4871-a256-73c8e7e66f0c" />
<img width="1843" height="968" alt="image" src="https://github.com/user-attachments/assets/89dff50a-189b-4124-8c41-cf9157c5442e" />
<img width="1843" height="968" alt="image" src="https://github.com/user-attachments/assets/6d1ce6f2-4ce3-430d-afe9-1c496c2514ce" />

