# BRACKET UI Prototype

Prototipo visual independiente para definir, validar y documentar la evolución UI/UX del sistema BRACKET antes de integrar cambios al aplicativo funcional.

> **Este repositorio no reemplaza ni modifica el sistema desplegado.**  
> El sistema funcional se mantiene congelado para presentaciones, validaciones y operación de prueba. Este repositorio es el laboratorio visual donde se construye y valida la siguiente experiencia de BRACKET.

---

## 1. Objetivo del repositorio

Este proyecto existe para responder tres preguntas antes de tocar el frontend real:

1. ¿Cómo debe verse BRACKET?
2. ¿Cómo debe navegarse BRACKET?
3. ¿Cómo deben sentirse los flujos clínicos y administrativos en tablet y escritorio?

La intención es validar con la clínica la estructura, jerarquía, lenguaje visual y experiencia de uso usando datos 100% demostrativos, sin comprometer backend, base de datos ni despliegue actual.

---

## 2. Dirección de producto aprobada

### BRACKET Clinical Luxury / iPad Native

La interfaz debe sentirse como una aplicación clínica moderna diseñada primero para tablet, con precisión empresarial y una identidad visual propia.

La referencia conceptual acordada es:

- 70% productividad estilo iPad / Apple
- 20% clínica privada premium
- 10% identidad BRACKET

### Principios de diseño

- **Claridad antes que decoración**
- **Contexto antes que navegación**
- **Touch antes que densidad extrema**
- **Jerarquía antes que cantidad**
- **Evidencia antes que apariencia**
- **La UI nunca debe fingir que algo está guardado, firmado, validado o fiscalizado si el backend o la política real no lo sustentan**

---

## 3. Regla arquitectónica principal de navegación

BRACKET tiene dos niveles de navegación distintos y no deben mezclarse.

### 3.1 Navegación global

La navegación global representa módulos del sistema:

- Dashboard
- Agenda
- Pacientes
- Ortodoncia
- Finanzas
- Inventario
- Configuración

Los módulos visibles dependen del rol.

### 3.2 Navegación del paciente

Al entrar a un paciente aparece un contexto clínico propio:

- Resumen
- Historia clínica
- Anamnesis
- Odontograma
- Tratamientos
- Radiografías
- Consentimientos

Esto **no es un segundo sidebar global**. Se presenta como navegación horizontal dentro de la ficha del paciente.

### 3.3 Atención clínica

La Atención Clínica no es un módulo global del sidebar.

Se entra desde:

```text
Agenda / Cita
      ↓
Paciente
      ↓
Atención Clínica
```

o:

```text
Pacientes
   ↓
Ficha del paciente
   ↓
Atención Clínica
```

Dentro de una atención en curso se trabajan:

- Historia
- Anamnesis
- Odontograma
- Evolución
- Tratamientos
- Radiografías
- Consentimientos

### 3.4 Odontograma

El Odontograma **no es un módulo global**.

Pertenece al contexto clínico del paciente y, cuando se registra o modifica, se trabaja desde la Atención Clínica.

---

## 4. Navegación por rol

### ADMINISTRADOR

- Dashboard
- Agenda
- Pacientes
- Ortodoncia
- Finanzas
- Inventario
- Configuración

### RECEPCIÓN

- Dashboard
- Agenda
- Pacientes
- Finanzas

Recepción no modifica contenido clínico.

### ESPECIALISTA

- Dashboard
- Agenda
- Pacientes

La atención clínica se abre desde paciente o cita.

### ORTODONCISTA

- Dashboard
- Agenda
- Pacientes
- Ortodoncia

La atención clínica también se abre desde paciente o cita.

> El frontend puede ocultar acciones según rol, pero la autorización real siempre pertenece al backend.

---

## 5. Canvas y responsive

### Canvas principal

```text
1024 × 768
tablet landscape
```

Este es el tamaño principal para decidir composición, densidad y jerarquía.

### Otros tamaños obligatorios

