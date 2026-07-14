from __future__ import annotations

from pathlib import Path
from typing import Iterable

from PIL import Image
from reportlab.graphics import renderPDF
from reportlab.graphics.barcode.qr import QrCodeWidget
from reportlab.graphics.shapes import Drawing
from reportlab.lib.colors import Color, HexColor
from reportlab.lib.pagesizes import A4, landscape
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "output" / "pdf"
MEDIA = ROOT / "public" / "media"

DECK = OUT / "repaso-ai-candidatura.pdf"
ONEPAGER = OUT / "repaso-ai-resumen-ejecutivo.pdf"

INK = HexColor("#09242A")
CONTROL = HexColor("#17363C")
PAPER = HexColor("#F3F0E6")
PAPER_DEEP = HexColor("#E7E2D5")
WHITE = HexColor("#FBFAF5")
MUTED = HexColor("#66787B")
TEAL = HexColor("#4FD2BF")
TEAL_DEEP = HexColor("#167A70")
AMBER = HexColor("#E7B76A")
CORAL = HexColor("#DF6B5E")
EDGE = HexColor("#BFC9C7")

DEMO_URL = "https://repaso-ai.pages.dev/"
CHALLENGE_URL = "https://metrovacesachallenge.ai/"

FONT_DIR = Path("/System/Library/Fonts/Supplemental")
pdfmetrics.registerFont(TTFont("Arial", str(FONT_DIR / "Arial.ttf")))
pdfmetrics.registerFont(TTFont("Arial-Bold", str(FONT_DIR / "Arial Bold.ttf")))
pdfmetrics.registerFont(TTFont("Arial-Italic", str(FONT_DIR / "Arial Italic.ttf")))
pdfmetrics.registerFont(TTFont("Georgia", str(FONT_DIR / "Georgia.ttf")))
pdfmetrics.registerFont(TTFont("Georgia-Bold", str(FONT_DIR / "Georgia Bold.ttf")))


def lighten(color: Color, amount: float) -> Color:
    return Color(
        color.red + (1 - color.red) * amount,
        color.green + (1 - color.green) * amount,
        color.blue + (1 - color.blue) * amount,
    )


def wrap_lines(text: str, font: str, size: float, width: float) -> list[str]:
    lines: list[str] = []
    for paragraph in text.split("\n"):
        if paragraph == "":
            lines.append("")
            continue
        words = paragraph.split()
        current = ""
        for word in words:
            candidate = word if not current else f"{current} {word}"
            if pdfmetrics.stringWidth(candidate, font, size) <= width:
                current = candidate
            else:
                if current:
                    lines.append(current)
                current = word
        if current:
            lines.append(current)
    return lines


def text_block(
    c: canvas.Canvas,
    text: str,
    x: float,
    y: float,
    width: float,
    *,
    font: str = "Arial",
    size: float = 10,
    leading: float | None = None,
    color: Color = INK,
    max_lines: int | None = None,
) -> float:
    leading = leading or size * 1.35
    lines = wrap_lines(text, font, size, width)
    if max_lines is not None and len(lines) > max_lines:
        lines = lines[:max_lines]
        while lines and pdfmetrics.stringWidth(lines[-1] + "...", font, size) > width:
            lines[-1] = lines[-1].rsplit(" ", 1)[0]
        if lines:
            lines[-1] += "..."
    c.setFont(font, size)
    c.setFillColor(color)
    for line in lines:
        if line:
            c.drawString(x, y, line)
        y -= leading
    return y


def eyebrow(c: canvas.Canvas, text: str, x: float, y: float, color: Color = TEAL_DEEP) -> None:
    c.setFont("Arial-Bold", 7.8)
    c.setFillColor(color)
    c.drawString(x, y, text.upper())


def section_title(
    c: canvas.Canvas,
    text: str,
    x: float,
    y: float,
    width: float,
    *,
    size: float = 27,
    color: Color = INK,
) -> float:
    return text_block(
        c,
        text,
        x,
        y,
        width,
        font="Georgia",
        size=size,
        leading=size * 1.02,
        color=color,
    )


def bullet_list(
    c: canvas.Canvas,
    items: Iterable[str],
    x: float,
    y: float,
    width: float,
    *,
    size: float = 9.2,
    color: Color = INK,
    marker: Color = TEAL_DEEP,
    gap: float = 8,
) -> float:
    for item in items:
        c.setFillColor(marker)
        c.rect(x, y - 4, 5, 5, stroke=0, fill=1)
        y = text_block(c, item, x + 14, y, width - 14, font="Arial", size=size, leading=size * 1.38, color=color)
        y -= gap
    return y


