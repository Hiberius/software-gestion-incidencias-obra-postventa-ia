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

Cloudflare Pages lee `public/_headers` durante el despliegue y aplica CSP, HSTS, bloqueo de framing, política de permisos, aislamiento de origen y `nosniff`. `security.txt` publica un punto de entrada estable para comunicar incidencias. No existen formularios que envíen datos ni scripts de terceros.

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

## Fronteras de confianza de una fase futura

```text
Dispositivo no fiable
  -> pasarela de carga aislada
  -> validación de tipo, tamaño, magic bytes, malware y metadatos
  -> almacenamiento privado con URL temporal
  -> orquestador de IA sin capacidad de cerrar incidencias
  -> salida de esquema validado
  -> cola de revisión humana
  -> servicio de workflow con autorización server-side
  -> registro append-only
```

El modelo no recibe credenciales, no construye consultas ni decide permisos. Las instrucciones encontradas en imágenes, OCR o documentos se tratan como datos, nunca como órdenes. Toda acción con efecto se comprueba de nuevo en el servicio de dominio.

## Decisión CSP

La exportación estática de Next.js incluye bootstrap y estilos inline, por lo que la CSP pública permite `'unsafe-inline'` únicamente para `script-src` y `style-src`. Se compensa con ausencia de contenido de usuario, ausencia de scripts externos, `object-src 'none'`, `base-uri 'self'`, `form-action 'self'` y `frame-ancestors 'none'`.

Si el producto incorpora cuentas, datos sensibles o carga real, la arquitectura deberá migrar a renderizado dinámico con nonce por respuesta, o adoptar SRI/hash CSP tras validación, antes de abrir esa superficie.
