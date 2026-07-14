import { Check, ScanLine } from "lucide-react";
import { clsx } from "clsx";

export function IncidentVisual({
  repaired = false,
  label,
}: {
  repaired?: boolean;
  label?: string;
}) {
  return (
    <figure className={clsx("incident-visual", repaired && "is-repaired")}>
      <div className="visual-meta">
        <span>
          {label ?? (repaired ? "DESPUÉS · 08 JUL" : "ANTES · 02 JUL")}
        </span>
        <span>IMG-DEMO-0241</span>
      </div>
      <svg
        viewBox="0 0 640 420"
        role="img"
        aria-label={
          repaired
            ? "Ventana tras la actuación"
            : "Detalle de ventana antes de la actuación"
        }
      >
        <defs>
          <linearGradient
            id={repaired ? "wallAfter" : "wallBefore"}
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop offset="0" stopColor={repaired ? "#d8d6cc" : "#d6d2c6"} />
            <stop offset="1" stopColor={repaired ? "#aaa99f" : "#aaa397"} />
          </linearGradient>
          <linearGradient
            id={repaired ? "glassAfter" : "glassBefore"}
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="0" stopColor="#8ca4aa" />
            <stop offset="1" stopColor="#526c71" />
          </linearGradient>
          <filter id={repaired ? "noiseAfter" : "noiseBefore"}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.7"
              numOctaves="2"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncA type="table" tableValues="0 0.08" />
            </feComponentTransfer>
          </filter>
        </defs>
        <rect
          width="640"
          height="420"
          fill={`url(#${repaired ? "wallAfter" : "wallBefore"})`}
        />
        <rect
          width="640"
          height="420"
          filter={`url(#${repaired ? "noiseAfter" : "noiseBefore"})`}
          opacity=".5"
        />
        <rect x="137" y="42" width="390" height="335" rx="3" fill="#283436" />
        <rect
          x="158"
          y="62"
          width="349"
          height="294"
          fill={`url(#${repaired ? "glassAfter" : "glassBefore"})`}
        />
        <path
          d="M158 270 C260 210 360 235 507 150"
          stroke="#c5d2d0"
          strokeOpacity=".38"
          strokeWidth="3"
          fill="none"
        />
        <path
          d="M158 62 L507 356 M507 62 L158 356"
          stroke="#e0ecea"
          strokeOpacity=".12"
        />
        <rect
          x="128"
          y="34"
          width="410"
          height="351"
          rx="5"
          fill="none"
          stroke="#172022"
          strokeWidth="10"
        />
        {repaired ? (
          <path
            d="M128 385 L538 385"
            stroke="#56d8c1"
            strokeWidth="8"
            strokeLinecap="round"
          />
        ) : (
          <>
            <path
              d="M128 385 L420 385"
              stroke="#4c5453"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <path
              d="M456 385 L538 385"
              stroke="#4c5453"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <path
              d="M418 383 C430 372 439 401 453 384"
              stroke="#e7e0cf"
              strokeWidth="3"
              fill="none"
            />
          </>
        )}
        <rect
          x="394"
          y="350"
          width="92"
          height="52"
          fill="none"
          stroke={repaired ? "#56d8c1" : "#e6b06c"}
          strokeWidth="2"
          strokeDasharray="6 5"
        />
        <circle
          cx="486"
          cy="350"
          r="4"
          fill={repaired ? "#56d8c1" : "#e6b06c"}
        />
      </svg>
      <figcaption>
        <span className={clsx("visual-status", repaired && "is-verified")}>
          {repaired ? <Check size={14} /> : <ScanLine size={14} />}
          {repaired
            ? "Evidencia aparentemente completa"
            : "Zona señalada para revisión"}
        </span>
        <span>Residencial Alba Norte · 3.º B · Salón</span>
      </figcaption>
    </figure>
  );
}
