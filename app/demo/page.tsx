import { GuidedDemo } from "@/components/guided-demo";

export default function DemoPage() {
  return (
    <div className="page-shell">
      <header className="page-intro">
        <div>
          <p className="eyebrow">Demo guiada · INC-0241</p>
          <h1>Prueba el circuito completo.</h1>
        </div>
        <p className="page-intro-copy">
          Empieza con una foto. Revisa la sugerencia, exige la evidencia que
          falta y comprueba por qué el cierre siempre necesita personas.
        </p>
      </header>
      <GuidedDemo />
    </div>
  );
}
