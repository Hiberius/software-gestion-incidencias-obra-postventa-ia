import Link from "next/link";
import {
  AlertCircle,
  ArrowRight,
  ClipboardPlus,
  TrendingUp,
} from "lucide-react";
import { CategoryChart, TrendChart } from "@/components/dashboard-charts";
import { dashboardMetrics, supplierScores } from "@/lib/demo-data";

export default function IntelligencePage() {
  return (
    <div className="page-shell">
      <header className="page-intro">
        <div>
          <p className="eyebrow">Inteligencia de cartera</p>
          <h1>De cada incidencia, una mejora.</h1>
        </div>
        <p className="page-intro-copy">
          Los datos agregados descubren recurrencias, sostienen la evaluación de
          proveedores y convierten señales revisables en acciones preventivas.
        </p>
      </header>

      <section className="metric-grid" aria-label="Métricas simuladas">
        {dashboardMetrics.map((metric) => (
          <article className="metric-card" key={metric.label}>
            <label>{metric.label}</label>
            <strong>{metric.value}</strong>
            <span>{metric.note}</span>
          </article>
        ))}
      </section>

      <div className="dashboard-grid">
        <CategoryChart />
        <aside className="insight-panel">
          <p className="eyebrow">Patrón emergente · revisión necesaria</p>
          <div className="insight-number">7/126</div>
          <h2>Recurrencia de sellado insuficiente en ventanas</h2>
          <p>
            Cinco casos pertenecen al Bloque B y dos fueron reabiertos. Es una
            señal operativa, no una conclusión causal.
          </p>
          <ul className="check-list">
            <li>Fotografía general del hueco.</li>
            <li>Detalle de las cuatro esquinas.</li>
            <li>Referencia del material o lote.</li>
            <li>Comprobación presencial y validación.</li>
          </ul>
          <button className="primary-button aqua">
            Crear checklist preventiva <ClipboardPlus size={16} />
          </button>
        </aside>
      </div>

      <div style={{ marginTop: 24 }}>
        <TrendChart />
      </div>

      <section
        className="section-shell"
        style={{ paddingInline: 0, paddingBottom: 0 }}
      >
        <p className="eyebrow">Proveedor · Ventana Sur Demo, S.L.</p>
        <div className="page-intro" style={{ marginBottom: 30 }}>
          <h2
            style={{
              fontFamily: "DM Serif Display",
              fontSize: "clamp(42px, 5vw, 72px)",
              fontWeight: 400,
              margin: 0,
            }}
          >
            Scorecard respaldada por evidencias.
          </h2>
          <div>
            <span className="status-pill aqua">
              <TrendingUp size={12} /> Resultado 84,7/100
            </span>
            <p className="hero-microcopy">
              Calidad 30 % · Costes 15 % · Plazos 20 % · Cumplimiento 20 % ·
              Atención 15 %
            </p>
          </div>
        </div>
        <div className="scorecard">
          {supplierScores.map((item) => (
            <div className="score-row" key={item.criterion}>
              <strong>{item.criterion}</strong>
              <div className="score-track" aria-label={`${item.score} de 100`}>
                <span style={{ width: `${item.score}%` }} />
              </div>
              <span className="score-value">{item.score}</span>
              <span className="score-evidence">{item.evidence}</span>
            </div>
          ))}
        </div>
        <div className="notice" style={{ marginTop: 28 }}>
          <AlertCircle
            size={14}
            style={{ display: "inline", marginRight: 8 }}
          />
          Scorecard orientativa con datos simulados. No automatiza decisiones de
          compra, sanción o continuidad.
        </div>
        <Link className="text-button" href="/impacto/">
          Ver impacto y piloto <ArrowRight size={14} />
        </Link>
      </section>
    </div>
  );
}
