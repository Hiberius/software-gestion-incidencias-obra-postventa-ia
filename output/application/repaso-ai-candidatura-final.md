# REPASO AI - candidatura final

Documento operativo para la candidatura al Metrovacesa AI Challenge II.

## Datos para introducir en el formulario

| Campo ufficiale                | Valore proposto                       |
| ------------------------------ | ------------------------------------- |
| Nombre y apellido del contacto | Christian Calabro                     |
| Nombre de la empresa           | REPASO AI - Profesional independiente |
| E-mail del contacto            | No publicado en el repositorio        |
| Tamaño del equipo              | 1                                     |
| Area 1                         | Construccion y Obra                   |
| Area 2                         | Post-venta                            |
| Area 3                         | Eficiencia de procesos/costes         |
| Presentacion                   | `repaso-ai-candidatura.pdf`           |
| Direccion del video o demo     | https://repaso-ai.pages.dev/          |

El formulario no solicita una descripcion escrita adicional: el argumento completo esta en la presentacion PDF.

## Resumen de 30 segundos

REPASO AI es una capa de inteligencia de calidad para construccion, preentrega y postventa. Convierte fotografias, mensajes y documentos en incidencias estructuradas y revisables; pide la evidencia que falta; ayuda a detectar posibles duplicados; acompana la asignacion y exige una verificacion humana antes del cierre. Despues conecta casos similares para convertir una reparacion repetida en una accion preventiva.

No sustituye al sistema de tickets ni certifica una reparacion. Se integra por encima de los sistemas existentes y mantiene a una persona responsable en cada decision material.

## Problema que resuelve

La evidencia de calidad suele llegar incompleta y fragmentada entre fotografias, mensajes, hojas de calculo y herramientas de seguimiento. El coste no esta solo en registrar una incidencia: tambien aparece al aclararla, reasignarla, coordinar una segunda visita, reabrirla o volver a encontrar el mismo patron en otra vivienda.

REPASO AI cierra ese circuito con un registro estructurado, estados trazables, verificacion antes/despues y aprendizaje preventivo. La unidad de valor no es el ticket creado, sino la incidencia cerrada con evidencia y el patron que deja de repetirse.

## Diferenciacion

Un gestor de tickets mueve estados. REPASO AI mejora la calidad de la evidencia que entra, explicita que puede y no puede inferirse, mantiene la validacion humana, verifica el cierre y agrega recurrencias para orientar prevencion, checklists y control de proveedores.

## Estado real de la propuesta

- **Hoy:** demo publica funcional, determinista y sin login; recorrido completo con datos e imagenes sinteticos; calculadora de ROI editable; documentacion de limites, seguridad y arquitectura.
- **Piloto:** una promocion, aproximadamente 150 viviendas y 12 semanas; baseline acordada; datos reales controlados; importacion/exportacion inicial; revision humana y medicion antes/despues.
- **Produccion futura:** analisis multimodal server-side, persistencia, SSO, RBAC, auditoria append-only, residencia UE e integraciones mediante API o conectores. Estas capacidades no se presentan como ya implementadas.

## Impacto y ROI

El modelo publico usa entradas editables, no datos internos ni resultados conseguidos. El escenario prudente de demostracion parte de 1.805 viviendas/ano, 10 incidencias por vivienda, 8 minutos administrativos ahorrados, coste cargado de 32 EUR/hora, una baseline de segundas visitas del 20 %, reduccion relativa del 10 %, 70 EUR por segunda visita, coste de primer ano de 75.000 EUR y realizacion del 65 %.

Con esas hipotesis ilustrativas:

- beneficio bruto anual en regimen estable: aproximadamente 102.000 EUR;
- payback en regimen estable: aproximadamente 8,8 meses;
- ROI del primer ano: aproximadamente -11 %, por la rampa de adopcion;
- ROI en regimen estable: aproximadamente 36 %.

La sensibilidad muestra que el resultado puede ser negativo si el ahorro y la adopcion son bajos. Por eso la propuesta no promete un ROI: propone medirlo con baseline, cohortes comparables y reglas go/no-go.

## Piloto propuesto

Una promocion, aproximadamente 150 viviendas y 12 semanas:

1. Semanas 1-2: baseline, fuentes, categorias, permisos y definicion de metricas.
2. Semanas 3-4: configuracion, checklist, SLA, importacion inicial y formacion.
3. Semanas 5-10: operacion controlada, revision humana, telemetria y gestion de excepciones.
4. Semanas 11-12: comparacion, auditoria de muestra, calculo ROI y decision go/no-go.

Objetivos de evaluacion, no resultados prometidos: reducir el tiempo de registro y clasificacion; reducir incidencias incompletas; acelerar la asignacion; reducir relativamente reaperturas o segundas visitas; y lograr cierres con evidencia trazable.

## Viabilidad e integracion

La entrada recomendada es CSV/XLSX para baseline y maestros, con exportacion de resultados revisados. La evolucion a API/webhook exige autenticacion, idempotencia, reintentos, colas de error y contrato de datos. REPASO AI se plantea como capa complementaria y no como sustituto inmediato del sistema oficial.

## Seguridad y gobierno

La demo publica no recibe archivos ni datos personales y no llama a modelos externos. Un piloto con datos reales requiere, antes de activarse: minimizacion y clasificacion de datos, base juridica y retencion acordadas, controles MIME/tamano/magic bytes, eliminacion EXIF, escaneo antimalware, almacenamiento privado, URLs firmadas, salida estructurada validada, defensa ante prompt injection documental, RBAC, auditoria, residencia UE y aprobacion humana.

## Enlaces de respaldo

- Demo funcional: https://repaso-ai.pages.dev/
- Recorrido guiado: https://repaso-ai.pages.dev/demo/
- Impacto y ROI: https://repaso-ai.pages.dev/impacto/
- Metodologia y limites: https://repaso-ai.pages.dev/metodologia/
- Criterios oficiales: https://metrovacesachallenge.ai/
