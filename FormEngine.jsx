/**
 * ProFicha — FormEngine.jsx
 * Motor de formularios dinámico que consume cualquier form de src/forms/
 * Soporta: text, number, date, email, tel, select, multiselect, radio,
 *          boolean_text, boolean_textarea, number_readonly, textarea, signature
 * Incluye: wizard por secciones, firma dual (canvas + texto), PDF bancario
 */

import { useState, useRef, useEffect, useCallback } from "react";
import { allForms } from "./forms/index.js";

// ── Utilidades ─────────────────────────────────────────────────
const genId = () => Math.random().toString(36).substr(2, 9);
const storage = {
  get: (k, d) => { try { const v = localStorage.getItem(`pf_${k}`); return v ? JSON.parse(v) : d; } catch { return d; } },
  set: (k, v) => { try { localStorage.setItem(`pf_${k}`, JSON.stringify(v)); } catch {} },
};

// ── Estilos del Motor ───────────────────────────────────────────
const ENGINE_CSS = `
  .fe-overlay {
    position: fixed; inset: 0; z-index: 1000;
    background: rgba(0,0,0,0.92);
    display: flex; flex-direction: column;
    backdrop-filter: blur(20px);
    animation: feIn 0.3s cubic-bezier(0.4,0,0.2,1);
  }
  @keyframes feIn { from { opacity:0; } to { opacity:1; } }

  .fe-header {
    padding: 16px 24px;
    border-bottom: 1px solid rgba(255,255,255,0.08);
    background: rgba(10,10,20,0.98);
    display: flex; align-items: center; gap: 16px;
    flex-shrink: 0;
  }
  .fe-header-info { flex: 1; min-width: 0; }
  .fe-header-title { font-size: 1.1rem; font-weight: 900; color: white; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .fe-header-meta { font-size: 0.75rem; color: #888; margin-top: 2px; }

  .fe-progress-bar { height: 4px; background: rgba(255,255,255,0.06); flex-shrink: 0; }
  .fe-progress-fill { height: 100%; background: linear-gradient(90deg, #6366f1, #a78bfa); transition: width 0.4s ease; }

  .fe-steps-nav {
    display: flex; gap: 0; overflow-x: auto; border-bottom: 1px solid rgba(255,255,255,0.06);
    background: rgba(5,5,10,0.98); flex-shrink: 0;
    scrollbar-width: none; padding: 0 16px;
  }
  .fe-steps-nav::-webkit-scrollbar { display: none; }
  .fe-step-pill {
    padding: 10px 14px; white-space: nowrap; font-size: 0.75rem; font-weight: 700;
    color: #666; border-bottom: 3px solid transparent; cursor: pointer;
    transition: all 0.2s; flex-shrink: 0; background: transparent; border-top: none;
    border-left: none; border-right: none; letter-spacing: 0.3px;
  }
  .fe-step-pill.active { color: #a78bfa; border-bottom-color: #6366f1; }
  .fe-step-pill.done { color: #10b981; }
  .fe-step-pill:hover:not(.active) { color: #ccc; }

  .fe-body {
    flex: 1; overflow-y: auto; padding: 28px 24px;
    scrollbar-width: thin; scrollbar-color: #6366f1 transparent;
  }

  .fe-section-title {
    font-size: 1.2rem; font-weight: 900; color: white;
    margin-bottom: 20px; padding-bottom: 12px;
    border-bottom: 2px solid rgba(99,102,241,0.3);
    display: flex; align-items: center; gap: 10px;
  }
  .fe-section-title::before { content: ''; width: 5px; height: 22px; background: #6366f1; border-radius: 3px; display: block; flex-shrink: 0; }

  .fe-field { margin-bottom: 20px; }
  .fe-label {
    display: block; font-size: 0.78rem; font-weight: 700;
    color: #94a3b8; text-transform: uppercase; letter-spacing: 0.8px;
    margin-bottom: 8px;
  }
  .fe-label .fe-req { color: #ef4444; margin-left: 3px; }
  .fe-input, .fe-select, .fe-textarea {
    width: 100%; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1);
    color: white; padding: 13px 16px; border-radius: 12px; font-size: 0.95rem;
    transition: all 0.2s; outline: none; font-family: inherit;
  }
  .fe-input:focus, .fe-select:focus, .fe-textarea:focus {
    border-color: #6366f1; background: rgba(99,102,241,0.08);
    box-shadow: 0 0 0 3px rgba(99,102,241,0.2);
  }
  .fe-input:read-only { opacity: 0.5; cursor: not-allowed; }
  .fe-select option { background: #13131a; }
  .fe-textarea { resize: vertical; min-height: 100px; line-height: 1.6; }

  /* Radio & Boolean */
  .fe-radio-group { display: flex; gap: 10px; flex-wrap: wrap; }
  .fe-radio-btn {
    padding: 10px 20px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.12);
    background: rgba(255,255,255,0.03); color: #aaa; cursor: pointer;
    font-weight: 700; font-size: 0.88rem; transition: all 0.2s;
  }
  .fe-radio-btn:hover { border-color: #6366f1; color: white; }
  .fe-radio-btn.active { background: rgba(99,102,241,0.15); border-color: #6366f1; color: #a78bfa; }

  .fe-boolean-wrap { display: flex; flex-direction: column; gap: 10px; }
  .fe-bool-trigger { display: flex; gap: 10px; }
  .fe-bool-extra { animation: feIn 0.2s ease; }

  /* Multiselect */
  .fe-multi-grid { display: flex; gap: 8px; flex-wrap: wrap; }
  .fe-multi-chip {
    padding: 8px 14px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.1);
    background: rgba(255,255,255,0.03); color: #aaa; cursor: pointer;
    font-size: 0.82rem; font-weight: 600; transition: all 0.2s;
  }
  .fe-multi-chip:hover { border-color: #6366f1; color: white; }
  .fe-multi-chip.active { background: rgba(99,102,241,0.18); border-color: #6366f1; color: #c4b5fd; }

  /* Consent Block */
  .fe-consent-box {
    background: rgba(99,102,241,0.06); border: 1px solid rgba(99,102,241,0.25);
    border-radius: 16px; padding: 24px; margin-bottom: 24px;
  }
  .fe-consent-title { font-size: 1rem; font-weight: 900; color: #a78bfa; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px; }
  .fe-consent-legal { font-size: 0.72rem; color: #666; margin-bottom: 12px; font-style: italic; }
  .fe-consent-text {
    background: rgba(0,0,0,0.4); border-radius: 10px; padding: 16px;
    font-size: 0.82rem; color: #aaa; line-height: 1.7; max-height: 200px;
    overflow-y: auto; margin-bottom: 16px; white-space: pre-wrap;
    border: 1px solid rgba(255,255,255,0.05);
  }
  .fe-consent-accept {
    display: flex; align-items: center; gap: 14px; padding: 14px 18px;
    background: rgba(16,185,129,0.08); border: 1px solid rgba(16,185,129,0.25);
    border-radius: 12px; cursor: pointer; transition: all 0.2s; width: 100%;
    color: white; font-weight: 700; font-size: 0.92rem;
  }
  .fe-consent-accept:hover { background: rgba(16,185,129,0.15); }
  .fe-consent-accept.accepted { border-color: #10b981; background: rgba(16,185,129,0.15); }
  .fe-checkbox { width: 22px; height: 22px; border-radius: 6px; border: 2px solid #666; background: transparent; display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: all 0.2s; }
  .fe-checkbox.checked { background: #10b981; border-color: #10b981; }

  /* Canvas de Firma */
  .fe-sig-modes { display: flex; gap: 10px; margin-bottom: 16px; }
  .fe-sig-mode-btn {
    flex: 1; padding: 12px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);
    background: rgba(255,255,255,0.03); color: #888; cursor: pointer;
    font-weight: 700; font-size: 0.85rem; transition: all 0.2s;
    display: flex; align-items: center; justify-content: center; gap: 8px;
  }
  .fe-sig-mode-btn.active { border-color: #f59e0b; background: rgba(245,158,11,0.1); color: #fbbf24; }
  .fe-canvas {
    width: 100%; height: 180px; border: 2px dashed rgba(245,158,11,0.4);
    border-radius: 12px; background: rgba(255,255,255,0.02); cursor: crosshair;
    touch-action: none; display: block;
  }
  .fe-canvas:focus { border-color: #f59e0b; outline: none; }
  .fe-sig-saved { color: #10b981; font-size: 0.85rem; font-weight: 700; margin-top: 8px; display: flex; align-items: center; gap: 6px; }

  /* Footer */
  .fe-footer {
    padding: 16px 24px; border-top: 1px solid rgba(255,255,255,0.06);
    background: rgba(5,5,10,0.98); display: flex; justify-content: space-between;
    align-items: center; gap: 12px; flex-shrink: 0;
  }
  .fe-btn {
    padding: 12px 24px; border-radius: 12px; font-weight: 800;
    font-size: 0.92rem; cursor: pointer; border: none; font-family: inherit;
    display: flex; align-items: center; gap: 8px; transition: all 0.2s;
  }
  .fe-btn-back { background: rgba(255,255,255,0.06); color: #888; border: 1px solid rgba(255,255,255,0.1); }
  .fe-btn-back:hover { background: rgba(255,255,255,0.1); color: white; }
  .fe-btn-next { background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; box-shadow: 0 6px 20px rgba(99,102,241,0.35); }
  .fe-btn-next:hover { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(99,102,241,0.5); }
  .fe-btn-next:disabled { background: #333; color: #666; box-shadow: none; cursor: not-allowed; transform: none; }
  .fe-btn-finish { background: linear-gradient(135deg, #10b981, #059669); color: white; box-shadow: 0 6px 20px rgba(16,185,129,0.35); }
  .fe-btn-finish:hover { transform: translateY(-2px); }
  .fe-btn-finish:disabled { background: #333; color: #666; box-shadow: none; cursor: not-allowed; transform: none; }
  .fe-btn-pdf { background: linear-gradient(135deg, #ef4444, #b91c1c); color: white; }
  .fe-btn-pdf:hover { transform: translateY(-2px); }

  .fe-step-counter { color: #666; font-size: 0.82rem; font-weight: 600; }

  /* Campos requeridos vacíos */
  .fe-field.error .fe-input,
  .fe-field.error .fe-select,
  .fe-field.error .fe-textarea { border-color: #ef4444; }
  .fe-error-msg { color: #ef4444; font-size: 0.78rem; margin-top: 6px; font-weight: 600; }

  /* Resumen final */
  .fe-summary { }
  .fe-summary-section { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 14px; padding: 18px; margin-bottom: 14px; }
  .fe-summary-section-title { font-size: 0.82rem; font-weight: 800; color: #6366f1; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px; }
  .fe-summary-row { display: flex; gap: 12px; padding: 6px 0; border-bottom: 1px solid rgba(255,255,255,0.04); font-size: 0.88rem; }
  .fe-summary-row:last-child { border-bottom: none; }
  .fe-summary-label { color: #666; flex-shrink: 0; width: 45%; }
  .fe-summary-value { color: #ddd; font-weight: 600; flex: 1; word-break: break-word; }

  @media (max-width: 600px) {
    .fe-body { padding: 20px 16px; }
    .fe-footer { padding: 12px 16px; }
    .fe-btn { padding: 12px 16px; font-size: 0.82rem; }
    .fe-header { padding: 12px 16px; }
  }
`;