def image_cover(c: canvas.Canvas, path: Path, x: float, y: float, w: float, h: float) -> None:
    with Image.open(path) as img:
        iw, ih = img.size
    scale = max(w / iw, h / ih)
    dw, dh = iw * scale, ih * scale
    dx = x + (w - dw) / 2
    dy = y + (h - dh) / 2
    c.saveState()
    clip = c.beginPath()
    clip.rect(x, y, w, h)
    c.clipPath(clip, stroke=0, fill=0)
    c.drawImage(str(path), dx, dy, width=dw, height=dh, mask="auto")
    c.restoreState()


def qr(c: canvas.Canvas, url: str, x: float, y: float, size: float, bg: Color = WHITE) -> None:
    c.setFillColor(bg)
    c.rect(x, y, size, size, stroke=0, fill=1)
    widget = QrCodeWidget(url)
    bounds = widget.getBounds()
    bw = bounds[2] - bounds[0]
    bh = bounds[3] - bounds[1]
    drawing = Drawing(size - 10, size - 10, transform=[(size - 10) / bw, 0, 0, (size - 10) / bh, 0, 0])
    drawing.add(widget)
    renderPDF.draw(drawing, c, x + 5, y + 5)
    c.linkURL(url, (x, y, x + size, y + size), relative=0)


def brand_mark(c: canvas.Canvas, x: float, y: float, color: Color = INK) -> None:
    c.setStrokeColor(color)
    c.setLineWidth(1.3)
    c.rect(x, y - 10, 16, 16, stroke=1, fill=0)
    c.line(x + 5, y - 2, x + 8, y - 6)
    c.line(x + 8, y - 6, x + 13, y + 2)
    c.setFont("Arial-Bold", 10)
    c.setFillColor(color)
    c.drawString(x + 24, y - 6, "REPASO AI")


def footer(c: canvas.Canvas, page: int, pages: int, *, dark: bool = False) -> None:
    w, _ = landscape(A4)
    color = lighten(WHITE, 0) if dark else MUTED
    edge = Color(1, 1, 1, alpha=0.20) if dark else EDGE
    c.setStrokeColor(edge)
    c.setLineWidth(0.6)
    c.line(42, 28, w - 42, 28)
    c.setFillColor(color)
    c.setFont("Arial", 7)
    c.drawString(42, 15, "PROPUESTA INDEPENDIENTE - METROVACESA AI CHALLENGE II")
    c.drawRightString(w - 42, 15, f"{page:02d} / {pages:02d}")


def new_page(c: canvas.Canvas, *, dark: bool = False) -> tuple[float, float]:
    w, h = landscape(A4)
    c.setFillColor(INK if dark else PAPER)
    c.rect(0, 0, w, h, stroke=0, fill=1)
    return w, h


def panel(c: canvas.Canvas, x: float, y: float, w: float, h: float, fill: Color, stroke: Color = EDGE) -> None:
    c.setFillColor(fill)
    c.setStrokeColor(stroke)
    c.setLineWidth(0.7)
    c.rect(x, y, w, h, stroke=1, fill=1)


def draw_cover(c: canvas.Canvas) -> None:
    w, h = new_page(c, dark=True)
    image_cover(c, MEDIA / "hero-quality-review.webp", w * 0.55, 0, w * 0.45, h)
    c.setFillColor(Color(0.035, 0.14, 0.16, alpha=0.22))
    c.rect(w * 0.55, 0, w * 0.45, h, stroke=0, fill=1)
    brand_mark(c, 44, h - 46, WHITE)
    eyebrow(c, "Candidatura 2026 - demo funcional", 44, h - 91, TEAL)
    y = section_title(
        c,
        "De la foto al cierre verificado.",
        44,
        h - 128,
        405,
        size=35,
        color=WHITE,
    )
    y -= 8
    y = section_title(c, "De cada incidencia, una mejora.", 44, y, 405, size=35, color=TEAL)
    y -= 20
    text_block(
        c,
        "Capa de inteligencia de calidad para construcción, preentrega y postventa: estructura la evidencia, mantiene la decisión humana y convierte recurrencias en prevención.",
        44,
        y,
        390,
        font="Arial",
        size=11.2,
        leading=16,
        color=WHITE,
    )
    c.setFillColor(TEAL)
    c.rect(44, 78, 286, 42, stroke=0, fill=1)
    c.setFillColor(INK)
    c.setFont("Arial-Bold", 9)
    c.drawString(60, 95, "ABRIR DEMO FUNCIONAL")
    c.setFont("Arial", 8)
    c.drawString(60, 83, "repaso-ai.pages.dev")
    c.linkURL(DEMO_URL, (44, 78, 330, 120), relative=0)
    qr(c, DEMO_URL, 348, 72, 54)
    c.setFillColor(WHITE)
    c.setFont("Arial", 7.5)
    c.drawString(w * 0.55 + 15, 17, "Imagen sintética de demostración - no corresponde a una obra real")
    footer(c, 1, 8, dark=True)
    c.showPage()


