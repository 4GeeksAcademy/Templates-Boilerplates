# 🚀 Formulario TrackFlow - Guía Rápida

## ⚡ 30 segundos para comenzar

### 1️⃣ Ver el formulario
```bash
# Ya está disponible en:
http://localhost:8000/application.html
```

### 2️⃣ Probar el formulario
- Abre la URL anterior
- Completa los 13 campos
- Observa validación en tiempo real (border rojo/verde)
- Haz clic en "Enviar solicitud"

### 3️⃣ Revisar datos en consola
- Presiona F12 (DevTools)
- Ve a la pestaña "Console"
- Completa y envía el formulario
- Verás los datos en formato JSON

---

## 📋 Campos del formulario (en orden)

| # | Campo | Tipo | Validación |
|---|-------|------|-----------|
| 1 | Nombre empresa | text | Min 2 chars |
| 2 | Persona contacto | text | 2+ palabras |
| 3 | Email | email | Regex validation |
| 4 | Teléfono | tel | +[código] [número] |
| 5 | Sitio web | url | URL válida (opcional) |
| 6 | País | select | Required |
| 7 | Tipo producto | select | Required |
| 8 | Volumen envíos | select | Required |
| 9 | Servicios | checkbox | Mínimo 1 |
| 10 | 3PL actual | radio | Required |
| 11 | Comentarios | textarea | Max 500 chars (opcional) |
| 12 | Privacidad | checkbox | Obligatorio |

---

## ✨ Características

✅ Validación en tiempo real  
✅ Mensajes de error inmediatos  
✅ Navegación por teclado (Tab)  
✅ Accesible WCAG 2.1 AA  
✅ Responsive (móvil/tablet/desktop)  
✅ Contador dinámico para textarea  
✅ Estados visuales claros  

---

## 🔄 Flujo de uso

```
1. Usuario abre formulario
   ↓
2. Completa campos (validación en tiempo real)
   ↓
3. Errores se muestran en rojo
   ↓
4. Campos válidos se marcan en verde
   ↓
5. Hace clic en "Enviar solicitud"
   ↓
6. Se valida TODO
   ↓
7. Si hay errores → muestra alertas
   Si es válido → muestra "✓ Enviado correctamente"
   ↓
8. Formulario se resetea después de 3 segundos
```

---

## 🎨 Estados visuales

- **Normal**: Border gris (#e0e0e0)
- **Focus**: Border azul (#667eea) + shadow azul claro
- **Válido**: Border verde (#27ae60)
- **Inválido**: Border rojo (#e74c3c) + fondo rosa (#fadbd8)
- **Error**: Texto rojo, icono ✗
- **Éxito**: Texto verde, icono ✓

---

## ⌨️ Navegación por teclado

| Tecla | Acción |
|-------|--------|
| **Tab** | Navegar siguiente campo |
| **Shift+Tab** | Navegar campo anterior |
| **Enter** | Enviar formulario (en botón) |
| **Space** | Marcar/desmarcar checkbox o radio |
| **Arrow Up/Down** | Navegar opciones en select |

---

## 🔧 Integración con backend

El formulario actualmente muestra datos en consola.  
Para integrar con un servidor backend, edita `application.html`:

### Línea ~740 (buscar `console.log`):

**Cambiar de:**
```javascript
console.log('Formulario válido. Datos:', data);
```

**A:**
```javascript
fetch('/api/applications', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
})
.then(response => response.json())
.then(result => {
  successMessage.classList.add('show');
  formStatus.textContent = 'Formulario enviado correctamente.';
})
.catch(error => {
  console.error('Error:', error);
  formStatus.textContent = 'Error al enviar el formulario.';
  formStatus.style.color = '#e74c3c';
});
```

---

## 🧪 Testing rápido

### Test 1: Validación de email
1. En el campo Email, escribe: `invalido`
2. Desenfoca el campo (Tab)
3. **Esperado**: Error "Email inválido" en rojo

### Test 2: Teléfono sin +
1. En el campo Teléfono, escribe: `600000000`
2. Desenfoca el campo
3. **Esperado**: Error "Formato: +34 600000000" en rojo

### Test 3: Contacto con 1 palabra
1. En Persona de contacto, escribe: `Juan`
2. Desenfoca el campo
3. **Esperado**: Error "Debe contener nombre y apellido" en rojo

### Test 4: Envío válido
1. Completa todos los campos correctamente
2. Marca política de privacidad
3. Haz clic en "Enviar solicitud"
4. **Esperado**: Mensaje verde "✓ Formulario enviado correctamente"

---

## 📱 Responsive

- **Desktop (>600px)**: 2 columnas en algunos campos
- **Mobile (<600px)**: 1 columna, stack vertical

Prueba redimensionando la ventana.

---

## 📚 Documentación completa

Ver archivo: `APPLICATION-FORM.md` (386 líneas)
- Validaciones detalladas
- Características ARIA
- Guía de testing exhaustivo
- Mantenimiento y extensiones

---

## 🔗 Enlaces útiles

- 📁 Archivo HTML: `/application.html`
- 📚 Documentación: `/APPLICATION-FORM.md`
- 🌐 Local: http://localhost:8000/application.html
- 🐙 GitHub: https://github.com/4GeeksAcademy/ai-engineering-company-project-monorepo-gabyj/blob/webage/application.html

---

## ✅ Checklist para producción

- [ ] Cambiar endpoint backend en línea ~740
- [ ] Probar en Chrome, Firefox, Safari, Edge
- [ ] Probar en mobile
- [ ] Probar navegación por teclado (Tab, Enter)
- [ ] Probar con lector de pantalla
- [ ] Modificar mensaje de éxito si es necesario
- [ ] Agregar integración con email
- [ ] Configurar reCAPTCHA (opcional)

---

## 🚀 Deployment

El formulario está listo para producción. Solo necesita:

1. El servidor sirviendo `application.html`
2. El endpoint backend configurado
3. Los headers CORS si está en dominio diferente

Sin dependencias externas. Vanilla HTML/CSS/JS.

---

**¿Preguntas?** Revisa `APPLICATION-FORM.md` o consulta la documentación inline en `application.html`.
