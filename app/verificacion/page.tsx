import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  CircleUserRound,
  ShieldAlert,
} from "lucide-react";
import { IncidentVisual } from "@/components/incident-visual";

export default function VerificationPage() {
  return (
    <div className="page-shell">
      <header className="page-intro">
        <div>
          <p className="eyebrow">Verificación · INC-0241</p>
          <h1>Una foto no certifica una reparación.</h1>
        </div>
        <p className="page-intro-copy">
          REPASO AI comprueba si la documentación permite revisar el caso. El
          técnico valida el resultado y el cliente confirma antes del cierre.
        </p>
      </header>

      <div className="workspace-panel">
        <div className="panel-header">
          <h2>Verificación antes / después</h2>
          <span className="status-pill aqua">Cierre humano registrado</span>
        </div>
        <div className="panel-body">
          <div className="analysis-grid">
            <IncidentVisual variant="before" label="ANTES · 02 JUL" priority />
            <IncidentVisual variant="after" label="DESPUÉS · 08 JUL" />
          </div>
          <div className="notice">
            Primera entrega rechazada: la imagen solo cubría una esquina. Se
            solicitó una vista general, ambos extremos y la referencia de la
            actuación.
          </div>
          <div className="method-grid" style={{ marginTop: 28 }}>
            <article className="method-card">
              <ShieldAlert size={24} />
              <h2>Revisión documental</h2>
              <p>
                La junta visible parece continua en las imágenes. La IA no puede
                comprobar el comportamiento del elemento ni certificar la
                reparación.
              </p>
              <span className="status-pill amber">Asistencia de IA</span>
            </article>
            <article className="method-card">
              <CheckCircle2 size={24} />
              <h2>Validación técnica</h2>
              <p>
                Evidencia revisada y comprobación presencial registrada. La
                actuación puede pasar a conformidad del cliente.
              </p>
              <span className="status-pill aqua">Laura Martín · 09 JUL</span>
            </article>
            <article className="method-card">
              <CircleUserRound size={24} />
              <h2>Conformidad</h2>
              <p>
                El cliente de demostración confirma que la incidencia ha quedado
                resuelta.
              </p>
              <span className="status-pill aqua">09 JUL · 10:15</span>
            </article>
            <article className="method-card">
              <ArrowRight size={24} />
              <h2>Aprendizaje</h2>
              <p>
                El caso se vincula a seis incidencias semejantes y propone una
                checklist para las próximas 24 viviendas.
              </p>
              <Link className="text-button" href="/inteligencia/">
                Abrir patrón emergente <ArrowRight size={14} />
              </Link>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}