- 768–1023: tablet portrait
- 1024–1279: tablet landscape
- 1280+: desktop
- 1280×800
- 1366×768
- 1366×1024
- iPad 11"
- iPad 13"
- 1440+ desktop

### Filosofía responsive

No se escala el desktop hacia abajo.

Se recompone la interfaz:

```text
Portrait
→ composición vertical

Tablet landscape
→ experiencia principal táctil

Desktop
→ mayor densidad horizontal
```

---

## 6. App Shell aprobado

### Tablet landscape

- Navigation Rail: **72 px**
- Topbar: **60–64 px**
- Contenido restante con padding 20 px aproximadamente

### Desktop

La rail puede mantenerse en 72 px o expandirse hasta aproximadamente 208 px cuando aporte valor.

### Portrait

La rail deja de ser persistente y se transforma en Navigation Drawer.

### Topbar

Debe mostrar contexto y acciones, no duplicar navegación.

Características:

- fondo cálido translúcido
- blur moderado
- sticky
- búsqueda y acciones secundarias compactas

---

## 7. Design System provisional

Los colores son provisionales hasta validar la identidad corporativa exacta con BRACKET.

### Paleta

| Token | Valor | Uso |
|---|---:|---|
| Primary | `#8F2432` | Acción principal / selección |
| Primary Hover | `#7B1E2A` | Hover |
| Primary Pressed | `#681923` | Pressed |
| Primary Soft | `#F8EAEC` | Estado activo |
| Gold | `#B7924A` | Acento premium puntual |
| Gold Strong | `#9A7839` | Énfasis secundario |
| Gold Soft | `#E9DBC0` | Ornamentación mínima |
| Background | `#F5F3EE` | Fondo general |
| Surface | `#FFFFFF` | Superficie principal |
| Surface Warm | `#FBFAF7` | Rail / topbar |
| Surface Muted | `#EFEEE9` | Controles secundarios |
| Border | `#E4E0D8` | Divisores |
| Border Strong | `#D4CEC3` | Inputs |
| Text Primary | `#1D1D1F` | Texto principal |
| Text Secondary | `#5F5F64` | Metadata |
| Text Muted | `#86868B` | Información secundaria |

### Estados

- Success: `#27845B`
- Warning: `#B7792B`
- Danger: `#D43B3B`
- Info: `#367C9D`

El rojo BRACKET representa identidad, selección y acción primaria.  
El rojo Danger se reserva para errores y acciones destructivas.

### Proporción visual

Aproximadamente:

- 75% neutrales
- 15% rojo BRACKET
- 5% dorado
- 5% estados

---

## 8. Tipografía

Stack:

```css
-apple-system,
BlinkMacSystemFont,
"Inter",
"Segoe UI",
sans-serif
```

Escala orientativa:

- Display: 32
- H1: 26
- H2: 22
- H3: 18
- Body: 16
- Small body: 14
- Caption: 12

En tablet, los inputs deben conservar tamaño cómodo y legible.

Para dinero y horas se prefieren números tabulares:

```css
font-variant-numeric: tabular-nums;
```

---

## 9. Espaciado, radio y superficies

### Spacing

```text
4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48
```

### Radius

```text
6 · 8 · 10 · 12 · 16 · 20
```

Uso aproximado:

- Input: 10
- Button: 12
- Card: 14–16
- Drawer: 16
- Modal: 18–20

### Sombras

Se usan con moderación.

La jerarquía visual debe depender principalmente de:

- spacing
- bordes
- superficies
- tipografía

No de sombras pesadas.

---

## 10. Touch y accesibilidad

Targets principales:

- Button: mínimo 44 px
- Input / Select: 44 px
- IconButton: 44 × 44
- Tabs: aproximadamente 44 px de alto
- acciones de Agenda: mínimo 44 px
- piezas odontológicas: área táctil aproximada 56–60 px

Reglas:

