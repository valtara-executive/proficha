export const formPiercing = {
  id: "piercing",
  titulo: "Piercing",
  fundamento_legal: "Nivel 3 (Invasivo). Requiere ID oficial. Consentimiento legal estricto por riesgo de queloides, rechazo y migración.",
  secciones: [
    {
      id: "datos_verificacion_pir",
      titulo: "A. Datos Generales y Verificación",
      campos: [
        { id: "pir_1", label: "Nombre completo", type: "text", required: true },
        { id: "pir_2", label: "Fecha de nacimiento", type: "date", required: true },
        { id: "pir_3", label: "Edad (Verificada)", type: "number", required: true },
        { id: "pir_4", label: "Tipo y folio de Identificación Oficial", type: "text", required: true },
        { id: "pir_5", label: "Teléfono", type: "tel", required: true },
        { id: "pir_6", label: "Correo electrónico", type: "email" },
        { id: "pir_7", label: "Piercero asignado", type: "text", required: true }
      ]
    },
    {
      id: "perfil_anatomico_pir",
      titulo: "B. Perfil Dérmico y Anatómico",
      campos: [
        { id: "pir_8", label: "Tipo de piel en la zona", type: "select", options: ["Normal", "Seca", "Grasa", "Sensible"] },
        { id: "pir_9", label: "Tono de piel (Fitzpatrick)", type: "select", options: ["I", "II", "III", "IV", "V", "VI"] },
        { id: "pir_10", label: "Observaciones anatómicas de la zona (ej. grosor del cartílago, frenillo)", type: "textarea" }
      ]
    },
    {
      id: "queloides_pir",
      titulo: "C. Propensión a Queloides y Cicatrización (CRÍTICO)",
      campos: [
        { id: "pir_11", label: "CRÍTICO: ¿Ha formado QUELOIDES (bolitas duras/abultadas) en orejas u otra parte?", type: "radio", options: ["Sí", "No"], required: true },
        { id: "pir_12", label: "Detalles de queloides previos (zona, tamaño, origen)", type: "textarea" },
        { id: "pir_13", label: "¿Tiene piercings previos que hayan rechazado o migrado?", type: "boolean_textarea", text_label: "Describir" },
        { id: "pir_14", label: "¿Antecedentes familiares de queloides?", type: "radio", options: ["Sí", "No"] },
        { id: "pir_15", label: "¿Historial de cicatrización lenta o problemática?", type: "radio", options: ["Sí", "No"] }
      ]
    },
    {
      id: "alergias_materiales_pir",
      titulo: "D. Alergias a Materiales (CRÍTICO)",
      campos: [
        { id: "pir_16", label: "Alergia al Níquel (CONTRAINDICADO joyas de baja calidad)", type: "radio", options: ["Sí", "No"] },
        { id: "pir_17", label: "Alergia al Acero Inoxidable Quirúrgico", type: "radio", options: ["Sí", "No"] },
        { id: "pir_18", label: "Alergia al Titanio u Oro", type: "boolean_text", text_label: "Especificar" },
        { id: "pir_19", label: "Alergia al Látex o Antisépticos (Alcohol, Yodo, Clorhexidina)", type: "boolean_text", text_label: "Especificar" }
      ]
    },
    {
      id: "antecedentes_medicos_pir",
      titulo: "E. Antecedentes Médicos Relevantes",
      campos: [
        { id: "pir_20", label: "Trastornos de coagulación, hemofilia o uso de anticoagulantes", type: "boolean_text", text_label: "Especificar" },
        { id: "pir_21", label: "Diabetes (riesgo de infección y cicatrización alterada)", type: "radio", options: ["Sí", "No"] },
        { id: "pir_22", label: "Infección activa, psoriasis o eccema en la zona", type: "radio", options: ["Sí", "No"] },
        { id: "pir_23", label: "Embarazo actual (relevante para ombligo, pezón, genital)", type: "radio", options: ["Sí", "No"] },
        { id: "pir_24", label: "Válvulas cardíacas protésicas (riesgo de endocarditis)", type: "radio", options: ["Sí", "No"] }
      ]
    },
    {
      id: "zona_joya_pir",
      titulo: "F. Zona y Joya Seleccionada",
      campos: [
        { id: "pir_25", label: "Zona a perforar", type: "select", options: ["Lóbulo", "Cartílago / Hélix", "Trago (Tragus)", "Septum", "Aleta Nasal (Nostril)", "Ceja", "Labio", "Lengua", "Ombligo", "Pezón", "Industrial", "Dermal", "Genital", "Otro"] },
        { id: "pir_26", label: "Material de la joya inicial", type: "select", options: ["Titanio Grado Implante", "Acero 316L", "Oro 14k/18k", "Niobio", "Bioplast / PTFE"] },
        { id: "pir_27", label: "Calibre y tipo de cierre", type: "text", placeholder: "Ej. 14G, cierre de rosca interna" }
      ]
    },
    {
      id: "entrevista_pir",
      titulo: "G. Entrevista y Confirmación",
      campos: [
        { id: "pir_28", label: "¿Entiende que el cartílago puede tardar de 6 a 12 meses en sanar?", type: "radio", options: ["Sí", "No"] },
        { id: "pir_29", label: "¿Trabaja en entornos de alta contaminación (hospitales, construcción)?", type: "radio", options: ["Sí", "No"] }
      ]
    }
  ],
  consentimiento: {
    titulo: "ACUERDO DE SERVICIO DE ARTE CORPORAL INVASIVO Y EXENCIÓN TOTAL DE RESPONSABILIDAD CIVIL",
    fundamento: "Servicio: Piercing (Perforación Corporal)",
    texto: "1. COMPRENSIÓN DEL PROCEDIMIENTO\nEntiendo que el piercing es invasivo. Implica perforar tejido con aguja estéril de un solo uso. La cicatrización puede tardar de semanas a más de un año. Implica incomodidad y dolor variable.\n\n2. QUELOIDES Y ALERGIAS\nDeclaro verazmente mis antecedentes de alergias a metales (níquel) y mi propensión a queloides. Si declaré tener historial de queloides, ACEPTO EXPRESAMENTE el riesgo de que se forme uno nuevo, permanente y desfigurante en la zona perforada, sin responsabilidad para el piercero.\n\n3. RIESGOS ACEPTADOS\nSangrado, eritema, secreción linfática normal, infección (si hay mala higiene), rechazo o migración de la joya, reacción alérgica, daño a nervios y desgarro por jalones accidentales.\n\n4. CUIDADOS POSTERIORES (DESLINDE ABSOLUTO)\nME COMPROMETO A: a) Limpiar con solución salina 2 veces al día. b) NO usar alcohol ni agua oxigenada. c) NO GIRAR, MOVER NI MANIPULAR la joya. d) NO cambiar la joya hasta la sanación total. e) Evitar albercas/mar. f) No dormir sobre la perforación.\nDESLINDE: Toda infección, rechazo, migración, queloide o desgarro por incumplir los cuidados es mi responsabilidad EXCLUSIVA. Libero al establecimiento.\n\n5. EXENCIÓN DE RESPONSABILIDAD CIVIL\nLibero al piercero por alergias no informadas, formación de queloides advertidos, rechazo por falta de cuidados, infecciones por mala higiene y complicaciones médicas no declaradas.",
    campos: [
      { id: "pir_c1", label: "Nombre completo del cliente", type: "text", required: true },
      { id: "pir_c2", label: "Firma autógrafa del cliente", type: "signature", required: true },
      { id: "pir_c3", label: "(Si es menor) Nombre del Tutor Legal", type: "text" },
      { id: "pir_c4", label: "Firma del Tutor Legal", type: "signature" },
      { id: "pir_c5", label: "Zona y tipo de joya aprobada", type: "text", required: true },
      { id: "pir_c6", label: "Fecha y hora", type: "date", required: true },
      { id: "pir_c7", label: "Piercero responsable", type: "text", required: true },
      { id: "pir_c8", label: "Firma del piercero", type: "signature", required: true }
    ]
  }
};
