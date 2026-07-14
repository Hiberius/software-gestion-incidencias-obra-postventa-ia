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
- Pruebas E2E desktop y móvil del recorrido crítico.
- CSP, HSTS, Permissions-Policy, anti-framing, `nosniff`, COOP y CORP.
- Cache inmutable solo para activos versionados y media local.
- `security.txt`, sin credenciales y sin dependencias con vulnerabilidades conocidas en el audit actual.

## Riesgos aceptados temporalmente

1. La CSP de la demo usa `'unsafe-inline'` para bootstrap y estilos generados por Next.js static export.
2. Las fotografías son sintéticas y no prueban precisión sobre incidencias reales.
3. La lógica de análisis es determinista; no valida todavía un proveedor multimodal real.
4. El enlace de seguridad dirige a la política pública, no a un buzón operativo dedicado.

Estas aceptaciones son razonables para una demo pública sin datos. Dejan de serlo al añadir login, cargas, persistencia, telemetría personal o una API de IA.

## Fuentes de control

- Cloudflare Pages, configuración oficial de `_headers`: https://developers.cloudflare.com/pages/configuration/headers/
- Next.js, guía oficial de Content Security Policy: https://nextjs.org/docs/app/guides/content-security-policy
- OWASP, File Upload Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html
- OWASP, LLM Prompt Injection Prevention: https://cheatsheetseries.owasp.org/cheatsheets/LLM_Prompt_Injection_Prevention_Cheat_Sheet.html
