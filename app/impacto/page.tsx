import Link from "next/link";
import {
  ArrowRight,
  Braces,
  DatabaseZap,
  ShieldCheck,
  Webhook,
} from "lucide-react";
import { ROICalculator } from "@/components/roi-calculator";
import { SectionHeading } from "@/components/section-heading";

const pilot = [
  {
    weeks: "01–02",
    title: "Baseline",
    copy: "Métricas, fuentes, categorías, permisos y flujo actual.",
  },
  {
    weeks: "03–04",
    title: "Preparación",
    copy: "Checklists, SLA, proveedores y formación de perfiles piloto.",
  },
  {
    weeks: "05–10",
    title: "Operación",
    copy: "Incidencias reales controladas y medición de calidad y tiempos.",
  },
  {
    weeks: "11–12",
    title: "Evaluación",
    copy: "Comparativa antes/después y decisión de siguiente alcance.",
  },
];

export default function ImpactPage() {
  return (
    <div className="page-shell">
      <header className="page-intro">
        <div>
          <p className="eyebrow">Impacto medible</p>
          <h1>Un caso de negocio que muestra sus supuestos.</h1>
        </div>
        <p className="page-intro-copy">
          Cambia las variables y observa el efecto. El modelo separa régimen
          estable, adopción del primer año y coste del proyecto.
        </p>
      </header>

      <ROICalculator />

      <section className="section-shell" style={{ paddingInline: 0 }}>
        <SectionHeading
          eyebrow="Piloto propuesto"
          title="Una promoción. 150 viviendas. 12 semanas."
          copy="El piloto mide el proceso antes y después. No atribuye impacto a REPASO AI sin una baseline acordada y una revisión de los casos."
        />
        <div className="pilot-grid">
          {pilot.map((phase) => (
            <article className="pilot-step" key={phase.weeks}>
              <span>SEM {phase.weeks}</span>
              <h3>{phase.title}</h3>
              <p>{phase.copy}</p>
            </article>
          ))}
        </div>
        <div className="notice aqua" style={{ marginTop: 24 }}>
          Objetivos de evaluación, no resultados prometidos: −50 %
          registro/clasificación · −20 % incidencias incompletas · −15 %
          asignación · −10 % relativo en reaperturas · 100 % cierres trazables.
        </div>
      </section>

      <section
        className="dark-section"
        style={{ marginInline: "calc(clamp(20px, 5.3vw, 82px) * -1)" }}
      >
        <div className="section-shell dark">
          <SectionHeading
            eyebrow="Integración gradual"
            title="Encima de los sistemas existentes, no en contra de ellos."
            copy="La demo es estática y autónoma. La arquitectura de producción propone caminos de integración, no afirma que ya estén implementados."
          />
          <div
            className="loop-grid"
            style={{ gridTemplateColumns: "repeat(4, 1fr)" }}
          >
            <article className="loop-step">
              <Braces size={24} />
              <div>
                <h3>CSV</h3>
                <p>Baseline rápida y exportación controlada.</p>
              </div>
            </article>
            <article className="loop-step">
              <Webhook size={24} />
              <div>
                <h3>API / webhook</h3>
                <p>Eventos bidireccionales y estados sincronizados.</p>
              </div>
            </article>
            <article className="loop-step">
              <DatabaseZap size={24} />
              <div>
                <h3>Sistemas</h3>
                <p>
                  SAP, ticketing y repositorios mediante conectores validados.
                </p>
              </div>
            </article>
            <article className="loop-step">
              <ShieldCheck size={24} />
              <div>
                <h3>Enterprise</h3>
                <p>UE, SSO, RBAC, retención y auditoría.</p>
              </div>
            </article>
          </div>
          <Link
            className="primary-button aqua"
            href="/metodologia/"
            style={{ marginTop: 34 }}
          >
            Revisar límites y seguridad <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
