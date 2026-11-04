# ENRIC / STUDIO — Portfolio profesional

Web estática (HTML, CSS, JavaScript) para GitHub Pages. Esta versión reúne el contenido confirmado hasta noviembre de 2026: AMAGNU, VisualFor, colaboraciones de Paddock, videojuegos, vídeo, motion graphics, miniaturas y tres canales de YouTube.

## Publicación

1. Haz una copia de tu `contenido.js` publicado si lo modificaste después de la versión anterior.
2. Descarga el ZIP. **No subas el ZIP ni una carpeta contenedora**: descomprímelo y arrastra su contenido a la raíz de [tu repositorio](https://github.com/dualbytestudio/portfolioenric) con **Add file → Upload files**.
3. Confirma el cambio con **Commit changes**. GitHub Pages debe seguir configurado con `main` y `/(root)`.
4. Abre <https://dualbytestudio.github.io/portfolioenric/>. Recarga con `Ctrl+F5` si se muestra una versión anterior.

Puedes usar el ZIP de **actualización** si ya tienes la versión completa anterior publicada: conserva los MP4 y recursos multimedia existentes.

## Cómo editarlo

- Abre `editar.html` localmente. Cambia proyectos, imágenes, títulos, canales y demás contenido. Descarga el nuevo `contenido.js` y sustitúyelo en el repositorio.
- Si sustituyes tu foto por una original de mejor calidad, guárdala en `assets/media/`, cambia la ruta `site.portrait` en el editor y, para la portada visible sin JavaScript, actualiza también el `src` del `<img id="hero-portrait">` en `index.html`.
- **La foto actual solo tiene 439 × 439 píxeles**, extraída del CV. Ahora se muestra a unos 132 × 132 píxeles en vez de ampliarse y perder definición. El diseño no puede crear detalles originales que no existen.
- El panel de **Trabajos destacados** está en el HTML para ser visible incluso sin JavaScript. Sincroniza sus fichas con `contenido.js` por `data-featured-id`: `web-amagnu`, `web-visualfor`, `baruc-edicion-destacada`, `game-colaboracion-mzng`.
- La sección de **IA aplicada al desarrollo** también tiene texto semántico en `index.html` para indexación. Sus cambios editoriales se hacen allí; la ficha IA del filtro se edita desde `editar.html`.

## Decisiones editoriales

- AMAGNU y VisualFor aparecen como proyectos propios. Coinga, Poballe, Maype Domestics y Ara Lleida aparecen como **participaciones en Paddock Comunicación**, sin atribuirte la autoría íntegra.
- Se conservaron las menciones a la trivia, el RPG y los shaders, marcados como experiencias sin demo.
- Se retiraron de la galería las fichas vacías o de ejemplo. La categoría **Diseño y arte** enseña cuatro miniaturas concretas, y la galería dedicada contiene ocho.
- **The Last Guardian** está vinculado al vídeo `_Vrluv5knhw`, asociación utilizada en la edición anterior tras asumir que era el primer enlace. Comprueba que corresponde al vídeo correcto cuando puedas.
- El alojamiento de imágenes de YouTube no depende de archivos locales: se intenta la miniatura HD y, si no existe, una alternativa. El enlace a YouTube necesita conexión a internet.
- La fotografía del CV es de baja resolución; esta versión **no altera artificialmente tus rasgos ni inventa una foto nueva**.

## SEO y comprobación

Se conservan los metadatos `title`, `description`, `canonical`, Open Graph, datos estructurados `Person`, un solo `<h1>`, `robots.txt` y `sitemap.xml`. La web incluye contenido esencial en HTML, aparte de las tarjetas generadas por JavaScript.

Se comprobó sintaxis JS, enlaces internos, archivos locales, filtros, portada en escritorio/móvil y ausencia de errores JavaScript en un renderizado controlado. La comprobación se hizo con imágenes remotas bloqueadas, por lo que **no confirma cómo se ven las miniaturas de YouTube cargadas desde internet**. Conviene hacer una pasada final en producción y ejecutar PageSpeed Insights / W3C Validator.


### Ajustes de noviembre de 2026

El menú principal ahora es `position: fixed` en escritorio y móvil. El marco oscuro de la fotografía y sus sombras se han eliminado. Para aplicar solo este cambio, sustituye `estilos.css` en la raíz del repositorio y espera al despliegue de GitHub Pages.


## Ajustes de interfaz (noviembre de 2026)

- El botón circular para ampliar proyectos se ha reducido a 34 px, con un signo «+» equilibrado. La imagen completa sigue siendo pulsable.
- Las cuadrículas con 1, 2 o 4 proyectos se centran horizontalmente para evitar huecos descompensados.
- Los títulos tienen una animación suave de entrada **solo en la primera visita del navegador**. Se registra en `localStorage`, y no se aplica si la persona ha activado «reducir movimiento». Sin JavaScript, todos los títulos permanecen visibles.
- Para **previsualizar las animaciones de nuevo**, abre tu web añadiendo `?preview-intro=1` a la URL, por ejemplo `https://dualbytestudio.github.io/portfolioenric/?preview-intro=1`. El modo de vista previa no altera la preferencia almacenada.
- Los metadatos y elementos SEO originales se conservan sin cambios.


## Corrección UX verificada — 04/11/2026

Si sigues viendo el botón «+» grande, asegúrate de subir **los tres archivos** `index.html`, `ajustes-ux-v2-20261104.css` y `app-ux-v2-20261104.js` a la **raíz** del repositorio (no dentro de una carpeta extra). Antes, comprueba que has publicado la actualización en `main`.

Tras desplegar, abre directamente `https://dualbytestudio.github.io/portfolioenric/ajustes-ux-v2-20261104.css`. Si ves una página 404, el archivo nuevo no está publicado en el lugar correcto. Si aparece el código CSS, está disponible.

Para probar las animaciones: `https://dualbytestudio.github.io/portfolioenric/?preview-intro=1`. Se usa una animación solo la primera visita normal de cada navegador; la URL de prueba fuerza su reproducción.


## Títulos y acreditaciones: acceso privado para reclutadores

- La sección **Formación acreditada** muestra cuatro referencias profesionales. Identifica dos **títulos oficiales** (ESO y Técnico en Gestión Administrativa), un **expediente académico** de CFGS Desarrollo de Aplicaciones Web (DAW) y un **diploma de aprovechamiento** de .NET (95 horas, Cambra de Comerç de Lleida).
- **IMPORTANTE:** el archivo DAW aportado es un expediente de evaluación, no el diploma o título oficial. No se debe presentar como prueba del título oficial sin ese documento adicional.
- **NINGÚN PDF ACADÉMICO ORIGINAL** va incluido en este ZIP. No subas escaneos de títulos, DNI, identificadores académicos ni archivos sensibles a GitHub Pages, incluidos los repositorios privados usados como origen de un sitio público.
- Los reclutadores pueden pulsar **Solicitar acreditaciones**, que abre un email con los campos necesarios. **No hay una verificación automática de identidad** ni acceso inmediato. Comprueba el correo de la empresa, su dominio y la relación profesional del remitente antes de compartir nada.
- Para entregar los PDF, guarda los originales fuera del repositorio en Google Drive, con **Acceso general: Restringido** y añade **solo el correo comprobado del reclutador** como **Lector**. No utilices «Cualquier persona con el enlace».
- Para revocar el acceso, elimina al lector de los permisos de Drive. Si se necesita máxima protección, considera facilitar copias con DNI y otros datos no necesarios ocultos (redacción real) y añadir una marca de agua con nombre de la empresa destinataria. Ningún método impide por completo capturas de pantalla.
- El editor visual permite actualizar las credenciales en **Trayectoria & títulos**, manteniendo esta separación entre información pública y documentos privados.


## NOVIEMBRE 2026 · Contacto flotante, futura academia y antispam

**Contacto:** botón flotante «Contactar» siempre visible. Abre un diálogo accesible con motivo, mensaje y opción para redactar correo o copiar la dirección. No hay backend ni almacenamiento de esos datos en la web: la opción **Redactar email** abre el programa de correo del visitante (`mailto:`). El botón «Hablemos» del menú y el de la portada también abren ese diálogo; sin JavaScript siguen llevando a la sección de contacto.

**Academia:** la página principal tiene el nuevo bloque **Academia** y un enlace a `academia.html`, una presentación de la futura plataforma de cursos pregrabados. NO se anuncian cursos disponibles ni se inventa un dominio. Cuando exista web oficial, abre `editar.html` > **Perfil & contacto** > **Futura academia online**, completa **URL pública de la futura academia** y descarga el nuevo `contenido.js`. Entonces el botón de la portada apuntará a ese dominio. `academia.html` lleva `noindex` mientras sea solo una presentación preliminar.

### Protección real frente a bots: qué es posible

- **Ya ahora:** la web es estática y no tiene endpoint de envío de formularios que pueda ser inundado con spam desde el botón de contacto. No almacena mensajes ni contraseñas de visitantes. Esto limita el spam de formularios, **no impide rastreo ni scraping por bots**. El email visible puede ser recolectado de todas formas.
- **Para proteger visitas a toda la web:** con `https://dualbytestudio.github.io/portfolioenric/` no puedes configurar una WAF Cloudflare para ese host porque no controlas `github.io`. Necesitas un **dominio propio** gestionado en Cloudflare y apuntado correctamente a GitHub Pages. Entonces puedes activar **Bot Fight Mode** y reglas WAF según las capacidades de tu plan. Mantén permitidos los buscadores legítimos para no perjudicar el SEO.
- **Para un formulario real con envío desde la página:** necesitas una función/backend que valide **Cloudflare Turnstile con Siteverify en servidor** antes de guardar o enviar cualquier mensaje. Un widget solo en HTML/JS sin esa comprobación NO es protección. No se ha activado ni simulado Turnstile porque aún no existen claves ni backend.
- **No publiques títulos, DNI ni PDF privados:** este ZIP sigue sin incluirlos.

Fuentes oficiales: https://developers.cloudflare.com/turnstile/get-started/ · https://developers.cloudflare.com/waf/get-started/ · https://developers.cloudflare.com/waf/feature-interoperability/
