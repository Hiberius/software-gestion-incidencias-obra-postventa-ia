"use client";

import { useMemo, useState } from "react";
import { calculateROI, PRUDENT_ROI_INPUTS, type ROIInputs } from "@/lib/roi";

const euro = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

const number = new Intl.NumberFormat("es-ES", { maximumFractionDigits: 1 });

export function ROICalculator() {
  const [inputs, setInputs] = useState<ROIInputs>(PRUDENT_ROI_INPUTS);
  const result = useMemo(() => calculateROI(inputs), [inputs]);

  function update<K extends keyof ROIInputs>(key: K, value: ROIInputs[K]) {
    setInputs((current) => ({ ...current, [key]: value }));
  }

  return (
    <div className="roi-layout">
      <div className="roi-controls">
        <p className="eyebrow">Variables editables</p>
        <div className="field">
          <label htmlFor="annualHomes">Viviendas anuales</label>
          <input
            id="annualHomes"
            type="number"
            min="1"
            value={inputs.annualHomes}
            onChange={(event) =>
              update("annualHomes", Number(event.target.value))
            }
          />
        </div>
        <div className="field">
          <label htmlFor="incidents">Incidencias por vivienda</label>
          <input
            id="incidents"
            type="number"
            min="1"
            value={inputs.incidentsPerHome}
            onChange={(event) =>
              update("incidentsPerHome", Number(event.target.value))
            }
          />
        </div>
        <div className="field">
          <label htmlFor="minutes">Minutos ahorrados por incidencia</label>
          <input
            id="minutes"
            type="number"
            min="0"
            value={inputs.adminMinutesSaved}
            onChange={(event) =>
              update("adminMinutesSaved", Number(event.target.value))
            }
          />
        </div>
        <div className="field">
          <label htmlFor="hourly">Coste hora cargado (€)</label>
          <input
            id="hourly"
            type="number"
            min="0"
            value={inputs.loadedHourlyCost}
            onChange={(event) =>
              update("loadedHourlyCost", Number(event.target.value))
            }
          />
        </div>
        <div className="field">
          <label htmlFor="baseline">Baseline segundas visitas (%)</label>
          <input
            id="baseline"
            type="number"
            min="0"
            max="100"
            value={inputs.baselineRepeatVisitRate * 100}
            onChange={(event) =>
              update(
                "baselineRepeatVisitRate",
                Number(event.target.value) / 100,
              )
            }
          />
        </div>
        <div className="field">
          <label htmlFor="reductionMode">Tipo de reducción</label>
          <select
            id="reductionMode"
            value={inputs.repeatVisitReductionMode}
            onChange={(event) =>
              update(
                "repeatVisitReductionMode",
                event.target.value as ROIInputs["repeatVisitReductionMode"],
              )
            }
          >
            <option value="relative">Reducción relativa</option>
            <option value="percentage_points">Puntos porcentuales</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="reduction">Reducción (%)</label>
          <input
            id="reduction"
            type="number"
            min="0"
            max="100"
            value={inputs.repeatVisitReduction * 100}
            onChange={(event) =>
              update("repeatVisitReduction", Number(event.target.value) / 100)
            }
          />
        </div>
        <div className="field">
          <label htmlFor="cost">Coste del primer año (€)</label>
          <input
            id="cost"
            type="number"
            min="1"
            value={inputs.firstYearCost}
            onChange={(event) =>
              update("firstYearCost", Number(event.target.value))
            }
          />
        </div>
      </div>

      <div className="roi-results">
        <p className="eyebrow">Escenario prudente · anualizado a régimen</p>
        <h2>{number.format(result.steadyStateROI)} % ROI</h2>
        <p style={{ color: "rgba(242,240,232,.62)", maxWidth: 610 }}>
          Una reducción relativa del 10 % sobre una baseline del 20 % equivale a
          2 puntos porcentuales. No es lo mismo que reducir 10 puntos
          porcentuales.
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
            <strong>{euro.format(result.avoidedRepeatVisitCosts)}</strong>
          </div>
          <div className="roi-result">
            <label>Beneficio bruto</label>
            <strong>{euro.format(result.steadyStateGrossBenefit)}</strong>
          </div>
          <div className="roi-result">
            <label>Beneficio neto</label>
            <strong>{euro.format(result.steadyStateNetBenefit)}</strong>
          </div>
          <div className="roi-result">
            <label>Payback a régimen</label>
            <strong>
              {number.format(result.steadyStatePaybackMonths)} meses
            </strong>
          </div>
        </div>
        <div className="notice" style={{ marginBottom: 0 }}>
          Modelo paramétrico ilustrativo. No utiliza datos internos ni
          representa resultados reales o garantizados. El piloto debe validar
          baseline, causalidad, costes y adopción.
        </div>
      </div>
    </div>
  );
}
