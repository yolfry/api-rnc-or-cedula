
---

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

## ▶️ Ejecutar la API

Para ejecutar la API, usa el siguiente comando:

```bash
node server.js
```

Asegúrate de que `server.js` es el archivo que contiene la configuración de tu API.

---

## 🔗 Acceder a la API

Con la API en funcionamiento, puedes acceder a los endpoints usando herramientas como [cURL](https://curl.se/), [Postman](https://www.postman.com/), o navegadores web.

**Ejemplo usando cURL**:

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
- **pnpm** 🔗 (si se usa en lugar de npm)
- **API** 🌐

---

Yolfry (Ypw) 2024