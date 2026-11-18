# 📋 Mensajes de Error Contextuales - Validación en Tiempo Real

## Descripción

Se han implementado **mensajes de error contextuales e inteligentes** que varían según exactamente lo que el usuario escriba. Cada mensaje es específico al problema, NO genérico.

---

## 📝 Ejemplos de Mensajes por Campo

### 1. NOMBRE DE LA EMPRESA (companyName)

| Situación | Input | Mensaje |
|-----------|-------|---------|
| Campo vacío | (vacío) | ❌ Campo obligatorio \| Por favor, ingresa el nombre de tu empresa |
| 1 carácter | "A" | ⚠️ Muy corto \| Tienes "A" (1 carácter) \| Necesitas mínimo 2 caracteres |
| Casi completo | "Ab" | ✓ Válido (desaparece error) |
| Válido | "Mi Empresa S.A." | ✓ Válido |

**Lógica:**
```javascript
if (!value) 
  → "❌ Campo obligatorio..."
if (value.length === 1)
  → "⚠️ Muy corto | Tienes "X" (1 carácter)..."
if (value.length < 2)
  → "⚠️ Incompleto | Necesitas N caracteres más"
```

---

### 2. PERSONA DE CONTACTO (contactPerson)

| Situación | Input | Mensaje |
|-----------|-------|---------|
| Campo vacío | (vacío) | ❌ Campo obligatorio \| Por favor, ingresa nombre y apellido |
| Solo espacios | "   " | ⚠️ Campo vacío \| Solo tiene espacios en blanco |
| 1 palabra | "Juan" | ⚠️ Nombre incompleto \| Solo escribiste: "Juan" \| Necesitas nombre y apellido (2+ palabras) |
| 2 palabras | "Juan Pérez" | ✓ Válido |
| 3+ palabras | "Juan María Pérez López" | ✓ Válido |

**Lógica:**
```javascript
if (!value)
  → "❌ Campo obligatorio..."
if (words.length === 0)
  → "⚠️ Campo vacío | Solo tiene espacios..."
if (words.length === 1)
  → "⚠️ Nombre incompleto | Solo escribiste: "${words[0]}"..."
if (words.length >= 2)
  → ✓ Válido
```

---

### 3. EMAIL CORPORATIVO (email)

Este tiene **la lógica más sofisticada**:

#### Situación 1: Campo Vacío
```
Input: (vacío)
Mensaje: ❌ Campo obligatorio | Por favor, ingresa tu email corporativo
```

#### Situación 2: Falta el @
```
Input: "juanempresa.com"
Mensaje: ⚠️ Falta @ | Tu email "juanempresa.com" no tiene símbolo @
```

#### Situación 3: Tiene @ pero sin dominio
```
Input: "juan@"
Mensaje: ⚠️ Dominio faltante | Escribiste: "juan@" | Formato: usuario@empresa.com
```

#### Situación 4: Dominio sin extensión
```
Input: "juan@empresa"
Mensaje: ⚠️ Dominio incompleto | "empresa" no tiene extensión (.com, .es, etc)
```

#### Situación 5: Dominio con punto al inicio
```
Input: "juan@.empresa.com"
Mensaje: ⚠️ Dominio inválido | Tiene punto al inicio o final: ".empresa.com"
```

#### Situación 6: Formato completamente inválido
```
Input: "juan @empresa.com" (espacio antes de @)
Mensaje: ❌ Email inválido | Formato: usuario@empresa.com (ej: juan@trackflow.com)
```

#### Situación 7: Válido ✓
```
Input: "juan@trackflow.com"
Mensaje: ✓ Válido (desaparece error)
```

**Lógica:**
```javascript
// Analizamos paso a paso el formato
if (!value)
  → "❌ Campo obligatorio..."
if (!value.includes('@'))
  → "⚠️ Falta @..."
if (!domain)
  → "⚠️ Dominio faltante..."
if (!domain.includes('.'))
  → "⚠️ Dominio incompleto..."
if (domain.startsWith('.') || domain.endsWith('.'))
  → "⚠️ Dominio inválido..."
if (emailRegex.test(value) === false)
  → "❌ Email inválido..."
```

---

### 4. TELÉFONO (phone)

