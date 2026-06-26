export const formMicroblading = {
  id: "microblading",
  titulo: "Microblading / Cejas",
  fundamento_legal: "Nivel 2 (Semi-invasivo). Técnica manual de micro-cortes. Requiere deslinde estricto por riesgo de queloides, piel grasa y cuidados.",
  secciones: [
    {
      id: "datos_generales_mic",
      titulo: "A. Datos Generales",
      campos: [
        { id: "mic_1", label: "Nombre completo", type: "text", required: true },
        { id: "mic_2", label: "Edad (Mínimo 18 años)", type: "number", required: true },
        { id: "mic_3", label: "Teléfono", type: "tel", required: true },
        { id: "mic_4", label: "Artista asignado(a)", type: "text", required: true },
        { id: "mic_5", label: "Fecha de la sesión", type: "date" }
      ]
    },
    {
      id: "perfil_dermico_mic",
      titulo: "B. Perfil Dérmico (CRÍTICO PARA MICROBLADING)",
      campos: [
        { id: "mic_6", label: "Tipo de piel (Piel muy grasa = Trazos difuminados)", type: "select", options: ["Seca (Ideal)", "Normal (Aceptable)", "Mixta/Grasa (Riesgo difuminado)", "Muy Grasa (CONTRAINDICADO / Trazos borrosos)"], required: true },
        { id: "mic_7", label: "Tono de piel (Fitzpatrick)", type: "select", options: ["I", "II", "III", "IV", "V", "VI"] },
        { id: "mic_8", label: "Textura en cejas", type: "multiselect", options: ["Lisa", "Poros dilatados", "Cicatrices", "Dermatitis"] },
        { id: "mic_9", label: "CRÍTICO: ¿Tiene cejas tatuadas o con micropigmentación previa?", type: "boolean_textarea", text_label: "Describir color y saturación" }
      ]
    },
    {
      id: "queloides_mic",
      titulo: "C. Propensión a Queloides e Hiperpigmentación (OBLIGATORIO)",
      campos: [
        { id: "mic_10", label: "CRÍTICO: ¿Ha formado QUELOIDES (cicatriz abultada)?", type: "boolean_textarea", text_label: "Indicar zona y origen", required: true },
        { id: "mic_11", label: "¿Tiene cicatrices previas visibles en cejas o frente?", type: "radio", options: ["Sí", "No"] },
        { id: "mic_12", label: "¿Tendencia a hiperpigmentación (manchas oscuras tras irritación)?", type: "radio", options: ["Sí", "No"] }
      ]
    },
    {
      id: "alergias_mic",
      titulo: "D. Alergias y Sensibilidad",
      campos: [
        { id: "mic_13", label: "Alergias a pigmentos, colorantes o tintes de cabello/cejas", type: "boolean_text", text_label: "Especificar" },
        { id: "mic_14", label: "Alergia a anestésicos tópicos (Lidocaína, EMLA)", type: "radio", options: ["Sí", "No"] },
        { id: "mic_15", label: "Alergia a metales (Níquel, cromo, cobalto)", type: "radio", options: ["Sí", "No"] },
        { id: "mic_16", label: "Alergia al látex o antisépticos", type: "radio", options: ["Sí", "No"] }
      ]
    },
    {
      id: "antecedentes_medicos_mic",
      titulo: "E. Antecedentes Médicos",
      campos: [
        { id: "mic_17", label: "Uso activo de retinoides/ácidos en la zona (CONTRAINDICADO)", type: "boolean_text", text_label: "¿Última aplicación?" },
        { id: "mic_18", label: "Uso de isotretinoína últimos 12 meses (CONTRAINDICADO)", type: "radio", options: ["Sí", "No"] },
        { id: "mic_19", label: "Embarazo o lactancia (CONTRAINDICADO)", type: "radio", options: ["Sí", "No"] },
        { id: "mic_20", label: "Alopecia activa en cejas / Quimioterapia actual", type: "boolean_text", text_label: "Especificar" },
        { id: "mic_21", label: "Diabetes o Trastornos de coagulación", type: "boolean_text", text_label: "Especificar" },
        { id: "mic_22", label: "Exposición solar intensa reciente (frente/cejas)", type: "radio", options: ["Sí", "No"] }
      ]
    },
    {
      id: "entrevista_mic",
      titulo: "F. Entrevista y Diseño",
      campos: [
        { id: "mic_23", label: "¿Cuál es el objetivo o resultado que busca?", type: "textarea" },
        { id: "mic_24", label: "¿Ha revisado y aprobado el trazo/diseño propuesto?", type: "radio", options: ["Sí", "Aún no"] }
      ]
    }
  ],
  consentimiento: {
    titulo: "ACUERDO DE SERVICIO SEMI-INVASIVO Y EXENCIÓN TOTAL DE RESPONSABILIDAD CIVIL",
    fundamento: "Servicio: Microblading (Cejas)",
    texto: "1. NATURALEZA DEL SERVICIO\nEntiendo que el microblading utiliza una cuchilla manual para realizar micro-cortes en la epidermis e implantar pigmento. Es semi-permanente (1 a 3 años). Acepto que en pieles grasas el trazo puede difuminarse y durar menos.\n\n2. QUELOIDES Y ALERGIAS\nDeclaro mi historial de alergias y queloides. Si soy propenso a queloides, asumo el riesgo EXPRESO de formación de cicatriz abultada en el rostro, liberando al artista de responsabilidad.\n\n3. RIESGOS ACEPTADOS\nEnrojecimiento, descamación natural (aclarado del pigmento al sanar), pérdida parcial que requiera retoque, infección por mal cuidado, reacción alérgica y resultado asimétrico.\n\n4. APROBACIÓN DEL DISEÑO\nRevisé, aprobé y firmé el trazo, grosor y color. Una vez iniciado, la inconformidad con el diseño aprobado no genera responsabilidad civil.\n\n5. CUIDADOS POSTERIORES (DESLINDE ABSOLUTO)\nME COMPROMETO A: a) NO mojar las cejas los primeros 10 días. b) NO ARRANCAR, rascar ni frotar la costra (esto arranca el pigmento y deja cicatriz). c) No aplicar maquillaje ni cremas en la cicatrización. d) Evitar sol directo, albercas y sudor intenso.\nDESLINDE: Cualquier pérdida de pigmento, cicatriz, infección o mancha por no seguir los cuidados es mi culpa EXCLUSIVA. Libero totalmente al establecimiento.\n\n6. EXENCIÓN DE RESPONSABILIDAD\nLibero al artista por alergias/condiciones no declaradas, resultado difuminado en piel grasa (advertido), y pérdida de pigmento por mala higiene o descuidos.",
    campos: [
      { id: "mic_c1", label: "Nombre completo del cliente", type: "text", required: true },
      { id: "mic_c2", label: "Zona autorizada", type: "select", options: ["Ceja Derecha", "Ceja Izquierda", "Ambas Cejas"], required: true },
      { id: "mic_c3", label: "Tono de pigmento aprobado", type: "text", required: true },
      { id: "mic_c4", label: "Firma autógrafa del cliente", type: "signature", required: true },
      { id: "mic_c5", label: "Fecha y hora", type: "date", required: true },
      { id: "mic_c6", label: "Artista responsable", type: "text", required: true },
      { id: "mic_c7", label: "Firma del artista", type: "signature", required: true }
    ]
  }
};
