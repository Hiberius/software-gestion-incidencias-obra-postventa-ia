import { GuidedDemo } from "@/components/guided-demo";

export default function DemoPage() {
  return (
    <div className="page-shell">
      <header className="page-intro">
        <div>
          <p className="eyebrow">Demo guiada · INC-0241</p>
          <h1>De una señal incompleta a una decisión trazable.</h1>
        </div>
        <p className="page-intro-copy">
          Recorre un caso sintético. Puedes validar, vincular, solicitar
          evidencias y cerrar, pero la IA nunca toma por sí sola una decisión
          técnica.
        </p>
      </header>
      <GuidedDemo />
    </div>
  );
}
