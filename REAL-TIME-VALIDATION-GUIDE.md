# 🚀 Guía de Validación en Tiempo Real - TrackFlow

## Descripción General

Se ha implementado **validación en tiempo real** en el formulario de solicitud de servicios. Los usuarios ahora reciben **feedback instantáneo** mientras escriben o seleccionan opciones, sin necesidad de perder foco del campo.

---

## 📋 Campos Validados en Tiempo Real

### Validación **MIENTRAS ESCRIBE** (input event)

| Campo | Validación | Mensaje de Error |
|-------|-----------|-----------------|
| **Nombre empresa** | Mínimo 2 caracteres | "Mínimo 2 caracteres" |
| **Persona contacto** | Mínimo 2 palabras | "Debe contener nombre y apellido (al menos 2 palabras)" |
| **Email** | Formato válido | "Formato de email inválido (ej: correo@empresa.com)" |
| **Teléfono** | Formato +país número | "Formato: +[código país] [número] (ej: +34 600000000)" |
| **Website** | URL válida (opcional) | "URL inválida (ej: https://www.empresa.com)" |
| **Comentarios** | Máximo 500 caracteres | "Máximo 500 caracteres" |

### Validación **AL CAMBIAR** (change event)

| Campo | Validación | Mensaje de Error |
|-------|-----------|-----------------|
| **País operación** | Debe seleccionar | "Selecciona un país" |
| **Tipo producto** | Debe seleccionar | "Selecciona un tipo de producto" |
| **Volumen envíos** | Debe seleccionar | "Selecciona un volumen" |
| **Servicios** | Al menos 1 seleccionado | "Selecciona al menos un servicio" |
| **¿Otro 3PL?** | Debe seleccionar opción | "Selecciona una opción" |
| **Privacidad** | Debe estar marcado | "Debes aceptar la política de privacidad" |

### Validación **AL PERDER FOCO** (blur event)

Todos los campos se validan también cuando el usuario quita el foco, asegurando validación completa.

---

## 🎨 Indicadores Visuales

### ✅ Campo Válido
```
Border: Gris oscuro (border-gray-300)
Error: Oculto
aria-invalid: false
```

### ❌ Campo Inválido
```
Border: Rojo (border-red-500)
Ring: 2px rojo (ring-2 ring-red-500)
Error: Visible en rojo
aria-invalid: true
```

---

## 🧪 Cómo Probar en el Navegador

### 1. Abrir el formulario
```
http://localhost:PORT/application.html
(o en Codespace: port forwarding)
```

### 2. Probar Validación de Nombre de Empresa
```
Pasos:
1. Haz click en "Nombre de la empresa"
2. Digita: "A" 
   → Ves el error: "Mínimo 2 caracteres"
3. Digita: "B"
   → El error desaparece, campo es válido ✓
4. Borra todo
   → Ves el error: "Este campo es obligatorio"
```

### 3. Probar Validación de Email
```
Pasos:
1. Haz click en "Email corporativo"
2. Digita: "invalido"
   → Error: "Formato de email inválido..."
3. Digita: "@empresa"
   → Error sigue visible
4. Digita: ".com"
   → Error desaparece ✓
```

### 4. Probar Validación de Teléfono
```
Pasos:
1. Haz click en "Teléfono"
2. Digita: "600000000"
   → Error: "Formato: +[código país]..."
3. Digita delante: "+34"
   → Error desaparece ✓
4. El formato correcto: "+34 600000000"
```

### 5. Probar Selects (País, Tipo Producto, Volumen)
```
Pasos:
1. Intenta enviar sin seleccionar "País de operación"
2. Al hacer submit, verás error
3. Selecciona una opción
   → Error desaparece al instante
```

### 6. Probar Checkboxes/Radios
```
Servicios (múltiple):
1. Sin seleccionar ninguno → Error: "Selecciona al menos un servicio"
2. Selecciona uno → Error desaparece

¿Trabajas con otro 3PL? (radio):
1. Sin seleccionar → Error: "Selecciona una opción"
2. Selecciona uno → Error desaparece

Privacidad (checkbox obligatorio):
1. Sin marcar → Error: "Debes aceptar..."
2. Marca → Error desaparece
```

