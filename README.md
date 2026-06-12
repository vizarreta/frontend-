# Práctica: Framework Frontend

| Autores | Rol | Rama | Commits | Tareas | Porcentaje |
| :--- | :--- | :---: | :---: | :--- | :---: |
| Richart Escobedo | Backend | rescobedoq | 40 | Instalación y configuración del framework | 100% |
| Richart Escobedo | Frontend | rescobedoq | 20 | Programación de componente constancia | 100% |
| Richart Escobedo | Frontend | rescobedoq | 15 | Despliegue en plataforma CDN | 100% |
| Richart Escobedo | FullStack | rescobedoq | 15 | Elaboración del informe | 100% |
| **Total**|  |  | 90 |  | **100%** |

## Entregables

| Entregable | URL |
| :--- | :--- |
| **Repositorio** | https://github.com/vizarreta/frontend-.git |
| **Video** | *(Colocar URL del video aquí)* |
| **Informe** | [Ver informe PDF](https://github.com/rescobedoulasalle/sisacad-enrollments-frontend/blob/main/informes/IW_prac_frontend.pdf) |

---

## URLs de Despliegue

- **URL Backend (Vercel):** https://sisacad-enrollments-backend.vercel.app/restful/enrollment-certificate/?cui=20250100
- **URL Frontend (Netlify):** https://sisacad-enrollments-frontend.netlify.app/constancia/20250100

---

## Descripción de la práctica

- Consume JSON anidados estratégicos para satisfacer necesidades de sus usuarios finales.
- Deshabilitar autenticación JWT solamente para la vista involucrada (protegiendo la modificación con ReadOnly) permitiendo las operaciones GET.
- Registrar URLs para consumir la API REST framework.
- Capturar pantallas de la API y del frontend.
- Elaborar README.md.
- Agregar URLs backend y frontend desplegados en la nube en plataformas CDN o hosting.

---

## Consideraciones y Recomendaciones (Vue.js + Netlify)

A continuación, se detallan las recomendaciones implementadas en este proyecto para un despliegue exitoso en producción:

### 1. Configurar siempre las reglas de redirección (El archivo `netlify.toml`)
Esta es la regla de oro para cualquier *Single Page Application* (SPA) que use **Vue Router**. Si no lo configuras, cuando un usuario recargue manualmente una ruta como `/constancia/123`, Netlify devolverá un **Error 404 Not Found**.
**Implementación:** Se incluyó un archivo `netlify.toml` en la raíz del proyecto para forzar a Netlify a delegar el enrutamiento a Vue.

### 2. Verificar los Comandos de Build
A veces Netlify tiene problemas detectando el empaquetador correcto.
**Implementación:** Se especificó explícitamente en el archivo de configuración `netlify.toml` los parámetros de compilación de Vue 3 + Vite:
*   `command = "npm run build"`
*   `publish = "dist"`

### 3. Variables de Entorno Seguras (Vite)
**Recomendación:** No subir archivos `.env` con contraseñas a GitHub, deben declararse en la plataforma de Netlify. Además, al usar Vite, todas las variables públicas **deben** empezar con el prefijo `VITE_` (ej. `VITE_API_BASE_URL`), de lo contrario Vue las ignorará por seguridad durante el empaquetado.

### 4. Control de Caché (CORS y APIs)
Dado que Netlify sirve los archivos del Frontend a través de un CDN ultrarrápido global, el principal punto de fallo es la comunicación con el Backend.
**Implementación/Recomendación:** Siempre asegurarse de que el Backend (Django) tenga la URL exacta generada por Netlify (ej. `https://sisacad-enrollments-frontend.netlify.app`) registrada en su política de **CORS** (`CORS_ALLOWED_ORIGINS`). Un solo carácter diferente hará que el navegador bloquee la información.

---

## Comunicación BackEnd-FrontEnd

### Caso JSON para mostrar Constancia de matrícula

- **Método**: `GET`
- **URL Backend**: https://sisacad-enrollments-backend.vercel.app/restful/enrollment-certificate/?cui=20250100
- **URL FrontEnd**: https://sisacad-enrollments-frontend.netlify.app/constancia/20250100

### Captura del Frontend

![frontend-constancia-matricula](frontend-constancia-matricula.png)

### BODY respuesta (JSON):

```json
{
    "count": 2,
    "next": null,
    "previous": null,
    "results": [
        {
            "id": 4,
            "student": {
                "cui": 20250100,
                "full_name": "PÉREZ LÓPEZ, JUAN",
                "email": "jperez@gmail.com"
            },
            "workload": {
                "id": 3,
                "course": {
                    "id": "c0d28e46-5d67-433d-8b65-14dc773d7865",
                    "code": "2502116",
                    "name": "ESTRUCTURA DE DATOS Y ALGORITMOS",
                    "acronym": "EDA",
                    "credits": "4.00",
                    "year_display": "2do año",
                    "semester_display": "III semestre"
                },
                "group": "A",
                "laboratory": "lab01",
                "teacher": {
                    "full_name": "CORRALES DELGADO, CARLO",
                    "email": null
                }
            },
            "created": "2026-06-11T05:51:47.725798-05:00"
        }
    ]
}
```
