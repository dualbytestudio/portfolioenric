/**
 * PORTFOLIO DE ENRIC · EDITA SOLO ESTE ARCHIVO
 * También puedes usar editar.html para cambiar los datos visualmente.
 * Las imágenes se guardan en assets/media/ y sus rutas van aquí.
 * No se necesita Node.js, instalación ni base de datos.
 */
window.PORTFOLIO = {
  "site": {
    "name": "Enric Sabaté Puertas",
    "initials": "ES",
    "eyebrow": "DEVELOPER / CREATIVE / DIGITAL MAKER",
    "headline1": "Construyo con código.",
    "headline2": "Creo con imaginación.",
    "intro": "Desarrollo web, videojuegos, aplicaciones y experiencias digitales. También trabajo con vídeo, diseño gráfico, modelado 3D y crecimiento de contenido online.",
    "about": "Soy un perfil multidisciplinar que combina programación, lógica y creatividad. Llevo años explorando el desarrollo de videojuegos, creando contenido para YouTube y trabajando en proyectos web y audiovisuales. Me gusta aprender nuevas herramientas y moverme entre el mundo técnico y el artístico.",
    "email": "enricsabate.es@gmail.com",
    "location": "Vic, Cataluña · España",
    "portrait": "assets/media/retrato-enric.png",
    "cv": "",
    "availability": "Abierto a colaboraciones y proyectos",
    "footerNote": "Diseño, código y curiosidad por crear.",
    "socials": [
      { "label": "GitHub", "url": "" },
      { "label": "LinkedIn", "url": "" },
      { "label": "YouTube", "url": "" },
      { "label": "ArtStation / Behance", "url": "" }
    ]
  },
  "highlights": [
    { "value": "2014", "label": "Explorando game dev desde" },
    { "value": "2016", "label": "Creando en YouTube desde" },
    { "value": "≈3K", "label": "Suscriptores en uno de mis canales" }
  ],
  "categories": [
    { "id": "web", "name": "Web", "number": "01", "symbol": "</>", "description": "Sitios web, interfaces, mantenimiento, WordPress y herramientas para la web.", "tools": ["HTML / CSS", "TypeScript", "PHP", "WordPress"] },
    { "id": "gamedev", "name": "Game Dev", "number": "02", "symbol": "△", "description": "Videojuegos indie, fangames, prototipado, gameplay y trabajo con Unity.", "tools": ["Unity", "C#", "Diseño de sistemas"] },
    { "id": "apps", "name": "Apps & software", "number": "03", "symbol": "⌘", "description": "Aplicaciones, lógica, interfaces y soluciones con tecnologías multiplataforma.", "tools": ["C# / .NET", "Java", "MySQL"] },
    { "id": "youtube", "name": "YouTube & vídeo", "number": "04", "symbol": "▶", "description": "Canales propios, guionización, edición, miniaturas, publicación y analítica.", "tools": ["After Effects", "Premiere", "DaVinci Resolve", "CapCut"] },
    { "id": "design", "name": "Diseño & arte", "number": "05", "symbol": "✳", "description": "Dirección visual, composiciones, miniaturas y edición de imágenes.", "tools": ["Adobe", "Arte digital", "Creatividad"] },
    { "id": "3d", "name": "Modelado 3D", "number": "06", "symbol": "⬡", "description": "Creación de objetos y escenas 3D, con espacio para renders y visores interactivos.", "tools": ["Modelado", "Materiales", "Render"] },
    { "id": "marketing", "name": "SEO & marketing", "number": "07", "symbol": "↗", "description": "Métricas, crecimiento de contenido, newsletters y gestión de redes.", "tools": ["Analytics", "Search Console", "Mailrelay", "Meta Business"] },
    { "id": "ai", "name": "IA & automatización", "number": "08", "symbol": "✦", "description": "Exploración de procesos y desarrollo asistido con herramientas de IA.", "tools": ["ChatGPT", "Codex", "Prototipado"] }
  ],
  "projects": [
    {
      "id": "paddock",
      "title": "Mantenimiento web y contenido digital",
      "subtitle": "Paddock Comunicación · 2022—2024",
      "category": "web",
      "type": "Experiencia profesional",
      "description": "Mantenimiento de sitios y dominios, copias de seguridad, cambios en CSS y PHP y administración de bases de datos MySQL con phpMyAdmin. También trabajé con analítica y contenidos digitales.",
      "tags": ["cPanel", "CSS / PHP", "MySQL", "Google Analytics"],
      "media": { "kind": "image", "src": "assets/covers/web.svg", "alt": "Diseño abstracto de interfaz web" },
      "link": "",
      "featured": true,
      "placeholder": false
    },
    {
      "id": "videojuegos",
      "title": "Videojuegos indie y fangames",
      "subtitle": "Desarrollo y colaboración · desde 2014",
      "category": "gamedev",
      "type": "Experiencia creativa",
      "description": "Creación y participación autodidacta en proyectos de videojuegos indie y fangames, combinando programación, iteración y diseño de experiencias interactivas.",
      "tags": ["Unity", "C#", "Game design"],
      "media": { "kind": "image", "src": "assets/covers/gamedev.svg", "alt": "Ilustración abstracta de videojuego" },
      "link": "",
      "featured": true,
      "placeholder": false
    },
    {
      "id": "youtube",
      "title": "Creación y gestión de canales de YouTube",
      "subtitle": "Proyectos propios · desde 2016",
      "category": "youtube",
      "type": "Experiencia y creación",
      "description": "Producción y edición de vídeos, diseño de miniaturas, títulos, publicación, investigación de tendencias y análisis de CTR, retención y visualizaciones. Uno de mis canales se acerca a los 3.000 suscriptores.",
      "tags": ["YouTube Analytics", "Edición", "Miniaturas", "CTR / retención"],
      "media": { "kind": "image", "src": "assets/covers/youtube.svg", "alt": "Diseño abstracto para producción audiovisual" },
      "link": "",
      "featured": true,
      "placeholder": false
    },
    {
      "id": "web-ia",
      "title": "Webs y prototipos asistidos por IA",
      "subtitle": "Desarrollo web · desde 2022",
      "category": "ai",
      "type": "Práctica técnica",
      "description": "Desarrollo de webs con herramientas de IA como apoyo al código, aplicando lógica de programación y criterio propio para iterar interfaces y funcionalidades.",
      "tags": ["IA aplicada", "Web", "Prototipado"],
      "media": { "kind": "image", "src": "assets/covers/ai.svg", "alt": "Ilustración de inteligencia artificial y código" },
      "link": "",
      "featured": false,
      "placeholder": false
    },
    {
      "id": "miniaturas",
      "title": "Edición gráfica y miniaturas",
      "subtitle": "Diseño para contenido digital",
      "category": "design",
      "type": "Práctica creativa",
      "description": "Diseño visual de miniaturas y piezas gráficas para vídeos y redes, además de edición de imágenes con herramientas creativas.",
      "tags": ["Diseño", "Miniaturas", "Adobe"],
      "media": { "kind": "image", "src": "assets/covers/design.svg", "alt": "Ilustración abstracta de diseño gráfico" },
      "link": "",
      "featured": false,
      "placeholder": false
    },
    {
      "id": "modelado-3d",
      "title": "Galería de modelado 3D",
      "subtitle": "Añade tus mejores renders o modelos",
      "category": "3d",
      "type": "Espacio para proyecto",
      "description": "Aquí podrás mostrar una pieza 3D, capturas del proceso, un vídeo de presentación o un visor interactivo de Sketchfab. Sustituye esta ficha por un trabajo real.",
      "tags": ["Modelado 3D", "Renders", "Visor 3D"],
      "media": { "kind": "image", "src": "assets/covers/3d.svg", "alt": "Ilustración conceptual de modelado tridimensional" },
      "link": "",
      "featured": false,
      "placeholder": true
    },
    {
      "id": "apps-futuras",
      "title": "Aplicaciones y herramientas",
      "subtitle": "Añade tu siguiente proyecto de software",
      "category": "apps",
      "type": "Espacio para proyecto",
      "description": "Reserva esta tarjeta para enseñar una aplicación de escritorio, una herramienta personal o un proyecto de DAW/DAM con capturas y demostración.",
      "tags": ["Aplicaciones", "C#", "Java"],
      "media": { "kind": "image", "src": "assets/covers/apps.svg", "alt": "Ilustración de una aplicación de software" },
      "link": "",
      "featured": false,
      "placeholder": true
    },
    {
      "id": "seo-marketing",
      "title": "Analítica, SEO y gestión de contenidos",
      "subtitle": "Experiencia en canales y comunicación digital",
      "category": "marketing",
      "type": "Experiencia profesional",
      "description": "Trabajo con Google Analytics, Search Console, métricas de YouTube, newsletters en Mailrelay y publicación de contenidos desde Meta Business Suite.",
      "tags": ["SEO", "Analytics", "Mailrelay"],
      "media": { "kind": "image", "src": "assets/covers/marketing.svg", "alt": "Ilustración de métricas y analítica web" },
      "link": "",
      "featured": false,
      "placeholder": false
    }
  ],
  "gallery": [
    { "id": "arte-1", "title": "Arte digital y composiciones", "category": "design", "caption": "Sustituye esta imagen por una pieza propia.", "media": { "kind": "image", "src": "assets/covers/design.svg", "alt": "Portada abstracta de galería artística" }, "placeholder": true },
    { "id": "3d-1", "title": "Renders y modelos 3D", "category": "3d", "caption": "Puedes usar una imagen, un vídeo o un enlace de Sketchfab.", "media": { "kind": "image", "src": "assets/covers/3d.svg", "alt": "Portada de sección 3D" }, "placeholder": true },
    { "id": "video-1", "title": "Showreel / vídeo destacado", "category": "youtube", "caption": "Pega una URL de YouTube o Vimeo para incrustarlo.", "media": { "kind": "youtube", "src": "", "alt": "Espacio para el showreel" }, "placeholder": true },
    { "id": "game-1", "title": "Capturas de videojuegos", "category": "gamedev", "caption": "Añade imágenes de tus juegos o un gameplay.", "media": { "kind": "image", "src": "assets/covers/gamedev.svg", "alt": "Portada de capturas de videojuegos" }, "placeholder": true }
  ],
  "experience": [
    { "years": "2022 — 2024", "title": "Paddock Comunicación", "text": "Mantenimiento de webs y dominios, CSS/PHP, bases de datos MySQL, multimedia, analítica, newsletters y redes sociales." },
    { "years": "2022 — actualidad", "title": "Desarrollo web y herramientas de IA", "text": "Creación y experimentación con sitios web, código y procesos de desarrollo asistido." },
    { "years": "2016 — actualidad", "title": "Canales propios de YouTube", "text": "Planificación, producción, edición, miniaturas, optimización y análisis de resultados." },
    { "years": "2014 — actualidad", "title": "Desarrollo de videojuegos", "text": "Proyectos indie y fangames creados o desarrollados de forma autodidacta y colaborativa." }
  ],
  "education": [
    { "name": "CFGS Desarrollo de Aplicaciones Web (DAW)", "detail": "Formación en desarrollo web." },
    { "name": "CFGS Desarrollo de Aplicaciones Multiplataforma (DAM)", "detail": "Pendiente únicamente del proyecto final, según CV." },
    { "name": "Certificado de estudios web", "detail": "Cambra de Comerç de Lleida." },
    { "name": "Formación complementaria", "detail": "Cursos de game dev y programación; edición de vídeo e imagen; formación en SEO." }
  ],
  "stack": [
    { "title": "Código", "items": ["HTML", "CSS", "TypeScript", "C# / Unity", "Java", "PHP", "MySQL", ".NET"] },
    { "title": "Creatividad", "items": ["Adobe Suite", "After Effects", "CapCut Pro", "DaVinci Resolve", "Audacity", "Arte digital", "Modelado 3D"] },
    { "title": "Web, growth y procesos", "items": ["WordPress", "cPanel", "phpMyAdmin", "GitHub", "Analytics", "Search Console", "Mailrelay", "Meta Business", "ChatGPT / Codex"] }
  ]
};