def draw_problem(c: canvas.Canvas) -> None:
    w, h = new_page(c)
    brand_mark(c, 42, h - 37)
    eyebrow(c, "01 - El problema", 42, h - 78)
    section_title(c, "La incidencia se registra. El coste se esconde en todo lo que falta.", 42, h - 110, 520, size=26)

    image_cover(c, MEDIA / "incident-context.webp", 42, 238, 348, 205)
    c.setFillColor(WHITE)
    c.rect(54, 250, 196, 34, stroke=0, fill=1)
    eyebrow(c, "Evidencia sintética", 65, 271, TEAL_DEEP)
    c.setFont("Arial", 8)
    c.setFillColor(INK)
    c.drawString(65, 258, "Vista general para contexto")

    image_cover(c, MEDIA / "incident-before.webp", 404, 238, 178, 205)
    c.setFillColor(CORAL)
    c.rect(414, 250, 112, 24, stroke=0, fill=1)
    c.setFillColor(WHITE)
    c.setFont("Arial-Bold", 7.5)
    c.drawString(424, 258, "SEÑAL A REVISAR")

    x0 = 610
    y0 = 424
    facts = [
        ("01", "Entrada fragmentada", "Fotos, mensajes y documentos llegan sin el contexto mínimo para decidir."),
        ("02", "Coordinación repetida", "Aclarar, clasificar, reasignar y programar una segunda visita consume tiempo invisible."),
        ("03", "Aprendizaje perdido", "El cierre queda aislado y el mismo patrón puede repetirse en otra vivienda o promoción."),
    ]
    for num, title, copy in facts:
        c.setStrokeColor(EDGE)
        c.line(x0, y0 + 18, w - 42, y0 + 18)
        c.setFillColor(TEAL_DEEP)
        c.setFont("Arial-Bold", 8)
        c.drawString(x0, y0, num)
        c.setFillColor(INK)
        c.setFont("Arial-Bold", 11)
        c.drawString(x0 + 30, y0, title)
        y0 = text_block(c, copy, x0 + 30, y0 - 20, 174, size=8.8, leading=12.2, color=MUTED) - 13

    panel(c, 42, 62, w - 84, 130, WHITE)
    eyebrow(c, "Tesis de valor", 58, 171)
    section_title(c, "La unidad de valor no es el ticket creado.", 58, 141, 400, size=22)
    c.setFont("Arial-Bold", 14)
    c.setFillColor(TEAL_DEEP)
    c.drawString(485, 136, "Es la incidencia cerrada con evidencia")
    c.drawString(485, 115, "y el patrón que deja de repetirse.")
    text_block(c, "REPASO AI conecta captura, revisión, verificación y prevención en un solo circuito trazable.", 485, 91, 300, size=8.8, leading=12, color=MUTED)
    footer(c, 2, 8)
    c.showPage()


def draw_loop(c: canvas.Canvas) -> None:
    w, h = new_page(c, dark=True)
    brand_mark(c, 42, h - 37, WHITE)
    eyebrow(c, "02 - La solución", 42, h - 78, TEAL)
    section_title(c, "Un circuito cerrado de calidad, con una persona responsable en cada decisión.", 42, h - 110, 650, size=27, color=WHITE)

    steps = [
        ("01", "Capturar", "Evidencia y contexto mínimo"),
        ("02", "Revisar", "Sugerencia editable o abstención"),
        ("03", "Asignar", "Responsable, SLA y trazabilidad"),
        ("04", "Verificar", "Antes/después y conformidad humana"),
        ("05", "Prevenir", "Recurrencia, checklist y acción"),
    ]
    x = 42
    y = 286
    gap = 10
    sw = (w - 84 - gap * 4) / 5
    for index, (num, title, copy) in enumerate(steps):
        fill = TEAL if index in (0, 3) else CONTROL
        stroke = TEAL if index in (0, 3) else Color(1, 1, 1, alpha=0.22)
        panel(c, x, y, sw, 148, fill, stroke)
        c.setFillColor(INK if fill == TEAL else TEAL)
        c.setFont("Arial-Bold", 8)
        c.drawString(x + 16, y + 120, num)
        c.setFont("Georgia", 17)
        c.drawString(x + 16, y + 87, title)
        text_block(c, copy, x + 16, y + 61, sw - 32, size=8.7, leading=12, color=INK if fill == TEAL else WHITE)
        if index < len(steps) - 1:
            c.setStrokeColor(TEAL)
            c.setLineWidth(1.2)
            c.line(x + sw + 1, y + 74, x + sw + gap - 1, y + 74)
        x += sw + gap

    panel(c, 42, 76, 355, 160, CONTROL, Color(1, 1, 1, alpha=0.22))
    eyebrow(c, "Qué aporta la IA", 60, 211, TEAL)
    bullet_list(
        c,
        [
            "Describe lo visible y estructura campos editables.",
            "Pide evidencia cuando una conclusión no es defendible.",
            "Propone posibles similitudes, sin fusionar automáticamente.",
            "Agrega patrones para orientar una acción preventiva.",
        ],
        60,
        185,
        320,
        size=8.8,
        color=WHITE,
        marker=TEAL,
        gap=4,
    )

    panel(c, 414, 76, w - 456, 160, WHITE, TEAL)
    eyebrow(c, "Qué decide la persona", 432, 211, TEAL_DEEP)
    bullet_list(
        c,
        [
            "Corrige categoría, severidad, responsable y evidencia.",
            "Acepta o rechaza una coincidencia.",
            "Confirma la reparación o reabre el caso.",
            "Aprueba cualquier efecto sobre proveedor o proceso.",
        ],
        432,
        185,
        w - 492,
        size=8.8,
        color=INK,
        marker=TEAL_DEEP,
        gap=4,
    )
    footer(c, 3, 8, dark=True)
    c.showPage()


