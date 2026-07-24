# Security policy

## Alcance actual

REPASO AI es una demo estática. No acepta archivos, no persiste datos, no autentica usuarios, no usa cookies, no llama a modelos remotos y no contiene secretos de runtime.

Las capacidades descritas para piloto o producción futura no deben interpretarse como controles ya desplegados.

## Versiones soportadas

Solo la última versión publicada en `main` y desplegada en [repaso-ai.pages.dev](https://repaso-ai.pages.dev/) recibe mantenimiento.

## Reportar una vulnerabilidad

No publiques una vulnerabilidad explotable ni datos sensibles en un issue.

Utiliza el canal privado de [GitHub Security Advisories](https://github.com/Hiberius/repaso-ai/security/advisories/new). Incluye:

- componente y versión afectados;
- pasos mínimos de reproducción;
- impacto observado;
- prueba de concepto sin datos de terceros;
- mitigación sugerida, si existe.

Se acusará recibo tan pronto como sea posible. La validación, el calendario de corrección y la divulgación coordinada se comunicarán en el advisory.

## Safe harbor

La investigación debe:

- limitarse al repositorio y dominio publicados;
- evitar degradación, automatización agresiva y acceso a terceros;
- no intentar obtener credenciales o datos personales;
- detenerse y comunicar cualquier exposición accidental.

Este documento no autoriza pruebas contra Cloudflare, GitHub, proveedores o infraestructura de terceros.

## Controles de la demo

- export estático sin API;
- Content Security Policy;
- HSTS;
- anti-framing;
- Permissions Policy;
- `nosniff`, COOP y CORP;
- validación Zod de inputs;
- audit de dependencias;
- CI, CodeQL y Dependabot;
- `security.txt` público.

Lee [la revisión externa](docs/security-review.md) para conocer riesgos aceptados y requisitos antes de incorporar upload, identidad, persistencia o IA real.
