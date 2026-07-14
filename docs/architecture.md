# Arquitectura

## Versión de candidatura

```text
Browser
  ├─ Next.js App Router · static export
  ├─ React client state for the guided workflow and ROI calculator
  ├─ deterministic synthetic fixtures
  └─ Zod-validated domain contracts
        ↓
Cloudflare Pages CDN
```

La demo se exporta como HTML, CSS y JavaScript estáticos. No necesita secretos, base de datos ni API en tiempo de ejecución; esto reduce la superficie de fallo y permite recorrer el flujo completo sin depender de servicios externos.

## Módulos

- `lib/analysis.ts`: resultados de análisis sintético y abstención.
- `lib/workflow.ts`: transiciones y gates de cierre.
- `lib/roi.ts`: cálculo parametrizado y escenarios.
- `lib/demo-data.ts`: incidencias, métricas y scorecards sintéticas.
- `components/guided-demo.tsx`: recorrido interactivo.
- `app/`: páginas públicas y superficies de producto.

## Evolución enterprise

Cuando se necesiten análisis multimodal real, autenticación o persistencia, se migrará el runtime a Cloudflare Workers con OpenNext o a una plataforma equivalente. La ruta server-side deberá:

1. validar tamaño, MIME y esquema de entrada;
2. llamar al proveedor de IA sin exponer credenciales;
3. exigir salida estructurada y validarla con Zod;
4. registrar sugerencia, edición y aprobación como eventos separados;
5. aplicar rate limiting, retención y controles de acceso;
6. mantener un fallback determinista para demostración y contingencia.

Las integraciones CSV, API, webhook, SSO, SAP y ticketing son vías de implantación, no capacidades ya desplegadas.
