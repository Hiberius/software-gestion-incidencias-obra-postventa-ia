---
name: REPASO AI
description: De la foto al cierre verificado. De cada incidencia, una mejora.
colors:
  worksite-ink: "oklch(20.92% 0.0294 223.57)"
  control-ink: "oklch(26.85% 0.0350 220.61)"
  plan-paper: "oklch(95.45% 0.0108 95.17)"
  plan-paper-deep: "oklch(91.85% 0.0138 92.99)"
  evidence-white: "oklch(98.75% 0.0067 97.35)"
  muted-slate: "oklch(49.65% 0.0147 196.69)"
  verified-teal: "oklch(79.06% 0.1267 179.51)"
  verified-teal-deep: "oklch(47.25% 0.0864 176.43)"
  review-amber: "oklch(79.26% 0.1062 71.67)"
  risk-coral: "oklch(66.40% 0.1292 29.18)"
typography:
  display:
    fontFamily: "DM Serif Display, Georgia, serif"
    fontSize: "clamp(3.25rem, 7vw, 5.5rem)"
    fontWeight: 400
    lineHeight: 0.98
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "DM Serif Display, Georgia, serif"
    fontSize: "clamp(2.25rem, 4.8vw, 4.5rem)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Manrope Variable, Avenir Next, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 760
    lineHeight: 1.3
    letterSpacing: "-0.015em"
  body:
    fontFamily: "Manrope Variable, Avenir Next, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 450
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "Manrope Variable, Avenir Next, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 780
    lineHeight: 1.35
    letterSpacing: "0.11em"
rounded:
  square: "0px"
  detail: "2px"
  circular: "999px"
spacing:
  xs: "6px"
  sm: "10px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
  3xl: "82px"
components:
  button-primary:
    backgroundColor: "{colors.worksite-ink}"
    textColor: "{colors.plan-paper}"
    typography: "{typography.label}"
    rounded: "{rounded.square}"
    padding: "12px 18px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.verified-teal}"
    textColor: "{colors.worksite-ink}"
  button-secondary:
    backgroundColor: "{colors.plan-paper}"
    textColor: "{colors.worksite-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.square}"
    padding: "12px 18px"
    height: "48px"
  field:
    backgroundColor: "{colors.evidence-white}"
    textColor: "{colors.worksite-ink}"
    typography: "{typography.body}"
    rounded: "{rounded.square}"
    padding: "10px 12px"
    height: "44px"
  evidence-panel:
    backgroundColor: "{colors.evidence-white}"
    textColor: "{colors.worksite-ink}"
    rounded: "{rounded.detail}"
    padding: "24px"
  status-verified:
    backgroundColor: "{colors.verified-teal}"
    textColor: "{colors.worksite-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.detail}"
    padding: "6px 8px"
---

# Design System: REPASO AI

## Overview

**Creative North Star: "Mesa de Evidencias"**

REPASO AI debe sentirse como la mesa de trabajo de un responsable de calidad: fotografías, planos, muestras, decisiones y firmas conectadas en una secuencia comprensible. La interfaz combina la disciplina de producto de Linear, la claridad explicativa de Stripe y la sensibilidad arquitectónica de Arquitectura Viva, pero conserva una identidad propia y operativa.

El sistema es product-first. La landing presenta la tesis; la demo y las superficies operativas la prueban. La jerarquía separa siempre señal, sugerencia de IA, decisión humana y resultado verificado. La densidad puede ser alta, pero nunca confusa. El detalle aparece progresivamente y cada elemento visual debe explicar, evidenciar o permitir una acción.

**Key Characteristics:**

- Autoridad tranquila y precisión técnica.
- Papel cálido para el relato y tinta profunda para el control operativo.
- Fotografías documentales como evidencia, nunca como decoración.
- Composición editorial asimétrica con ritmo arquitectónico.
- Estados humanos e IA claramente diferenciados.
- Movimiento responsive, breve y completamente prescindible.

## Colors

Una paleta comprometida de tinta, papel y sellos de revisión. El color indica función y estado; no compensa una jerarquía débil.

### Primary

- **Tinta de Obra** (`oklch(20.92% 0.0294 223.57)`): navegación, superficies de control, texto principal y llamadas a la acción de máxima prioridad.
- **Tinta de Control** (`oklch(26.85% 0.0350 220.61)`): capas operativas secundarias y separación tonal dentro de superficies oscuras.

