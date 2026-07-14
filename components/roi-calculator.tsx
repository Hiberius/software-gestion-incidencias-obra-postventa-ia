"use client";

import { useMemo, useState } from "react";
import { AlertCircle, ChevronDown } from "lucide-react";
import {
  calculateROI,
  PRUDENT_ROI_INPUTS,
  ROI_SCENARIOS,
  type ROIInputs,
  type ROIScenarioKey,
} from "@/lib/roi";

const euro = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

const number = new Intl.NumberFormat("es-ES", { maximumFractionDigits: 1 });

type NumericKey = Exclude<keyof ROIInputs, "repeatVisitReductionMode">;

function NumberField({
  id,
  label,
  value,
  min = 0,
  max,
  step,
  onChange,
}: {
  id: string;
  label: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="number"
        inputMode="decimal"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => {
          const next = event.currentTarget.valueAsNumber;
          onChange(Number.isFinite(next) ? next : 0);
        }}
      />
    </div>
  );
}

export function ROICalculator() {
  const [inputs, setInputs] = useState<ROIInputs>(PRUDENT_ROI_INPUTS);
  const [activeScenario, setActiveScenario] = useState<
    ROIScenarioKey | "custom"
  >("prudent");
  const calculation = useMemo(() => {
    try {
      return { result: calculateROI(inputs), error: null };
    } catch {
      return {
        result: null,
        error:
          "Revisa los valores. La reducción no puede superar la baseline y todos los importes deben estar dentro de un rango razonable.",
      };
    }
  }, [inputs]);

  const sensitivity = useMemo(() => {
    const shifts = [
      {
        label: "−20 pp",
        value: Math.max(0, inputs.firstYearRealization - 0.2),
      },
      { label: "Actual", value: inputs.firstYearRealization },
      {
        label: "+20 pp",
        value: Math.min(1, inputs.firstYearRealization + 0.2),
      },
    ];

    return shifts
      .filter(
        (item, index, collection) =>
          collection.findIndex(
            (candidate) => candidate.value === item.value,
          ) === index,
      )
      .map((item) => {
        try {
          const result = calculateROI({
            ...inputs,
            firstYearRealization: item.value,
          });
          return { ...item, roi: result.firstYearROI };
        } catch {
          return null;
        }
      })
      .filter((item): item is NonNullable<typeof item> => item !== null);
  }, [inputs]);

  function updateNumber(key: NumericKey, value: number) {
    setActiveScenario("custom");
    setInputs((current) => ({ ...current, [key]: value }));
  }

  function selectScenario(key: ROIScenarioKey) {
    setActiveScenario(key);
    setInputs({ ...ROI_SCENARIOS[key].inputs });
  }

  const result = calculation.result;

  return (
    <div className="roi-layout">
      <div className="roi-controls">
        <div className="roi-control-header">
          <div>
            <p className="eyebrow">Supuestos editables</p>
            <h2>Cambia una variable. Comprueba el efecto.</h2>
          </div>
          <button
            className="text-button"
            type="button"
            onClick={() => selectScenario("prudent")}
          >
            Restablecer escenario
          </button>
        </div>

        <div className="scenario-picker">
          <p>Escenarios ilustrativos</p>
          <div role="group" aria-label="Escenarios ilustrativos de ROI">
            {(
              Object.entries(ROI_SCENARIOS) as [
                ROIScenarioKey,
                (typeof ROI_SCENARIOS)[ROIScenarioKey],
              ][]
            ).map(([key, scenario]) => (
              <button
                type="button"
                key={key}
                aria-label={`Escenario ${scenario.label.toLocaleLowerCase("es-ES")}`}
                aria-pressed={activeScenario === key}
                onClick={() => selectScenario(key)}
              >
                <strong>{scenario.label}</strong>
                <span>{scenario.disclosure}</span>
              </button>
            ))}
          </div>
          {activeScenario === "custom" && (
            <small>
              Escenario personalizado: has cambiado uno o más supuestos.
            </small>
          )}
        </div>

        <div className="form-grid">
          <NumberField
            id="annualHomes"
            label="Viviendas anuales"
            min={1}
            max={1_000_000}
            value={inputs.annualHomes}
            onChange={(value) => updateNumber("annualHomes", value)}
          />
          <NumberField
            id="incidents"
            label="Incidencias por vivienda"
            min={1}
            max={1_000}
            step={0.1}
            value={inputs.incidentsPerHome}
            onChange={(value) => updateNumber("incidentsPerHome", value)}
          />
          <NumberField
            id="minutes"
            label="Minutos ahorrados por incidencia"
            max={1_440}
            value={inputs.adminMinutesSaved}
            onChange={(value) => updateNumber("adminMinutesSaved", value)}
          />
          <NumberField
            id="hourly"
            label="Coste hora cargado (€)"
            max={100_000}
            value={inputs.loadedHourlyCost}
            onChange={(value) => updateNumber("loadedHourlyCost", value)}
          />
        </div>

        <details className="assumption-details">
          <summary>
            Ver recurrencias, coste y adopción <ChevronDown size={16} />
          </summary>
          <div className="form-grid">
            <NumberField
              id="baseline"
              label="Baseline de segundas visitas (%)"
              max={100}
              step={0.1}
              value={inputs.baselineRepeatVisitRate * 100}
              onChange={(value) =>
                updateNumber("baselineRepeatVisitRate", value / 100)
              }
            />
            <div className="field">
              <label htmlFor="reductionMode">Tipo de reducción</label>
              <select
                id="reductionMode"
                value={inputs.repeatVisitReductionMode}
                onChange={(event) => {
                  setActiveScenario("custom");
                  setInputs((current) => ({
                    ...current,
                    repeatVisitReductionMode: event.target
                      .value as ROIInputs["repeatVisitReductionMode"],
                  }));
                }}
              >
                <option value="relative">Reducción relativa</option>
                <option value="percentage_points">Puntos porcentuales</option>
              </select>
            </div>
            <NumberField
              id="reduction"
              label="Reducción propuesta (%)"
              max={100}
              step={0.1}
              value={inputs.repeatVisitReduction * 100}
              onChange={(value) =>
                updateNumber("repeatVisitReduction", value / 100)
              }
            />
            <NumberField
              id="repeatCost"
              label="Coste medio de segunda visita (€)"
              max={10_000_000}
              value={inputs.averageRepeatVisitCost}
              onChange={(value) =>
                updateNumber("averageRepeatVisitCost", value)
              }
            />
            <NumberField
              id="cost"
              label="Coste del primer año (€)"
              min={1}
              max={1_000_000_000_000}
              value={inputs.firstYearCost}
              onChange={(value) => updateNumber("firstYearCost", value)}
            />
            <NumberField
              id="realization"
              label="Adopción efectiva del primer año (%)"
              max={100}
              step={1}
              value={inputs.firstYearRealization * 100}
              onChange={(value) =>
                updateNumber("firstYearRealization", value / 100)
              }
            />
          </div>
        </details>
      </div>

      <div className="roi-results" aria-live="polite">
        {result ? (
          <>
            <p className="eyebrow">Resultado ilustrativo</p>
            <div className="roi-headline">
              <div>
                <span>Primer año</span>
                <strong>{number.format(result.firstYearROI)} % ROI</strong>
              </div>
              <div>
                <span>Régimen estable</span>
                <strong>{number.format(result.steadyStateROI)} % ROI</strong>
              </div>
            </div>
            <p className="roi-explainer">
              El primer año aplica una adopción del{" "}
              {number.format(inputs.firstYearRealization * 100)} %. El régimen
              estable muestra el potencial anual si el proceso ya está
              implantado.
            </p>
            <div className="roi-result-grid">
              <div className="roi-result">
                <label>Volumen anual</label>
                <strong>{number.format(result.annualIncidentVolume)}</strong>
              </div>
              <div className="roi-result">
                <label>Ahorro administrativo</label>
                <strong>{euro.format(result.adminSavings)}</strong>
              </div>
              <div className="roi-result">
                <label>Repeticiones evitadas</label>
                <strong>{number.format(result.avoidedRepeatVisits)}</strong>
              </div>
              <div className="roi-result">
                <label>Beneficio bruto estable</label>
                <strong>{euro.format(result.steadyStateGrossBenefit)}</strong>
              </div>
              <div className="roi-result">
                <label>Beneficio neto estable</label>
                <strong>{euro.format(result.steadyStateNetBenefit)}</strong>
              </div>
              <div className="roi-result">
                <label>Payback estable</label>
                <strong>
                  {result.steadyStatePaybackMonths === null
                    ? "Sin retorno"
                    : `${number.format(result.steadyStatePaybackMonths)} meses`}
                </strong>
              </div>
            </div>
            <section
              className="roi-sensitivity"
              aria-labelledby="sensitivity-title"
            >
              <div>
                <h3 id="sensitivity-title">Sensibilidad del primer año</h3>
                <p>
                  Solo cambia la adopción efectiva en ±20 puntos porcentuales;
                  el resto de supuestos permanece igual.
                </p>
              </div>
              <div
                className="sensitivity-table"
                role="table"
                aria-label="Sensibilidad del ROI a la adopción"
              >
                {sensitivity.map((item) => (
                  <div role="row" key={`${item.label}-${item.value}`}>
                    <span role="cell">{item.label}</span>
                    <span role="cell">
                      {number.format(item.value * 100)} % adopción
                    </span>
                    <strong role="cell">{number.format(item.roi)} % ROI</strong>
                  </div>
                ))}
              </div>
            </section>
            <details className="calculation-details">
              <summary>Ver fórmula y trazabilidad</summary>
              <div>
                <p>
                  <strong>Ahorro administrativo =</strong> viviendas ×
                  incidencias/vivienda × minutos ahorrados ÷ 60 × coste/hora.
                </p>
                <p>
                  <strong>Visitas evitadas =</strong> volumen anual × baseline ×
                  reducción relativa. Si eliges puntos porcentuales, se aplica
                  la reducción directa sobre el volumen.
                </p>
                <p>
                  <strong>ROI =</strong> (beneficio bruto × adopción − coste del
                  primer año) ÷ coste del primer año × 100.
                </p>
                <dl>
                  <div>
                    <dt>Origen</dt>
                    <dd>
                      Todos los valores son inputs editables de esta página.
                    </dd>
                  </div>
                  <div>
                    <dt>Fuente real requerida</dt>
                    <dd>
                      Baseline acordada, tiempos observados y costes validados
                      durante el piloto.
                    </dd>
                  </div>
                </dl>
              </div>
            </details>
            <div className="notice">
              Modelo ilustrativo. No utiliza datos internos ni representa
              resultados garantizados. El piloto debe validar baseline,
              causalidad, costes y adopción.
            </div>
          </>
        ) : (
          <div className="roi-error" role="alert">
            <AlertCircle size={24} aria-hidden="true" />
            <h2>El escenario no se puede calcular.</h2>
            <p>{calculation.error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