// ── Componente Campo Individual ────────────────────────────────
function FieldRenderer({ campo, value, onChange }) {
  const { id, label, type, options, required, text_label, maxlength } = campo;

  const handleBooleanText = (boolVal, textVal) => {
    onChange({ bool: boolVal, text: textVal !== undefined ? textVal : (value?.text || "") });
  };

  const handleMultiSelect = (opt) => {
    const arr = Array.isArray(value) ? [...value] : [];
    const idx = arr.indexOf(opt);
    if (idx > -1) arr.splice(idx, 1); else arr.push(opt);
    onChange(arr);
  };

  switch (type) {
    case "text":
    case "tel":
    case "email":
    case "number":
      return (
        <input
          className="fe-input"
          type={type === "number" ? "number" : type === "email" ? "email" : type === "tel" ? "tel" : "text"}
          value={value || ""}
          onChange={e => onChange(e.target.value)}
          maxLength={maxlength}
          placeholder={label}
        />
      );

    case "number_readonly":
      // Calcula edad automáticamente si hay fecha de nacimiento
      return <input className="fe-input" type="number" value={value || ""} readOnly placeholder="Auto-calculado" />;

    case "date":
      return (
        <input
          className="fe-input"
          type="date"
          value={value || ""}
          onChange={e => onChange(e.target.value)}
        />
      );

    case "textarea":
      return (
        <textarea
          className="fe-textarea"
          value={value || ""}
          onChange={e => onChange(e.target.value)}
          placeholder={label}
          rows={4}
        />
      );

    case "select":
      return (
        <select className="fe-select" value={value || ""} onChange={e => onChange(e.target.value)}>
          <option value="">Seleccionar...</option>
          {(options || []).map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      );

    case "multiselect":
      return (
        <div className="fe-multi-grid">
          {(options || []).map(o => (
            <div
              key={o}
              className={`fe-multi-chip ${Array.isArray(value) && value.includes(o) ? "active" : ""}`}
              onClick={() => handleMultiSelect(o)}
            >
              {o}
            </div>
          ))}
        </div>
      );

    case "radio":
      return (
        <div className="fe-radio-group">
          {(options || []).map(o => (
            <button
              key={o}
              type="button"
              className={`fe-radio-btn ${value === o ? "active" : ""}`}
              onClick={() => onChange(o)}
            >
              {o}
            </button>
          ))}
        </div>
      );

    case "boolean_text":
    case "boolean_textarea": {
      const boolVal = value?.bool;
      const textVal = value?.text || "";
      return (
        <div className="fe-boolean-wrap">
          <div className="fe-bool-trigger">
            {["Sí", "No"].map(o => (
              <button
                key={o}
                type="button"
                className={`fe-radio-btn ${boolVal === o ? "active" : ""}`}
                onClick={() => handleBooleanText(o, textVal)}
              >
                {o}
              </button>
            ))}
          </div>
          {boolVal === "Sí" && (
            <div className="fe-bool-extra">
              {type === "boolean_textarea" ? (
                <textarea
                  className="fe-textarea"
                  value={textVal}
                  onChange={e => handleBooleanText("Sí", e.target.value)}
                  placeholder={text_label || "Especificar..."}
                  rows={3}
                />
              ) : (
                <input
                  className="fe-input"
                  value={textVal}
                  onChange={e => handleBooleanText("Sí", e.target.value)}
                  placeholder={text_label || "Especificar..."}
                />
              )}
            </div>
          )}
        </div>
      );
    }

    case "signature":
      return <SignatureField value={value} onChange={onChange} fieldId={id} />;

    default:
      return (
        <input
          className="fe-input"
          value={value || ""}
          onChange={e => onChange(e.target.value)}
          placeholder={label}
        />
      );
  }
}

// ── Componente de Firma ────────────────────────────────────────
function SignatureField({ value, onChange, fieldId }) {
  const [mode, setMode] = useState("draw");
  const [typed, setTyped] = useState(value?.typed || "");
  const [saved, setSaved] = useState(!!value?.data);
  const canvasRef = useRef(null);
  const drawing = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || mode !== "draw") return;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    const ctx = canvas.getContext("2d");
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#D4AF37";
    if (value?.data && mode === "draw") {
      const img = new Image();
      img.onload = () => ctx.drawImage(img, 0, 0);
      img.src = value.data;
    }
  }, [mode]);

  const getPos = (e, canvas) => {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  const startDraw = (e) => {
    e.preventDefault();
    drawing.current = true;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const p = getPos(e, canvas);
    ctx.beginPath(); ctx.moveTo(p.x, p.y);
  };

  const draw = (e) => {
    if (!drawing.current) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const p = getPos(e, canvas);
    ctx.lineTo(p.x, p.y); ctx.stroke();
  };

  const endDraw = () => { drawing.current = false; };

  const saveCanvas = () => {
    const canvas = canvasRef.current;
    const blank = document.createElement("canvas");
    blank.width = canvas.width; blank.height = canvas.height;
    blank.getContext("2d").clearRect(0, 0, blank.width, blank.height);
    if (canvas.toDataURL() === blank.toDataURL()) { alert("Por favor dibuja tu firma primero"); return; }
    const data = canvas.toDataURL("image/png");
    onChange({ type: "drawn", data });
    setSaved(true);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    onChange(null); setSaved(false);
  };

  const saveTyped = () => {
    if (typed.trim().length < 3) { alert("Escribe tu nombre completo"); return; }
    onChange({ type: "typed", data: typed.trim() });
    setSaved(true);
  };

  return (
    <div>
      <div className="fe-sig-modes">
        <button type="button" className={`fe-sig-mode-btn ${mode === "draw" ? "active" : ""}`} onClick={() => { setMode("draw"); setSaved(false); onChange(null); }}>
          ✏️ Dibujar
        </button>
        <button type="button" className={`fe-sig-mode-btn ${mode === "type" ? "active" : ""}`} onClick={() => { setMode("type"); setSaved(false); onChange(null); }}>
          ⌨️ Escribir (A11y)
        </button>
      </div>

      {mode === "draw" && (
        <>
          <canvas
            ref={canvasRef}
            className="fe-canvas"
            onMouseDown={startDraw} onMouseMove={draw} onMouseUp={endDraw} onMouseOut={endDraw}
            onTouchStart={startDraw} onTouchMove={draw} onTouchEnd={endDraw}
          />
          <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
            <button type="button" className="fe-btn fe-btn-back" style={{ fontSize: "0.82rem", padding: "9px 16px" }} onClick={clearCanvas}>🗑️ Borrar</button>
            <button type="button" className="fe-btn fe-btn-next" style={{ flex: 1, fontSize: "0.82rem", padding: "9px 16px" }} onClick={saveCanvas}>✓ Confirmar Firma</button>
          </div>
        </>
      )}

      {mode === "type" && (
        <>
          <input
            className="fe-input"
            style={{ fontFamily: "Georgia, serif", fontSize: "1.4rem", fontStyle: "italic", padding: "16px" }}
            value={typed}
            onChange={e => setTyped(e.target.value)}
            placeholder="Escribe tu nombre completo..."
          />
          <button type="button" className="fe-btn fe-btn-next" style={{ marginTop: 10, width: "100%", fontSize: "0.88rem" }} onClick={saveTyped}>✓ Usar como Firma</button>
        </>
      )}

      {saved && (
        <div className="fe-sig-saved">
          ✅ Firma registrada
          <button type="button" style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", fontSize: "0.78rem" }} onClick={() => { setSaved(false); onChange(null); }}>Cambiar</button>
        </div>
      )}
    </div>
  );
}