def draw_matrix(c: canvas.Canvas) -> None:
    w, h = new_page(c)
    brand_mark(c, 42, h - 37)
    eyebrow(c, "03 - Prueba y alcance", 42, h - 78)
    section_title(c, "Hoy, piloto y futuro: ninguna capacidad adelantada.", 42, h - 110, 520, size=27)
    text_block(c, "La demo pública demuestra el flujo. El piloto valida datos reales. Producción añade controles enterprise después de aprobar requisitos.", 570, h - 104, 228, size=9.2, leading=13, color=MUTED)

    x0, y_top = 42, 390
    widths = [210, 178, 178, 178]
    headers = ["CAPACIDAD", "HOY - DEMO", "PILOTO", "PRODUCCIÓN"]
    fills = [PAPER_DEEP, TEAL, WHITE, INK]
    x = x0
    for header, cw, fill in zip(headers, widths, fills):
        c.setFillColor(fill)
        c.setStrokeColor(EDGE)
        c.rect(x, y_top, cw, 42, stroke=1, fill=1)
        c.setFillColor(WHITE if fill == INK else INK)
        c.setFont("Arial-Bold", 7.8)
        c.drawString(x + 12, y_top + 16, header)
        x += cw

    rows = [
        ("Recorrido completo", "Funcional", "Con datos autorizados", "Escalado"),
        ("Análisis multimodal", "Simulado/determinista", "Server-side controlado", "Servicio gobernado"),
        ("Persistencia e identidad", "No", "Entorno aislado", "SSO + RBAC"),
        ("Integración", "No conectada", "CSV/XLSX", "API + conectores"),
        ("Auditoría", "Trazabilidad visual", "Eventos de piloto", "Registro append-only"),
        ("Decisión automática", "No", "No", "No para decisiones materiales"),
    ]
    y = y_top - 38
    for row_i, row in enumerate(rows):
        x = x0
        rh = 38
        for col_i, (cell, cw) in enumerate(zip(row, widths)):
            fill = WHITE if row_i % 2 == 0 else PAPER
            c.setFillColor(fill)
            c.setStrokeColor(EDGE)
            c.rect(x, y, cw, rh, stroke=1, fill=1)
            font = "Arial-Bold" if col_i == 0 else "Arial"
            color = INK if col_i != 1 else TEAL_DEEP
            text_block(c, cell, x + 12, y + 23, cw - 24, font=font, size=8.0, leading=9.8, color=color, max_lines=2)
            x += cw
        y -= rh

    panel(c, 42, 48, 472, 53, INK, INK)
    eyebrow(c, "Demo pública", 58, 84, TEAL)
    c.setFont("Arial-Bold", 11)
    c.setFillColor(WHITE)
    c.drawString(58, 63, "repaso-ai.pages.dev")
    c.linkURL(DEMO_URL, (58, 53, 270, 80), relative=0)
    c.setFont("Arial", 8.2)
    c.setFillColor(lighten(MUTED, 0.55))
    c.drawString(258, 63, "Sin login - datos sintéticos - sin API externa")
    qr(c, DEMO_URL, 526, 48, 53)
    panel(c, 595, 48, w - 637, 53, WHITE)
    eyebrow(c, "Principio", 611, 84)
    text_block(c, "Si la evidencia no basta, el sistema debe pedir más, no inventar certeza.", 611, 66, w - 669, font="Arial-Bold", size=7.8, leading=9.4, color=INK, max_lines=2)
    footer(c, 4, 8)
    c.showPage()


