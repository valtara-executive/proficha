export const formTatuaje = {
  id: "tatuaje",
  titulo: "Tatuaje (Invasivo)",
  fundamento_legal: "Servicio Nivel 3. Requiere identificación oficial y exención estricta de responsabilidad sobre cuidados, queloides e infecciones.",
  secciones: [
    {
      id: "datos_tatuaje",
      titulo: "A. Datos Generales y Verificación",
      campos: [
        { id: "tat_1", label: "Nombre completo", type: "text", required: true },
        { id: "tat_2", label: "Edad (Verificada >18)", type: "number", required: true },
        { id: "tat_3", label: "Tipo de ID oficial", type: "text", required: true },
        { id: "tat_4", label: "Folio de ID", type: "text", required: true },
        { id: "tat_5", label: "Teléfono", type: "tel" },
        { id: "tat_6", label: "Tatuador asignado", type: "text" }
      ]
    },
    {
      id: "piel_tatuaje",
      titulo: "B. Perfil Dérmico y Queloides (CRÍTICO)",
      campos: [
        { id: "tat_7", label: "Tono de piel (Fitzpatrick)", type: "select", options: ["I", "II", "III", "IV", "V", "VI"] },
        { id: "tat_8", label: "CRÍTICO: ¿Ha formado QUELOIDES (cicatriz abultada/dura) en su vida?", type: "radio", options: ["Sí", "No"], required: true },
        { id: "tat_9", label: "Problemas de cicatrización en tatuajes previos", type: "boolean_textarea", text_label: "Describir" },
        { id: "tat_10", label: "Condición de la zona (estrías, cicatriz, cover-up)", type: "textarea" }
      ]
    },
    {
      id: "alergias_tatuaje",
      titulo: "C. Alergias y Riesgos Médicos",
      campos: [
        { id: "tat_11", label: "Alergia a tintas (especial en Rojo, Amarillo, Verde)", type: "boolean_text", text_label: "Color" },
        { id: "tat_12", label: "Alergia a látex o antisépticos", type: "radio", options: ["Sí", "No"] },
        { id: "tat_13", label: "Trastornos de coagulación o Anticoagulantes", type: "boolean_text", text_label: "Fármaco" },
        { id: "tat_14", label: "Diabetes (riesgo de infección / mala cicatrización)", type: "radio", options: ["Sí", "No"] },
        { id: "tat_15", label: "Embarazo o lactancia (CONTRAINDICADO)", type: "radio", options: ["Sí", "No"] },
        { id: "tat_16", label: "Enfermedad dérmica activa en la zona (Psoriasis, eccema)", type: "radio", options: ["Sí", "No"] },
        { id: "tat_17", label: "Uso de isotretinoína últimos 12 meses", type: "radio", options: ["Sí", "No"] }
      ]
    },
    {
      id: "diseno_tatuaje",
      titulo: "D. Diseño y Zona",
      campos: [
        { id: "tat_18", label: "Zona a tatuar", type: "text", required: true },
        { id: "tat_19", label: "Tamaño aproximado", type: "text" },
        { id: "tat_20", label: "Estilo (Realismo, Tradicional, Blackwork, etc)", type: "text" },
        { id: "tat_21", label: "Colores principales", type: "text" },
        { id: "tat_22", label: "¿Diseño aprobado en piel (esténcil)?", type: "radio", options: ["Sí", "No"] }
      ]
    }
  ],
  consentimiento: {
    titulo: "ACUERDO DE SERVICIO DE ARTE CORPORAL INVASIVO Y EXENCIÓN CIVIL",
    fundamento: "Servicio: Tatuaje Permanente",
    texto: "Yo, [Nombre del Cliente], mayor de edad, con ID oficial validada, manifiesto:\n\n1. PROCEDIMIENTO\nEl tatuaje es INVASIVO y PERMANENTE (agujas, tinta en dermis). Su remoción es médica, costosa y dolorosa.\n\n2. QUELOIDES Y ALERGIAS\nDeclaré verazmente si formo queloides. Si lo oculté o si decido tatuarme sabiéndolo, ASUMO el riesgo de cicatriz desfigurante e irreversible. Libero al tatuador de toda culpa.\n\n3. RIESGOS\nDolor, sangrado, costras, infección (si hay mala higiene), alergia a tinta (incluso años después), distorsión por peso/edad.\n\n4. APROBACIÓN IRREVOCABLE DEL DISEÑO\nAprobé el esténcil y tamaño. Iniciado el tatuaje, la inconformidad visual no es responsabilidad del artista.\n\n5. CUIDADOS POSTERIORES (DESLINDE ABSOLUTO)\nME COMPROMETO A: Lavar con jabón neutro. NO arrancar las costras. NO entrar a albercas/mar (3 semanas). NO exponer al sol directo. Usar la crema indicada.\nDESLINDE: Cualquier infección, pérdida de tinta o cicatriz causada por rascarse, sol, albercas o suciedad es mi culpa EXCLUSIVA. Libero totalmente al estudio.\n\n6. EXENCIÓN DE RESPONSABILIDAD CIVIL\nLibero al artista y al estudio por infecciones post-sesión, reacciones alérgicas a tintas no previstas, queloides y cambios naturales del tatuaje con los años.",
    campos: [
      { id: "tat_c1", label: "Nombre completo del cliente", type: "text", required: true },
      { id: "tat_c2", label: "Folio de ID Oficial", type: "text", required: true },
      { id: "tat_c3", label: "Firma autógrafa del cliente", type: "signature", required: true },
      { id: "tat_c4", label: "Fecha y hora", type: "date", required: true },
      { id: "tat_c5", label: "Tatuador", type: "text", required: true },
      { id: "tat_c6", label: "Firma del Tatuador", type: "signature", required: true }
    ]
  }
};