- no depender sólo del color
- focus visible
- labels reales
- navegación por teclado donde corresponda
- badges con texto + color
- contraste suficiente
- destructive actions separadas de acciones normales
- hover nunca es obligatorio para completar una tarea

---

## 11. Componentes y contenedores

### Modal

Para:

- acciones cortas
- confirmaciones
- operaciones críticas simples

### Drawer

Para:

- formularios medios
- detalle rápido
- edición contextual
- registro de cita
- registro de pago
- control ortodóntico
- detalle de producto

### Page

Para:

- procesos complejos
- lectura extensa
- consentimiento
- arqueo complejo
- experiencias clínicas amplias

---

## 12. Decisiones por módulo

### UI-03 · Dashboard

El Dashboard es operativo, no analítico.

Debe responder:

- qué pasa hoy
- qué requiere atención
- qué puede hacer el usuario ahora

No se llena con gráficos históricos ni reportes.

### UI-04 · Agenda

Vista principal:

```text
Día
```

También:

- Semana
- Mes
- Lista

Recepción y Admin pueden organizar por sillones o profesionales.

La agenda visual usa duración real del procedimiento.

Escala orientativa:

```text
30 min  = 44 px
45 min  = 66 px
60 min  = 88 px
90 min  = 132 px
120 min = 176 px
```

Los estados usan texto + color, no bloques completamente pintados.

No se usará drag & drop como mecanismo principal de reprogramación.

### UI-05 · Pacientes

La búsqueda de paciente se prioriza sobre dashboards decorativos.

Flujo:

```text
Pacientes
→ buscar
→ abrir paciente
→ Ficha
→ contexto clínico
```

La ficha mantiene siempre identidad del paciente visible.

### UI-06 · Atención Clínica

Estados conceptuales:

- Sin iniciar
- En curso
- Cerrada

La identidad del paciente, profesional, fecha, cita relacionada y estado deben ser visibles.

Una atención cerrada pasa a modo lectura.

El cierre requiere confirmación.

### UI-07 · Odontograma

Decisión clínica confirmada:

**usar odontograma esquemático basado en superficies**, no dientes anatómicos realistas.

Debe conservar:

- numeración FDI
- estructura geométrica clínica
- superficies
- pieza seleccionada
- panel contextual
- leyenda
- historial / evolución

Debe distinguir claramente:

```text
Odontograma inicial
≠
Evoluciones odontográficas
```

Los colores y símbolos clínicos específicos requieren validación de BRACKET.

### UI-08 · Tratamientos

Regla central:

```text
Planificar ≠ Ejecutar
```

Se separan:

- Plan de tratamiento
- Procedimientos realizados

La pantalla clínica no se convierte en caja.

### UI-09 · Ortodoncia

Ortodoncia es un **caso longitudinal**, no un formulario único ni un wizard.

Secciones previstas:

- Diagnóstico
- Saneamiento
- Planificación
- Instalación
- Controles
- Incidencias
- Adendas
- Finalización

Se separa:

```text
Journey
= etapa general del caso

Timeline
= eventos cronológicos
```

### UI-10 · Finanzas

Reglas conceptuales:

```text
Presupuesto ≠ deuda
Cargo ≠ pago
Caja ≠ estado de cuenta
```

Presupuesto representa estimación.

Cargo representa obligación financiera según el modelo aprobado.

Pago representa dinero recibido.

Aplicación relaciona pago con cargo.

Caja representa operación del turno.

No se afirma integración SUNAT hasta que exista realmente.

### UI-11 · Radiografías

Las radiografías se presentan como contenido clínico visual:

- galería
- miniatura
- tipo
- fecha
- observaciones
- visor

La metadata debe permanecer vinculada al archivo y paciente correctos en el sistema real.

### UI-11 · Consentimientos

Consentimiento no es un checkbox.

Debe conservar:

- documento
- versión
- fecha
- firmante
- representación
- evidencia de captura

No se utilizarán términos como:

- “firma digital certificada”
- “firma legalmente validada”

sin sustento técnico y jurídico real.