def draw_roi(c: canvas.Canvas) -> None:
    w, h = new_page(c)
    brand_mark(c, 42, h - 37)
    eyebrow(c, "04 - Impacto y ROI", 42, h - 78)
    section_title(c, "El caso económico muestra supuestos, rampa y sensibilidad.", 42, h - 110, 540, size=27)
    text_block(c, "No son resultados obtenidos ni datos internos de Metrovacesa. Cada entrada se sustituye por una baseline validada antes de aprobar inversión.", 598, h - 104, 200, size=8.8, leading=12.3, color=MUTED)

    scenario_y = 280
    scenarios = [
        ("CONSERVADOR", "-70 %", "ROI 1er año", "-32 %", "régimen", "Ahorro 5 min - adopción 45 % - coste 90 kEUR", PAPER_DEEP, INK),
        ("PRUDENTE", "-11 %", "ROI 1er año", "+36 %", "régimen", "Ahorro 8 min - adopción 65 % - coste 75 kEUR", TEAL, INK),
        ("ADOPCIÓN ALTA", "+63 %", "ROI 1er año", "+92 %", "régimen", "Ahorro 10 min - adopción 85 % - coste 70 kEUR", INK, WHITE),
    ]
    gap = 12
    sw = (w - 84 - gap * 2) / 3
    x = 42
    for label, big, big_label, steady, steady_label, copy, fill, fg in scenarios:
        panel(c, x, scenario_y, sw, 153, fill, INK if fill != INK else CONTROL)
        eyebrow(c, label, x + 16, scenario_y + 130, TEAL_DEEP if fill != INK else TEAL)
        c.setFillColor(fg)
        c.setFont("Georgia", 26)
        c.drawString(x + 16, scenario_y + 89, big)
        c.setFont("Arial", 7.5)
        c.drawString(x + 18, scenario_y + 72, big_label)
        c.setFont("Arial-Bold", 12)
        c.drawRightString(x + sw - 16, scenario_y + 89, steady)
        c.setFont("Arial", 7.5)
        c.drawRightString(x + sw - 16, scenario_y + 72, steady_label)
        text_block(c, copy, x + 16, scenario_y + 45, sw - 32, size=7.8, leading=10.4, color=fg if fill == INK else MUTED, max_lines=2)
        x += sw + gap

    panel(c, 42, 84, 470, 183, WHITE)
    eyebrow(c, "Escenario prudente - entradas editables", 58, 243)
    inputs = [
        ("1.805", "viviendas/año"),
        ("10", "incidencias/vivienda"),
        ("8 min", "ahorro por incidencia"),
        ("32 EUR", "coste hora cargado"),
        ("20 %", "baseline segundas visitas"),
        ("-10 %", "reducción relativa"),
        ("70 EUR", "coste segunda visita"),
        ("65 %", "realización 1er año"),
    ]
    col_w = 108
    for i, (value, label) in enumerate(inputs):
        col = i % 4
        row = i // 4
        ix = 58 + col * col_w
        iy = 197 - row * 67
        c.setFillColor(INK)
        c.setFont("Arial-Bold", 11)
        c.drawString(ix, iy, value)
        text_block(c, label, ix, iy - 16, col_w - 10, size=7.3, leading=9.5, color=MUTED, max_lines=2)

    panel(c, 528, 84, w - 570, 183, INK, INK)
    eyebrow(c, "Fórmula verificable", 546, 243, TEAL)
    formulas = [
        "Volumen = viviendas x incidencias",
        "Ahorro admin. = volumen x min / 60 x coste hora",
        "Visitas evitadas = volumen x baseline x reducción relativa",
        "ROI 1er año = (beneficio x adopción - coste) / coste",
    ]
    bullet_list(c, formulas, 546, 215, w - 606, size=8.2, color=WHITE, marker=TEAL, gap=7)
    c.setFillColor(TEAL)
    c.rect(546, 96, w - 606, 36, stroke=0, fill=1)
    text_block(c, "Resultado prudente: 102 kEUR brutos/año - payback estable 8,8 meses", 559, 119, w - 632, font="Arial-Bold", size=7.1, leading=9.2, color=INK, max_lines=2)
    footer(c, 5, 8)
    c.showPage()


