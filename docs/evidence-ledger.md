# Ledger de claims y evidencias

Este documento conecta las afirmaciones principales de REPASO AI con una
evidencia inspeccionable. Distingue capacidad implementada, comportamiento
probado y propuesta futura.

| Claim                                                                           | Estado                                  | Evidencia                                                                                           |
| ------------------------------------------------------------------------------- | --------------------------------------- | --------------------------------------------------------------------------------------------------- |
| Existe una demo pública funcional.                                              | Implementado                            | [Sitio desplegado](https://repaso-ai.pages.dev/), `app/` y `components/`.                           |
| El flujo completo puede recorrerse sin servicios externos.                      | Implementado y probado                  | `components/guided-demo.tsx`, `e2e/guided-demo.spec.ts` y `next.config.ts`.                         |
| La sugerencia puede editarse antes de validar.                                  | Implementado y probado                  | Controles de análisis en `components/guided-demo.tsx` y prueba E2E.                                 |
| La IA no certifica una reparación.                                              | Regla visible                           | Copy persistente en demo, verificación y metodología; `tests/transparency.test.ts`.                 |
| Los casos semejantes no se fusionan automáticamente.                            | Regla implementada                      | Paso de duplicado, `lib/workflow.ts` y pruebas de dominio.                                          |
| El cierre exige validación técnica y conformidad.                               | Regla implementada y probada            | `lib/workflow.ts`, `tests/workflow.test.ts` y recorrido E2E.                                        |
| El ROI expone inputs, fórmula y sensibilidad.                                   | Implementado y probado                  | `lib/roi.ts`, `components/roi-calculator.tsx` y `tests/roi.test.ts`.                                |
| Las cifras de la demo son sintéticas.                                           | Etiquetado y probado                    | Ribbon global, disclosures en métricas, `lib/demo-data.ts` y `tests/transparency.test.ts`.          |
| La demo es un export estático.                                                  | Implementado y probado                  | `output: "export"` en `next.config.ts` y build de CI.                                               |
| La demo no acepta uploads ni persiste datos.                                    | Implementado por ausencia de superficie | Sin handlers, formularios de envío, base de datos o runtime; revisión en `docs/security-review.md`. |
| El sitio aplica headers defensivos en Cloudflare.                               | Implementado                            | `public/_headers`, `public/.well-known/security.txt` y `tests/security.test.ts`.                    |
| Las rutas principales cumplen las reglas WCAG A/AA detectables automáticamente. | Probado                                 | `e2e/accessibility.spec.ts` con axe-core, desktop y móvil.                                          |
| La lógica de dominio mantiene al menos 80 % de cobertura.                       | Probado                                 | Umbrales en `vitest.config.ts` y job CI.                                                            |
| Las dependencias se revisan de forma continua.                                  | Implementado                            | `npm audit`, Dependabot y CodeQL en `.github/`.                                                     |
| El piloto puede reducir trabajo y recurrencias.                                 | Hipótesis a validar                     | `docs/pilot-plan.md`; no se presenta como resultado conseguido.                                     |
| La IA multimodal, SSO, RBAC e integraciones estarán disponibles.                | Propuesta futura                        | `docs/architecture.md`; requieren implementación y aceptación antes de anunciar disponibilidad.     |
| REPASO AI fue preparado y presentado como candidatura independiente.            | Hecho declarado por el autor            | Paquete archivado en `output/application/` y `output/pdf/`. No implica selección.                   |

## Reglas de lectura

- **Implementado** significa que existe en el repositorio o en el despliegue
  público.
- **Probado** significa que hay una comprobación automatizada reproducible.
- **Hipótesis** significa que el piloto debe producir la evidencia.
- **Propuesta futura** no es una capacidad disponible.

Si cambia un claim, debe actualizarse su evidencia en el mismo pull request.
