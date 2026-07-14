import Link from "next/link";
import {
  ArrowRight,
  ClipboardCheck,
  GitBranch,
  ScanSearch,
  ShieldCheck,
} from "lucide-react";
import { IncidentVisual } from "@/components/incident-visual";
import { SectionHeading } from "@/components/section-heading";

const loop = [
  { title: "Captura", copy: "Foto, mensaje y ubicación guiada." },
  { title: "Completa", copy: "Campos ausentes y evidencias concretas." },
  { title: "Coordina", copy: "Validación, proveedor, SLA y trazabilidad." },
  { title: "Verifica", copy: "Antes/después y doble confirmación humana." },
  { title: "Previene", copy: "La recurrencia se convierte en checklist." },
];

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">
            Inteligencia de calidad para obra y postventa
          </p>
          <h1>
            De la foto al <span>cierre verificado.</span>
          </h1>
          <p className="hero-lead">
            REPASO AI transforma fotografías, mensajes y documentos en
            incidencias completas, trazables y accionables. Cada resolución deja
            evidencia; cada recurrencia activa una mejora preventiva.
          </p>
          <div className="hero-actions">
            <Link className="primary-button" href="/demo/">
              Iniciar demo guiada <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link className="secondary-button" href="/seguimiento/">
              Explorar el caso completo
            </Link>
          </div>
          <p className="hero-microcopy">
            Demo de 90 segundos · Sin registro · Datos simulados
          </p>
        </div>
        <div className="hero-evidence">
          <span className="evidence-index">01</span>
          <IncidentVisual />
        </div>
      </section>

      <section
        className="proof-strip"
        aria-label="Indicadores del escenario simulado"
      >
        <div className="proof-grid">
          <div className="proof-item">
            <strong>4m 12s</strong>
            <span>registro mediano · escenario simulado</span>
          </div>
          <div className="proof-item">
            <strong>86 %</strong>
            <span>capturas completas al primer intento</span>
          </div>
          <div className="proof-item">
            <strong>100 %</strong>
            <span>cierres con evidencia trazable</span>
          </div>
          <div className="proof-item">
            <strong>12 sem.</strong>
            <span>piloto medible propuesto</span>
          </div>
        </div>
      </section>

      <section className="dark-section">
        <div className="section-shell">
          <SectionHeading
            eyebrow="El circuito completo"
            title="Una incidencia no termina cuando se asigna."
            copy="Termina cuando existe evidencia suficiente, validación técnica y conformidad del cliente. Entonces el aprendizaje vuelve a la obra."
          />
          <div className="loop-grid">
            {loop.map((step, index) => (
              <article className="loop-step" key={step.title}>
                <span className="loop-number">0{index + 1}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="split-feature">
          <SectionHeading
            eyebrow="Capa de inteligencia"
            title="No sustituye al técnico. Elimina la fricción alrededor del criterio técnico."
            copy="Diseñada para integrarse mediante CSV, API o webhook con los sistemas de obra, postventa y gestión ya existentes."
          />
          <div className="feature-list">
            <article className="feature-row">
              <ScanSearch size={24} aria-hidden="true" />
              <div>
                <h3>Captura completa desde el inicio</h3>
                <p>
                  Organiza la información visible y solicita evidencias
                  concretas antes de enviar.
                </p>
              </div>
            </article>
            <article className="feature-row">
              <ShieldCheck size={24} aria-hidden="true" />
              <div>
                <h3>Resolución trazable</h3>
                <p>
                  Cada sugerencia, cambio de estado, archivo y validación queda
                  registrado.
                </p>
              </div>
            </article>
            <article className="feature-row">
              <GitBranch size={24} aria-hidden="true" />
              <div>
                <h3>Prevención basada en recurrencias</h3>
                <p>
                  Los patrones alimentan checklists y scorecards respaldadas por
                  incidencias.
                </p>
              </div>
            </article>
            <article className="feature-row">
              <ClipboardCheck size={24} aria-hidden="true" />
              <div>
                <h3>Responsabilidad humana preservada</h3>
                <p>
                  La IA propone y revisa documentación; las personas validan,
                  verifican y cierran.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="final-cta">
        <h2>Una incidencia resuelta. Una mejora que permanece.</h2>
        <Link className="primary-button aqua" href="/demo/">
          Verlo en acción <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </section>
    </>
  );
}
