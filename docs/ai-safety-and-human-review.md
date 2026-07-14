# Seguridad de IA y revisión humana

## Límites explícitos

REPASO AI no afirma detectar defectos ocultos, determinar responsabilidades, certificar reparaciones ni sustituir una inspección. La demo comunica si la evidencia es suficiente o insuficiente para revisar una sugerencia; no muestra un porcentaje de “confianza” que pueda confundirse con la probabilidad de que exista un defecto.

## Gates

- Toda clasificación es editable y queda como “pendiente de validación técnica”.
- La evidencia insuficiente produce abstención y una solicitud concreta de contexto.
- Los duplicados pueden vincularse, fusionarse tras revisión o permanecer separados; nunca se fusionan automáticamente.
- La documentación “después” puede parecer completa, pero un profesional autoriza el paso a conformidad.
- El cierre exige validación técnica y conformidad del cliente.
- Una incidencia cerrada puede reabrirse con motivo registrado.

La IA no puede cambiar estados. Proveedor y técnico solo pueden realizar las transiciones de su rol; calidad conserva la validación y el cierre. La conformidad del cliente no reemplaza la aprobación técnica.

## Datos y privacidad

La demo usa exclusivamente datos y vectores sintéticos. No reconoce rostros ni solicita información personal real. Una implantación deberá acordar residencia UE, cifrado, RBAC, SSO, retención, borrado y auditoría con los responsables corporativos.

## Entradas multimodales futuras

Una fase con carga real debe considerar todo archivo como no fiable:

- lista positiva de extensiones y MIME, comprobación de magic bytes, límites de tamaño y descompresión;
- nombre de archivo regenerado, almacenamiento aislado y análisis antimalware;
- eliminación de EXIF y detección/minimización de información personal;
- separación estricta entre instrucciones del sistema y contenido extraído;
- salida estructurada validada, citas a la evidencia y herramientas con privilegio mínimo;
- pruebas periódicas de prompt injection directa, indirecta y multimodal.

No existe una defensa infalible frente a prompt injection. Por eso una respuesta del modelo nunca autoriza por sí sola una asignación, aprobación, cierre o acción externa.

## Evidencia operativa

Promociones, incidencias, personas, proveedores, scorecards, gráficos y resultados son sintéticos. El ROI separa el primer año del régimen estable y trata cada cifra como supuesto editable. Un piloto debe acordar baseline, población, ventana de observación, exclusiones y criterio de éxito antes de medir resultados.
