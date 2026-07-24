# Contribuir a REPASO AI

Gracias por revisar el proyecto. Antes de proponer un cambio, conserva sus invariantes de producto.

## Invariantes

- Todo el copy visible permanece en español profesional.
- Todo dato operativo incluido es sintético y está etiquetado.
- La salida de IA es una sugerencia editable, nunca un diagnóstico.
- Ninguna incidencia cierra sin aprobación técnica y conformidad.
- Los casos semejantes nunca se fusionan automáticamente.
- Los supuestos de ROI nunca se presentan como resultados obtenidos.

## Preparación

```bash
npm ci
npm run dev
```

El proyecto requiere Node.js 22.

## Antes de abrir un pull request

```bash
npm run verify
npm run test:e2e
npm audit --audit-level=moderate
```

Si el cambio modifica lógica de negocio, añade primero una prueba que describa el comportamiento esperado. Mantén al menos 80 % de cobertura y el recorrido guiado de Playwright.

## Pull requests

Describe:

- problema que resuelve;
- comportamiento anterior y nuevo;
- riesgos o límites;
- evidencia de prueba;
- capturas si cambia la interfaz;
- impacto en accesibilidad y static export.

No incluyas datos reales de clientes, fotografías de terceros, secretos, credenciales ni material propietario.

## Arquitectura

La demo debe seguir siendo compatible con `output: "export"` y Cloudflare Pages. No añadas Server Actions, cookies, ISR, handlers en runtime o secretos sin una propuesta explícita de migración a OpenNext Workers.

## Licencia

Una contribución aceptada se incorpora bajo los términos de [LICENSE](LICENSE). Abrir un pull request no concede derechos comerciales sobre el resto del proyecto.
