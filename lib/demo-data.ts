export const dashboardMetrics = [
  {
    label: "Incidencias registradas",
    value: "126",
    note: "3 promociones ficticias",
    kind: "synthetic_scenario",
    disclosure: "Escenario sintético para demostrar el producto.",
  },
  {
    label: "Capturas completas",
    value: "86 %",
    note: "+21 pp vs. baseline simulada",
    kind: "synthetic_scenario",
    disclosure: "Comparación interna del escenario sintético.",
  },
  {
    label: "Tiempo de registro",
    value: "4m 12s",
    note: "−52 % en el escenario demo",
    kind: "synthetic_scenario",
    disclosure: "Tiempo simulado, no resultado operativo real.",
  },
  {
    label: "Cierres trazables",
    value: "100 %",
    note: "Objetivo del piloto",
    kind: "pilot_target",
    disclosure: "Meta de evaluación, no resultado conseguido.",
  },
];

export const categoryData = [
  { name: "Carpintería", value: 32 },
  { name: "Acabados", value: 27 },
  { name: "Revestimientos", value: 21 },
  { name: "Fontanería", value: 16 },
  { name: "Electricidad", value: 12 },
  { name: "Otros", value: 18 },
];

export const trendData = [
  { month: "Abr", abiertas: 18, cerradas: 24 },
  { month: "May", abiertas: 13, cerradas: 29 },
  { month: "Jun", abiertas: 7, cerradas: 35 },
];

export const supplierScores = [
  {
    criterion: "Calidad",
    score: 78,
    weight: 30,
    evidence: "14/18 aceptadas sin segunda actuación",
  },
  {
    criterion: "Costes",
    score: 86,
    weight: 15,
    evidence: "+1,8 % de desviación media simulada",
  },
  {
    criterion: "Plazos",
    score: 83,
    weight: 20,
    evidence: "15/18 intervenciones dentro de SLA",
  },
  {
    criterion: "Cumplimiento",
    score: 92,
    weight: 20,
    evidence: "22/24 paquetes documentales completos",
  },
  {
    criterion: "Atención posterior",
    score: 89,
    weight: 15,
    evidence: "3 h 20 min de respuesta mediana",
  },
];

export const timeline = [
  {
    date: "02 JUL · 09:14",
    state: "Nueva",
    detail: "Creada a partir de fotografía y mensaje del cliente.",
  },
  {
    date: "02 JUL · 09:15",
    state: "Pendiente de validación",
    detail: "Análisis asistido y solicitud de una vista general.",
  },
  {
    date: "02 JUL · 10:03",
    state: "Validada",
    detail: "Laura Martín confirma la clasificación sugerida.",
  },
  {
    date: "02 JUL · 10:18",
    state: "Asignada",
    detail: "Ventana Sur Demo, S.L. · vence 09 JUL, 18:00.",
  },
  {
    date: "03 JUL · 12:20",
    state: "Pendiente de verificación",
    detail: "Primera evidencia incompleta: no muestra el perímetro.",
  },
  {
    date: "07 JUL · 09:10",
    state: "Reabierta",
    detail: "El cliente aún percibe una leve corriente de aire.",
  },
  {
    date: "09 JUL · 10:15",
    state: "Cerrada",
    detail: "Validación técnica y conformidad del cliente registradas.",
  },
];

export const methodologySources = [
  {
    label: "Metrovacesa AI Challenge II",
    href: "https://metrovacesachallenge.ai/",
    description: "Requisitos, criterios y calendario del certamen.",
  },
  {
    label: "Condiciones generales",
    href: "https://metrovacesachallenge.ai/condiciones-generales/",
    description: "Criterios del jurado y condiciones de participación.",
  },
  {
    label: "Estudio UPC sobre defectos de entrega",
    href: "https://upcommons.upc.edu/entities/publication/010e4df7-6c54-4669-8976-680f71c0f0ce",
    description:
      "Artículo académico sobre 52.552 defectos de entrega en 2.179 viviendas de 16 promociones en España.",
  },
  {
    label: "OWASP · Prompt Injection Prevention",
    href: "https://cheatsheetseries.owasp.org/cheatsheets/LLM_Prompt_Injection_Prevention_Cheat_Sheet.html",
    description:
      "Controles de referencia para tratar texto, documentos e imágenes como entrada no fiable.",
  },
  {
    label: "Cloudflare Pages · Headers",
    href: "https://developers.cloudflare.com/pages/configuration/headers/",
    description:
      "Documentación oficial de los encabezados HTTP aplicados mediante el archivo _headers.",
  },
];
