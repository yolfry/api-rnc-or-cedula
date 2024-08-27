# API para la Verificación de RNC (Registro Nacional del Contribuyente) y Cédula en la República Dominicana

Esta API proporciona un servicio para verificar información relacionada con un RNC (Registro Nacional del Contribuyente) específico y validar cédulas en la República Dominicana. Utiliza Puppeteer para realizar consultas a la página web de la Dirección General de Impuestos Internos (DGII) y hace llamadas a una API externa para la validación de cédulas.

## Endpoints de la API REST

### GET /api/checkRNC/:rnc

Este endpoint permite verificar un RNC específico y devuelve información detallada sobre el mismo.

•⁠ ⁠*Ruta URL:* ⁠ /api/checkRNC/:rnc ⁠
•⁠ ⁠*Método:* GET
•⁠ ⁠*Respuestas:*

- ⁠ 200 OK ⁠: Si se pudo verificar el RNC correctamente, devuelve un objeto JSON con la información obtenida.
- ⁠ 404 Not Found ⁠: Si el RNC no existe, devuelve un objeto JSON con un mensaje de error.

### GET /api/checkCedula/:cedula

Este endpoint permite validar una cédula específica utilizando una API externa.

•⁠ ⁠*Ruta URL:* ⁠ /api/checkCedula/:cedula ⁠
•⁠ ⁠*Método:* GET
•⁠ ⁠*Respuestas:*

- ⁠ 200 OK ⁠: Si la cédula es válida, devuelve un objeto JSON con el campo ⁠ valid ⁠ que indica si la cédula es válida o no.
- ⁠ 500 Internal Server Error ⁠: Si ocurre un error durante la validación de la cédula, se devuelve un objeto JSON con un mensaje de error.

### Ejemplo

#### Solicitud checkRNC

GET /api/checkRNC/123456789

#### Respuesta (200 OK)

⁠ json
{
"rnc": "123456789",
"socialName": "Empresa Ejemplo SRL",
"comercialName": "EjemploComercial",
"status": "Activo"
}

#### Solicitud checkCedula

GET /api/checkCedula/402270316514

#### Respuesta (200 OK)

⁠ json
{
"valid": true
}

En este ejemplo, se realiza una solicitud GET al endpoint ⁠ /api/checkCedula/402270316514 ⁠, y la API devuelve la respuesta indicando que la cédula es válida (campo ⁠ valid ⁠ en ⁠ true ⁠).

También te muestro cómo sería la respuesta en caso de que la cédula no sea encontrada o se produzca un error:

#### Respuesta en Caso de Error

⁠ json
{
"valid": false,
"message": "Cedula not found",
"timestamp": "2024-08-27T11:30:03.286Z",
"path": "/citizens/402270316514/validate",
"error": "not_found"
}

En este caso, la respuesta indica que la cédula no fue encontrada, mostrando un mensaje de error (⁠ message ⁠) y otros detalles relacionados al error.