// ── Sección Individual del Wizard ──────────────────────────────
function SectionView({ seccion, values, onChange, showErrors }) {
  const formatValue = (val) => {
    if (!val) return "—";
    if (Array.isArray(val)) return val.join(", ");
    if (typeof val === "object") {
      if (val.bool) return `${val.bool}${val.text ? ` — ${val.text}` : ""}`;
      if (val.type === "drawn") return "✅ Firma dibujada";
      if (val.type === "typed") return `✅ "${val.data}"`;
    }
    return String(val);
  };

  return (
    <div>
      <div className="fe-section-title">{seccion.titulo}</div>
      {seccion.campos.map(campo => {
        const val = values[campo.id];
        const isEmpty = !val || (typeof val === "string" && val.trim() === "") || (Array.isArray(val) && val.length === 0);
        const hasError = showErrors && campo.required && isEmpty;

        return (
          <div key={campo.id} className={`fe-field ${hasError ? "error" : ""}`}>
            <label className="fe-label">
              {campo.label}
              {campo.required && <span className="fe-req">*</span>}
            </label>
            <FieldRenderer
              campo={campo}
              value={val}
              onChange={newVal => {
                // Auto-calcular edad si hay fecha de nacimiento
                if (campo.type === "date" && campo.label.toLowerCase().includes("nacimiento")) {
                  const dob = new Date(newVal);
                  const age = Math.floor((new Date() - dob) / (365.25 * 24 * 3600 * 1000));
                  onChange(campo.id, newVal);
                  // Buscar campo de edad en el mismo formulario y actualizarlo
                  const ageField = seccion.campos.find(c => c.type === "number_readonly" && c.label.toLowerCase().includes("edad"));
                  if (ageField) onChange(ageField.id, isNaN(age) ? "" : String(age));
                } else {
                  onChange(campo.id, newVal);
                }
              }}
            />
            {hasError && <div className="fe-error-msg">Este campo es requerido</div>}
          </div>
        );
      })}
    </div>
  );
}