| Situación | Input | Mensaje |
|-----------|-------|---------|
| Campo vacío | (vacío) | ❌ Campo obligatorio \| Por favor, ingresa tu teléfono |
| Sin código país | "600123456" | ⚠️ Falta código país \| Tu teléfono debe empezar con + (ej: +34) |
| Muy pocos dígitos | "+34 123" | ⚠️ Teléfono muy corto \| Tienes 5 dígitos \| Necesitas mínimo 6-7... |
| Formato incorrecto | "+34-600-123456" | ❌ Formato incorrecto \| Escribe: +[código país] [número]... |
| Válido | "+34 600123456" | ✓ Válido |
| Válido (sin espacio) | "+34600123456" | ✓ Válido |

**Lógica:**
```javascript
if (!value)
  → "❌ Campo obligatorio..."
if (!value.startsWith('+'))
  → "⚠️ Falta código país..."
if (digitsOnly.length < 7)
  → "⚠️ Teléfono muy corto | Tienes N dígitos..."
if (!phoneRegex.test(value))
  → "❌ Formato incorrecto..."
```

---

### 5. SITIO WEB (website) - OPCIONAL

| Situación | Input | Mensaje |
|-----------|-------|---------|
| Campo vacío | (vacío) | ✓ Válido (opcional) |
| Sin protocolo | "www.empresa.com" | ⚠️ Falta protocolo \| Tu URL debe empezar con https:// o http:// |
| Sin www | "empresa.com" | ⚠️ Falta protocolo \| Tu URL debe empezar con https:// o http:// |
| Completamente inválido | "https://" | ❌ URL inválida \| Escribe: https://www.empresa.com |
| Válido | "https://www.empresa.com" | ✓ Válido |
| Válido (sin www) | "https://empresa.com" | ✓ Válido |

**Lógica:**
```javascript
if (!value)
  → ✓ Válido (es opcional)
if (!value.startsWith('http://') && !value.startsWith('https://'))
  → "⚠️ Falta protocolo..."
try { new URL(value) } catch
  → "❌ URL inválida..."
```

---

### 6. COMENTARIOS (comments) - OPCIONAL

| Situación | Input | Mensaje |
|-----------|-------|---------|
| Campo vacío | (vacío) | ✓ Válido (opcional) |
| Corto | "Interesado" | ✓ Válido (8 caracteres) |
| Máximo | "Lorem ipsum..." (500 chars) | ✓ Válido (500 caracteres) |
| 1 carácter extra | "Lorem ipsum..." (501 chars) | ⚠️ Muy largo \| Tienes 501 caracteres \| Máximo 500 (exceso: 1) |
| Mucho exceso | "Lorem ipsum..." (650 chars) | ⚠️ Muy largo \| Tienes 650 caracteres \| Máximo 500 (exceso: 150) |

**Lógica:**
```javascript
if (value.length > 500)
  → "⚠️ Muy largo | Tienes N caracteres | Máximo 500 (exceso: M)"
```

---

### 7. SELECTS (País, Tipo Producto, Volumen)

| Situación | Select | Mensaje |
|-----------|--------|---------|
| No seleccionado | -- Selecciona... | ❌ Campo obligatorio \| Selecciona tu país de operación principal |
| Seleccionado | "Estados Unidos" | ✓ Válido |

**Lógica por select:**

**País (country):**
```
❌ Campo obligatorio | Selecciona tu país de operación principal
```

**Tipo de Producto (productType):**
```
❌ Campo obligatorio | Selecciona el tipo de producto que manejas
```

**Volumen (shipmentVolume):**
```
❌ Campo obligatorio | Selecciona el volumen mensual estimado de envíos
```

---

### 8. CHECKBOXES / RADIOS (Servicios, ¿Otro 3PL?, Privacidad)

#### Servicios (múltiple)
| Situación | Selección | Mensaje |
|-----------|-----------|---------|
| Ninguno seleccionado | (ninguno) | ❌ Campo obligatorio \| Selecciona al menos un servicio que necesites |
| 1 seleccionado | "Almacenaje" | ✓ Válido |
| Múltiples | "Almacenaje, Última milla" | ✓ Válido |