### Secondary

- **Sello Verificado** (`oklch(79.06% 0.1267 179.51)`): progreso confirmado, foco, acciones completadas y puntos de atención positiva. Su rareza le da significado.
- **Sello Verificado Profundo** (`oklch(47.25% 0.0864 176.43)`): texto y trazos de verificación sobre fondos claros.

### Tertiary

- **Ámbar de Revisión** (`oklch(79.26% 0.1062 71.67)`): evidencia incompleta, abstención, espera o revisión pendiente.
- **Coral de Riesgo** (`oklch(66.40% 0.1292 29.18)`): bloqueo, vencimiento o error que necesita intervención. Nunca se usa como decoración.

### Neutral

- **Papel de Plano** (`oklch(95.45% 0.0108 95.17)`): fondo principal cálido.
- **Papel de Plano Profundo** (`oklch(91.85% 0.0138 92.99)`): bandas, controles inactivos y separación tonal.
- **Blanco de Evidencia** (`oklch(98.75% 0.0067 97.35)`): documentos, fotografías y paneles que deben leerse con máxima claridad.
- **Pizarra Silenciosa** (`oklch(49.65% 0.0147 196.69)`): texto secundario y metadatos.

**The Verified Seal Rule.** Sello Verificado ocupa como máximo el 12 % de una pantalla y solo marca progreso confirmado, foco o acción primaria.

**The No Gradient Rule.** Los gradientes están prohibidos. La profundidad procede del contraste tonal, la escala, la fotografía y la superposición física justificada.

**The Human State Rule.** Ningún estado depende solo del color. Icono, verbo y responsable acompañan siempre a la señal cromática.

## Typography

**Display Font:** DM Serif Display (con Georgia como fallback)  
**Body Font:** Manrope Variable (con Avenir Next como fallback)

**Character:** La serif aporta autoridad editorial a la tesis y a los cambios de capítulo. La sans variable mantiene precisión, compacidad y legibilidad en controles, métricas y evidencia. La pareja debe sentirse más cercana a un informe técnico bien editado que a una campaña publicitaria.

### Hierarchy

- **Display** (400, `clamp(3.25rem, 7vw, 5.5rem)`, 0.98): una sola idea principal por página. Nunca ocupa toda la pantalla ni desplaza la evidencia por debajo del primer viewport.
- **Headline** (400, `clamp(2.25rem, 4.8vw, 4.5rem)`, 1): títulos de capítulo y resultados importantes.
- **Title** (760, `1.125rem`, 1.3): paneles, decisiones y acciones.
- **Body** (450, `0.9375rem`, 1.6): explicación y evidencia, con una longitud recomendada de 45 a 72 caracteres por línea.
- **Label** (780, `0.6875rem`, 0.11em, mayúsculas selectivas): metadatos, estados y navegación auxiliar. Nunca se usa para párrafos.

**The One Serif Claim Rule.** La serif se reserva a tesis, capítulos y cifras decisivas. Controles, estados y datos operativos permanecen en Manrope.

**The Plain Spanish Rule.** Cada término técnico debe apoyarse en una frase sencilla que explique qué ocurre, quién decide y qué falta.

## Elevation

El sistema es estructuralmente plano. La profundidad se construye con fondos tonales, bordes de un píxel, escala y superposición de evidencia. La única sombra ambiental corresponde a una fotografía, documento o panel activo que se separa físicamente de la mesa; las tarjetas pasivas no flotan.

### Shadow Vocabulary

- **Evidence Lift** (`0 24px 70px oklch(20.92% 0.0294 223.57 / 0.12)`): una sola pieza de evidencia protagonista o un panel temporalmente activo.

**The Flat-by-Default Rule.** Si más de un elemento del mismo grupo tiene sombra, la jerarquía ha fallado. Retira las sombras y corrige estructura, contraste o espacio.

**The One-Pixel Edge Rule.** Los bordes estructurales son de un píxel. Las franjas laterales de color superiores a un píxel están prohibidas.

## Components

Los componentes son precisos y táctiles. Cada uno debe indicar con claridad si informa, permite una acción o representa una decisión registrada.

### Buttons

