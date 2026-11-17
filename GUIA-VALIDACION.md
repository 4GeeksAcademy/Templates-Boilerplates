# 🔍 Guía de Validación - Schema.org & ARIA Implementation

## Tabla de Contenidos
1. [Validación Rápida](#validación-rápida)
2. [Validación Detallada](#validación-detallada)
3. [Herramientas Online](#herramientas-online)
4. [Testing Local](#testing-local)
5. [Verificación Final](#verificación-final)

---

## ✅ Validación Rápida

### 1. Verificar JSON-LD Scripts
```bash
# Contar scripts JSON-LD
grep -c 'application/ld+json' index.html
# Debe retornar: 8

# Ver líneas con JSON-LD
grep -n 'application/ld+json' index.html
```

### 2. Verificar Tipos de Schema
```bash
# Contar tipos de schema únicos
grep '@type' index.html | grep -o '"@type": "[^"]*"' | sort | uniq -c
# Debe haber 19 tipos diferentes

# Ver todos los tipos
grep '@type' index.html | sort | uniq
```

### 3. Verificar ARIA Attributes
```bash
# Contar total de ARIA attributes
grep -o 'aria-[a-z-]*' index.html | sort | uniq -c | wc -l
# Debe retornar: ~15 tipos

# Ver count de cada ARIA
grep -o 'aria-[a-z-]*' index.html | sort | uniq -c
```

### 4. Verificar Elements Semánticos
```bash
# Contar elementos semánticos
grep -E '<(header|nav|main|section|article|aside|footer)' index.html | wc -l
# Debe retornar: 21+

# Ver distribución
grep -E -o '<(header|nav|main|section|article|aside|footer)' index.html | sort | uniq -c
```

---

## 📊 Validación Detallada

### 1. Organization Schema
```bash
# Verificar presencia
grep -A 10 '"name": "TrackFlow"' index.html | head -20

# Esperado:
# - "name": "TrackFlow" ✅
# - "foundingDate": "2009" ✅
# - "numberOfEmployees": 130 ✅
# - "areaServed": ["US", "Spain"] ✅
```

### 2. Address Schemas
```bash
# Verificar ubicaciones
grep -c '"addressCountry"' index.html
# Debe retornar: 2 (US + España)

# Verificar teléfonos
grep 'telephone' index.html | grep -c '+1-213\|+34-976'
# Debe retornar: 2
```

### 3. Service Schemas
```bash
# Verificar servicios
grep '"name":' index.html | grep -E 'Warehouse|Delivery|Logistics|Visibility'
# Debe encontrar 4 servicios
```

### 4. FAQ Schema
```bash
# Verificar preguntas
grep -c '"questionName"' index.html
# Debe retornar: 4

# Ver preguntas
grep '"questionName"' index.html
```

### 5. ARIA en Navegación
```bash
# Verificar menubar role
grep 'role="menubar"' index.html
# Debe encontrar: nav con role="menubar"

# Verificar menuitem roles
grep -c 'role="menuitem"' index.html
# Debe retornar: 3+ (Services, Coverage, Contact)
```

### 6. ARIA en Formulario
```bash
# Verificar form group
grep 'role="group"' index.html
# Debe encontrar: fieldset con role="group"

# Verificar aria-required
grep -c 'aria-required' index.html
# Debe retornar: 3+
```

---

## 🌐 Herramientas Online

### 1. Google Structured Data Testing Tool

**URL:** https://search.google.com/structured-data/testing-tool

**Pasos:**
1. Copiar contenido de `index.html`
2. Pegar en la herramienta
3. Hacer clic en "Run Test"
4. Verificar resultados

**Esperado:**
- ✅ Sin errores
- ✅ Schema Types validados: 8+
- ✅ Propiedades correctas

---

### 2. Google Rich Results Test

**URL:** https://search.google.com/test/rich-results

**Pasos:**
1. Pegar URL o HTML
2. Hacer clic en "Test URL"
3. Esperar validación

**Esperado:**
- ✅ "Passed the test"
- Rich Results elegibles:
  - Organization
  - Local Business
  - FAQPage
  - Breadcrumb
  - Product (Service)

---

### 3. Schema.org Validator

**URL:** https://validator.schema.org/

**Pasos:**
1. Pegar HTML completo
2. Hacer clic en "Validate"
3. Revisar resultados

**Esperado:**
- ✅ Errors: 0
- ✅ Warnings: 0 (o aceptables)
- ✅ Schema types encontrados: 19

---

### 4. WAVE (WebAIM Accessibility)

**URL:** https://wave.webaim.org/

**Pasos:**
1. Ingresar URL o cargar archivo
2. Revisar report de accesibilidad

**Esperado:**
- ✅ Errors: Mínimos
- ✅ Warnings: Bajo número
- ✅ Contrast ratio: Aceptable
- ✅ Alt text: Presentes

---

### 5. Lighthouse (Chrome DevTools)

**Pasos:**
1. Abrir DevTools (F12)
2. Tab "Lighthouse"
3. Seleccionar "Accessibility"
4. Hacer clic en "Analyze page load"

**Esperado:**
- ✅ Accessibility Score: 90+
- ✅ Best Practices: 85+
- ✅ SEO: 90+

---

## 🖥️ Testing Local

### 1. Verificar JSON Valid

```bash
# Instalar jq (si no está)
sudo apt-get install jq

# Extraer y validar JSON-LD
grep 'application/ld+json' index.html
```

### 2. Contar Líneas

```bash
# Tamaño total del archivo
wc -l index.html
# Debe retornar: 971

# Validar aumento
git diff --no-color index.html | head -20
```

### 3. Validar HTML

```bash
# Instalar html5lib si no está
pip3 install html5lib

# Validar HTML
python3 -m html5lib index.html > /dev/null && echo "HTML válido" || echo "HTML inválido"
```

### 4. Screen Reader Simulation

```bash
# En Windows con NVDA
# En Mac con VoiceOver
# En Linux con Orca

# Verificar aria-labels en elementos interactivos
grep -E 'button|input|select|textarea' index.html | grep -v 'aria-\|role='
# No debe retornar resultados sin ARIA
```

---

## ✨ Verificación Final

### Checklist Completo

- [ ] **JSON-LD Scripts**
  - [ ] 8 scripts presentes
  - [ ] Todos válidos (no errores de JSON)
  - [ ] En la sección `<head>`

- [ ] **Schema Types**
  - [ ] 19 tipos diferentes
  - [ ] Organization con todos los campos
  - [ ] Address con US y España
  - [ ] 4 Services
  - [ ] FAQPage con 4 Q&A
  - [ ] ContactPoints, Breadcrumb, WebPage, Rating

- [ ] **ARIA Attributes**
  - [ ] 137 total implementados
  - [ ] Navigation con role="menubar"
  - [ ] Form con role="group"
  - [ ] aria-required en inputs
  - [ ] aria-invalid en validación
  - [ ] aria-hidden en decorativos
  - [ ] aria-live en mensajes

- [ ] **HTML Semántico**
  - [ ] 1 header
  - [ ] 1 nav
  - [ ] 1 main
  - [ ] 6 sections
  - [ ] 11 articles
  - [ ] 1 footer

- [ ] **Accesibilidad**
  - [ ] Alt text descriptivos (100-150 chars)
  - [ ] Keyboard navigation funcional
  - [ ] Screen reader compatible
  - [ ] WCAG 2.1 AA compliant

- [ ] **SEO**
  - [ ] Knowledge Graph eligible
  - [ ] Rich Snippets eligible
  - [ ] Featured Snippets (FAQ) eligible
  - [ ] Local search ready
  - [ ] Voice search optimized

---

## 🚀 Comandos Rápidos

### Crear carpeta de validación
```bash
mkdir -p validation && cd validation
cp ../index.html .
```

### Verificar todos los schemas
```bash
grep -o '@type": "[^"]*' index.html | cut -d'"' -f4 | sort | uniq -c
```

---

## 📝 Notas Importantes

### Antes de ir a Producción

1. **Validar con Google Tools**
   - Google Structured Data Testing Tool
   - Google Rich Results Test
   - Google Search Console

2. **Revisar Warnings**
   - Algunos warnings son normales
   - Revisar si afectan la funcionalidad

3. **Testing en Dispositivos**
   - Desktop (Chrome, Firefox, Safari, Edge)
   - Mobile (iOS Safari, Android Chrome)
   - Screen readers (NVDA, JAWS, VoiceOver)

4. **Monitorear Después del Deploy**
   - Search Console
   - Rich Results report
   - CTR en SERP
   - Knowledge Graph appearance

---

## ❓ Troubleshooting

### Si encuentras errores de JSON
```bash
# Validar estructura
grep 'application/ld+json' index.html
```

### Si los ARIA attributes no funcionan
```bash
# Verificar que los roles se apliquen correctamente
grep -B 2 -A 2 'aria-invalid' index.html
```

### Si el schema.org no se reconoce
```bash
# Verificar estructura JSON
grep -A 3 '@context' index.html | head -10
```

---

## 🎯 Resultado Esperado

Después de completar todas las validaciones:

✅ **Google Rich Results Test:** PASSED  
✅ **Schema.org Validator:** 0 errors, 0 warnings  
✅ **WAVE:** A or AA rating  
✅ **Lighthouse:** 90+ en Accessibility  
✅ **HTML Validation:** Sin errores críticos  
✅ **ARIA Audit:** 137 attributes, 0 issues  

---

**Fecha de Revisión:** 14 de Noviembre, 2026  
**Versión:** 1.0.0  
**Responsable:** AI Assistant Copilot