#### ¿Trabajas con otro 3PL? (radio)
| Situación | Selección | Mensaje |
|-----------|-----------|---------|
| Ninguno | (ninguno) | ❌ Campo obligatorio \| Debes indicar si trabajas con otro 3PL |
| Sí | "Sí" | ✓ Válido |
| No | "No" | ✓ Válido |
| Evaluando | "Estoy evaluando opciones" | ✓ Válido |

#### Privacidad (checkbox)
| Situación | Estado | Mensaje |
|-----------|--------|---------|
| Sin marcar | ☐ | ❌ Obligatorio aceptar \| Debes aceptar la política de privacidad para continuar |
| Marcado | ☑ | ✓ Válido |

---

## 🎯 Características Especiales

### 1. Emojis para Visibilidad
```
❌ = Error crítico (campo obligatorio vacío)
⚠️  = Advertencia (formato incorrecto, casi válido)
✅ = Éxito (campo correcto)
```

### 2. Información Contextual
Los mensajes incluyen **exactamente lo que el usuario escribió**:

```
Input: "Juan"
Mensaje: ⚠️ Nombre incompleto | Solo escribiste: "Juan"

Input: "A"
Mensaje: ⚠️ Muy corto | Tienes "A" (1 carácter)

Input: "juan@"
Mensaje: ⚠️ Dominio faltante | Escribiste: "juan@"
```

### 3. Contador de Caracteres
Para campos con límite:

```
Comentarios (500 caracteres máximo):
- 200 caracteres → ✓ Válido
- 501 caracteres → ⚠️ Muy largo | Tienes 501 caracteres | Máximo 500 (exceso: 1)
- 650 caracteres → ⚠️ Muy largo | Tienes 650 caracteres | Máximo 500 (exceso: 150)
```

### 4. Contador de Palabras
Para campos que requieren múltiples palabras:

```
Persona Contacto:
- "Juan" → ⚠️ Nombre incompleto | Solo escribiste: "Juan"
- "Juan Pérez" → ✓ Válido (2 palabras)
```

### 5. Contador de Dígitos
Para teléfono:

```
"+34 123" → ⚠️ Teléfono muy corto | Tienes 5 dígitos | Necesitas mínimo 6-7...
"+34 600123456" → ✓ Válido (9 dígitos)
```

---

## 🔧 Cómo Funciona la Lógica

### Flujo de Validación Contextual

```
1. Usuario escribe/cambia valor
   ↓
2. Se dispara evento (input/change/blur)
   ↓
3. Se llama getContextualErrorMessage(fieldName, value)
   ↓
4. Analiza el valor exacto:
   - ¿Está vacío?
   - ¿Le falta algo específico (@ en email, + en teléfono)?
   - ¿Es demasiado corto?
   - ¿Es demasiado largo?
   - ¿Tiene formato inválido?
   ↓
5. Retorna mensaje específico para esa situación
   ↓
6. updateFieldUI() muestra el mensaje
   ↓
7. Usuario ve el feedback instantáneo
```

### Ejemplo Completo: Email

```javascript
getContextualErrorMessage('email', 'juan@') {
  value = 'juan@'
  
  // Check 1: ¿Está vacío?
  if (!value) → return "❌ Campo obligatorio..."
  
  // Check 2: ¿Tiene @?
  if (!value.includes('@')) → false (SÍ tiene @)
  
  // Check 3: ¿Tiene dominio después de @?
  [localPart, domain] = value.split('@')
  // localPart = 'juan'
  // domain = '' (vacío)
  if (!domain) → return "⚠️ Dominio faltante..."
  
  // Retorna: "⚠️ Dominio faltante | Escribiste: "juan@" | Formato..."
}
```

---

## 📱 En Tiempo Real

### Mientras el usuario ESCRIBE:

```
Usuario: "h"
Mensaje: ⚠️ Muy corto | Tienes "h" (1 carácter)...

Usuario: "he"
Mensaje: ✓ (desaparece - ahora es válido)

Usuario: "hel"
Mensaje: ✓

Usuario: "hello"
Mensaje: ✓

Usuario: (borra todo)
Mensaje: ❌ Campo obligatorio | Por favor, ingresa...
```

### Flujo Completo de Email:

