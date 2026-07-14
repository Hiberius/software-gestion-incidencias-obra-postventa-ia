import {
  ArrowUpRight,
  Eye,
  FileLock2,
  GitCompareArrows,
  ShieldCheck,
  UserRoundCheck,
  Waves,
} from "lucide-react";
import { methodologySources } from "@/lib/demo-data";

const methods = [
  {
    icon: Eye,
    title: "Alcance visible",
    copy: "La IA describe solo lo que parece visible o aportado. No detecta defectos ocultos ni emite diagnósticos certificados.",
  },
  {
    icon: Waves,
    title: "Abstención",
    copy: "Cuando falta contexto, solicita otra fotografía, una medición, referencia, vídeo o comprobación presencial.",
  },
  {
    icon: GitCompareArrows,
    title: "Duplicados",
    copy: "La similitud ayuda a revisar. El usuario decide si vincula, fusiona o mantiene separados los registros.",
  },
  {
    icon: UserRoundCheck,
    title: "Cierre humano",
    copy: "La validación técnica y la conformidad del cliente son obligatorias y quedan en el historial.",
  },
  {
    icon: FileLock2,
    title: "Trazabilidad",
    copy: "Sugerencias, ediciones, estados, responsables y archivos forman eventos de auditoría revisables.",
  },
  {
    icon: ShieldCheck,
    title: "Privacidad",
    copy: "La demo no solicita datos personales reales. Producción requerirá controles y residencia acordados.",
  },
];

export default function MethodologyPage() {
  return (
    <div className="page-shell">
      <header className="page-intro">
        <div>
          <p className="eyebrow">Metodología, seguridad y límites</p>
          <h1>Decisiones asistidas. Responsabilidad humana.</h1>
        </div>
        <p className="page-intro-copy">
          REPASO AI organiza señales visuales y textuales. No sustituye una
          inspección, un ensayo, una validación contractual ni el criterio
          profesional.
        </p>
      </header>

      <div className="method-grid">
        {methods.map(({ icon: Icon, title, copy }) => (
          <article className="method-card" key={title}>
            <Icon size={25} />
            <h2>{title}</h2>
            <p>{copy}</p>
          </article>
        ))}
      </div>

      <section
        className="section-shell"
        style={{ paddingInline: 0, paddingBottom: 0 }}
      >
        <p className="eyebrow">Fuentes públicas</p>
        <h2
          style={{
            fontFamily: "DM Serif Display",
            fontSize: "clamp(42px, 5vw, 72px)",
            fontWeight: 400,
            margin: 0,
          }}
        >
          Lo real, lo académico y lo ilustrativo permanecen separados.
        </h2>
        <div className="source-list">
          {methodologySources.map((source) => (
            <div className="source-row" key={source.label}>
              <strong>{source.label}</strong>
              <p>{source.description}</p>
              <a href={source.href} target="_blank" rel="noreferrer">
                Abrir fuente{" "}
                <ArrowUpRight size={13} style={{ display: "inline" }} />
              </a>
            </div>
          ))}
        </div>
        <div className="notice" style={{ marginTop: 30 }}>
          Promociones, viviendas, personas, proveedores, incidencias, métricas y
          resultados de esta demo son sintéticos. Las cifras de negocio se
          muestran como supuestos editables, no como información interna de
          Metrovacesa.
        </div>
      </section>
    </div>
  );
}
