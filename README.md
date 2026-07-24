# REPASO AI

### De la foto al cierre verificado. De cada incidencia, una mejora.

[![Demo pública](https://img.shields.io/badge/demo-repaso--ai.pages.dev-4bd4c2?style=for-the-badge&labelColor=061f24)](https://repaso-ai.pages.dev/)
[![CI](https://github.com/Hiberius/repaso-ai/actions/workflows/ci.yml/badge.svg)](https://github.com/Hiberius/repaso-ai/actions/workflows/ci.yml)
[![CodeQL](https://github.com/Hiberius/repaso-ai/actions/workflows/codeql.yml/badge.svg)](https://github.com/Hiberius/repaso-ai/actions/workflows/codeql.yml)
[![Next.js 16](https://img.shields.io/badge/Next.js-16-ffffff?style=flat-square&logo=nextdotjs&logoColor=000000)](https://nextjs.org/)
[![Cloudflare Pages](https://img.shields.io/badge/Cloudflare-Pages-f38020?style=flat-square&logo=cloudflare&logoColor=white)](https://pages.cloudflare.com/)
[![Node 22](https://img.shields.io/badge/Node.js-22-5fa04e?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org/)

![REPASO AI — responsable de calidad revisando evidencias de obra](public/media/hero-quality-review.webp)

REPASO AI es un prototipo funcional de **inteligencia de calidad para construcción, preentrega y postventa**. Convierte una señal incompleta —una foto, un mensaje o un documento— en una incidencia revisable; conserva la decisión humana; exige evidencia antes del cierre; y devuelve lo aprendido al sistema como recurrencia, checklist o acción preventiva.

No es una maqueta estática ni una promesa de “IA mágica”. Es una demo interactiva, auditable y desplegada, construida para demostrar el circuito completo con datos sintéticos y límites visibles.

> **Estado de candidatura.** REPASO AI fue presentado como candidatura independiente al **Metrovacesa AI Challenge II**. Ante un problema técnico con la carga del formulario, se preparó y remitió un paquete de candidatura con demo pública, dossier completo y resumen ejecutivo. La existencia de la candidatura no implica selección, validación ni relación comercial con Metrovacesa.

## Explorar el producto

- [Abrir la demo pública](https://repaso-ai.pages.dev/)
- [Recorrer la incidencia guiada](https://repaso-ai.pages.dev/demo/)
- [Ver trazabilidad y seguimiento](https://repaso-ai.pages.dev/seguimiento/)
- [Comprobar el cierre antes/después](https://repaso-ai.pages.dev/verificacion/)
- [Explorar inteligencia preventiva](https://repaso-ai.pages.dev/inteligencia/)
- [Editar el ROI y revisar el piloto](https://repaso-ai.pages.dev/impacto/)
- [Revisar metodología, seguridad y límites](https://repaso-ai.pages.dev/metodologia/)
- [Leer el case study completo](docs/case-study.md)
- [Abrir el dossier de candidatura](output/pdf/repaso-ai-candidatura.pdf)
- [Abrir el resumen ejecutivo](output/pdf/repaso-ai-resumen-ejecutivo.pdf)

## El problema

En obra y postventa, la incidencia rara vez nace completa. La evidencia queda fragmentada entre fotografías, mensajes, hojas de cálculo, herramientas de ticketing y conversaciones con proveedores. El coste no está solo en registrar el caso:

- falta contexto y alguien debe pedirlo;
- la clasificación inicial puede ser ambigua;
- aparecen duplicados o incidencias relacionadas;
- la responsabilidad cambia sin conservar el porqué;
- una foto “después” puede parecer suficiente sin demostrar la reparación;
- el caso se cierra, pero la organización vuelve a encontrar el mismo patrón.

Un gestor de tickets mueve solicitudes entre estados. El problema de calidad exige algo más: **evidencia suficiente, criterio profesional, trazabilidad y aprendizaje preventivo**.

## La solución

REPASO AI organiza un circuito cerrado:

```mermaid
flowchart LR
    A["Foto + mensaje"] --> B["Sugerencia editable"]
    B --> C["Validación técnica"]
    C --> D["Asignación y SLA"]
    D --> E["Evidencia antes / después"]
    E --> F["Conformidad del cliente"]
    F --> G["Cierre trazable"]
    G --> H["Recurrencia + prevención"]
    H --> B
```

La IA propuesta **asiste**; nunca certifica, sanciona, fusiona casos ni cierra una incidencia. Las transiciones materiales permanecen bajo control humano.

## Qué se puede probar hoy

![Página principal de REPASO AI](docs/assets/01-home.webp)

### 1. Captura y análisis explicable

El recorrido empieza con una fotografía y una descripción. La sugerencia es editable, muestra sus razones y solicita contexto adicional cuando la evidencia no basta.

![Análisis editable de una incidencia sintética](docs/assets/02-guided-analysis.webp)

### 2. Duplicados sin fusión automática

El sistema explica por qué dos casos parecen relacionados. Una persona decide si se vinculan o permanecen separados. La similitud nunca se presenta como causalidad.

### 3. Seguimiento con responsabilidad visible

Cada cambio conserva fecha, responsable, SLA, evidencia y decisión. Una reapertura no borra la historia anterior.

### 4. Cierre con doble gate humano

Una fotografía no certifica una reparación. El flujo exige validación técnica y conformidad del cliente antes de habilitar el cierre.

![Verificación antes y después con gates humanos](docs/assets/03-verification.webp)

### 5. Recurrencias que vuelven al proceso

Los casos semejantes generan una señal revisable, no una conclusión automática. Calidad puede convertirla en checklist, muestreo o acción preventiva.

![Inteligencia preventiva y scorecard con datos sintéticos](docs/assets/04-intelligence.webp)

### 6. ROI que enseña sus supuestos

El caso de negocio separa régimen estable, adopción del primer año y coste del proyecto. Todos los inputs tienen límites y el modelo puede mostrar un resultado negativo.

![Calculadora de ROI y piloto propuesto](docs/assets/05-impact.webp)

## Por qué no es otro ticket manager

| Gestor de tickets                         | REPASO AI                                                   |
| ----------------------------------------- | ----------------------------------------------------------- |
| Registra solicitud, responsable y estado. | Estructura evidencia, contexto y decisión.                  |
| Da por buena la información recibida.     | Señala lo que falta antes de avanzar.                       |
| Puede cerrar con un cambio de estado.     | Exige validación técnica y conformidad.                     |
| Busca duplicados por campos o texto.      | Explica semejanzas y prohíbe la fusión automática.          |
| Termina cuando se cierra el ticket.       | Devuelve el caso verificado a prevención y control.         |
| Reporta métricas operativas.              | Separa dato sintético, objetivo, supuesto y resultado real. |

## Capacidad real: hoy, piloto y producción

| Fase                  | Incluido                                                                                               | Deliberadamente fuera de alcance                                             |
| --------------------- | ------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------- |
| **Demo pública**      | Next.js estático, flujo completo, datos e imágenes sintéticos, ROI editable, pruebas automatizadas.    | Sin login, base de datos, upload, modelo remoto, API o datos reales.         |
| **Piloto controlado** | Una promoción, baseline acordada, usuarios definidos, importación inicial y medición antes/después.    | Sin integración corporativa antes de revisión técnica, legal y de seguridad. |
| **Producción futura** | IA multimodal server-side, SSO, RBAC, auditoría append-only, residencia UE, retención e integraciones. | Ninguna de estas capacidades se presenta como ya desplegada.                 |

Esta separación es una decisión de producto: una arquitectura futura no debe confundirse con una capacidad disponible.

## Arquitectura de la demo

```mermaid
flowchart TB
    U["Navegador"] --> N["Next.js App Router"]
    N --> R["React: demo guiada + ROI"]
    N --> Z["Zod: contratos y límites"]
    R --> F["Fixtures sintéticos deterministas"]
    N --> E["Static export"]
    E --> C["Cloudflare Pages CDN"]
```

La versión pública se exporta como HTML, CSS y JavaScript estáticos. No recibe archivos, no persiste datos, no llama a un modelo y no contiene secretos de runtime. Esto reduce superficie de ataque y elimina dependencias externas durante la evaluación.

Una fase con datos reales requiere otra frontera de confianza:

```mermaid
flowchart LR
    A["Dispositivo no fiable"] --> B["Carga aislada"]
    B --> C["MIME + tamaño + magic bytes"]
    C --> D["Malware scan + EXIF stripping"]
    D --> E["Almacenamiento privado + URL firmada"]
    E --> F["Orquestador de IA sin permisos de cierre"]
    F --> G["Salida estructurada validada"]
    G --> H["Cola de revisión humana"]
    H --> I["Workflow con autorización server-side"]
    I --> J["Auditoría append-only"]
```

Consulta [la arquitectura detallada](docs/architecture.md) y [el threat model](docs/ai-safety-and-human-review.md).

## Seguridad y gobierno de IA

El producto parte de cinco invariantes:

1. toda salida de IA es una sugerencia editable;
2. una semejanza no fusiona incidencias;
3. ninguna foto certifica por sí sola una reparación;
4. ningún caso cierra sin aprobación técnica y conformidad;
5. ningún objetivo o supuesto se presenta como resultado conseguido.

La demo pública incluye:

- CSP, HSTS, anti-framing, `nosniff`, Permissions Policy, COOP y CORP;
- `security.txt` y política pública;
- validación Zod y límites de inputs;
- ausencia de servicios de terceros, trackers, formularios y secretos;
- pruebas de reglas de dominio, transparencia, seguridad y accesibilidad;
- CodeQL, Dependabot y auditoría de dependencias en CI.

Antes de introducir upload o IA remota son obligatorios: validación MIME/tamaño/magic bytes, escaneo antimalware, eliminación EXIF, aislamiento documental, defensa contra prompt injection, salidas estructuradas, RBAC, auditoría inmutable, retención acordada, residencia UE y aprobación humana.

Lee [SECURITY.md](SECURITY.md) y [la revisión externa](docs/security-review.md).

## ROI y piloto

La calculadora usa entradas editables para:

- viviendas anuales;
- incidencias por vivienda;
- minutos administrativos ahorrados;
- coste horario cargado;
- baseline de segundas visitas;
- reducción relativa o absoluta;
- coste por segunda visita;
- coste del proyecto;
- realización durante el primer año.

La fórmula, los límites y la sensibilidad están junto a los resultados. Las cifras del repositorio son **escenarios sintéticos**, no datos internos ni impacto conseguido.

El piloto propuesto dura 12 semanas:

| Semanas | Fase        | Entregable                                                |
| ------- | ----------- | --------------------------------------------------------- |
| 1–2     | Baseline    | Métricas, fuentes, categorías, permisos y proceso actual. |
| 3–4     | Preparación | Checklists, SLA, proveedores, usuarios y formación.       |
| 5–10    | Operación   | Casos reales controlados y medición de tiempos y calidad. |
| 11–12   | Evaluación  | Comparativa, auditoría de muestra y decisión go/no-go.    |

Los objetivos publicados son criterios de evaluación, no promesas.

## Cómo se construyó

El proyecto siguió un proceso de producto completo:

1. lectura del reto y traducción de criterios en requisitos verificables;
2. definición del problema operativo y del closed loop;
3. modelado de reglas de dominio antes de la interfaz;
4. diseño editorial orientado a evidencia, no a decoración “AI”;
5. construcción de la demo determinista y del ROI parametrizable;
6. revisión adversarial desde producto, IA, seguridad y credibilidad;
7. corrección de falsa precisión, claims ambiguos y estados automáticos;
8. generación de imágenes documentales sintéticas;
9. pruebas unitarias, E2E, accesibilidad y headers de producción;
10. despliegue en Cloudflare Pages y preparación del dossier de candidatura.

El trabajo fue dirigido por **Christian Calabrò** con un workflow intensivo de ingeniería asistida por IA. La etiqueta de trabajo empleada por el autor para documentar esa sesión fue **“5.6 Sol Extra High”**. Se publica como nombre interno del modo de razonamiento y revisión, no como una denominación comercial o certificación pública de un proveedor de modelos. La estrategia, las decisiones de producto, la selección de riesgos y la aprobación final permanecieron bajo dirección humana.

El [case study](docs/case-study.md) documenta decisiones, objeciones, iteraciones y evidencias.

## Calidad verificable

Los checks locales y de CI son los mismos:

```bash
npm run verify
npm run test:e2e
npm audit --audit-level=moderate
```

`npm run verify` ejecuta:

- Prettier;
- ESLint con reglas Core Web Vitals;
- TypeScript estricto;
- Vitest con cobertura mínima del 80 % en lógica de dominio;
- build estático de producción.

Playwright prueba el recorrido crítico en Chromium desktop y móvil. Axe-core audita automáticamente reglas WCAG A/AA en las rutas principales.

## Stack

- Next.js 16, React 19 y TypeScript estricto;
- App Router con `output: "export"`;
- Tailwind CSS 4 y CSS editorial propio;
- Zod para contratos y límites;
- Vitest, Testing Library, Playwright y axe-core;
- Cloudflare Pages para entrega estática;
- GitHub Actions, CodeQL y Dependabot para calidad continua.

## Desarrollo local

Requisitos: Node.js 22 y npm.

```bash
git clone https://github.com/Hiberius/repaso-ai.git
cd repaso-ai
npm ci
npm run dev
```

Abrir `http://localhost:3000`.

Para comprobar el export de Cloudflare:

```bash
npm run build
npm run preview:cloudflare
```

## Mapa del repositorio

```text
app/                    rutas, metadata y superficies del producto
components/             demo guiada, visuales, gráficos y calculadora
lib/                    reglas de dominio, datos sintéticos, ROI y SEO
tests/                  pruebas unitarias y contratos de transparencia
e2e/                    flujo crítico y accesibilidad
docs/                   arquitectura, seguridad, piloto y case study
public/media/           imágenes documentales sintéticas optimizadas
output/application/     textos y checklist de candidatura
output/pdf/             dossier y resumen ejecutivo
scripts/                generación del dossier y capturas reproducibles
.github/                CI, CodeQL, Dependabot y plantillas
```

## Documentación

- [Case study: del reto al producto](docs/case-study.md)
- [Arquitectura](docs/architecture.md)
- [Seguridad y revisión humana](docs/ai-safety-and-human-review.md)
- [Revisión adversarial](docs/security-review.md)
- [Ledger de claims y evidencias](docs/evidence-ledger.md)
- [Plan de piloto](docs/pilot-plan.md)
- [Guion de demo](docs/demo-script.md)
- [Sistema de diseño](DESIGN.md)
- [Definición de producto](PRODUCT.md)
- [Dossier de candidatura](output/pdf/repaso-ai-candidatura.pdf)
- [Checksums de artefactos](ARTIFACTS.sha256)

## Autor y trabajo

REPASO AI fue concebido y dirigido por [Christian Calabrò](https://github.com/Hiberius).

Este repositorio también funciona como muestra del tipo de productos que construye: conceptos AI-first convertidos en experiencias utilizables, con estrategia, diseño, arquitectura, seguridad, evaluación y narrativa comercial resueltos como un único sistema.

Para una colaboración, piloto o adaptación del producto, utiliza [GitHub Discussions](https://github.com/Hiberius/repaso-ai/discussions) o abre una [consulta](https://github.com/Hiberius/repaso-ai/issues/new/choose) sin incluir datos confidenciales.

## Avisos

- Todos los nombres, promociones, viviendas, proveedores, incidencias, imágenes y métricas operativas son sintéticos.
- El producto no emite diagnósticos técnicos certificados.
- Metrovacesa no patrocina ni mantiene este repositorio.
- La candidatura no implica selección, validación o contratación.
- El código se publica para evaluación y portfolio; consulta [LICENSE](LICENSE) antes de reutilizarlo.