### UI-12 · Inventario

Inventario es operativo y denso, no un dashboard decorativo.

Incluye:

- Productos
- Lotes
- Stock
- Movimientos
- Kardex
- Alertas

El stock no debe editarse directamente como un número suelto.

Los cambios se representan mediante movimientos trazables.

### UI-12 · Configuración

Sólo ADMIN.

Bloques previstos:

- Personal
- Sillones odontológicos
- Catálogo y tarifario

Catálogo conecta con Agenda mediante duración de procedimientos.

---

## 13. Reportes

No se desarrollará por ahora un gran módulo de Reportes.

Primero se presenta y valida la versión funcional con BRACKET.

Luego Dirección definirá qué reportes realmente necesita la clínica.

Esto evita construir gráficos y reportes sin valor real.

---

## 14. Estados obligatorios de pantalla

Toda pantalla importante debe considerar:

- Loading
- Empty
- Error
- Success
- Read-only
- Permission denied
- Offline / sin conexión
- Disabled
- No data
- No patient selected
- Encounter closed
- Encounter owned by another professional

No se utilizarán mensajes técnicos como:

```text
403 Forbidden
500 PrismaClient...
No data
```

La interfaz habla español clínico y empresarial.

---

## 15. Terminología

No mostrar vocabulario de desarrollo:

- payload
- endpoint
- UUID
- treatmentPlanId
- performedProcedure
- submit
- record
- item

La interfaz usa lenguaje profesional en español.

Ejemplos:

- Registrar paciente
- Nueva cita
- Iniciar atención
- Cerrar atención
- Registrar procedimiento
- Registrar pago
- Subir estudio
- Ver consentimiento

---

## 16. Glassmorphism y motion

Glassmorphism sólo se permite con moderación en:

- topbar
- drawer
- modal
- overlay

No en superficies clínicas principales.

Motion:

```text
100–250 ms
```

Curva orientativa:

```css
cubic-bezier(.2,.8,.2,1)
```

La interfaz no rebota ni usa animaciones decorativas innecesarias.

---

## 17. Estado frente al backend

El diseño objetivo no implica que todas las capacidades ya estén soportadas por el backend.

Se usará esta clasificación durante integración:

| Estado | Significado |
|---|---|
| UI compatible | Backend soporta la función |
| UI preparada | Diseño listo, soporte parcial |
| UI diferida | No debe habilitarse todavía |
| Política pendiente | Requiere decisión clínica, financiera o legal |

Nunca se habilita una acción sólo porque el prototipo puede dibujarla.

---

## 18. Stack objetivo

- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router v6
- TanStack Query
- Axios
- Radix / Shadcn
- Lucide
- PWA

No usar Next.js / SSR para este producto.

El prototipo actual puede ser más pequeño, pero la arquitectura visual debe poder migrar al stack real.

---

## 19. Estructura objetivo del frontend

```text
src/
├─ app/
│  ├─ router/
│  └─ providers/
│
├─ components/
│  ├─ ui/
│  ├─ shell/
│  ├─ clinical/
│  ├─ agenda/
│  ├─ finance/
│  └─ inventory/
│
├─ features/
│  ├─ dashboard/
│  ├─ appointments/
│  ├─ patients/
│  ├─ clinical/
│  ├─ odontogram/
│  ├─ treatments/
│  ├─ orthodontics/
│  ├─ finance/
│  ├─ files/
│  ├─ consents/
│  ├─ inventory/
│  └─ settings/
│
├─ hooks/
├─ lib/
├─ services/
├─ types/
├─ styles/
└─ main.tsx
```

No se busca componentizar cada `div`.  
Se extraen componentes cuando existe responsabilidad reutilizable o lógica clara.

---

## 20. Roadmap UI/UX aprobado

