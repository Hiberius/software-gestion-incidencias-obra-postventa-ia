export const dashboardMetrics = [
  {
    label: "Incidencias registradas",
    value: "126",
    note: "3 promociones ficticias",
  },
  {
    label: "Capturas completas",
    value: "86 %",
    note: "+21 pp vs. baseline simulada",
  },
  {
    label: "Tiempo de registro",
    value: "4m 12s",
    note: "−52 % en el escenario demo",
  },
  { label: "Cierres trazables", value: "100 %", note: "88 de 88 cierres" },
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
    evidence: "14/18 aceptadas sin segunda actuación",
  },
  {
    criterion: "Costes",
    score: 86,
    evidence: "+1,8 % de desviación media simulada",
  },
  {
    criterion: "Plazos",
    score: 83,
    evidence: "15/18 intervenciones dentro de SLA",
  },
  {
    criterion: "Cumplimiento",
    score: 92,
    evidence: "22/24 paquetes documentales completos",
  },
  {
    criterion: "Atención posterior",
    score: 89,
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
    href: "https://upcommons.upc.edu/",
    description:
      "Referencia académica; el dato concreto se validará antes del envío.",
  },
];
