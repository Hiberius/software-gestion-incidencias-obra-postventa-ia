import Link from "next/link";
import {
  ArrowRight,
  Clock3,
  FileCheck2,
  MessageSquareText,
  UserRoundCheck,
} from "lucide-react";
import { IncidentVisual } from "@/components/incident-visual";
import { timeline } from "@/lib/demo-data";

export default function TrackingPage() {
  return (
    <div className="page-shell">
      <header className="page-intro">
        <div>
          <p className="eyebrow">Seguimiento · INC-0241</p>
          <h1>Todo el caso, en un solo historial.</h1>
        </div>
        <p className="page-intro-copy">
          Calidad, postventa y proveedor ven qué ocurrió, quién decidió y qué
          falta. Sin reconstruir el contexto entre mensajes sueltos.
        </p>
      </header>

      <div className="workspace-grid">
        <section className="workspace-panel">
          <div className="panel-header">
            <h2>Corriente de aire junto a ventana del salón</h2>
            <span className="status-pill aqua">Cerrada · trazable</span>
          </div>
          <div className="panel-body">
            <div className="case-evidence-row">
              <IncidentVisual variant="before" />
              <div className="case-summary">
                <p className="eyebrow">Resumen del caso</p>
                <h3>Corriente de aire junto a la ventana del salón</h3>
                <p>
                  La señal se validó como incidencia de carpintería exterior.
                  Una primera reparación se reabrió y la segunda quedó cerrada
                  tras comprobación técnica y conformidad.
                </p>
                <span className="status-pill aqua">
                  13 eventos · 12 evidencias
                </span>
              </div>
            </div>
            <div className="analysis-grid">
              <div className="analysis-item">
                <span>Promoción</span>
                <strong>Residencial Alba Norte · demo</strong>
              </div>
              <div className="analysis-item">
                <span>Ubicación</span>
                <strong>Bloque B · 3.º B · Salón</strong>
              </div>
              <div className="analysis-item">
                <span>Responsable</span>
                <strong>Laura Martín · perfil simulado</strong>
              </div>
              <div className="analysis-item">
                <span>Proveedor</span>
                <strong>Ventana Sur Demo, S.L.</strong>
              </div>
            </div>

            <div className="feature-list" style={{ marginTop: 32 }}>
              <article className="feature-row">
                <Clock3 size={22} />
                <div>
                  <h3>SLA preservado</h3>
                  <p>
                    Asignación en 1 h 04 min; intervención y reapertura
                    visibles.
                  </p>
                </div>
              </article>
              <article className="feature-row">
                <FileCheck2 size={22} />
                <div>
                  <h3>12 evidencias</h3>
                  <p>Fotografías, referencias y dos ciclos de verificación.</p>
                </div>
              </article>
              <article className="feature-row">
                <MessageSquareText size={22} />
                <div>
                  <h3>7 mensajes</h3>
                  <p>
                    Cliente, técnico y proveedor conservan el contexto completo.
                  </p>
                </div>
              </article>
              <article className="feature-row">
                <UserRoundCheck size={22} />
                <div>
                  <h3>Doble gate humano</h3>
                  <p>
                    Validación técnica y conformidad del cliente antes del
                    cierre.
                  </p>
                </div>
              </article>
            </div>
            <Link
              className="primary-button"
              href="/verificacion/"
              style={{ marginTop: 28 }}
            >
              Revisar las evidencias <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        <aside className="side-panel">
          <div className="panel-header">
            <h3>Auditoría completa</h3>
            <span>13 eventos</span>
          </div>
          <div className="panel-body">
            <ol className="timeline">
              {timeline.map((event) => (
                <li key={`${event.date}-${event.state}`}>
                  <time>{event.date}</time>
                  <strong>{event.state}</strong>
                  <p>{event.detail}</p>
                </li>
              ))}
            </ol>
          </div>
        </aside>
      </div>
    </div>
  );
}