def draw_pilot(c: canvas.Canvas) -> None:
    w, h = new_page(c)
    brand_mark(c, 42, h - 37)
    eyebrow(c, "05 - Piloto propuesto", 42, h - 78)
    section_title(c, "Una promoción. 150 viviendas. 12 semanas. Una decisión go/no-go.", 42, h - 110, 640, size=27)
    c.setFillColor(TEAL)
    c.rect(690, h - 139, 108, 68, stroke=0, fill=1)
    c.setFillColor(INK)
    c.setFont("Georgia", 24)
    c.drawString(708, h - 106, "12")
    c.setFont("Arial-Bold", 8)
    c.drawString(708, h - 123, "SEMANAS")

    phases = [
        ("01-02", "Baseline", "Proceso actual, fuentes, métricas, permisos y criterios de salida."),
        ("03-04", "Preparación", "Taxonomía, checklist, SLA, importación, formación y aceptación."),
        ("05-10", "Operación", "Casos autorizados, revisión humana, telemetría y excepciones."),
        ("11-12", "Evaluación", "Comparativa, auditoría de muestra, ROI y decisión de alcance."),
    ]
    x = 42
    py = 303
    gap = 10
    pw = (w - 84 - gap * 3) / 4
    for idx, (weeks, title, copy) in enumerate(phases):
        fill = TEAL if idx == 2 else WHITE
        panel(c, x, py, pw, 143, fill)
        eyebrow(c, f"SEM {weeks}", x + 14, py + 119, TEAL_DEEP if fill != TEAL else INK)
        c.setFillColor(INK)
        c.setFont("Georgia", 16)
        c.drawString(x + 14, py + 88, title)
        text_block(c, copy, x + 14, py + 62, pw - 28, size=8.1, leading=11.2, color=INK if fill == TEAL else MUTED)
        x += pw + gap

    panel(c, 42, 74, 476, 184, WHITE)
    eyebrow(c, "Métricas acordadas antes de empezar", 58, 235)
    metrics = [
        "Tiempo mediano de registro y clasificación.",
        "Completitud al primer intento y aclaraciones necesarias.",
        "Tiempo hasta asignación aceptada.",
        "Reaperturas o segundas visitas sobre cierres elegibles.",
        "Cierres con antes/después, responsable, comprobación y fecha.",
    ]
    bullet_list(c, metrics, 58, 207, 444, size=8.4, gap=4)

    panel(c, 534, 74, w - 576, 184, INK, INK)
    eyebrow(c, "Regla de decisión", 552, 235, TEAL)
    c.setFillColor(TEAL)
    c.setFont("Georgia", 17)
    c.drawString(552, 202, "Ampliar")
    text_block(c, "Mejora material + trazabilidad completa + caso económico validado + sin incidente crítico.", 552, 181, w - 612, size=8.2, leading=11, color=WHITE)
    c.setFillColor(AMBER)
    c.setFont("Georgia", 14)
    c.drawString(552, 135, "Iterar o detener")
    text_block(c, "Muestra insuficiente, más revisión que ahorro, riesgo no mitigable o ROI por debajo del umbral acordado.", 552, 116, w - 612, size=8, leading=10.6, color=WHITE)
    footer(c, 6, 8)
    c.showPage()


def draw_security(c: canvas.Canvas) -> None:
    w, h = new_page(c, dark=True)
    brand_mark(c, 42, h - 37, WHITE)
    eyebrow(c, "06 - Viabilidad, integración y seguridad", 42, h - 78, TEAL)
    section_title(c, "Encima de los sistemas existentes, con controles antes de usar datos reales.", 42, h - 110, 680, size=27, color=WHITE)

    lanes = [
        ("ENTRADA", "CSV/XLSX primero", "Baseline, maestros y casos bajo un mapeo validado."),
        ("ORQUESTACIÓN", "API/webhook después", "Autenticación, idempotencia, reintentos y cola de error."),
        ("SISTEMA OFICIAL", "Sin reemplazo abrupto", "Estados y evidencias vuelven al repositorio acordado."),
    ]
    x = 42
    ly = 315
    gap = 12
    lw = (w - 84 - gap * 2) / 3
    for idx, (label, title, copy) in enumerate(lanes):
        fill = TEAL if idx == 0 else CONTROL
        panel(c, x, ly, lw, 131, fill, TEAL if idx == 0 else Color(1, 1, 1, alpha=0.22))
        eyebrow(c, label, x + 16, ly + 107, INK if idx == 0 else TEAL)
        c.setFillColor(INK if idx == 0 else WHITE)
        c.setFont("Georgia", 15)
        c.drawString(x + 16, ly + 77, title)
        text_block(c, copy, x + 16, ly + 51, lw - 32, size=8.2, leading=11, color=INK if idx == 0 else WHITE)
        x += lw + gap

    panel(c, 42, 72, 364, 197, WHITE, WHITE)
    eyebrow(c, "Archivos e imágenes", 60, 244, TEAL_DEEP)
    bullet_list(
        c,
        [
            "Límites MIME/tamaño y verificación de magic bytes.",
            "Eliminación EXIF, escaneo antimalware y almacenamiento privado.",
            "URLs firmadas, caducidad y retención acordada.",
            "Aislamiento del documento y salida estructurada validada.",
        ],
        60,
        218,
        330,
        size=8.2,
        gap=5,
    )

    panel(c, 422, 72, w - 464, 197, CONTROL, Color(1, 1, 1, alpha=0.22))
    eyebrow(c, "Decisión y gobierno", 440, 244, TEAL)
    bullet_list(
        c,
        [
            "Defensa ante prompt injection en texto y documentos.",
            "SSO, RBAC, segregación por promoción y residencia UE.",
            "Auditoría append-only de sugerencia, corrección y aprobación.",
            "Sin cierre, penalización o diagnóstico técnico automáticos.",
        ],
        440,
        218,
        w - 500,
        size=8.2,
        color=WHITE,
        marker=TEAL,
        gap=5,
    )
    c.setFillColor(AMBER)
    c.rect(440, 90, w - 500, 36, stroke=0, fill=1)
    c.setFillColor(INK)
    c.setFont("Arial-Bold", 7.6)
    c.drawString(454, 105, "Condición de entrada al piloto: threat model, DPA/privacidad y controles aprobados.")
    footer(c, 7, 8, dark=True)
    c.showPage()