// ── Sección de Consentimiento ──────────────────────────────────
function ConsentView({ consentimiento, values, onChange, showErrors }) {
  const accepted = values["__consent_accepted__"];

  return (
    <div>
      <div className="fe-section-title">📋 {consentimiento.titulo}</div>
      <div className="fe-consent-box">
        <div className="fe-consent-title">{consentimiento.titulo}</div>
        <div className="fe-consent-legal">Fundamento: {consentimiento.fundamento}</div>
        <div className="fe-consent-text">{consentimiento.texto}</div>
        <button
          type="button"
          className={`fe-consent-accept ${accepted ? "accepted" : ""}`}
          onClick={() => onChange("__consent_accepted__", !accepted)}
        >
          <div className={`fe-checkbox ${accepted ? "checked" : ""}`}>
            {accepted && <span style={{ color: "white", fontSize: "14px" }}>✓</span>}
          </div>
          {accepted ? "✅ He leído y acepto los términos anteriores" : "◻️ He leído y acepto este consentimiento informado"}
        </button>
      </div>

      {consentimiento.campos.map(campo => {
        const val = values[campo.id];
        const isEmpty = !val || (typeof val === "string" && val.trim() === "");
        const hasError = showErrors && campo.required && isEmpty;

        return (
          <div key={campo.id} className={`fe-field ${hasError ? "error" : ""}`}>
            <label className="fe-label">
              {campo.label}
              {campo.required && <span className="fe-req">*</span>}
            </label>
            <FieldRenderer campo={campo} value={val} onChange={newVal => onChange(campo.id, newVal)} />
            {hasError && <div className="fe-error-msg">Requerido para completar el consentimiento</div>}
          </div>
        );
      })}
    </div>
  );
}

