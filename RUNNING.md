# 🚀 Ejecución del Proyecto

Este proyecto contiene una **landing page** con **formulario de registro de leads** completamente funcional.

## Requisitos

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0

## 📦 Instalación

No se requieren dependencias externas. El proyecto utiliza módulos nativos de Node.js.

```bash
# El proyecto está listo para ejecutarse sin npm install
```

## ▶️ Cómo ejecutar

### Opción 1: Con npm (Recomendado)

```bash
npm start
```

### Opción 2: Con node directamente

```bash
node server.js
```

### Opción 3: En Codespaces

El proyecto está completamente configurado para ejecutarse en **GitHub Codespaces**:

1. Haz clic en el botón **"Code"** en GitHub
2. Selecciona **"Codespaces"** → **"Create codespace on main"**
3. Una vez abierto el Codespaces, ejecuta:
   ```bash
   npm start
   ```
4. El servidor se iniciará en `http://localhost:3000`
5. VS Code mostrará automáticamente un diálogo para abrir la URL en el navegador

## 🌐 Acceso a la aplicación

- **URL Local:** `http://localhost:3000`
- **En Codespaces:** Se abrirá automáticamente en una nueva pestaña

## 📁 Estructura del proyecto

```
/
├── index.html           # Landing page con estructura HTML5 semántica
├── application.html     # Página de aplicación/resultado (vacía)
├── styles.css          # Estilos CSS (vacío, listo para personalizar)
├── validation.js       # Lógica de validación del formulario (vacío)
├── server.js           # Servidor HTTP Node.js
├── package.json        # Configuración de npm
└── .devcontainer/      # Configuración para Codespaces
```

## ✨ Características

✅ **Landing page profesional** con estructura HTML5 semántica  
✅ **Formulario de leads** con campos completos:
  - Información personal (nombre, email)
  - Información profesional (empresa, cargo)
  - Ubicación (país)
  - Mensaje/consulta
  - Términos, privacidad y newsletter

✅ **Accesibilidad WCAG** con ARIA labels  
✅ **SEO optimizado** con meta tags  
✅ **Validación HTML5** integrada  
✅ **Compatible con Codespaces** - lista para usar  
✅ **Sin dependencias externas** - solo Node.js nativo  

## 🔧 Desarrollo

El servidor sirve automáticamente `index.html` para rutas no encontradas (SPA behavior).

### Archivos que puedes editar:

- **`index.html`** - Contenido HTML
- **`styles.css`** - Estilos CSS
- **`validation.js`** - Lógica de validación y manejo del formulario
- **`server.js`** - Lógica del servidor (si necesitas cambios)

## 📝 Notas

- El servidor escucha en `0.0.0.0:3000` (compatible con Codespaces)
- Los archivos MIME se sirven con los tipos de contenido correctos
- La carpeta `.devcontainer` mantiene la configuración de Codespaces
- El puerto 3000 está preconfigurado en `devcontainer.json`

## 🚦 Próximos pasos

1. Personalizar `styles.css` con tu diseño
2. Implementar validación en `validation.js`
3. Configurar un backend para procesar los leads
4. Agregar integraciones (email, CRM, etc.)

---

**¿Preguntas?** Revisa el archivo [index.html](./index.html) para ver la estructura completa.