```
Usuario: "j"
Mensaje: ⚠️ Falta @ | Tu email "j" no tiene símbolo @

Usuario: "juan"
Mensaje: ⚠️ Falta @ | Tu email "juan" no tiene símbolo @

Usuario: "juan@"
Mensaje: ⚠️ Dominio faltante | Escribiste: "juan@"...

Usuario: "juan@e"
Mensaje: ⚠️ Dominio incompleto | "e" no tiene extensión (.com, .es, etc)

Usuario: "juan@empresa"
Mensaje: ⚠️ Dominio incompleto | "empresa" no tiene extensión...

Usuario: "juan@empresa."
Mensaje: ⚠️ Dominio inválido | Tiene punto al inicio o final...

Usuario: "juan@empresa.c"
Mensaje: Aún inválido (muy corta la extensión)

Usuario: "juan@empresa.co"
Mensaje: Aún inválido (extensión muy corta)

Usuario: "juan@empresa.com"
Mensaje: ✓ Válido (desaparece error)
```

---

## 🎨 Indicadores Visuales

Además del mensaje, el campo también cambia:

```css
/* Campo inválido */
Border: 2px red (border-red-500)
Ring: 2px red around field (ring-2 ring-red-500)

/* Campo válido */
Border: 2px gray (border-gray-300)
Ring: desaparece
```

---

## ♿ Accesibilidad

Los mensajes se anuncian por screen reader:

```html
<span role="alert" aria-live="polite" aria-atomic="true">
  ⚠️ Falta @ | Tu email "juan" no tiene símbolo @
</span>
```

- **role="alert"** → Se anuncia como alerta
- **aria-live="polite"** → Espera a que termine de hablar antes de anunciar
- **aria-atomic="true"** → Lee el mensaje completo

---

## 📊 Mensaje de Error en Envío

Cuando el usuario intenta enviar con errores:

```
⚠️ Encontramos 3 errores. Por favor, revisa los campos marcados en rojo y corrígelos.
```

(El número varía según cuántos campos tengan error)

Si es exitoso:

```
✅ ¡Éxito! Formulario enviado correctamente. Nos pondremos en contacto pronto.
```

---

## 💾 Cambios en el Código

**Archivo:** `validation.js`

**Método nuevo:** `getContextualErrorMessage(fieldName, value)`
- Analiza el valor exacto
- Retorna mensaje específico para ese estado
- Incluye emojis, información contextual, y contadores

**Método mejorado:** `validateField(fieldName)`
- Usa `getContextualErrorMessage()` para campos de texto
- Mantiene la misma lógica para checkboxes/radios

**Método mejorado:** `handleSubmit(e)`
- Cuenta el número total de errores
- Muestra: "Encontramos N errores..."

---

## 🧪 Casos de Prueba

### Test 1: Nombre Empresa
1. Digita: "A" → Ver: ⚠️ Muy corto | Tienes "A"...
2. Digita: "B" → Ver: ✓ Desaparece error
3. Borra todo → Ver: ❌ Campo obligatorio...

### Test 2: Email
1. Digita: "juan" → Ver: ⚠️ Falta @
2. Digita: "@" → Ver: ⚠️ Dominio faltante
3. Digita: "empresa" → Ver: ⚠️ Dominio incompleto
4. Digita: ".com" → Ver: ✓ Válido

### Test 3: Teléfono
1. Digita: "600" → Ver: ⚠️ Falta código país
2. Digita al inicio: "+34" → Ver: ⚠️ Teléfono muy corto
3. Completa: "+34 600123456" → Ver: ✓ Válido

### Test 4: Comentarios (500 chars máx)
1. Digita: "Interesado" (10 chars) → Ver: ✓ Válido
2. Agrega: +500 caracteres más → Ver: ⚠️ Muy largo | Tienes 510 | Máximo 500 (exceso: 10)

---

## ✅ Confirmación

**Status:** ✅ **IMPLEMENTADO Y CONFIRMADO**

- ✓ Mensajes contextuales específicos por campo
- ✓ Análisis detallado de entrada del usuario
- ✓ Emojis para mejor visibilidad
- ✓ Contadores de caracteres/palabras/dígitos
- ✓ Mensajes en español
- ✓ Validación en tiempo real
- ✓ Accesible (role, aria-live, aria-atomic)
- ✓ Commit: 48c8d47

---

**Última actualización:** 14/11/2024
**Rama:** webage
**Commit:** 48c8d47
