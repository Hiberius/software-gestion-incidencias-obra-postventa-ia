"use client";

import { useState } from "react";
import { Check, ClipboardPlus } from "lucide-react";

export function PreventiveAction() {
  const [created, setCreated] = useState(false);

  return (
    <div>
      <button
        className="primary-button aqua"
        onClick={() => setCreated(true)}
        disabled={created}
      >
        {created ? "Checklist creada" : "Crear checklist preventiva"}
        {created ? <Check size={16} /> : <ClipboardPlus size={16} />}
      </button>
      {created && (
        <p className="inline-success" role="status">
          Acción registrada · “Sellado perimetral de huecos — preentrega” ·
          pendiente de aprobación.
        </p>
      )}
    </div>
  );
}