def draw_close(c: canvas.Canvas) -> None:
    w, h = new_page(c)
    image_cover(c, MEDIA / "recurring-pattern.webp", 0, h - 210, w, 210)
    c.setFillColor(Color(0.035, 0.14, 0.16, alpha=0.55))
    c.rect(0, h - 210, w, 210, stroke=0, fill=1)
    brand_mark(c, 42, h - 37, WHITE)
    eyebrow(c, "07 - Propuesta de entrada", 42, h - 78, TEAL)
    section_title(c, "Validar primero. Integrar después. Escalar solo con evidencia.", 42, h - 111, 610, size=29, color=WHITE)

    panel(c, 42, 166, 486, 174, WHITE)
    eyebrow(c, "Siguiente paso propuesto", 60, 315)
    c.setFillColor(INK)
    c.setFont("Georgia", 18)
    c.drawString(60, 284, "Taller de encaje de 90 minutos")
    bullet_list(
        c,
        [
            "Elegir un proceso y una promoción con baseline utilizable.",
            "Validar fuentes, taxonomía, responsables y restricciones IT/privacidad.",
            "Cerrar métricas, coste, equipo mínimo y criterio go/no-go.",
        ],
        60,
        252,
        440,
        size=8.8,
        gap=6,
    )

    panel(c, 546, 166, w - 588, 174, INK, INK)
    eyebrow(c, "Ver la prueba", 566, 315, TEAL)
    qr(c, DEMO_URL, 566, 210, 88)
    c.setFillColor(WHITE)
    c.setFont("Arial-Bold", 10)
    c.drawString(673, 276, "Demo funcional")
    c.setFont("Arial", 8)
    c.drawString(673, 258, "repaso-ai.pages.dev")
    c.drawString(673, 239, "Sin login - 5 minutos")
    c.setFillColor(TEAL)
    c.rect(673, 206, 124, 27, stroke=0, fill=1)
    c.setFillColor(INK)
    c.setFont("Arial-Bold", 7.5)
    c.drawString(685, 216, "ABRIR DEMO")
    c.linkURL(DEMO_URL, (673, 206, 797, 233), relative=0)

    c.setFillColor(PAPER_DEEP)
    c.rect(42, 70, w - 84, 72, stroke=0, fill=1)
    eyebrow(c, "Transparencia", 58, 119)
    text_block(c, "La demo es determinista y usa datos e imágenes sintéticos. No diagnostica, no certifica reparaciones y no demuestra todavía integraciones enterprise. El ROI es un modelo editable que debe validarse en piloto.", 58, 98, 470, size=7.9, leading=10.5, color=MUTED)
    c.setFont("Arial-Bold", 7.5)
    c.setFillColor(INK)
    c.drawString(555, 115, "Fuentes y documentación")
    c.setFont("Arial", 7.2)
    c.setFillColor(TEAL_DEEP)
    c.drawString(555, 98, "repaso-ai.pages.dev/metodologia/")
    c.drawString(555, 84, "metrovacesachallenge.ai/")
    c.linkURL(DEMO_URL + "metodologia/", (555, 94, 760, 107), relative=0)
    c.linkURL(CHALLENGE_URL, (555, 80, 735, 93), relative=0)
    footer(c, 8, 8)
    c.showPage()


def generate_deck() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    c = canvas.Canvas(str(DECK), pagesize=landscape(A4), pageCompression=1)
    c.setTitle("REPASO AI - Candidatura Metrovacesa AI Challenge II")
    c.setAuthor("REPASO AI")
    c.setSubject("Calidad trazable para construcción, preentrega y postventa")
    for page in (draw_cover, draw_problem, draw_loop, draw_matrix, draw_roi, draw_pilot, draw_security, draw_close):
        page(c)
    c.save()


