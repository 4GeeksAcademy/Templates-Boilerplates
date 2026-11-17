# Formulario de Solicitud de Servicios TrackFlow

## Descripción General
Formulario completo y accesible para solicitar servicios de logística y fulfillment a TrackFlow. Cumple con WCAG 2.1 Level AA e incluye validación en tiempo real con mensajes de error descriptivos.

---

## Estructura del Formulario

### 1. **Información de la Empresa** (Fieldset 1)
Campos básicos de identificación de la empresa y contacto principal.

| Campo | Tipo | Validación | Obligatorio |
|-------|------|-----------|------------|
| Nombre de la empresa | text | Mínimo 2 caracteres | ✅ Sí |
| Persona de contacto | text | 2+ palabras (nombre + apellido) | ✅ Sí |
| Email corporativo | email | Formato válido (usuario@dominio.com) | ✅ Sí |
| Teléfono | tel | Formato: +[código país] [número] | ✅ Sí |
| Sitio web | url | Formato URL válido | ❌ No |

**Validaciones:**
- Email: Regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- Teléfono: Regex `/^\+\d{1,3}\s?\d{6,14}$/` (Ej: +34 600000000)
- Nombre empresa: Mínimo 2 caracteres
- Contacto: Se valida que contenga al menos 2 palabras separadas

---

### 2. **Operación y Tipo de Producto** (Fieldset 2)
Información sobre el tipo de negocio y volumen de operaciones.

| Campo | Tipo | Opciones | Obligatorio |
|-------|------|----------|------------|
| País de operación principal | select | Estados Unidos / España / Ambos / Otro | ✅ Sí |
| Tipo de producto | select | Moda / Electrónica / Cosmética / Alimentación / Otro | ✅ Sí |
| Volumen mensual estimado | select | 0-100 / 101-500 / 501-2000 / 2000+ / No estoy seguro | ✅ Sí |

**Validaciones:**
- Todos requieren selección (valor no vacío)
- Los selectores mantienen el estado y previenen envío sin selección

---

### 3. **Servicios e Información Adicional** (Fieldset 3)
Selección de servicios y contexto operacional.

#### 3a. Servicios de Interés (Checkboxes - Múltiple)
- ☐ Almacenaje
- ☐ Última milla
- ☐ Logística inversa

**Validación:** Mínimo 1 servicio debe estar marcado

#### 3b. Relación con otros 3PL (Radio Buttons - Único)
- ◯ Sí, trabajo con otro 3PL
- ◯ No, no trabajo con otro 3PL
- ◯ Estoy evaluando opciones

**Validación:** Debe seleccionarse una opción

#### 3c. Comentarios (Textarea)
- Máximo: 500 caracteres
- Opcional
- Incluye contador dinámico (JavaScript)

---

### 4. **Consentimiento** (Fieldset 4)
Validación legal y privacidad.

| Campo | Tipo | Validación | Obligatorio |
|-------|------|-----------|------------|
| Acepto política de privacidad | checkbox | Debe estar marcado | ✅ Sí |

---

## Características de Accesibilidad

### ARIA Attributes
- ✅ `aria-label`: Etiquetas descriptivas en todos los inputs
- ✅ `aria-describedby`: Referencias a hints y mensajes de error
- ✅ `aria-invalid`: Indicador de campos inválidos
- ✅ `aria-live="polite"`: Anuncios de éxito/error
- ✅ `role="group"`: Agrupación de checkboxes y radio buttons

### Estructura Semántica
- ✅ `<fieldset>` + `<legend>` para agrupar secciones
- ✅ `<label>` asociados a todos los inputs
- ✅ `<section>` para separar logicamente
- ✅ Indicadores visuales `.required` para campos obligatorios

### Navegación por Teclado
- ✅ Tab para navegar entre campos
- ✅ Shift+Tab para ir hacia atrás
- ✅ Enter para enviar formulario
- ✅ Espacio para activar checkboxes/radios

### Contraste y Legibilidad
- ✅ Textos con contraste WCAG AA
- ✅ Fuente legible (sistema sans-serif)
- ✅ Tamaño mínimo de fuente: 14px
- ✅ Espaciado adecuado entre elementos

---

## Validación JavaScript

### Validadores Personalizados
```javascript
validators = {
  companyName: (value) => { /* 2+ chars */ },
  contactPerson: (value) => { /* 2+ palabras */ },
  email: (value) => { /* regex validación */ },
  phone: (value) => { /* +XX pattern */ },
  website: (value) => { /* URL válida */ },
  country: (value) => { /* select obligatorio */ },
  productType: (value) => { /* select obligatorio */ },
  shipmentVolume: (value) => { /* select obligatorio */ },
  services: () => { /* mínimo 1 checkbox */ },
  otherPL: () => { /* radio obligatorio */ },
  privacy: () => { /* checkbox obligatorio */ }
}
```

### Validación en Tiempo Real
- Validación al desenfoque (`blur`)
- Validación al cambio (`change`)
- Mensajes de error dinámicos
- Cambio de color de borde (rojo = error, verde = válido)