| Fase | Estado | Alcance |
|---|---|---|
| UI-00 | Cerrada | Dirección visual |
| UI-01 | Cerrada | Design System |
| UI-02 | Cerrada | Shell / navegación |
| UI-03 | Cerrada | Dashboard |
| UI-04 | Cerrada | Agenda |
| UI-05 | Cerrada | Pacientes + Ficha |
| UI-06 | Cerrada | Atención Clínica |
| UI-07 | Cerrada | Odontograma |
| UI-08 | Cerrada | Tratamientos |
| UI-09 | Cerrada | Ortodoncia |
| UI-10 | Cerrada | Finanzas / Caja |
| UI-11 | Cerrada | Radiografías / Consentimientos |
| UI-12 | Cerrada | Inventario / Configuración |
| UI-13 | Cerrada | Responsive + Tablet QA |
| UI-14 | Cerrada | Polish final |

Estas fases documentan la experiencia objetivo.  
No significan que todos los módulos estén implementados en este prototipo.

---

## 21. Estrategia de implementación real

El orden acordado es:

```text
Sistema funcional desplegado
        ↓
Validación con BRACKET
        ↓
Auditoría Frontend ↔ Backend
        ↓
Cerrar bloqueadores funcionales
        ↓
Design Tokens + App Shell
        ↓
Migración visual por dominios
        ↓
Responsive / accesibilidad / polish
        ↓
UAT con clínica
        ↓
Piloto controlado
```

No se hará un rediseño completo de una sola vez.

Cada bloque debe preservar la lógica funcional existente.

### Migración por dominios

1. Foundation + App Shell
2. Dashboard + Agenda
3. Pacientes + Ficha + Atención Clínica
4. Odontograma
5. Tratamientos + Ortodoncia
6. Finanzas + Caja
7. Radiografías + Consentimientos
8. Inventario + Configuración
9. Responsive + Accessibility QA
10. Polish final

---

## 22. Forma de trabajo

Para el sistema real:

1. inspeccionar código actual
2. confirmar branch y HEAD
3. revisar contratos reales
4. implementar un bloque pequeño
5. probar
6. revisar diff
7. commit trazable
8. smoke manual
9. detenerse antes del siguiente bloque

No:

- force push
- reset destructivo
- rebase destructivo
- “corrige todo”
- cambios de schema sin análisis
- cambios de reglas clínicas/financieras inventadas
- migraciones destructivas sin aprobación
- datos reales en prototipos

---

## 23. Alcance actual de este prototipo

Actualmente el repositorio demuestra:

- App Shell tablet-first
- Navigation Rail
- Dashboard operativo
- Agenda por sillones
- Directorio de pacientes
- Ficha de paciente
- Atención clínica contextual
- Odontograma dentro de Atención Clínica
- Odontograma esquemático FDI
- responsive base
- tokens visuales iniciales
- datos demostrativos

Todavía **no** representa una aplicación clínica funcional.

No tiene como objetivo:

- persistencia real
- autenticación real
- pagos reales
- consentimientos jurídicamente válidos
- integración SUNAT
- datos clínicos reales
- reemplazar el sistema desplegado

---

## 24. Qué validaremos con BRACKET

Durante reuniones y presentaciones, este prototipo se utilizará para recoger decisiones sobre:

- colores corporativos
- densidad visual
- distribución de Agenda
- información visible por rol
- flujo real de Atención Clínica
- terminología usada por la clínica
- odontograma y convenciones clínicas
- prioridad de acciones
- navegación
- reportes realmente necesarios
- necesidades específicas de tablet

Las observaciones de la clínica se convierten después en:

```text
Cambio funcional
Cambio UI/UX
Regla clínica / negocio
```

y sólo entonces pasan al backlog de implementación real.

---

## 25. Regla final

BRACKET debe sentirse:

> como una aplicación clínica diseñada específicamente para tablet, con precisión de software empresarial, la calma de una clínica privada y suficiente identidad propia para no parecer un template genérico.

---

## Aviso de datos

**Todos los nombres, citas, importes, documentos y registros visibles en este repositorio son demostrativos.**

No deben utilizarse datos reales de pacientes en este prototipo.