- **Shape:** rectangular y arquitectónica (`0px`), con altura mínima de `48px` para acciones principales.
- **Primary:** Tinta de Obra con texto Papel de Plano, etiqueta compacta y padding `12px 18px`.
- **Hover / Focus:** cambia a Sello Verificado y puede elevarse `2px`; el foco visible usa un anillo de `3px`. Con movimiento reducido, no hay desplazamiento.
- **Secondary:** fondo transparente, borde de un píxel y la misma altura del primario. Las acciones terciarias son enlaces verbales, no botones contenedores adicionales.

### Chips

- **Style:** rectángulo compacto (`2px`), borde de un píxel y verbo o estado explícito.
- **State:** solo los filtros interactivos pueden parecer controles. Los estados informativos no adoptan una silueta de píldora grande.

### Cards / Containers

- **Corner Style:** esquinas casi rectas (`0px` a `2px`).
- **Background:** Papel de Plano para contexto, Blanco de Evidencia para documentación y Tinta de Obra para control concentrado.
- **Shadow Strategy:** plano por defecto; Evidence Lift solo para la evidencia protagonista.
- **Border:** un píxel y contraste bajo, nunca franjas laterales gruesas.
- **Internal Padding:** `16px`, `24px` o `32px` según densidad.
- **Composition:** evitar rejillas repetitivas de tarjetas idénticas. Preferir filas comparables, grupos editoriales y una pieza dominante.

### Inputs / Fields

- **Style:** Blanco de Evidencia, borde de un píxel, sin redondeo y altura mínima de `44px`.
- **Focus:** borde Sello Verificado Profundo más anillo de foco visible.
- **Error / Disabled:** Coral de Riesgo con mensaje textual; estado deshabilitado conserva contraste y explica el requisito pendiente.

### Navigation

- Barra superior compacta y estable, con nombre del producto, capítulos principales y una sola acción destacada.
- El estado activo combina texto, posición e indicador de un píxel. En móvil, la navegación se convierte en un control accesible y no en una fila horizontal recortada.

### Evidence Frame

- La fotografía conserva proporción real, pie de foto, identificador sintético, fecha y localización.
- Antes y después deben compartir encuadre o explicar por qué no son comparables.
- Las anotaciones visuales son discretas y nunca simulan una certeza técnica que la imagen no permite.

### Responsive and Motion Behavior

- La estructura pasa de composición editorial a secuencia lineal sin perder el orden de decisión.
- No se fijan alturas para bloques con texto. La interfaz debe soportar expansión del contenido en español.
- El movimiento se limita a feedback, progreso y cambio de estado entre `160ms` y `240ms`. `prefers-reduced-motion` elimina desplazamiento y scroll animado.

## Do's and Don'ts

### Do:

- **Do** hacer comprensible la propuesta central en menos de veinte segundos y ofrecer el detalle por capas.
- **Do** mostrar fotografías documentales, identificadas como sintéticas, con contexto suficiente para entender el caso.
- **Do** separar visualmente sugerencia de IA, revisión técnica, conformidad y cierre.
- **Do** etiquetar cada cifra como dato sintético, objetivo de piloto, supuesto editable o fuente pública.
- **Do** utilizar Sello Verificado únicamente para foco, progreso confirmado y acciones principales.
- **Do** mantener WCAG 2.2 AA, objetivos táctiles adecuados, navegación por teclado y estados comprensibles sin color.
- **Do** usar iconos Lucide solo cuando aclaren una acción o un estado y mantener una geometría coherente.

### Don't:

- **Don't** usar plantillas SaaS genéricas con una sucesión de tarjetas idénticas.
- **Don't** usar gradientes “AI”, estética cyberpunk, neón o glassmorphism.
- **Don't** usar fotografías corporativas de stock con personas sonriendo a cámara.
- **Don't** usar dashboards flotantes como decoración sin relación operativa.
- **Don't** imitar el sitio o la identidad visual de Metrovacesa.
- **Don't** crear una interfaz de hackathon que exagere automatización, precisión o capacidades no implementadas.
- **Don't** usar gradientes, texto con degradado, fondos acrílicos o transparencias decorativas.
- **Don't** usar bordes laterales de color superiores a `1px`.
- **Don't** presentar porcentajes de confianza como precisión del modelo ni resultados simulados como impacto conseguido.
- **Don't** utilizar títulos gigantes que ocupen casi toda la pantalla o escondan la evidencia principal.
