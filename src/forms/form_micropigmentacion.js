export const formMicropigmentacion = {
  id: "micropigmentacion",
  titulo: "Micropigmentación (Dermógrafo)",
  fundamento_legal: "Nivel 2-3 (Semi-invasivo a Invasivo). Fines estéticos o reconstructivos. Exención de responsabilidad estricta para tejidos alterados o cicatrices.",
  secciones: [
    {
      id: "datos_generales_mpg",
      titulo: "A. Datos Generales",
      campos: [
        { id: "mpg_1", label: "Nombre completo", type: "text", required: true },
        { id: "mpg_2", label: "Edad (Mínimo 18 años)", type: "number", required: true },
        { id: "mpg_3", label: "Teléfono", type: "tel", required: true },
        { id: "mpg_4", label: "Artista / Técnico asignado", type: "text", required: true },
        { id: "mpg_5", label: "Fecha de la sesión", type: "date" }
      ]
    },
    {
      id: "zona_proposito_mpg",
      titulo: "B. Zona y Propósito",
      campos: [
        { id: "mpg_6", label: "Zona principal a tratar", type: "select", options: ["Cejas", "Labios", "Delineado ocular", "Cuero cabelludo (Scalp)", "Areolas", "Cicatrices", "Corporal / Otra"] },
        { id: "mpg_7", label: "Propósito del procedimiento", type: "select", options: ["Estético", "Reconstructivo (Mastectomía, Alopecia)", "Correctivo (Tapar trabajo previo)"], required: true },
        { id: "mpg_8", label: "Técnica a utilizar", type: "text", placeholder: "Pelo a pelo, sombreado, puntillismo, etc." },
        { id: "mpg_9", label: "¿Tiene pigmentación previa en la zona?", type: "boolean_textarea", text_label: "Describir color y técnica" },
        { id: "mpg_10", label: "¿Es sesión inicial o retoque?", type: "radio", options: ["Inicial", "Retoque"] }
      ]
    },
    {
      id: "perfil_dermico_mpg",
      titulo: "C. Perfil Dérmico Detallado",
      campos: [
        { id: "mpg_11", label: "Tipo de piel", type: "select", options: ["Seca", "Normal", "Grasa", "Combinada"] },
        { id: "mpg_12", label: "Tono de piel (Fitzpatrick)", type: "select", options: ["I", "II", "III", "IV", "V", "VI"] },
        { id: "mpg_13", label: "Condición de la piel en la zona", type: "select", options: ["Intacta", "Con cicatrices", "Con radiodermitis", "Con vitíligo", "Con injerto de piel"] },
        { id: "mpg_14", label: "Historial de cicatrización", type: "select", options: ["Normal", "Lenta", "Problemática"] }
      ]
    },
    {
      id: "queloides_mpg",
      titulo: "D. Propensión a Queloides e Hiperpigmentación (OBLIGATORIO)",
      campos: [
        { id: "mpg_15", label: "CRÍTICO: ¿Ha formado QUELOIDES (cicatriz abultada)?", type: "boolean_textarea", text_label: "Indicar zona y origen", required: true },
        { id: "mpg_16", label: "¿Antecedentes familiares de queloides?", type: "radio", options: ["Sí", "No"] },
        { id: "mpg_17", label: "¿Ha tenido reacciones granulomatosas a pigmentos anteriores?", type: "radio", options: ["Sí", "No"] },
        { id: "mpg_18", label: "¿Propensión a hiperpigmentación posinflamatoria?", type: "radio", options: ["Sí", "No"] }
      ]
    },
    {
      id: "alergias_mpg",
      titulo: "E. Alergias a Productos y Metales",
      campos: [
        { id: "mpg_19", label: "Alergia a pigmentos, tintas o colorantes", type: "radio", options: ["Sí", "No"] },
        { id: "mpg_20", label: "Sensibilidad a metales (níquel, cromo, cobalto, mercurio)", type: "boolean_text", text_label: "Especificar" },
        { id: "mpg_21", label: "Alergia a anestésicos tópicos (Lidocaína, EMLA)", type: "radio", options: ["Sí", "No"] },
        { id: "mpg_22", label: "Alergia al látex o antisépticos", type: "radio", options: ["Sí", "No"] },
        { id: "mpg_23", label: "Reacciones a tintes de cabello/cejas", type: "radio", options: ["Sí", "No"] }
      ]
    },
    {
      id: "antecedentes_medicos_mpg",
      titulo: "F. Antecedentes Médicos Relevantes",
      campos: [
        { id: "mpg_24", label: "Uso de retinoides o isotretinoína (CONTRAINDICADO)", type: "boolean_text", text_label: "Meses desde suspensión" },
        { id: "mpg_25", label: "Quimioterapia o Radioterapia activa (CONTRAINDICADO)", type: "radio", options: ["Sí", "No"] },
        { id: "mpg_26", label: "Embarazo o lactancia (CONTRAINDICADO)", type: "radio", options: ["Sí", "No"] },
        { id: "mpg_27", label: "Diabetes, Inmunosupresión o Trastornos de coagulación", type: "boolean_textarea", text_label: "Especificar" },
        { id: "mpg_28", label: "Herpes labial recurrente (Requiere profilaxis antiviral para labios)", type: "radio", options: ["Sí", "No"] },
        { id: "mpg_29", label: "Historial de MRI frecuente (Resonancias magnéticas)", type: "radio", options: ["Sí", "No"] }
      ]
    },
    {
      id: "entrevista_mpg",
      titulo: "G. Entrevista y Confirmación",
      campos: [
        { id: "mpg_30", label: "(Reconstructiva) ¿Su oncólogo/cirujano autorizó el procedimiento?", type: "radio", options: ["Sí", "No", "No aplica"] },
        { id: "mpg_31", label: "¿Ha revisado y aprobado el diseño, colores y trazo?", type: "radio", options: ["Sí", "Aún no"] }
      ]
    }
  ],
  consentimiento: {
    titulo: "ACUERDO DE SERVICIO DE ARTE CORPORAL Y EXENCIÓN TOTAL DE RESPONSABILIDAD CIVIL",
    fundamento: "Servicio: Micropigmentación",
    texto: "1. COMPRENSIÓN DEL PROCEDIMIENTO\nEntiendo que la micropigmentación introduce pigmento en la dermis con máquina rotativa (dermógrafo). Es un procedimiento semi-permanente a permanente. La retención del color varía según tipo de piel, edad y cuidados.\n\n2. QUELOIDES Y ALERGIAS\nDeclaro mi historial completo de alergias. Si declaré propensión a queloides o cicatrices hipertróficas, ACEPTO EXPRESAMENTE el riesgo de deformación en la zona tratada, liberando al artista de toda responsabilidad.\n\n3. RIESGOS ACEPTADOS\nEnrojecimiento, descamación (aclarado natural), pérdida parcial de color, cambio de tonalidad por el sol, infección por mal cuidado, reacción alérgica, reactivación de herpes (labios) y granulomas.\n\n4. APROBACIÓN DEL DISEÑO\nAprobé el diseño, colores y técnica. Una vez iniciado, la inconformidad estética no genera responsabilidad civil para el artista.\n\n5. CUIDADOS POSTERIORES (DESLINDE ABSOLUTO)\nME COMPROMETO A: a) Aplicar solo el cicatrizante indicado. b) NO mojar la zona con sudor, mar o alberca. c) NO ARRANCAR NI RASCAR la costra o descamación. d) Evitar sol directo y usar bloqueador solar una vez sanado. e) Asistir a retoque.\nDESLINDE: Cualquier infección, pérdida de color, cicatriz, queloide o mancha derivada de no seguir los cuidados es mi responsabilidad EXCLUSIVA.\n\n6. RECONSTRUCCIÓN (SI APLICA)\nSi es tejido irradiado o con cicatriz de mastectomía, acepto que el resultado estético puede variar por la naturaleza alterada de mi piel.\n\n7. EXENCIÓN DE RESPONSABILIDAD CIVIL\nLibero al artista de responsabilidad por alergias no declaradas, queloides advertidos, cambios de tono naturales, y pérdida de pigmento por incumplir cuidados o fricción.",
    campos: [
      { id: "mpg_c1", label: "Nombre completo del cliente", type: "text", required: true },
      { id: "mpg_c2", label: "Propósito (Estético / Reconstructivo / Correctivo)", type: "text", required: true },
      { id: "mpg_c3", label: "Pigmentos a utilizar", type: "text" },
      { id: "mpg_c4", label: "Firma autógrafa del cliente", type: "signature", required: true },
      { id: "mpg_c5", label: "Fecha y hora", type: "date", required: true },
      { id: "mpg_c6", label: "Artista / Técnico(a) responsable", type: "text", required: true },
      { id: "mpg_c7", label: "Firma del artista", type: "signature", required: true }
    ]
  }
};