### 7. Probar Website (Opcional)
```
Pasos:
1. Digita: "noesurl"
   → Error: "URL inválida..."
2. Digita: "https://www"
   → Error sigue
3. Digita: ".com"
   → Error desaparece ✓
4. O simplemente déjalo vacío (es opcional)
```

### 8. Probar Comentarios (Máximo 500 caracteres)
```
Pasos:
1. Digita muchos caracteres
2. Al llegar a 501 caracteres
   → Error: "Máximo 500 caracteres"
3. El campo muestra contador: "501 / 500"
```

---

## 🎯 Casos de Prueba Completos

### Caso 1: Envío con Errores
```
1. Llenar todos los campos INCORRECTAMENTE:
   - Empresa: "A" (solo 1 caracter)
   - Contacto: "Juan" (solo 1 palabra)
   - Email: "noesmail"
   - Teléfono: "123456"
   - País: No seleccionar
   
2. Hacer click en ENVIAR
   
3. RESULTADO ESPERADO:
   ✓ Todos los campos muestran error
   ✓ Scroll automático al primer error
   ✓ Focus en primer campo inválido
   ✓ Mensaje: "Por favor, completa todos los campos..."
```

### Caso 2: Corrección Progresiva
```
1. Dejar campo "Empresa" con valor "A"
   → Verás error: "Mínimo 2 caracteres"
   
2. Agregar una letra: "AB"
   → El error DESAPARECE AL INSTANTE
   
3. NO NECESITAS hacer nada más
   → La validación es en tiempo real
```

### Caso 3: Envío Exitoso
```
1. Llenar TODOS los campos correctamente:
   - Empresa: "Mi Empresa S.A."
   - Contacto: "Juan Pérez López"
   - Email: "juan@empresa.com"
   - Teléfono: "+34 600123456"
   - Website: "https://www.empresa.com" (opcional)
   - País: Seleccionar "España"
   - Tipo producto: Seleccionar "Moda"
   - Volumen: Seleccionar "101-500"
   - Servicios: Marcar "Almacenaje"
   - 3PL: Seleccionar "Sí"
   - Comentarios: "Interesado en soluciones rápidas" (opcional)
   - Privacidad: Marcar ✓
   
2. Hacer click en ENVIAR
   
3. RESULTADO ESPERADO:
   ✓ Mensaje verde: "✓ Formulario enviado correctamente."
   ✓ Formulario se limpia
   ✓ Mensaje desaparece después de 3 segundos
```

---

## 🔍 Validaciones Específicas

### Email
```
VÁLIDO:
✓ usuario@empresa.com
✓ nombre.apellido@empresa.co.uk
✓ contacto+etiqueta@empresa.org

INVÁLIDO:
✗ usuario sin @ → Error
✗ @sinusuario → Error
✗ usuario@sindominio → Error
✗ usuario@dominio (sin extensión) → Error
```

### Teléfono
```
Debe empezar con: +[código país] seguido de [número]

VÁLIDO:
✓ +34 600123456
✓ +34600123456 (sin espacio)
✓ +1 2125551234 (USA)
✓ +55 11987654321 (Brasil)

INVÁLIDO:
✗ 600123456 (sin +)
✗ +34 123 (muy corto)
✗ 34600123456 (sin +)
```

### Website
```
Debe ser URL válida con protocolo

VÁLIDO:
✓ https://www.empresa.com
✓ https://empresa.com.ar
✓ https://subdominio.empresa.org
✓ https://www.empresa.es/pagina

INVÁLIDO:
✗ www.empresa.com (sin protocolo)
✗ empresa.com (sin protocolo)
✗ https:// (sin dominio)
✗ http://invalido (dominio inválido)
```

### Persona de Contacto
```
Debe contener MÍNIMO 2 palabras

VÁLIDO:
✓ Juan Pérez
✓ María González López (3+ palabras ok)
✓ José María (2 palabras)

INVÁLIDO:
✗ Juan (solo 1 palabra)
✗ María (solo 1 palabra)
```

### Comentarios
```
Máximo 500 caracteres

✓ Puede tener 1 a 500 caracteres
✗ Si llega a 501 → Error visible
```

---

## ♿ Accesibilidad Verificada

La validación en tiempo real cumple con **WCAG 2.1 Level AA**:

✅ **Anuncios por screen reader:**
   - Cuando aparece un error, se anuncia inmediatamente
   - role="alert" para errores críticos
   - aria-live="polite" para actualizaciones suaves