### Validación al Envío
- Valida todos los campos antes de procesar
- Muestra todos los errores simultáneamente
- Previene envío si hay errores

---

## Estilos y Responsividad

### Diseño Responsivo
- **Desktop**: Grid 2 columnas para algunos campos
- **Tablet**: Adaptación a pantalla media
- **Mobile**: Stack vertical de todos los campos
- Breakpoint: 600px

### Paleta de Colores
- **Gradiente principal**: #667eea → #764ba2 (header)
- **Error**: #e74c3c (rojo)
- **Éxito**: #27ae60 (verde)
- **Fondo**: Gradiente azul claro
- **Border focus**: #667eea con shadow

### Estados Visuales
- **Normal**: Border gris, fondo blanco
- **Focus**: Border azul, shadow azul claro
- **Válido**: Border verde (#27ae60)
- **Inválido**: Border rojo, fondo rosa claro

---

## Flujo de Usuario

### 1. Carga Inicial
- Formulario vacío con placeholders descriptivos
- Hints bajo cada campo explicando requisitos
- Visualmente organizado en secciones claras

### 2. Interacción
- Usuario completa cada sección
- Validación en tiempo real al desenfoque
- Mensajes de error inmediatos si no cumple validación
- Contador dinámico para textarea (0/500)

### 3. Envío
- Usuario hace clic en "Enviar solicitud"
- Validación de todos los campos
- Si hay errores: Mostrar alertas en rojo
- Si es válido: Mostrar mensaje de éxito verde

### 4. Confirmación
- Mensaje: "✓ Formulario enviado correctamente. Nos pondremos en contacto pronto."
- Formulario se resetea después de 3 segundos
- Contador y mensajes se limpian

---

## Integración con Backend

### Datos Enviados (FormData)
```javascript
{
  companyName: "string",
  contactPerson: "string",
  email: "string",
  phone: "string",
  website: "string (opcional)",
  country: "us|es|both|other",
  productType: "fashion|electronics|cosmetics|food|other",
  shipmentVolume: "0-100|101-500|501-2000|2000+|unsure",
  services: "string[]", // Múltiples: storage, lastMile, reverseLogistics
  otherPL: "yes|no|evaluating",
  comments: "string (opcional)",
  privacy: "on" // Checkbox marcado
}
```

### Configuración para Envío
Para enviar a un servidor backend, modificar el evento `submit`:

```javascript
// En lugar de console.log, hacer:
fetch('/api/applications', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
})
.then(response => response.json())
.then(result => {
  successMessage.classList.add('show');
  // ... resto de lógica
})
.catch(error => console.error('Error:', error));
```

---

## Testing y Validación

### Checklist de Prueba Manual
- ✅ Rellenar con datos válidos y enviar
- ✅ Dejar campos obligatorios vacíos → mostrar errores
- ✅ Ingresar email inválido → validar y mostrar error
- ✅ Ingresar teléfono sin + → mostrar error
- ✅ No seleccionar servicios → bloquear envío
- ✅ No marcar política privacidad → bloquear envío
- ✅ Escribir >500 chars en comentarios → limitar input
- ✅ Limpiar formulario con botón Reset
- ✅ Navegar con Tab por todos los campos
- ✅ Activar con Enter en Submit
- ✅ Lector de pantalla: Verificar ARIA labels

### Validación de Accesibilidad
```bash
# Herramientas recomendadas:
# 1. WAVE Browser Extension
# 2. axe DevTools
# 3. Lighthouse (Chrome DevTools)
# 4. NVDA Screen Reader (Windows)
# 5. VoiceOver (Mac)
```

---

## Mantenimiento

### Agregar Nuevos Campos
1. Agregar HTML con estructura semántica
2. Agregar `id`, `name`, y `aria-label`
3. Agregar validador en objeto `validators`
4. Agregar evento listener `blur` y `change`
5. Crear elemento de error con id `${fieldName}Error`

### Cambiar Validaciones
1. Modificar la función en `validators[fieldName]`
2. Actualizar `aria-describedby` con nuevos requisitos
3. Probar con diferentes inputs (válidos e inválidos)

### Traducción
- Todos los textos están en español
- Para traducir: Buscar cadenas en `<label>`, `placeholder`, `field-hint`
- Considerar usar `translations.js` existente

---

## URLs y Acceso

- **Formulario en vivo**: `http://localhost:8000/application.html`
- **En Codespace**: `https://[codespace].github.dev/application.html`
- **En producción**: Configure según su dominio

---

## Notas Técnicas

- **Archivo**: `application.html` (761 líneas)
- **Estilos**: CSS inline en `<style>` (300 líneas)
- **Scripts**: JavaScript inline + `validation.js` externo
- **Dependencias**: Ninguna (vanilla HTML/CSS/JS)
- **Navegadores soportados**: Todos los modernos (IE11+ con polifills)
- **WCAG Compliance**: 2.1 Level AA ✅

---

## Cambios Relacionados

- ✅ `validation.js`: Sistema de validación reutilizable
- ✅ `index.html`: Landing page principal
- ✅ Rama `webage`: Todo integrado en rama de accesibilidad y SEO
