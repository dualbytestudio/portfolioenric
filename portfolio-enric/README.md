# ENRIC / STUDIO — Portfolio web editable

Portfolio personal responsive con estética developer + arte. Funciona con **HTML, CSS y JavaScript** sin frameworks, sin npm, sin instalación y sin base de datos. Se puede subir gratis a **GitHub Pages**.

## 1. Abrir y editar

1. Descomprime este ZIP en una carpeta.
2. Haz doble clic en **`index.html`** para ver tu portfolio (también funciona con Live Server de VS Code).
3. Abre **`editar.html`** para modificarlo desde formularios, sin editar código.
4. Cambia textos, añade proyectos o vídeos y pulsa **«Descargar contenido.js»**.
5. Sustituye el archivo `contenido.js` original por el que acabas de descargar.
6. Actualiza `index.html` en el navegador para comprobar el resultado.

> **IMPORTANTE:** El editor es *local*, no guarda directamente en tu disco ni modifica GitHub. Descarga un archivo nuevo; debes sustituirlo y publicar los cambios. Los visitantes del portfolio no pueden modificar tu contenido publicado usando `editar.html`.

### ¿Qué archivo se modifica para cada cosa?

| Archivo/carpeta | Para qué sirve |
| --- | --- |
| `editar.html` | Editor visual para casi todo el contenido, sin programación. |
| **`contenido.js`** | **Aquí están todos los textos, proyectos, enlaces, imágenes, categorías y vídeos.** También puedes editarlo a mano. |
| `assets/media/` | Imágenes, vídeos, modelos `.glb` y archivos del CV. |
| `assets/covers/` | Ilustraciones temporales personalizadas, puedes sustituirlas. |
| `estilos.css` | Diseño, colores, tipografía y animaciones. |
| `index.html` | Estructura de la página. Normalmente no necesitas modificarla. |
| `app.js` | Lógica de filtros, modales y multimedia. No suele necesitar modificaciones. |
| `editor.js` y `editor.css` | Funcionamiento y estilos del editor. |

## 2. Añadir proyectos e imágenes

**Desde el editor:** Proyectos → «Añadir elemento». Rellena título, categoría, descripción, tecnologías y ruta de imagen. Reordena con ↑ y ↓.

- Copia una imagen real a `assets/media/`, por ejemplo `juego-unity.webp`.
- En el campo «Ruta del archivo o enlace» escribe `assets/media/juego-unity.webp`.
- Usa JPG, WEBP, PNG, SVG o AVIF. Optimiza las imágenes para que la web cargue rápido.
- Si vas a mostrar un trabajo publicado, puedes añadir su URL en «Enlace externo».
- Desmarca **«Por completar»** cuando hayas sustituido la ficha por un trabajo verdadero.

## 3. Insertar vídeos

Dentro de una ficha de proyecto o de galería, cambia el tipo de contenido:

- **YouTube:** `https://www.youtube.com/watch?v=XXXXXXXXXXX` o `https://youtu.be/XXXXXXXXXXX`.
- **Vimeo:** `https://vimeo.com/123456789`.
- **Vídeo MP4:** copia el vídeo a `assets/media/demo.mp4` y pon esa ruta. Mejor vídeos cortos y ligeros; para material pesado se recomienda YouTube/Vimeo.
- **Sketchfab:** pega la URL pública de tu modelo, por ejemplo `https://sketchfab.com/3d-models/mi-modelo-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX` (ID real de 32 caracteres).
- **Modelo GLB:** copia `assets/media/modelo.glb` y selecciona «Modelo 3D GLB». Se carga el componente público `<model-viewer>` solo al abrir el modelo (necesita internet).

Los vídeos se abren en una ventana emergente; en el caso de YouTube se usa el dominio `youtube-nocookie.com` para reducir el seguimiento.

> Para un vídeo, puedes añadir una imagen de **portada/miniatura** con `assets/media/portada.webp`. Si no la añades se usa la ilustración de su categoría.

## 4. Añadir foto o CV

- Foto: sube `assets/media/mi-foto.webp` y actualiza «Ruta de la fotografía» en el editor.
- CV: copia un PDF a `assets/media/cv-enric.pdf`, ve a «Perfil & contacto» y pon esa ruta en «Ruta al PDF del CV». Aparecerá automáticamente un botón para abrirlo.
- El teléfono no aparece en la web por defecto. El email sí, como método de contacto profesional.

## 5. Publicar GRATIS en GitHub Pages

Opción A, web con URL sencilla:

1. En GitHub, crea un repositorio **público** cuyo nombre sea **`TUUSUARIO.github.io`**, reemplazando `TUUSUARIO` por tu usuario de GitHub.
2. Sube **todos los archivos y carpetas dentro de `portfolio-enric`**, no la carpeta contenedora. `index.html` debe estar en la raíz del repositorio.
3. Ve a **Settings → Pages**. En **Build and deployment → Source**, elige **Deploy from a branch**.
4. Selecciona **`main`** y **`/(root)`**, pulsa **Save**.
5. Tu página será `https://TUUSUARIO.github.io/`.

Opción B, repositorio normal:

1. Crea un repositorio público llamado, por ejemplo, **`portfolio`**.
2. Sube los archivos dejando `index.html` en la raíz.
3. Activa GitHub Pages desde `main` y `/(root)`.
4. Tu URL será `https://TUUSUARIO.github.io/portfolio/`.

Las rutas de archivos son relativas, por lo que **ambas opciones funcionan**. Puede tardar unos minutos en aparecer publicado.

Guía oficial: https://docs.github.com/es/pages/getting-started-with-github-pages/creating-a-github-pages-site

### ¿Puedo tener dominio propio gratis?

**El alojamiento y la URL `github.io` son gratis**, sin contratar dominio. Para un dominio como `enricsabate.com`, normalmente tendrás que **comprar el dominio**, pero puedes seguir alojando la web gratuitamente en GitHub Pages.

GitHub Pages no ejecuta PHP, MySQL ni otros programas en servidor; esta web no los necesita. Para formularios que envían datos por backend habría que usar un servicio de terceros; de momento el contacto se abre mediante correo electrónico (`mailto:`).

## 6. Comprobar antes de publicar

- Sustituye las portadas de muestra por **trabajos tuyos**; las fichas «Por completar» están claramente identificadas.
- Revisa todas las fechas, datos, formación y tecnologías que aparecen en `contenido.js`.
- Añade enlaces reales de GitHub, LinkedIn, canales de YouTube o Behance/ArtStation si los tienes.
- Decide si quieres mostrar tu foto actual del CV y tu dirección de correo en una web pública.
- No subas contraseñas, tokens, claves de API ni información privada a este repositorio público.
- Comprueba tu web en móvil.
- Si necesitas incluir materiales con derechos de terceros, asegúrate de tener permiso para mostrarlos.

## 7. Personalización del diseño

En `estilos.css`, la primera línea `:root` contiene la paleta:

- `--bg`: fondo.
- `--lime`: verde lima de acento.
- `--cyan`, `--violet`, `--pink`: tonos creativos.

Puedes ajustar colores, tipografías y animaciones sin tocar el contenido. El diseño contempla `prefers-reduced-motion` para personas que prefieran menos animaciones.

---

**Contenido inicial:** redactado a partir del CV que compartiste y de que también realizas modelado 3D. He dejado los proyectos no identificados como «Por completar», para que no se confundan con trabajos reales documentados. La ilustración de portada es decorativa, no una muestra de tu portfolio.
