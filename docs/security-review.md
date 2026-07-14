# Revisión externa de producto, IA y seguridad

Fecha de revisión: 14 de julio de 2026.

## Veredicto sobre la demo pública

La superficie publicada es un sitio estático sin autenticación, backend, carga de archivos, datos reales, llamadas a modelos, analítica de terceros ni secretos. Esto hace que varias amenazas propias del producto futuro todavía no estén expuestas. No deben confundirse controles documentados con controles desplegados.

## Objeciones que encontraría una revisión independiente

| Objeción                                                 | Respuesta actual                                                                                         | Condición antes de producción                                                                                  |
| -------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| “Los resultados parecen reales”                          | Cada métrica declara si es escenario sintético u objetivo de piloto.                                     | Vincular cada KPI real a una consulta auditable y su ventana temporal.                                         |
| “Un porcentaje de IA da falsa precisión”                 | La interfaz usa evidencia suficiente/insuficiente y razones, no porcentajes de confianza.                | Calibrar por categoría y medir abstención, error y desacuerdo humano.                                          |
| “La IA podría cerrar un caso”                            | La máquina no tiene transición de workflow; cierre exige aprobación técnica y conformidad.               | Revalidar rol y transición server-side, con eventos append-only.                                               |
| “Una foto puede contener PII o instrucciones maliciosas” | La demo no acepta archivos.                                                                              | Pipeline aislado con validación, malware scan, EXIF stripping, minimización y pruebas de inyección multimodal. |
| “Una salida plausible puede ser falsa”                   | Abstención, evidencia visible, edición y aprobación humana.                                              | Evaluaciones con casos ciegos, trazabilidad modelo/prompt y monitorización de drift.                           |
| “El ROI promete demasiado”                               | Supuestos editables, primer año separado y payback nulo cuando no hay ahorro.                            | Baseline preacordado, grupo comparable y análisis de sensibilidad.                                             |
| “Las integraciones son solo una promesa”                 | Demo, piloto y producción se etiquetan por separado.                                                     | No anunciar una integración hasta validar autenticación, permisos, errores y recuperación.                     |
| “La CSP permite inline”                                  | Es una limitación explícita de la exportación estática; no hay contenido de usuario ni scripts externos. | Migrar a nonce por respuesta o SRI/hash CSP antes de procesar datos sensibles.                                 |

## Controles comprobables en este repositorio

- Esquemas Zod con límites para entradas de dominio y ROI.
- Matriz de transición por actor y gates de cierre/reapertura.
- Pruebas unitarias para abstención, roles, cierre y límites numéricos.
- Pruebas E2E desktop y móvil del recorrido crítico y auditoría axe-core WCAG A/AA en cinco rutas.
- CSP, HSTS, Permissions-Policy, anti-framing, `nosniff`, COOP y CORP.
- Cache inmutable solo para activos versionados y media local.
- `security.txt`, sin credenciales y sin dependencias con vulnerabilidades conocidas en el audit actual.

## Riesgos aceptados temporalmente

1. La CSP de la demo usa `'unsafe-inline'` para bootstrap y estilos generados por Next.js static export.
2. Las fotografías son sintéticas y no prueban precisión sobre incidencias reales.
3. La lógica de análisis es determinista; no valida todavía un proveedor multimodal real.
4. El enlace de seguridad dirige a la política pública, no a un buzón operativo dedicado.

Estas aceptaciones son razonables para una demo pública sin datos. Dejan de serlo al añadir login, cargas, persistencia, telemetría personal o una API de IA.

## Matriz de cierre de objeciones

| Debilidad revisada                                           | Estado en la demo             | Evidencia                                                                                                        |
| ------------------------------------------------------------ | ----------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Demo determinista demasiado próxima a IA real                | Cerrada                       | Etiqueta permanente, explicación del modo determinista y matriz demo/piloto/producción.                          |
| Falsa precisión de confianza o similitud                     | Cerrada                       | Evidencia suficiente/insuficiente, coincidencia cualitativa y razones visibles.                                  |
| Métricas simuladas que parecen resultados                    | Cerrada                       | Clasificación por escenario sintético, objetivo o supuesto junto a cada cifra.                                   |
| Explicación inicial compleja                                 | Cerrada                       | Relato Captura, Decide, Previene y demo guiada.                                                                  |
| Diferencia frente a un ticket manager                        | Cerrada                       | Comparación explícita entre registro de ticket y circuito de evidencia/gates/aprendizaje.                        |
| Fuentes y fórmulas alejadas de los claims                    | Cerrada                       | Fórmula y sensibilidad junto al ROI, método junto a scorecard y fuentes en metodología.                          |
| Pesos arbitrarios en scorecard                               | Cerrada para demo             | Pesos visibles, suma validada al 100 %, fórmula y prohibición de decisión automática. El piloto debe acordarlos. |
| Ausencia de matriz hoy/piloto/futuro                         | Cerrada                       | Capability ledger público y tabla de verdad en metodología.                                                      |
| Visuales vectoriales repetitivos                             | Cerrada                       | Seis fotografías WebP documentales con etiquetas sintéticas.                                                     |
| Inputs numéricos sin control suficiente                      | Cerrada                       | Mínimos, máximos, esquema Zod, escenarios no calculables y pruebas de límites.                                   |
| Protecciones HTTP incompletas                                | Cerrada para la demo estática | CSP, HSTS, anti-framing, Permissions-Policy, COOP, CORP y security.txt verificados en Cloudflare.                |
| Upload, privacidad, prompt injection y documentos maliciosos | Formalizada, no expuesta      | Threat model y controles obligatorios antes de una fase con upload real.                                         |
| Pruebas de accesibilidad ausentes                            | Cerrada                       | Axe-core sobre home, demo, inteligencia, impacto y metodología, en desktop y móvil.                              |

“Formalizzata, non esposta” è intenzionale: la demo non accetta file né esegue un modello remoto. MIME, magic bytes, rimozione EXIF, malware scan, URL firmati, RBAC e retention UE diventano implementazione obbligatoria quando quella superficie viene introdotta.

## Fuentes de control

- Cloudflare Pages, configuración oficial de `_headers`: https://developers.cloudflare.com/pages/configuration/headers/
- Next.js, guía oficial de Content Security Policy: https://nextjs.org/docs/app/guides/content-security-policy
- OWASP, File Upload Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html
- OWASP, LLM Prompt Injection Prevention: https://cheatsheetseries.owasp.org/cheatsheets/LLM_Prompt_Injection_Prevention_Cheat_Sheet.html
