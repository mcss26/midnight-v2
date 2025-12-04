# Auditoría rápida del repositorio

## Hallazgos críticos
- **Clave pública expuesta**: `config.js` incluye la URL y la clave anónima de Supabase en texto plano. Aunque las claves anónimas están pensadas para el cliente, exponerlas en un repositorio público abre la puerta a abuso (lectura/escritura según reglas de RLS) y facilita ataques automatizados. Deben moverse a variables de entorno y aplicarse reglas de seguridad estrictas en Supabase. 【F:config.js†L7-L19】
- **Sesión de desarrollo persistente**: `index.html` crea automáticamente un usuario "dev_admin" y lo guarda en `localStorage` si no hay sesión previa, lo que permite acceso sin autenticación real a las vistas del panel. Este mecanismo de respaldo debería eliminarse o condicionarse a entornos de desarrollo con controles adicionales. 【F:index.html†L14-L22】

## Riesgos operativos
- **Sin control de acceso del lado del servidor**: Al ser un conjunto de páginas estáticas, todo el control de sesión parece depender del `localStorage` y del cliente Supabase. Cualquier usuario que cargue las páginas podría manipular el estado o llamar a la API directamente. Se necesita una capa de backend o reglas RLS estrictas que eviten lecturas/escrituras no autorizadas.
- **Ausencia de separación de configuraciones**: No hay diferenciación entre entornos (desarrollo, staging, producción). Archivos como `config.js` deberían generarse en tiempo de despliegue con los valores adecuados y nunca versionarse con credenciales activas.
- **Telemetría y errores visibles**: Los `console.log` de conexión y los mensajes de error en `config.js` revelan detalles de infraestructura a cualquiera que abra la consola del navegador. Deben registrarse de forma controlada y con niveles adecuados según el entorno.

## Observaciones funcionales (login inactivo)
- **Inicio de sesión deshabilitado**: La página principal se apoya en un usuario de desarrollo persistido en `localStorage`, por lo que el login sigue inactivo y no valida credenciales reales. Hace falta un módulo de autenticación (por ejemplo, `auth.js`) que gestione sesiones, roles y expiración antes de habilitar el flujo de acceso. 【F:index.html†L14-L33】
- **Llamadas directas desde las vistas**: Páginas como `admin-pos.html` hacen consultas y escrituras contra Supabase directamente desde el DOM (carga, guardado y borrado) sin un servicio compartido ni manejo uniforme de errores. Centralizar las operaciones en un archivo `services/pos.js` permitiría reutilizar validaciones y mostrar estados coherentes. 【F:admin-pos.html†L10-L135】
- **Plantilla y estilos duplicados**: Cada vista repite cabeceras, logos y botones de navegación; estandarizar un layout común (por ejemplo, `layout.html` o componentes Web) evitará divergencias al reactivar login y navegación protegida. 【F:index.html†L25-L95】【F:admin-pos.html†L14-L60】

## Recomendaciones inmediatas
1. Rotar la clave anónima y regenerar credenciales en Supabase; moverlas a variables de entorno gestionadas por el pipeline de despliegue.
2. Eliminar el usuario por defecto y establecer un flujo de autenticación real (p. ej., email/OTP o SSO) antes de permitir acceso al panel.
3. Extraer la lógica de acceso a datos a servicios compartidos (`services/*.js`) y añadir manejo de errores, loaders y validaciones reutilizables.
4. Definir una plantilla base (layout) y componentes comunes para cabecera, navegación y modal; así el login podrá reactivarse sin tocar todas las vistas.
5. Añadir pruebas de smoke de seguridad (linting, verificación de secretos) al pipeline para evitar nuevas exposiciones y revisar reglas RLS en cada despliegue.