// ── Vista de Resumen ───────────────────────────────────────────
function SummaryView({ form, values }) {
  const formatValue = (val) => {
    if (!val) return "—";
    if (Array.isArray(val)) return val.length > 0 ? val.join(", ") : "—";
    if (typeof val === "object") {
      if (val.bool) return `${val.bool}${val.text ? ` — ${val.text}` : ""}`;
      if (val.type === "drawn") return "✅ Firma autógrafa registrada";
      if (val.type === "typed") return `✅ Firma: "${val.data}"`;
    }
    if (val === "") return "—";
    return String(val);
  };

  return (
    <div className="fe-summary">
      <div className="fe-section-title">📋 Resumen del Expediente</div>
      <p style={{ color: "#888", fontSize: "0.88rem", marginBottom: 20 }}>
        Revisa que toda la información sea correcta antes de finalizar y generar el PDF.
      </p>
      {form.secciones.map(sec => {
        const hasData = sec.campos.some(c => values[c.id]);
        if (!hasData) return null;
        return (
          <div key={sec.id} className="fe-summary-section">
            <div className="fe-summary-section-title">{sec.titulo}</div>
            {sec.campos.filter(c => values[c.id]).map(c => (
              <div key={c.id} className="fe-summary-row">
                <span className="fe-summary-label">{c.label}</span>
                <span className="fe-summary-value">{formatValue(values[c.id])}</span>
              </div>
            ))}
          </div>
        );
      })}
      {form.consentimiento && values["__consent_accepted__"] && (
        <div className="fe-summary-section" style={{ borderColor: "rgba(16,185,129,0.3)" }}>
          <div className="fe-summary-section-title" style={{ color: "#10b981" }}>✅ Consentimiento</div>
          <div className="fe-summary-row">
            <span className="fe-summary-label">Estado</span>
            <span className="fe-summary-value" style={{ color: "#10b981" }}>Aceptado y firmado</span>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Motor Principal del Formulario ─────────────────────────────
export function FormEngine({ sectorId, patientName, onClose, onComplete, profile }) {
  const form = allForms[sectorId];
  if (!form) return null;

  // Construir pasos: secciones + consentimiento + resumen
  const steps = [
    ...form.secciones.map((s, i) => ({ type: "section", index: i, data: s })),
    ...(form.consentimiento ? [{ type: "consent", data: form.consentimiento }] : []),
    { type: "summary" },
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [values, setValues] = useState({});
  const [showErrors, setShowErrors] = useState(false);
  const [generating, setGenerating] = useState(false);
  const bodyRef = useRef(null);

  const totalSteps = steps.length;
  const progress = Math.round((currentStep / (totalSteps - 1)) * 100);
  const step = steps[currentStep];

  const handleChange = useCallback((fieldId, val) => {
    setValues(prev => ({ ...prev, [fieldId]: val }));
  }, []);

  const validateCurrentStep = () => {
    if (step.type === "summary") return true;
    if (step.type === "consent") {
      const consFields = form.consentimiento.campos.filter(c => c.required);
      return values["__consent_accepted__"] && consFields.every(c => {
        const v = values[c.id];
        return v && (typeof v !== "string" || v.trim() !== "");
      });
    }
    const required = step.data.campos.filter(c => c.required);
    return required.every(c => {
      const v = values[c.id];
      if (!v) return false;
      if (typeof v === "string") return v.trim() !== "";
      if (Array.isArray(v)) return v.length > 0;
      return true;
    });
  };

  const goNext = () => {
    if (!validateCurrentStep()) { setShowErrors(true); return; }
    setShowErrors(false);
    if (currentStep < totalSteps - 1) {
      setCurrentStep(s => s + 1);
      setTimeout(() => bodyRef.current?.scrollTo({ top: 0, behavior: "smooth" }), 100);
    }
  };

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep(s => s - 1);
      setTimeout(() => bodyRef.current?.scrollTo({ top: 0, behavior: "smooth" }), 100);
    }
  };

  const generatePDF = async () => {
    setGenerating(true);
    try {
      if (!window.jspdf) {
        await new Promise((res, rej) => {
          const s = document.createElement("script");
          s.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
          s.onload = res; s.onerror = rej;
          document.head.appendChild(s);
        });
      }
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF({ orientation: "portrait", unit: "pt", format: "letter" });

      const pdfBg = profile?.pdfBg || "#050508";
      const isLight = pdfBg === "#ffffff" || pdfBg === "#f8fafc";
      const textMain = isLight ? [15, 23, 42] : [255, 255, 255];
      const textSub = isLight ? [100, 116, 139] : [160, 170, 185];
      const accent = [99, 102, 241];
      const bgRgb = hexToRgb(pdfBg) || [5, 5, 8];
      const surfaceRgb = isLight ? [248, 250, 252] : [15, 15, 22];

      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const margin = 45;
      let y = margin;
      let pageNum = 1;

      const dateStr = new Date().toLocaleDateString("es-MX", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
      const folio = `PF-${sectorId.toUpperCase().substring(0, 3)}-${Date.now().toString(36).toUpperCase()}`;

      const addPage = () => {
        pdf.setFillColor(...bgRgb);
        pdf.rect(0, 0, pageW, pageH, "F");

        // Logo/nombre empresa
        if (profile?.logo) {
          try { pdf.addImage(profile.logo, "PNG", margin, 22, 45, 35, undefined, "FAST"); } catch {}
        }
        const logoOffset = profile?.logo ? 56 : 0;

        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(18);
        pdf.setTextColor(...accent);
        pdf.text(profile?.business || "ProFicha", margin + logoOffset, 40);

        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(8);
        pdf.setTextColor(...textSub);
        pdf.text(profile?.address || "", margin + logoOffset, 52);

        // Folio y fecha (derecha)
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(9);
        pdf.setTextColor(...textMain);
        pdf.text(`FOLIO: ${folio}`, pageW - margin, 32, { align: "right" });
        pdf.setFont("helvetica", "normal");
        pdf.setTextColor(...textSub);
        pdf.text(dateStr, pageW - margin, 44, { align: "right" });
        pdf.text(`Página ${pageNum}`, pageW - margin, 56, { align: "right" });

        // Línea divisora
        pdf.setDrawColor(...accent);
        pdf.setLineWidth(1.5);
        pdf.line(margin, 65, pageW - margin, 65);

        // Título del formulario
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(13);
        pdf.setTextColor(...textMain);
        pdf.text(`EXPEDIENTE: ${form.titulo.toUpperCase()}`, margin, 82);

        pdf.setFont("helvetica", "italic");
        pdf.setFontSize(7.5);
        pdf.setTextColor(...textSub);
        pdf.text(`${form.fundamento_legal}`, margin, 93, { maxWidth: pageW - margin * 2 });

        // Paciente
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(9);
        pdf.setTextColor(...accent);
        pdf.text(`PACIENTE: ${patientName}`, margin, 108);

        // Footer
        pdf.setDrawColor(...textSub);
        pdf.setLineWidth(0.3);
        pdf.line(margin, pageH - 38, pageW - margin, pageH - 38);
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(6.5);
        pdf.setTextColor(...textSub);
        pdf.text(`${profile?.business || "ProFicha"} · ${profile?.phone || ""} · ${profile?.email || ""}`, margin, pageH - 28);
        pdf.text("Documento generado con ProFicha — Expedientes Profesionales", pageW - margin, pageH - 28, { align: "right" });

        y = 122;
      };

      const checkBreak = (needed) => {
        if (y + needed > pageH - 50) {
          pdf.addPage(); pageNum++; addPage();
        }
      };

      const drawSectionHeader = (title) => {
        checkBreak(32);
        pdf.setFillColor(...accent);
        pdf.rect(margin, y, 4, 20, "F");
        pdf.setFillColor(...surfaceRgb);
        pdf.rect(margin + 4, y, pageW - margin * 2 - 4, 20, "F");
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(9.5);
        pdf.setTextColor(...accent);
        pdf.text(title.toUpperCase(), margin + 12, y + 14);
        y += 28;
      };

      const drawRow = (label, valueStr) => {
        const val = valueStr || "—";
        const splitVal = pdf.splitTextToSize(val, 300);
        const rowH = Math.max(20, splitVal.length * 11 + 10);
        checkBreak(rowH);

        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(8.5);
        pdf.setTextColor(...textSub);
        pdf.text(label, margin + 8, y + 13);

        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(8.5);
        pdf.setTextColor(...textMain);
        pdf.text(splitVal, margin + 190, y + 13);

        pdf.setDrawColor(isLight ? 230 : 30, isLight ? 230 : 30, isLight ? 235 : 35);
        pdf.setLineWidth(0.3);
        pdf.line(margin, y + rowH - 2, pageW - margin, y + rowH - 2);
        y += rowH;
      };

      const formatFieldValue = (val) => {
        if (!val) return "—";
        if (Array.isArray(val)) return val.length ? val.join(", ") : "—";
        if (typeof val === "object") {
          if (val.bool) return `${val.bool}${val.text ? ` — ${val.text}` : ""}`;
          if (val.type === "drawn") return "[Firma autógrafa adjunta]";
          if (val.type === "typed") return `Firma: "${val.data}"`;
        }
        return String(val);
      };

      // ── RENDER DEL PDF ──────────────────────────────────────
      addPage();

      for (const sec of form.secciones) {
        drawSectionHeader(sec.titulo);
        for (const campo of sec.campos) {
          const val = values[campo.id];
          if (campo.type === "signature") {
            checkBreak(90);
            pdf.setFont("helvetica", "bold");
            pdf.setFontSize(8.5);
            pdf.setTextColor(...textSub);
            pdf.text(campo.label, margin + 8, y + 13);
            if (val?.type === "drawn" && val.data) {
              pdf.addImage(val.data, "PNG", margin + 190, y, 150, 60);
              y += 70;
            } else if (val?.type === "typed") {
              pdf.setFont("times", "italic");
              pdf.setFontSize(14);
              pdf.setTextColor(...textMain);
              pdf.text(val.data, margin + 190, y + 40);
              y += 55;
            } else {
              pdf.setDrawColor(...textSub);
              pdf.line(margin + 190, y + 50, margin + 340, y + 50);
              y += 60;
            }
          } else {
            drawRow(campo.label, formatFieldValue(val));
          }
        }
        y += 8;
      }

      // Consentimiento
      if (form.consentimiento && values["__consent_accepted__"]) {
        pdf.addPage(); pageNum++; addPage();
        drawSectionHeader(form.consentimiento.titulo);

        // Texto del consentimiento
        checkBreak(30);
        pdf.setFont("helvetica", "italic");
        pdf.setFontSize(7.5);
        pdf.setTextColor(...textSub);
        pdf.text(`Fundamento: ${form.consentimiento.fundamento}`, margin + 8, y);
        y += 14;

        const splitConsent = pdf.splitTextToSize(form.consentimiento.texto, pageW - margin * 2 - 16);
        const consentH = splitConsent.length * 10 + 24;
        checkBreak(Math.min(consentH, 200));

        pdf.setFillColor(isLight ? 245 : 8, isLight ? 245 : 8, isLight ? 250 : 12);
        pdf.rect(margin, y, pageW - margin * 2, Math.min(consentH, 200), "F");
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(7.5);
        pdf.setTextColor(...textSub);

        let textY = y + 12;
        for (const line of splitConsent) {
          if (textY > y + 188) break;
          pdf.text(line, margin + 8, textY);
          textY += 10;
        }
        y += Math.min(consentH, 200) + 12;

        // Campos del consentimiento
        for (const campo of form.consentimiento.campos) {
          const val = values[campo.id];
          if (campo.type === "signature") {
            checkBreak(90);
            pdf.setFont("helvetica", "bold");
            pdf.setFontSize(8.5);
            pdf.setTextColor(...textSub);
            pdf.text(campo.label, margin + 8, y + 13);
            if (val?.type === "drawn" && val.data) {
              pdf.addImage(val.data, "PNG", margin + 190, y, 150, 65);
              y += 75;
            } else if (val?.type === "typed") {
              pdf.setFont("times", "italic");
              pdf.setFontSize(16);
              pdf.setTextColor(...textMain);
              pdf.text(val.data, margin + 200, y + 45, { align: "center" });
              pdf.setDrawColor(...accent);
              pdf.line(margin + 190, y + 55, margin + 340, y + 55);
              y += 65;
            } else {
              pdf.setDrawColor(...textSub);
              pdf.line(margin + 190, y + 55, margin + 340, y + 55);
              y += 65;
            }
          } else {
            drawRow(campo.label, formatFieldValue(val));
          }
        }

        // Sello de Aceptación
        checkBreak(30);
        pdf.setFillColor(16, 185, 129);
        pdf.rect(margin, y, pageW - margin * 2, 24, "F");
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(10);
        pdf.setTextColor(255, 255, 255);
        pdf.text("✓ CONSENTIMIENTO ACEPTADO Y FIRMADO ELECTRÓNICAMENTE", pageW / 2, y + 16, { align: "center" });
        y += 32;

        // Términos del profesional
        if (profile?.terms) {
          y += 10;
          drawSectionHeader("TÉRMINOS Y CONDICIONES DEL PROFESIONAL");
          const splitTerms = pdf.splitTextToSize(profile.terms, pageW - margin * 2 - 16);
          const termsH = splitTerms.length * 10 + 20;
          checkBreak(30);
          pdf.setFont("helvetica", "normal");
          pdf.setFontSize(7.5);
          pdf.setTextColor(...textSub);
          for (const line of splitTerms) {
            checkBreak(12);
            pdf.text(line, margin + 8, y);
            y += 10;
          }
        }
      }

      pdf.save(`ProFicha_${patientName.replace(/\s+/g, "_")}_${folio}.pdf`);

      const record = {
        id: genId(),
        patientName,
        sectorId,
        folio,
        date: new Date().toLocaleDateString("es-MX"),
        dateKey: new Date().toDateString(),
        ts: Date.now(),
        values,
      };
      onComplete?.(record);
    } catch (e) {
      console.error("PDF Error:", e);
      alert("Error al generar PDF. Verifica tu conexión e intenta de nuevo.");
    }
    setGenerating(false);
  };

  const isLast = step.type === "summary";
  const stepLabel = step.type === "summary" ? "Resumen Final" : step.type === "consent" ? "Consentimiento" : step.data.titulo;

  return (
    <>
      <style>{ENGINE_CSS}</style>
      <div className="fe-overlay">
        {/* Header */}
        <div className="fe-header">
          <button className="fe-btn fe-btn-back" style={{ padding: "10px 14px", flexShrink: 0 }} onClick={onClose}>✕</button>
          <div className="fe-header-info">
            <div className="fe-header-title">{form.titulo} — {patientName}</div>
            <div className="fe-header-meta">{stepLabel} · Paso {currentStep + 1} de {totalSteps}</div>
          </div>
        </div>

        {/* Barra de progreso */}
        <div className="fe-progress-bar">
          <div className="fe-progress-fill" style={{ width: `${progress}%` }} />
        </div>

        {/* Navegación por pasos */}
        <div className="fe-steps-nav">
          {steps.map((s, i) => {
            const lbl = s.type === "summary" ? "✓ Resumen" : s.type === "consent" ? "📋 Consent." : s.data.titulo.split(".")[0];
            return (
              <button
                key={i}
                className={`fe-step-pill ${i === currentStep ? "active" : i < currentStep ? "done" : ""}`}
                onClick={() => i < currentStep && setCurrentStep(i)}
              >
                {i < currentStep ? "✓ " : ""}{lbl}
              </button>
            );
          })}
        </div>

        {/* Cuerpo */}
        <div className="fe-body" ref={bodyRef}>
          {step.type === "section" && (
            <SectionView
              seccion={step.data}
              values={values}
              onChange={handleChange}
              showErrors={showErrors}
            />
          )}
          {step.type === "consent" && form.consentimiento && (
            <ConsentView
              consentimiento={form.consentimiento}
              values={values}
              onChange={handleChange}
              showErrors={showErrors}
            />
          )}
          {step.type === "summary" && (
            <SummaryView form={form} values={values} />
          )}
        </div>

        {/* Footer */}
        <div className="fe-footer">
          <div style={{ display: "flex", gap: 10 }}>
            <button className="fe-btn fe-btn-back" onClick={currentStep === 0 ? onClose : goBack}>
              {currentStep === 0 ? "✕ Cancelar" : "← Atrás"}
            </button>
          </div>
          <span className="fe-step-counter">{currentStep + 1} / {totalSteps}</span>
          <div style={{ display: "flex", gap: 10 }}>
            {isLast ? (
              <>
                <button
                  className="fe-btn fe-btn-pdf"
                  onClick={generatePDF}
                  disabled={generating}
                >
                  {generating ? "⏳ Generando..." : "📄 Exportar PDF"}
                </button>
                <button
                  className="fe-btn fe-btn-finish"
                  onClick={() => {
                    const record = { id: genId(), patientName, sectorId, date: new Date().toLocaleDateString("es-MX"), dateKey: new Date().toDateString(), ts: Date.now(), values };
                    onComplete?.(record);
                  }}
                >
                  ✓ Guardar
                </button>
              </>
            ) : (
              <button className="fe-btn fe-btn-next" onClick={goNext}>
                Siguiente →
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

// ── Helper ─────────────────────────────────────────────────────
function hexToRgb(hex) {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r ? [parseInt(r[1], 16), parseInt(r[2], 16), parseInt(r[3], 16)] : null;
}

export default FormEngine;
