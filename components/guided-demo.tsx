"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  FileSearch,
  Link2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { IncidentVisual } from "@/components/incident-visual";
import { getDemoAnalysis } from "@/lib/analysis";
import { clsx } from "clsx";

const progress = [
  "Captura",
  "Análisis",
  "Duplicado",
  "Flujo",
  "Verificación",
  "Cierre",
];

export function GuidedDemo() {
  const [step, setStep] = useState(0);
  const [technicalApproval, setTechnicalApproval] = useState(false);
  const [customerConformity, setCustomerConformity] = useState(false);
  const [evidenceRequested, setEvidenceRequested] = useState(false);
  const demoRef = useRef<HTMLElement>(null);
  const analysis = getDemoAnalysis("window-seal-detail");

  useEffect(() => {
    if (step === 0) return;

    const frame = window.requestAnimationFrame(() => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      demoRef.current?.focus({ preventScroll: true });
      demoRef.current?.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start",
      });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [step]);

  return (
    <section
      ref={demoRef}
      tabIndex={-1}
      aria-label={`Paso ${Math.min(step + 1, 6)} de 6: ${progress[Math.min(step, 5)]}`}
      aria-live="polite"
    >
      <div className="demo-progress" aria-label="Progreso de la demostración">
        {progress.map((label, index) => (
          <div
            key={label}
            className={clsx(
              "progress-step",
              index === Math.min(step, 5) && "is-current",
              index < step && "is-done",
            )}
          >
            <span>{index < step ? <Check size={11} /> : index + 1}</span>
            {label}
          </div>
        ))}
      </div>

      {step === 0 && (
        <div className="workspace-grid">
          <div className="workspace-panel">
            <div className="panel-header">
              <h2>Nueva incidencia</h2>
              <span className="status-pill amber">Pendiente de análisis</span>
            </div>
            <div className="panel-body">
              <IncidentVisual variant="before" priority />
              <div className="form-grid" style={{ marginTop: 24 }}>
                <div className="field">
                  <label htmlFor="promotion">Promoción</label>
                  <select id="promotion" defaultValue="alba">
                    <option value="alba">Residencial Alba Norte · demo</option>
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="home">Ubicación</label>
                  <input id="home" defaultValue="Bloque B · 3.º B · Salón" />
                </div>
                <div className="field full">
                  <label htmlFor="description">Descripción aportada</label>
                  <textarea
                    id="description"
                    defaultValue="Se nota una corriente de aire junto a la esquina inferior derecha de la ventana del salón, especialmente cuando hace viento."
                  />
                </div>
              </div>
              <div className="notice">
                Estás usando un caso sintético. El análisis es determinista y
                ninguna imagen sale de este sitio.
              </div>
              <div className="action-row">
                <button className="primary-button" onClick={() => setStep(1)}>
                  Analizar incidencia <Sparkles size={16} aria-hidden="true" />
                </button>
                <button className="secondary-button" type="button" disabled>
                  Otra muestra · próximamente
                </button>
              </div>
            </div>
          </div>
          <aside className="side-panel">
            <div className="panel-header">
              <h3>Contexto del caso</h3>
              <span>Demo</span>
            </div>
            <div className="panel-body">
              <IncidentVisual variant="context" label="VISTA GENERAL" />
              <ul className="plain-list">
                <li>
                  <strong>ID</strong>
                  <br />
                  INC-0241
                </li>
                <li>
                  <strong>Informante</strong>
                  <br />
                  Cliente de demostración
                </li>
                <li>
                  <strong>Fecha</strong>
                  <br />
                  02 JUL 2026 · 09:14
                </li>
                <li>
                  <strong>Archivos</strong>
                  <br />1 imagen · 1 mensaje
                </li>
              </ul>
            </div>
          </aside>
        </div>
      )}

      {step === 1 && (
        <div className="workspace-grid">
          <div className="workspace-panel">
            <div className="panel-header">
              <h2>Sugerencia de IA · pendiente de validación técnica</h2>
              <span className="status-pill aqua">
                Evidencia suficiente para revisar
              </span>
            </div>
            <div className="panel-body">
              <div className="analysis-grid">
                <div className="analysis-item wide">
                  <span>Resumen editable</span>
                  <p>{analysis.summary}</p>
                </div>
                <div className="analysis-item">
                  <span>Categoría</span>
                  <select
                    aria-label="Categoría sugerida"
                    defaultValue={analysis.category}
                  >
                    <option>{analysis.category}</option>
                    <option>Humedad</option>
                    <option>Pintura y acabados</option>
                  </select>
                </div>
                <div className="analysis-item">
                  <span>Elemento</span>
                  <strong>{analysis.constructionElement}</strong>
                </div>
                <div className="analysis-item">
                  <span>Gremio probable</span>
                  <strong>{analysis.probableTrade}</strong>
                </div>
                <div className="analysis-item">
                  <span>Severidad sugerida</span>
                  <select
                    aria-label="Severidad sugerida"
                    defaultValue={analysis.severity}
                  >
                    <option>Media</option>
                    <option>Baja</option>
                    <option>Alta</option>
                  </select>
                </div>
                <div className="analysis-item wide">
                  <span>Evidencia adicional necesaria</span>
                  <p>{analysis.additionalEvidenceNeeded.join(" · ")}</p>
                </div>
              </div>
              <div className="notice">
                La IA describe lo visible y organiza el caso. No diagnostica el
                comportamiento de la ventana ni certifica una reparación.
              </div>
              {evidenceRequested && (
                <div className="notice aqua" role="status">
                  Solicitud registrada: vista general, referencia del sistema y
                  comprobación presencial.
                </div>
              )}
              <div className="action-row">
                <button className="primary-button" onClick={() => setStep(2)}>
                  Validar y continuar <ArrowRight size={16} />
                </button>
                <button
                  className="secondary-button"
                  onClick={() => setEvidenceRequested(true)}
                  disabled={evidenceRequested}
                >
                  {evidenceRequested
                    ? "Evidencia solicitada"
                    : "Solicitar evidencia"}
                </button>
              </div>
            </div>
          </div>
          <aside className="side-panel">
            <div className="panel-header">
              <h3>Por qué esta sugerencia</h3>
              <FileSearch size={16} />
            </div>
            <div className="panel-body">
              <ul className="reason-list">
                {analysis.visibleEvidence.map((reason) => (
                  <li key={reason}>{reason}</li>
                ))}
              </ul>
              <p className="hero-microcopy">
                Puedes corregir cada campo antes de validar.
              </p>
            </div>
          </aside>
        </div>
      )}

      {step === 2 && (
        <div className="workspace-panel">
          <div className="panel-header">
            <h2>Posible duplicado</h2>
            <span className="status-pill amber">
              Revisión humana obligatoria
            </span>
          </div>
          <div className="panel-body">
            <article className="duplicate-card">
              <div className="duplicate-score">Coincidencia alta</div>
              <p className="eyebrow">Candidato · INC-0187</p>
              <h3>Ventana de salón · Bloque B · 2.º A</h3>
              <p>Estado: cerrada tras verificación · 20 JUN 2026</p>
              <ul className="reason-list">
                {analysis.possibleDuplicate?.reasons.map((reason) => (
                  <li key={reason}>{reason}.</li>
                ))}
              </ul>
              <div className="notice aqua">
                Parecen relacionadas, pero afectan a viviendas distintas. La
                similitud no demuestra una causa común y REPASO AI nunca fusiona
                registros automáticamente.
              </div>
              <div className="action-row">
                <button className="primary-button" onClick={() => setStep(3)}>
                  Mantener vinculadas <Link2 size={16} />
                </button>
                <button className="secondary-button" onClick={() => setStep(3)}>
                  Mantener separadas
                </button>
              </div>
            </article>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="workspace-grid">
          <div className="workspace-panel">
            <div className="panel-header">
              <h2>Incidencia validada y asignada</h2>
              <span className="status-pill aqua">Dentro de SLA</span>
            </div>
            <div className="panel-body">
              <div className="analysis-grid">
                <div className="analysis-item">
                  <span>Responsable</span>
                  <strong>Laura Martín · Calidad</strong>
                </div>
                <div className="analysis-item">
                  <span>Proveedor</span>
                  <strong>Ventana Sur Demo, S.L.</strong>
                </div>
                <div className="analysis-item">
                  <span>Vencimiento</span>
                  <strong>09 JUL · 18:00</strong>
                </div>
                <div className="analysis-item">
                  <span>Siguiente gate</span>
                  <strong>Verificación técnica</strong>
                </div>
              </div>
              <div className="evidence-inline">
                <IncidentVisual variant="repair" />
                <div>
                  <p className="eyebrow">Evidencia del proveedor</p>
                  <h3>La actuación está documentada, no certificada.</h3>
                  <p>
                    La imagen muestra la aplicación del sellado. La validación
                    técnica debe comprobar el resultado y el contexto completo.
                  </p>
                </div>
              </div>
              <div className="notice">
                El proveedor ha cargado fotografías de antes y después. La IA
                detecta que la primera entrega no muestra el perímetro completo
                y bloquea el avance documental.
              </div>
              <button className="primary-button" onClick={() => setStep(4)}>
                Revisar reparación <ArrowRight size={16} />
              </button>
            </div>
          </div>
          <aside className="side-panel">
            <div className="panel-header">
              <h3>Auditoría</h3>
              <ShieldCheck size={16} />
            </div>
            <div className="panel-body">
              <ul className="timeline">
                <li>
                  <time>02 JUL · 10:03</time>
                  <strong>Validada</strong>
                  <p>Laura Martín confirma la clasificación.</p>
                </li>
                <li>
                  <time>02 JUL · 10:18</time>
                  <strong>Asignada</strong>
                  <p>Proveedor y SLA registrados.</p>
                </li>
                <li>
                  <time>03 JUL · 12:20</time>
                  <strong>Evidencia incompleta</strong>
                  <p>Se solicita vista general.</p>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      )}

      {(step === 4 || step === 5) && (
        <div className="workspace-panel">
          <div className="panel-header">
            <h2>Verificación antes / después</h2>
            <span className="status-pill amber">
              No certifica la reparación
            </span>
          </div>
          <div className="panel-body">
            <div className="analysis-grid">
              <IncidentVisual variant="before" label="ANTES · 02 JUL" />
              <IncidentVisual variant="after" label="DESPUÉS · 08 JUL" />
            </div>
            {!technicalApproval ? (
              <>
                <div className="notice aqua">
                  Documentación aparentemente completa: vista general, detalles
                  y referencia. La junta visible parece continua. El
                  comportamiento del elemento requiere criterio técnico.
                </div>
                <button
                  className="primary-button"
                  onClick={() => {
                    setTechnicalApproval(true);
                    setStep(5);
                  }}
                >
                  Aprobar técnicamente <CheckCircle2 size={16} />
                </button>
              </>
            ) : !customerConformity ? (
              <>
                <div className="notice aqua">
                  Validación técnica registrada por Laura Martín. El cierre
                  sigue bloqueado hasta recibir la conformidad del cliente.
                </div>
                <button
                  className="primary-button"
                  onClick={() => setCustomerConformity(true)}
                >
                  Registrar conformidad <Check size={16} />
                </button>
              </>
            ) : (
              <>
                <div className="notice aqua">
                  Doble gate superado: validación técnica y conformidad del
                  cliente registradas.
                </div>
                <button className="primary-button" onClick={() => setStep(6)}>
                  Cerrar incidencia <ShieldCheck size={16} />
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {step === 6 && (
        <div className="success-panel">
          <div className="success-icon">
            <Check size={34} />
          </div>
          <p className="eyebrow">Cierre humano · 09 JUL 2026 · 10:15</p>
          <h2>Incidencia cerrada con trazabilidad completa</h2>
          <p>
            La evidencia, la decisión técnica y la conformidad han quedado
            registradas. El caso se vincula a un patrón emergente sin convertir
            similitud en causalidad.
          </p>
          <Link className="primary-button aqua" href="/inteligencia/">
            Ver aprendizaje generado <ArrowRight size={16} />
          </Link>
        </div>
      )}
    </section>
  );
}
