# OndaRetro IUPB - Frontend (React.js + Vite)

Aplicación Web Frontend desarrollada en **React.js** con **Vite**, **Tailwind CSS** y **Lucide Icons**, diseñada para conectarse con la API REST de FastAPI (`http://127.0.0.1:7000`) del sistema de gestión **OndaRetro**.


##  Instrucciones de Instalación y Ejecución

### Requisitos previos:
- **Node.js**: v18+ y npm.
- **Backend FastAPI**: Corriendo en `http://127.0.0.1:7000`.

### Pasos:

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Iniciar servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   La aplicación estará accesible en `http://localhost:3000` (o `http://localhost:5173`).

---

## Integración con la API REST (FastAPI)

El archivo `src/services/api.js` centraliza las peticiones a la API:

- `GET /` -> Verificación del estado de la API (`checkHealth`).
- `GET /api/OndaRetro` -> Obtener todos los registros (`getAllOndas`).
- `GET /api/OndaRetro/{id}` -> Consultar un registro por ID (`getOndaById`).
- `POST /api/OndaRetro` -> Crear un nuevo registro (`createOnda`).
- `PUT /api/OndaRetro/{id}` -> Modificar un registro por ID (`updateOnda`).
- `DELETE /api/OndaRetro/{id}` -> Eliminar un registro por ID (`deleteOnda`).
