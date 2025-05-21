# 📜 API para la Verificación de RNC y Cédula en la República Dominicana

Esta API permite verificar el **Registro Nacional del Contribuyente (RNC)** y validar **cédulas** en la República Dominicana. Utiliza [Puppeteer](https://pptr.dev/) para consultar la página web de la Dirección General de Impuestos Internos (DGII) y hace llamadas a una API externa para la validación de cédulas.

---

## 🚀 Endpoints de la API REST

### 🔍 `GET /api/checkRNC/:rnc`

Verifica un RNC específico y devuelve información detallada.

- **Ruta URL**: `/api/checkRNC/:rnc`
- **Método**: `GET`
- **Respuestas**:
  - `200 OK` ✅: Devuelve un objeto JSON con la información del RNC.
  - `404 Not Found` ❌: Devuelve un objeto JSON con un mensaje de error si el RNC no existe.

#### Ejemplo

**Solicitud**:

```
GET /api/checkRNC/123456789
```

**Respuesta (200 OK)**:

```json
{
  "rnc": "123456789",
  "socialName": "Empresa Ejemplo SRL",
  "comercialName": "EjemploComercial",
  "status": "Activo"
}
```

---

### 🔍 `GET /api/checkCedula/:cedula`

Valida una cédula específica utilizando una API externa.

- **Ruta URL**: `/api/checkCedula/:cedula`
- **Método**: `GET`
- **Respuestas**:
  - `200 OK` ✅: Devuelve un objeto JSON con el campo `valid` que indica si la cédula es válida.
  - `500 Internal Server Error` ❌: Devuelve un objeto JSON con un mensaje de error si ocurre un problema durante la validación.

#### Ejemplo

**Solicitud**:

```
GET /api/checkCedula/402270316514
```

**Respuesta (200 OK)**:

```json
{
  "valid": true
}
```

**Respuesta en Caso de Error**:

```json
{
  "valid": false,
  "message": "Cedula not found",
  "timestamp": "2024-08-27T11:30:03.286Z",
  "path": "/citizens/402270316514/validate",
  "error": "not_found"
}
```

---

## 📦 Instalación de Dependencias

1. Asegúrate de tener [Node.js](https://nodejs.org/) y [npm](https://www.npmjs.com/) instalados.
2. Instala las dependencias necesarias con el siguiente comando:

```bash
npm install
```

Esto instalará las siguientes librerías:

- `express` 🛠️: Para la gestión de rutas y el servidor web.
- `puppeteer` 🕵️‍♂️: Para realizar consultas web.
- `node-fetch` 🌐: Para hacer solicitudes HTTP a la API externa.
- `cors` 🔄: Para habilitar el intercambio de recursos entre diferentes dominios.

---

## ▶️ Ejecutar la API Localmente

Para ejecutar la API en modo local, utiliza el siguiente comando:

```bash
node server.js
```

Asegúrate de que `server.js` sea el archivo que contiene la configuración de tu API.

---

## 🐳 Despliegue con Docker

### 1. Compilar la imagen Docker

El contenedor utiliza la imagen base `node:21.5-alpine`, una versión ligera de Node.js. Para construir la imagen Docker con el tag `apirnc`, ejecuta en la terminal:

```bash
docker build -t apirnc .
```

### 2. Levantar el servicio usando Docker Compose

#### a) Ejecución simple

Utiliza el siguiente archivo `docker-compose.native.yaml` para levantar el contenedor sin configuraciones adicionales:

```yaml
version: "3.8"

services:
  api:
    image: apirnc
    container_name: apirnc
    ports:
      - "5147:5147"
```

Para levantar el contenedor, ejecuta:

```bash
docker-compose -f docker-compose.native.yaml up --build
```

La API estará disponible en el puerto `5147`.

#### b) Ejecución con Traefik Proxy y SSL

También puedes ejecutar la API detrás de Traefik, configurando un proxy inverso que gestione el enrutamiento y la seguridad SSL. Utiliza el siguiente archivo `docker-compose.traefik.yaml`:

```yaml
version: "3.8"

services:
  api:
    image: apirnc
    container_name: apirnc
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.apirnc.rule=Host(`rnc.ypw.com.do`)"
      - "traefik.http.routers.apirnc.entrypoints=websecure"
      - "traefik.http.routers.apirnc.tls=true"
      - "traefik.http.routers.apirnc.tls.certresolver=le"
      - "traefik.http.services.apirnc.loadbalancer.server.port=5147"
    networks:
      - traefik-net

networks:
  traefik-net:
    external: true
```

**Pasos para ejecutar con Traefik:**

1. Asegúrate de que la red `traefik-net` esté creada. Puedes crearla con el comando:

   ```bash
   docker network create traefik-net
   ```

2. Levanta el contenedor con:

   ```bash
   docker-compose -f docker-compose.traefik.yaml up --build
   ```

Con esta configuración, la API estará disponible en el dominio `rnc.ypw.com.do` con soporte para SSL.

---

## 🔗 Acceder a la API

Una vez la API esté en funcionamiento, accede a los endpoints utilizando herramientas como [cURL](https://curl.se/), [Postman](https://www.postman.com/) o directamente desde el navegador.

**Ejemplo usando cURL:**

Para el endpoint `/api/checkRNC/:rnc`:

```bash
curl http://localhost:5147/api/checkRNC/123456789
```

Para el endpoint `/api/checkCedula/:cedula`:

```bash
curl http://localhost:5147/api/checkCedula/402270316514
```

---

### Etiquetas

- **Node.js** 🟢
- **npm** 📦
- **Docker** 🐳
- **Traefik** 🔗
- **API** 🌐

---

Yolfry (Ypw) 2024
