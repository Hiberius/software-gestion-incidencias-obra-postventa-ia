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

const integrationPaths = [
  {
    icon: Braces,
    status: "Piloto inicial",
    title: "CSV / XLSX",
    copy: "Importación de baseline, maestros y casos; exportación de resultados revisados.",
    guardrail: "Mapeo validado, control de duplicados y exportación firmada.",
  },
  {
    icon: Webhook,
    status: "No conectado",
    title: "API / webhook",
    copy: "Altas, cambios de estado, evidencias y cierres sincronizados en ambos sentidos.",
    guardrail: "Autenticación, idempotencia, reintentos y cola de errores.",
  },
  {
    icon: DatabaseZap,
    status: "Conector futuro",
    title: "ERP / ticketing / repositorios",
    copy: "Conectores específicos para sistemas de obra, postventa y documentación.",
    guardrail:
      "Contrato de datos, permisos y recuperación antes de anunciar disponibilidad.",
  },
  {
    icon: ShieldCheck,
    status: "Requisito enterprise",
    title: "SSO / RBAC / auditoría",
    copy: "Identidad corporativa, segregación por rol, residencia UE y retención acordada.",
    guardrail:
      "Autorización server-side y registro append-only de cada decisión.",
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

      <section className="dark-section impact-integration">
        <div className="section-shell dark integration-inner">
          <SectionHeading
            eyebrow="Integración gradual"
            title="Encima de los sistemas existentes, no en contra de ellos."
            copy="La demo es estática y autónoma. La arquitectura de producción propone caminos de integración, no afirma que ya estén implementados."
          />
          <div className="integration-ledger">
            {integrationPaths.map(
              ({ icon: Icon, status, title, copy, guardrail }) => (
                <article key={title}>
                  <span className="integration-status">{status}</span>
                  <div className="integration-title">
                    <Icon size={22} aria-hidden="true" />
                    <h3>{title}</h3>
                  </div>
                  <p>{copy}</p>
                  <small>{guardrail}</small>
                </article>
              ),
            )}
          </div>
          <Link
            className="primary-button aqua integration-cta"
            href="/metodologia/"
          >
            Revisar límites y seguridad <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
