# Devathon front 🐾✨

## 🤝 Requerimientos
Antes de empezar, asegurémonos de tener instalado lo siguiente:

- [Node.js](https://nodejs.org/) debe ser instalado. Ejecuta el siguiente comando para verificar su versión Node.js/npm:
  ```bash
  node --version
  npm --version
  ```
- [devathon-back](https://github.com/DavidLG89/devathon-back) debe estar previamente descargado y configurado.

## 🚀 Instalación
Para la instalación se necesita tener instalado Node.js/npm, entonces:
1. Descargar o clonar el repositorio.
    ```bash
    git clone https://github.com/kacubillos/devathon-front.git
    ```

2. Descargar dependencias.
    ```bash
    cd devathon-front
    npm install
    ```

3. Configurar la variable de entorno para las peticiones al backend.

    - `VITE_BACKEND_URL`

    Cree el archivo `.env.local` en la carpeta raíz y escriba la url del backend:
    ```bash
    VITE_BACKEND_URL="http://localhost:8080/"
    ```

4. Iniciar el proyecto en modo desarrollo.
    ```bash
    npm run dev
    ```