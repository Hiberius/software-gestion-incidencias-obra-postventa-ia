import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  ClipboardCheck,
  Eye,
  ShieldCheck,
} from "lucide-react";
import { IncidentVisual } from "@/components/incident-visual";
import { SectionHeading } from "@/components/section-heading";

const simpleLoop = [
  {
    number: "01",
    title: "Captura",
    copy: "Una foto y un mensaje bastan para empezar. REPASO AI pide el contexto que falta.",
  },
  {
    number: "02",
    title: "Decide",
    copy: "La IA organiza y sugiere. El técnico revisa, corrige y conserva la decisión.",
  },
  {
    number: "03",
    title: "Previene",
    copy: "El cierre verificado vuelve al sistema como patrón, checklist y evidencia revisable.",
  },
];

const capabilityRows = [
  {
    stage: "HOY",
    title: "Demo funcional y determinista",
    copy: "Recorrido completo, ROI editable y datos sintéticos. Sin API, login ni datos reales.",
    status: "Puedes probarlo",
  },
  {
    stage: "PILOTO",
    title: "Una promoción durante 12 semanas",
    copy: "Baseline, usuarios reales, integración controlada y comparación antes/después.",
    status: "Debe validarse",
  },
  {
    stage: "PRODUCCIÓN",
    title: "IA multimodal e integración enterprise",
    copy: "SSO, permisos, residencia UE, retención e integraciones tras revisión de seguridad.",
    status: "No implementado",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Calidad trazable para obra y postventa</p>
          <h1>De una foto a una mejora verificable.</h1>
          <p className="hero-lead">
            REPASO AI ordena lo que ocurrió, pide la evidencia que falta y guía
            el caso hasta una decisión humana. Después convierte las
            recurrencias en prevención.
          </p>
          <div className="hero-actions">
            <Link className="primary-button" href="/demo/">
              Iniciar demo guiada <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link className="secondary-button" href="/metodologia/">
              Ver cómo se controla la IA
            </Link>
          </div>
          <ul className="hero-facts" aria-label="Características de la demo">
            <li>
              <Check size={14} aria-hidden="true" /> Sin registro
            </li>
            <li>
              <Check size={14} aria-hidden="true" /> 90 segundos
            </li>
            <li>
              <Check size={14} aria-hidden="true" /> Datos sintéticos
            </li>
          </ul>
        </div>
        <figure className="hero-evidence">
          <div className="hero-photo">
            <Image
              src="/media/hero-quality-review.webp"
              width={1536}
              height={1024}
              priority
              sizes="(max-width: 900px) 100vw, 52vw"
              alt="Un responsable de calidad revisa fotografías y planos en una oficina de obra"
            />
          </div>
          <figcaption>
            <span>La evidencia antes que la promesa</span>
            <strong>Foto · contexto · decisión · firma</strong>
          </figcaption>
          <div className="hero-stamp" aria-hidden="true">
            <ShieldCheck size={18} /> Revisión humana
          </div>
        </figure>
      </section>

      <section className="trust-rail" aria-label="Alcance de la demostración">
        <span>DEMO PÚBLICA</span>
        <p>Funciona sin servicios externos.</p>
        <span>ALCANCE HONESTO</span>
        <p>No diagnostica ni cierra por sí sola.</p>
      </section>

      <section className="section-shell simple-section">
        <SectionHeading
          eyebrow="La idea en tres pasos"
          title="Menos administración. Más criterio disponible."
          copy="El producto no sustituye el sistema oficial ni al profesional. Reduce la fricción alrededor de una decisión de calidad."
        />
        <ol className="story-steps">
          {simpleLoop.map((step) => (
            <li key={step.number}>
              <span>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="dark-section product-proof">
        <div className="section-shell proof-layout">
          <div className="proof-copy">
            <p className="eyebrow">Lo que cambia</p>
            <h2>La incidencia deja de ser un mensaje suelto.</h2>
            <p>
              El contexto, la evidencia y cada decisión permanecen unidos. Si
              falta una vista general o una comprobación, el flujo lo muestra
              antes de avanzar.
            </p>
            <ul className="proof-points">
              <li>
                <Eye size={19} aria-hidden="true" /> La IA describe solo lo
                visible.
              </li>
              <li>
                <ClipboardCheck size={19} aria-hidden="true" /> El técnico
                valida antes de solicitar conformidad.
              </li>
              <li>
                <ShieldCheck size={19} aria-hidden="true" /> El cierre exige dos
                gates humanos.
              </li>
            </ul>
            <Link className="primary-button aqua" href="/seguimiento/">
              Explorar el caso completo <ArrowRight size={16} />
            </Link>
          </div>
          <IncidentVisual variant="context" priority />
        </div>
      </section>

      <section className="section-shell capability-section">
        <SectionHeading
          eyebrow="Capacidades sin ambigüedad"
          title="Qué funciona hoy. Qué debe demostrar el piloto."
          copy="Separamos la demo actual, el alcance propuesto y la arquitectura futura para no confundir intención con capacidad desplegada."
        />
        <div className="capability-ledger">
          {capabilityRows.map((row) => (
            <article key={row.stage}>
              <span className="capability-stage">{row.stage}</span>
              <div>
                <h3>{row.title}</h3>
                <p>{row.copy}</p>
              </div>
              <strong>{row.status}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="final-cta">
        <div>
          <p className="eyebrow">Recorrido de 90 segundos</p>
          <h2>Una incidencia resuelta. Una mejora que permanece.</h2>
        </div>
        <Link className="primary-button aqua" href="/demo/">
          Verlo en acción <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </section>
    </>
  );
}