✅ **Navegación por teclado:**
   - Tab entre campos
   - Enter para enviar
   - Los errores son detectables sin mouse

✅ **Indicadores visuales:**
   - No solo color rojo (también border + ring)
   - Alto contraste
   - Visibles en todos los tamaños de pantalla

✅ **Focus management:**
   - Focus ring visible (ring-indigo-500)
   - Scroll automático al error en envío
   - Focus colocado en primer campo inválido

---

## 📱 Responsividad

La validación funciona igual en:

- **Desktop** (1024px+)
- **Tablet** (640-1024px)
- **Mobile** (<640px)

Los mensajes de error se adaptan al tamaño de pantalla.

---

## 🚀 Eventos Detallados

### input event (mientras escribes)
```javascript
// Se activa en estos campos:
- Nombre empresa
- Persona contacto
- Email
- Teléfono
- Website
- Comentarios

// Valida:
- Longitud mínima
- Formato
- Caracteres especiales
```

### change event (cuando cambias selección)
```javascript
// Se activa en:
- Select (País, Tipo Producto, Volumen)
- Radio buttons (¿Otro 3PL?)
- Checkboxes (Servicios, Privacidad)

// Valida:
- Si hay selección
- Si hay al menos una opción marcada
```

### blur event (cuando pierdes foco)
```javascript
// Se activa en: TODOS los campos
// Valida: Validación final completa
```

### submit event (al enviar)
```javascript
// Se activa cuando: Haces click en "ENVIAR"
// Valida: TODOS los campos de una vez
// Si hay error:
  - Muestra todos los errores
  - Scroll al primer error
  - Focus en primer campo inválido
// Si es válido:
  - Envía formulario
  - Muestra mensaje de éxito
```

---

## 🐛 Posibles Comportamientos

### Campo con error desaparece al escribir
```
✓ Correcto
Mientras escribes y corriges, el error desaparece inmediatamente
No esperas a hacer blur o submit
```

### Múltiples errores al enviar
```
✓ Correcto
Todos los campos se validan
Ves todos los errores a la vez
Puedes corregir todos
```

### Scroll automático al error
```
✓ Correcto
Si hay error de envío, la página baja automáticamente
Al primer campo con error
```

### Focus en campo con error
```
✓ Correcto
Después de scroll automático, el focus está en el campo
Puedes empezar a escribir inmediatamente
```

---

## 💡 Consejos de Prueba

1. **Prueba en móvil:**
   - Usa Chrome DevTools (F12 → Device Toolbar)
   - Selecciona iPhone 12/13
   - Comprueba que los errores sean visibles

2. **Prueba con teclado:**
   - Tab para navegar entre campos
   - Enter para enviar
   - Arrow keys en selects
   - Space para checkboxes/radios

3. **Prueba con screen reader (Windows):**
   - Descarga NVDA (gratis)
   - Actívalo (Ctrl + Alt + N en NVDA)
   - Navega el formulario
   - Comprueba que los errores se anuncian

4. **Prueba sin mouse:**
   - Tab por todos los campos
   - Intenta llenar el formulario solo con teclado
   - Verifica que sea posible

5. **Prueba en navegadores diferentes:**
   - Chrome
   - Firefox
   - Safari
   - Edge

---

## 📊 Resumen de Cambios

| Aspecto | Antes | Ahora |
|--------|-------|-------|
| Validación | Al blur/submit | En tiempo real (input/change/blur) |
| Feedback | Esperas a salir del campo | Instantáneo mientras escribes |
| Errores | Solo en submit | Mientras escribes |
| UX | Confuso | Claro y receptivo |
| Accesibilidad | Básica | WCAG 2.1 AA |

---

## 🔗 Archivos Relacionados

- **application.html** - Formulario HTML
- **validation.js** - Lógica de validación en tiempo real
- **RAMA:** `webage` - Cambios en esta rama

---

## ✅ Estado de la Implementación

- ✓ Validación en tiempo real implementada
- ✓ Todos los campos validados
- ✓ Mensajes de error accesibles
- ✓ Indicadores visuales WCAG 2.1 AA
- ✓ Focus management
- ✓ Scroll automático al error
- ✓ Listo para producción

---

**Última actualización:** 14/11/2024
**Commit:** 00c9211
**Rama:** webage