def generate_onepager() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    w, h = A4
    c = canvas.Canvas(str(ONEPAGER), pagesize=A4, pageCompression=1)
    c.setTitle("REPASO AI - Resumen ejecutivo")
    c.setAuthor("REPASO AI")
    c.setFillColor(PAPER)
    c.rect(0, 0, w, h, stroke=0, fill=1)
    image_cover(c, MEDIA / "hero-quality-review.webp", 0, h - 260, w, 260)
    c.setFillColor(Color(0.035, 0.14, 0.16, alpha=0.58))
    c.rect(0, h - 260, w, 260, stroke=0, fill=1)
    brand_mark(c, 36, h - 40, WHITE)
    eyebrow(c, "Resumen ejecutivo - candidatura 2026", 36, h - 80, TEAL)
    section_title(c, "De la foto al cierre verificado.", 36, h - 112, 430, size=30, color=WHITE)
    section_title(c, "De cada incidencia, una mejora.", 36, h - 150, 450, size=27, color=TEAL)
    text_block(c, "Capa de inteligencia de calidad para construcción, preentrega y postventa, con revisión humana y aprendizaje preventivo.", 36, h - 190, 410, size=10.2, leading=14, color=WHITE)
    qr(c, DEMO_URL, w - 112, h - 226, 72)

    x_left, x_right = 36, 314
    y = h - 295
    eyebrow(c, "Problema", x_left, y)
    y = text_block(c, "La evidencia llega fragmentada. El coste aparece al aclarar, reasignar, reabrir y repetir el mismo fallo.", x_left, y - 22, 240, font="Arial-Bold", size=10, leading=14, color=INK)
    y -= 16
    eyebrow(c, "Solución", x_left, y)
    y = bullet_list(c, ["Estructura evidencia editable.", "Pide lo que falta y se abstiene.", "Verifica antes/después.", "Conecta recurrencia con prevención."], x_left, y - 24, 240, size=8.5, gap=3)

    y2 = h - 295
    eyebrow(c, "Diferencia", x_right, y2)
    y2 = text_block(c, "No es otro ticket manager: mejora la calidad de entrada, mantiene la decisión humana y reutiliza el cierre como aprendizaje.", x_right, y2 - 22, 245, font="Arial-Bold", size=9.5, leading=13, color=INK)
    y2 -= 16
    eyebrow(c, "Piloto", x_right, y2)
    y2 = text_block(c, "Una promoción - 150 viviendas - 12 semanas - baseline, operación controlada y decisión go/no-go.", x_right, y2 - 22, 245, size=9, leading=13, color=INK)
    y2 -= 16
    eyebrow(c, "ROI prudente ilustrativo", x_right, y2)
    text_block(c, "102 kEUR de beneficio bruto estable; payback 8,8 meses; ROI 1er año -11 % por la rampa; régimen +36 %. Todo editable y pendiente de validar.", x_right, y2 - 22, 245, size=8.5, leading=12, color=MUTED)

    eyebrow(c, "Flujo cerrado", 36, 303)
    flow = ["Capturar", "Revisar", "Asignar", "Verificar", "Prevenir"]
    flow_gap = 6
    flow_w = (w - 72 - flow_gap * 4) / 5
    flow_x = 36
    for index, item in enumerate(flow):
        c.setFillColor(TEAL if index in (0, 3) else PAPER_DEEP)
        c.setStrokeColor(EDGE)
        c.rect(flow_x, 222, flow_w, 58, stroke=1, fill=1)
        c.setFillColor(INK)
        c.setFont("Arial-Bold", 7.5)
        c.drawString(flow_x + 10, 249, f"0{index + 1}")
        c.setFont("Arial-Bold", 8.5)
        c.drawString(flow_x + 10, 234, item)
        flow_x += flow_w + flow_gap

    panel(c, 36, 95, w - 72, 103, INK, INK)
    eyebrow(c, "Estado verificable", 52, 176, TEAL)
    c.setFillColor(WHITE)
    c.setFont("Arial-Bold", 9)
    c.drawString(52, 151, "HOY")
    text_block(c, "Demo funcional, determinista, pública y con datos sintéticos.", 52, 134, 142, size=7.8, leading=10.5, color=WHITE)
    c.setFont("Arial-Bold", 9)
    c.drawString(216, 151, "PILOTO")
    text_block(c, "Datos autorizados, importación inicial y medición antes/después.", 216, 134, 155, size=7.8, leading=10.5, color=WHITE)
    c.setFont("Arial-Bold", 9)
    c.drawString(394, 151, "FUTURO")
    text_block(c, "SSO, RBAC, auditoría, residencia UE, API y conectores.", 394, 134, 150, size=7.8, leading=10.5, color=WHITE)
    c.setFont("Arial", 7)
    c.setFillColor(MUTED)
    c.drawString(36, 63, "Demo: repaso-ai.pages.dev  |  Metodología: repaso-ai.pages.dev/metodologia/")
    c.linkURL(DEMO_URL, (36, 55, 230, 72), relative=0)
    c.setStrokeColor(EDGE)
    c.line(36, 47, w - 36, 47)
    c.setFont("Arial", 6.8)
    c.drawString(36, 31, "Propuesta independiente - 14 julio 2026 - Las cifras son hipótesis, no resultados obtenidos.")
    c.save()


if __name__ == "__main__":
    generate_deck()
    generate_onepager()
    print(DECK)
    print(ONEPAGER)
