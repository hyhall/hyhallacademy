# Hyhall Academy

Landing page de **Hyhall Academy**, una plataforma de cursos online, construida con HTML, CSS y JavaScript puros (sin dependencias ni proceso de build).

## Estructura

```
.
├── index.html      # Landing page: navegación, presentación, cursos, beneficios y CTA
├── css/
│   └── styles.css  # Estilos y diseño responsivo
└── js/
    └── main.js     # Datos de cursos, filtros, menú móvil y animaciones
```

## Cómo verla

Abre `index.html` en el navegador, o sirve la carpeta con un servidor local:

```bash
python3 -m http.server 8000
# http://localhost:8000
```

## Funcionalidades

- Barra de navegación fija con menú hamburguesa en móvil y resaltado de la sección activa.
- Sección de presentación con contadores animados y tarjetas flotantes.
- Catálogo de cursos ficticios generado desde `js/main.js`, con filtros por categoría.
- Diseño responsivo (escritorio, tablet y móvil) y respeto a `prefers-reduced-motion`.
