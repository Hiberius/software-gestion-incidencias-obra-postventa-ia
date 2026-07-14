# REPASO AI - plan de piloto medible

## Decision que debe permitir

Al finalizar 12 semanas, Metrovacesa debe poder decidir si REPASO AI reduce trabajo operativo y recurrencias sin degradar la calidad de la decision, la privacidad ni la trazabilidad.

## Alcance inicial

- una promocion y aproximadamente 150 viviendas;
- procesos de obra, preentrega y/o postventa que se acuerden en kickoff;
- usuarios de Calidad, Postventa, jefatura de obra y proveedores seleccionados;
- una taxonomia limitada y controlada;
- importacion inicial por CSV/XLSX y exportacion de resultados revisados;
- sin cierre, fusion de duplicados, penalizacion de proveedor ni diagnostico tecnico automaticos.

## Diseno de medicion

La baseline usa datos historicos comparables o, si no son suficientemente homogeneos, dos semanas de observacion previa. Se documentan cambios de volumen, tipologia, contratista y fase de obra para evitar atribuir a REPASO AI efectos que procedan de otra causa.

Las metricas se calculan con definiciones cerradas antes de comenzar. Se reportan mediana y percentiles cuando el promedio oculte dispersion. Una muestra de casos se revisa manualmente para validar la calidad de los datos.

## Fases y entregables

### Semanas 1-2 - Baseline y gobierno

- mapa del proceso actual y propietarios de cada decision;
- fuentes, categorias, campos obligatorios y diccionario de estados;
- baseline y metodo de comparacion;
- matriz de roles, privacidad, retencion y accesos;
- criterios de salida y plan de incidencias de seguridad.

### Semanas 3-4 - Preparacion

- configuracion de taxonomia, checklist y SLA;
- importacion de maestros y muestra historica;
- formacion breve por rol;
- pruebas de aceptacion y ensayo de rollback;
- aprobacion para iniciar la operacion controlada.

### Semanas 5-10 - Operacion controlada

- captura y estructuracion de casos reales autorizados;
- correccion humana antes de validar una sugerencia;
- solicitud de evidencia ausente;
- propuesta revisable de posibles duplicados, sin fusion automatica;
- verificacion antes/despues y reapertura cuando no haya conformidad;
- registro de tiempos, excepciones, correcciones y abstenciones.

### Semanas 11-12 - Evaluacion

- comparacion baseline/piloto con segmentacion acordada;
- auditoria manual de una muestra;
- calculo de beneficio y coste con supuestos validados;
- registro de limitaciones e incidentes;
- decision: detener, iterar o ampliar.

## Cuadro de metricas

| Metrica                               | Definicion propuesta                                                      | Fuente                | Objetivo de evaluacion              |
| ------------------------------------- | ------------------------------------------------------------------------- | --------------------- | ----------------------------------- |
| Tiempo de registro y clasificacion    | Minutos desde recepcion hasta registro validado                           | Eventos de proceso    | -50 %                               |
| Incidencia completa al primer intento | Casos con todos los campos/evidencias obligatorios al validar             | Checklist y auditoria | +20 % relativo o umbral acordado    |
| Tiempo de asignacion                  | Minutos desde validacion hasta responsable aceptado                       | Eventos de proceso    | -15 %                               |
| Reaperturas/segundas visitas          | Cierres reabiertos o visitas repetidas / cierres elegibles                | Estados y agenda      | -10 % relativo                      |
| Cierre trazable                       | Cierre con evidencia antes/despues, responsable, comprobacion y fecha     | Auditoria             | 100 %                               |
| Correccion humana                     | Sugerencias modificadas antes de validar / sugerencias revisadas          | Audit log             | Informativa, sin objetivo cosmetico |
| Abstencion util                       | Casos donde el sistema pide evidencia y evita una conclusion insuficiente | Audit log             | Revision cualitativa                |

Los porcentajes son metas de evaluacion, no resultados garantizados.

## Formula economica

1. Volumen anual = viviendas x incidencias por vivienda.
2. Ahorro administrativo = volumen x minutos ahorrados / 60 x coste hora cargado.
3. Segundas visitas evitadas = volumen x tasa baseline x reduccion relativa validada.
4. Ahorro por repeticion = visitas evitadas x coste medio validado.
5. ROI primer ano = (beneficio bruto x adopcion efectiva - coste primer ano) / coste primer ano.

Los costes y tasas se sustituyen por datos aprobados por Metrovacesa antes de presentar un caso de negocio definitivo.

## Criterios go/no-go

### Go o ampliacion

- mejora operativa material en al menos una metrica primaria con calidad de datos suficiente;
- 100 % de decisiones materiales con responsable humano y trazabilidad;
- ausencia de incidentes criticos de privacidad o seguridad;
- usuarios clave confirman que el flujo reduce aclaraciones o trabajo duplicado;
- caso economico aceptable con supuestos internos validados.

### Iterar

- senal positiva pero muestra insuficiente, adopcion irregular o integracion que distorsiona los tiempos;
- necesidad de ajustar taxonomia, checklist, interfaces o formacion.

### No-go

- no hay mejora operativa material;
- la calidad de la sugerencia genera mas revision que ahorro;
- aparecen riesgos no mitigables de privacidad, seguridad o gobierno;
- el ROI validado no supera el umbral acordado.

## Equipo minimo de piloto

- liderazgo de producto e IA por REPASO AI;
- perfil full-stack/datos y perfil seguridad/integracion dimensionados antes del kickoff;
- propietario de proceso y referente IT/seguridad de Metrovacesa;
- usuarios piloto de Calidad/Postventa y proveedores seleccionados.

Los perfiles adicionales son una necesidad de ejecucion a confirmar; no se presentan como equipo ya contratado.
