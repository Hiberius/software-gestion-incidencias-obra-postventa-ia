import {
  ArrowUpRight,
  Eye,
  FileLock2,
  GitCompareArrows,
  LockKeyhole,
  ScanSearch,
  ShieldCheck,
  UserRoundCheck,
  Waves,
} from "lucide-react";
import { methodologySources } from "@/lib/demo-data";

const methods = [
  {
    icon: Eye,
    title: "Describe lo visible",
    copy: "La IA organiza señales aportadas. No detecta defectos ocultos ni emite un diagnóstico certificado.",
  },
  {
    icon: Waves,
    title: "Se abstiene si falta contexto",
    copy: "Pide una vista general, una medición, una referencia o una comprobación presencial antes de proponer.",
  },
  {
    icon: GitCompareArrows,
    title: "Compara sin fusionar",
    copy: "Explica por qué dos casos se parecen. Una persona decide si se vinculan o permanecen separados.",
  },
  {
    icon: UserRoundCheck,
    title: "Mantiene los gates humanos",
    copy: "La validación técnica precede a la conformidad del cliente. Solo después puede registrarse el cierre.",
  },
];

const capabilityTruth = [
  {
    layer: "DEMO PÚBLICA",
    included: "HTML, CSS, JavaScript y datos sintéticos en Cloudflare Pages.",
    excluded: "Sin IA remota, base de datos, login, carga real ni secretos.",
  },
  {
    layer: "PILOTO CONTROLADO",
    included: "Usuarios definidos, baseline, permisos y flujo acordado.",
    excluded:
      "No se conecta a sistemas corporativos sin revisión técnica y legal.",
  },
  {
    layer: "PRODUCCIÓN FUTURA",
    included:
      "SSO, RBAC, auditoría, retención y residencia UE como requisitos.",
    excluded: "No se presentan como capacidades ya desplegadas.",
  },
];

const threatModel = [
  {
    risk: "Archivo malicioso o tipo falso",
    control:
      "Límite de tamaño, MIME permitido, comprobación de magic bytes, análisis antimalware y almacenamiento aislado.",
  },
  {
    risk: "Datos personales en imágenes",
    control:
      "Eliminar EXIF, detectar información sensible, aplicar minimización, retención y borrado configurables.",
  },
  {
    risk: "Instrucciones maliciosas dentro de documentos",
    control:
      "Tratar cada archivo como contenido no fiable, aislarlo del prompt de sistema y limitar herramientas y acciones.",
  },
  {
    risk: "Respuesta plausible pero incorrecta",
    control:
      "Salida estructurada, validación de esquema, evidencia citada, abstención y aprobación humana obligatoria.",
  },
  {
    risk: "Acceso o cambio de estado indebido",
    control:
      "SSO, permisos por rol, autorización server-side, eventos append-only y revisión de cambios sensibles.",
  },
];

export default function MethodologyPage() {
  return (
    <div className="page-shell">
      <header className="page-intro">
        <div>
          <p className="eyebrow">Metodología, seguridad y límites</p>
          <h1>La confianza empieza por decir qué no hace.</h1>
        </div>
        <p className="page-intro-copy">
          REPASO AI asiste una decisión de calidad. No sustituye una inspección,
          un ensayo, una validación contractual ni el criterio profesional.
        </p>
      </header>

      <section
        className="method-grid"
        aria-label="Principios de seguridad de IA"
      >
        {methods.map(({ icon: Icon, title, copy }) => (
          <article className="method-card" key={title}>
            <Icon size={25} aria-hidden="true" />
            <h2>{title}</h2>
            <p>{copy}</p>
          </article>
        ))}
      </section>

      <section className="method-section">
        <div className="section-heading compact">
          <p className="eyebrow">Capacidad real</p>
          <h2>Demo, piloto y producción no son lo mismo.</h2>
          <p className="section-copy">
            Esta separación evita que una arquitectura propuesta parezca una
            integración ya disponible.
          </p>
        </div>
        <div
          className="truth-table"
          role="table"
          aria-label="Capacidades por fase"
        >
          {capabilityTruth.map((row) => (
            <div role="row" key={row.layer}>
              <strong role="cell">{row.layer}</strong>
              <p role="cell">
                <span>Incluye</span> {row.included}
              </p>
              <p role="cell">
                <span>No incluye</span> {row.excluded}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="security-panel">
        <div>
          <p className="eyebrow">Seguridad del sitio público</p>
          <h2>La demo reduce la superficie de ataque.</h2>
          <p>
            No recibe archivos reales, no almacena datos, no ejecuta llamadas a
            modelos y no contiene credenciales. Cloudflare aplica una política
            de contenido, bloqueo de iframes, HTTPS estricto y permisos del
            navegador desactivados.
          </p>
        </div>
        <ul className="security-checks">
          <li>
            <LockKeyhole size={18} /> Sin secretos en el navegador
          </li>
          <li>
            <FileLock2 size={18} /> Sin datos personales ni persistencia
          </li>
          <li>
            <ShieldCheck size={18} /> CSP, HSTS y protección frente a framing
          </li>
          <li>
            <ScanSearch size={18} /> Dependencias y build verificables
          </li>
        </ul>
      </section>

      <section className="method-section threat-section">
        <div className="section-heading compact">
          <p className="eyebrow">Threat model para una fase con IA real</p>
          <h2>
            Las imágenes y los documentos se tratan como entrada no fiable.
          </h2>
        </div>
        <div className="threat-list">
          {threatModel.map((item) => (
            <details key={item.risk}>
              <summary>{item.risk}</summary>
              <p>{item.control}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="method-section source-section">
        <div className="section-heading compact">
          <p className="eyebrow">Fuentes públicas</p>
          <h2>Lo real, lo académico y lo ilustrativo permanecen separados.</h2>
        </div>
        <div className="source-list">
          {methodologySources.map((source) => (
            <div className="source-row" key={source.label}>
              <strong>{source.label}</strong>
              <p>{source.description}</p>
              <a href={source.href} target="_blank" rel="noopener noreferrer">
                Abrir fuente <ArrowUpRight size={13} aria-hidden="true" />
              </a>
            </div>
          ))}
        </div>
        <div className="notice">
          Promociones, viviendas, personas, proveedores, incidencias, métricas y
          resultados de esta demo son sintéticos. Las cifras de negocio son
          supuestos editables, no información interna de Metrovacesa.
        </div>
      </section>
    </div>
  );
}
