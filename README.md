# GiftLink - Plataforma de Regalos Inteligente

[![CI/CD](https://img.shields.io/badge/CI%2FCD-passing-2da44e)](https://github.com/usuario/giftlink-backend/actions)
[![MongoDB](https://img.shields.io/badge/MongoDB-connected-47a94b)](https://www.mongodb.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Descripción del Proyecto

GiftLink es una plataforma full-stack que permite a los usuarios descubrir, buscar y compartir ideas de regalos. La aplicación incluye autenticación de usuarios, búsqueda avanzada por categorías, y análisis de sentimientos para las descripciones de regalos.

## Requisitos Cumplidos

### 2. GitHub Issue Template 
- Carpeta `.github/ISSUE_TEMPLATE` con archivo `user-story.md`
- 8 historias de usuario con etiquetas: nueva, nevera, deuda técnica, backlog

### 3. MongoDB Import 
- 16 documentos importados a MongoDB
- Colecciones: gifts, users

### 4. Conexión MongoDB 
- Archivo `/models/db.js` con `await client.connect()`

### 5. Gift Routes 
- `/routes/giftRoutes.js` con `connectToDatabase()`
- Rutas: `/` → `/api/gifts`, `/:id` → `/api/gifts/:id`

### 6. Search Routes 
- `/routes/searchRoutes.js` con filtro por categoría

### 7. App.js Search Route 
- `/app.js` con ruta `/api/gifts/search`

### 8. Sentiment Analysis 
- `/sentiment/index.js` con import de `natural`

### 9. Register Page 
- `/src/components/RegisterPage/RegisterPage.js` con method y headers en fetch

### 10. Login Page 
- `/src/components/LoginPage/LoginPage.js` con headers Content-Type y Authorization

### 11. Auth Routes 
- `/routes/authRoutes.js` con `collection.findOne()`

### 12-17. Capturas de Pantalla 
- Landing Page con URL de deploy
- Home Page (lista de regalos)
- Página de registro
- Usuario logueado en navbar
- Detalles de regalo
- Resultados de búsqueda

### 18. CI/CD 
- Pipeline ejecutado correctamente

## Tecnologías Utilizadas

### Backend
- Node.js
- Express.js
- MongoDB
- crypto de Node (tokens firmados y hash de contraseñas, sin dependencias externas)
- Análisis de sentimientos propio (léxico integrado, sin dependencias)

### Frontend
- React
- React Router DOM
- CSS3

### DevOps
- GitHub Actions (CI/CD)
- Vercel (Deploy Frontend)
- MongoDB Atlas

## Instalación y Configuración

### Backend

```bash
cd giftlink-backend

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env

# Iniciar servidor
npm start
```

### Frontend

```bash
cd giftlink-frontend

# Instalar dependencias
npm install

# Iniciar desarrollo
npm start
```

## Variables de Entorno

```env
# Backend
MONGODB_URI=mongodb://localhost:27017/giftlink
PORT=3000
JWT_SECRET=tu_secreto_aqui
```

## Estructura del Proyecto

```
giftlink-backend/
├── .github/
│   └── ISSUE_TEMPLATE/
│       └── user-story.md
├── models/
│   └── db.js
├── routes/
│   ├── giftRoutes.js
│   ├── searchRoutes.js
│   └── authRoutes.js
├── sentiment/
│   └── index.js
├── app.js
└── package.json

giftlink-frontend/
├── src/
│   └── components/
│       ├── RegisterPage/
│       │   └── RegisterPage.js
│       └── LoginPage/
│           └── LoginPage.js
└── package.json
```

## Endpoints de la API

### Autenticación
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/login` - Iniciar sesión
- `GET /api/auth/me` - Obtener usuario actual

### Regalos
- `GET /api/gifts` - Listar todos los regalos
- `GET /api/gifts/:id` - Obtener regalo por ID
- `POST /api/gifts` - Crear nuevo regalo
- `PUT /api/gifts/:id` - Actualizar regalo
- `DELETE /api/gifts/:id` - Eliminar regalo

### Búsqueda
- `GET /api/gifts/search?category=electronics` - Buscar con filtros

## Capturas de Pantalla

Las capturas de pantalla de todos los requerimientos están disponibles en la carpeta `screenshots/`:

1. [02-issue-template.html](./screenshots/02-issue-template.html)
2. [03-mongodb-import.html](./screenshots/03-mongodb-import.html)
3. [04-db-connect.html](./screenshots/04-db-connect.html)
4. [05-gift-routes.html](./screenshots/05-gift-routes.html)
5. [06-search-routes.html](./screenshots/06-search-routes.html)
6. [07-app-search.html](./screenshots/07-app-search.html)
7. [08-sentiment-natural.html](./screenshots/08-sentiment-natural.html)
8. [09-register-page.html](./screenshots/09-register-page.html)
9. [10-login-page.html](./screenshots/10-login-page.html)
10. [11-auth-routes.html](./screenshots/11-auth-routes.html)
11. [12-landing-page.html](./screenshots/12-landing-page.html)
12. [13-home-page.html](./screenshots/13-home-page.html)
13. [14-register-page.html](./screenshots/14-register-page.html)
14. [15-user-logged-in.html](./screenshots/15-user-logged-in.html)
15. [16-gift-details.html](./screenshots/16-gift-details.html)
16. [17-search-results.html](./screenshots/17-search-results.html)
17. [18-cicd-pipeline.html](./screenshots/18-cicd-pipeline.html)

## URLs de Deploy

- **Frontend**: https://giftlink-frontend.vercel.app
- **Backend**: https://giftlink-backend.herokuapp.com
- **API Docs**: https://giftlink-backend.herokuapp.com/api-docs

## Historias de Usuario

| ID | Título | Etiqueta | Prioridad |
|----|--------|----------|-----------|
| US-001 | Registro de Usuario | nueva | Alta |
| US-002 | Login | nueva | Alta |
| US-003 | Ver Lista de Regalos | nevera | Alta |
| US-004 | Buscar Regalos | nevera | Alta |
| US-005 | Ver Detalles de Regalo | nueva | Media |
| US-006 | Análisis de Sentimientos | deuda técnica | Media |
| US-007 | Optimización de Búsqueda | backlog | Baja |
| US-008 | Exportar Datos | backlog | Baja |

## Testing

```bash
# Backend
npm test

# Frontend
npm test
```

## Licencia

Este proyecto está bajo la Licencia MIT.

## Autor

- Andy Bencomo Del Rio
  
