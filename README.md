# REPASO AI

Demo pública e interactiva de una capa de inteligencia de calidad para construcción, preentrega y postventa.

> De la foto al cierre verificado. De cada incidencia, una mejora.

## Qué incluye

- landing pública y demo guiada sin login;
- análisis determinista editable y abstención cuando falta evidencia;
- revisión de posibles duplicados sin fusión automática;
- workflow con SLA, trazabilidad y reapertura;
- comparación antes/después y doble gate humano;
- inteligencia preventiva, scorecard de proveedor y ROI editable;
- metodología, fuentes, privacidad y límites claramente visibles.

Todos los datos, nombres, promociones e indicadores operativos de la demo son sintéticos.

## Ejecutar

Requiere Node 22 y npm 10.

```bash
npm install
npm run dev
```

Abrir `http://localhost:3000`.

## Verificación

```bash
npm run verify
npm run test:e2e
npm audit --audit-level=moderate
```

`npm run verify` ejecuta formato, lint, TypeScript, cobertura y build de producción. La lógica de dominio tiene umbral de cobertura del 80 %; el recorrido crítico se prueba en Chromium desktop y móvil.

## Cloudflare Pages

El sitio usa `output: "export"` y genera `out/`.

```bash
npm run build
npm run preview:cloudflare
npx wrangler pages project create repaso-ai --production-branch main
npx wrangler pages deploy out --project-name=repaso-ai --branch=main
```

La versión estática no necesita API, base de datos ni secretos. Si una fase posterior requiere OpenAI server-side, autenticación, persistencia o Server Actions, deberá migrarse a Cloudflare Workers con OpenNext.

## Estado y límites

- Demo funcional: sí.
- Datos reales: no.
- Diagnóstico técnico certificado: no.
- Cierre automático: no.
- Integraciones enterprise reales: no; se muestran como vías de implantación.
- API de OpenAI: no se usa en esta versión pública determinista.

Consulta [arquitectura](docs/architecture.md), [seguridad y revisión humana](docs/ai-safety-and-human-review.md) y [guion de demo](docs/demo-script.md).
