export const formCosmetologia = {
  id: "cosmetologia",
  titulo: "Cosmetología y Faciales",
  fundamento_legal: "Servicio de Nivel 1-2. Exención de responsabilidad aplicable para tratamientos estéticos no invasivos o mínimamente invasivos.",
  secciones: [
    {
      id: "datos_generales_cos",
      titulo: "A. Datos Generales",
      campos: [
        { id: "cos_1", label: "Nombre completo", type: "text", required: true },
        { id: "cos_2", label: "Fecha de nacimiento", type: "date" },
        { id: "cos_3", label: "Edad", type: "number_readonly" },
        { id: "cos_4", label: "Sexo / Género", type: "select", options: ["Mujer", "Hombre", "Otro"] },
        { id: "cos_5", label: "Teléfono", type: "tel", required: true },
        { id: "cos_6", label: "Correo electrónico", type: "email" },
        { id: "cos_7", label: "Técnico(a) asignado(a)", type: "text" }
      ]
    },
    {
      id: "perfil_dermico_cos",
      titulo: "B. Perfil Dérmico Detallado",
      campos: [
        { id: "cos_8", label: "Tipo de piel", type: "select", options: ["Normal", "Seca", "Grasa", "Mixta", "Sensible", "Reactiva"] },
        { id: "cos_9", label: "Tono de piel (Escala Fitzpatrick)", type: "select", options: ["I (Muy clara)", "II (Clara)", "III (Media clara)", "IV (Media oscura)", "V (Oscura)", "VI (Muy oscura)"] },
        { id: "cos_10", label: "Condición actual de la piel", type: "multiselect", options: ["Acné activo", "Rosácea", "Hiperpigmentación", "Melasma", "Cicatrices", "Poros dilatados", "Deshidratación", "Envejecimiento"] },
        { id: "cos_11", label: "Zona(s) de tratamiento", type: "text" },
        { id: "cos_12", label: "Espesor y resistencia percibidos", type: "select", options: ["Delgada", "Media", "Gruesa"] }
      ]
    },
    {
      id: "antecedentes_cos",
      titulo: "C. Antecedentes Dérmicos y Médicos",
      campos: [
        { id: "cos_13", label: "Tratamientos estéticos/dermatológicos previos en la zona", type: "boolean_textarea", text_label: "Tipo y fecha" },
        { id: "cos_14", label: "Uso activo de retinoides o ácidos exfoliantes", type: "boolean_text", text_label: "Días desde suspensión" },
        { id: "cos_15", label: "Uso de isotretinoína (activa o últimos 12 meses)", type: "radio", options: ["Sí", "No"] },
        { id: "cos_16", label: "Exposición solar intensa reciente (últimas 2 semanas)", type: "radio", options: ["Sí", "No"] },
        { id: "cos_17", label: "Embarazo actual o lactancia", type: "radio", options: ["Sí", "No"] },
        { id: "cos_18", label: "Enfermedades autoinmunes o inmunosupresión", type: "boolean_text", text_label: "Especificar" },
        { id: "cos_19", label: "Herpes labial recurrente (crítico para calor/peeling)", type: "radio", options: ["Sí", "No"] },
        { id: "cos_20", label: "Diabetes", type: "radio", options: ["Sí", "No"] }
      ]
    },
    {
      id: "alergias_cos",
      titulo: "D. Perfil de Alergias y Reacciones",
      campos: [
        { id: "cos_21", label: "¿Alergia a fragancias o conservadores?", type: "radio", options: ["Sí", "No"] },
        { id: "cos_22", label: "¿Alergia a ácidos (AHA, BHA, TCA, Vitamina C)?", type: "boolean_text", text_label: "Cuáles" },
        { id: "cos_23", label: "¿Alergia al látex?", type: "radio", options: ["Sí", "No"] },
        { id: "cos_24", label: "¿Alergia a ingredientes botánicos (árnica, aloe, etc.)?", type: "boolean_text", text_label: "Cuáles" },
        { id: "cos_25", label: "¿Reacciones previas a algún cosmético o tratamiento?", type: "boolean_textarea", text_label: "Describir" },
        { id: "cos_26", label: "¿Propensión a hiperpigmentación posinflamatoria (manchas oscuras tras irritación)?", type: "radio", options: ["Sí", "No"] }
      ]
    },
    {
      id: "servicio_cos",
      titulo: "E. Servicio Solicitado",
      campos: [
        { id: "cos_27", label: "Tipo de tratamiento", type: "select", options: ["Limpieza facial", "Hidratación", "Peeling enzimático", "Peeling químico", "Dermapen", "Microdermoabrasión", "Alta frecuencia", "Radiofrecuencia", "Ultrasonido", "Crioterapia", "Otro"] },
        { id: "cos_28", label: "Objetivo principal hoy", type: "textarea" },
        { id: "cos_29", label: "Rutina de piel actual en casa", type: "textarea" }
      ]
    }
  ],
  consentimiento: {
    titulo: "ACUERDO DE SERVICIO COSMETOLÓGICO Y EXENCIÓN DE RESPONSABILIDAD CIVIL",
    fundamento: "Servicio: Cosmetología (Versión 2026)",
    texto: "Yo, [Nombre del Cliente], mayor de edad, manifiesto:\n\n1. DECLARACIÓN VERAZ DE ANTECEDENTES\nDeclaro haber informado con veracidad y completitud sobre: mi tipo de piel, condiciones dérmicas activas, uso de medicamentos tópicos u orales que afectan la piel (retinoides, isotretinoína, corticoides), tratamientos estéticos recientes, exposición solar, embarazo o lactancia, y todas mis alergias conocidas a cosméticos o ingredientes activos. ASUMO PLENA RESPONSABILIDAD por cualquier reacción adversa derivada de información omitida o falseada.\n\n2. RIESGOS CONOCIDOS Y ACEPTADOS POR TÉCNICA\nReconozco que el tratamiento seleccionado puede conllevar:\n- Peelings/exfoliaciones: enrojecimiento transitorio, descamación, sensibilidad, y riesgo de hiperpigmentación.\n- Aparatología: calor, eritema temporal, sensación de tensión.\n- Extracciones manuales: enrojecimiento puntual. He sido informado(a) y los acepto expresamente.\n\n3. CUIDADOS POSTERIORES — DESLINDE TOTAL DE RESPONSABILIDAD\nACEPTO Y ME COMPROMETO A: a) Evitar exposición solar directa y usar SPF 50+. b) No aplicar productos no autorizados. c) No rascar ni exfoliar manualmente piel en recuperación. d) Evitar sudoración intensa. Si presento reacción adversa como consecuencia DIRECTA del incumplimiento, libero al establecimiento y al especialista de toda responsabilidad civil.\n\n4. RESULTADO ESTÉTICO\nEntiendo que los resultados son variables e individuales (tipo de piel, constancia, hormonas). No hay garantía de resultado específico.\n\n5. EXENCIÓN DE RESPONSABILIDAD CIVIL\nLibero al establecimiento de responsabilidad civil por reacciones de condiciones/alergias no declaradas, daños por incumplir cuidados posteriores, y resultados que no correspondan a expectativas no comunicadas.",
    campos: [
      { id: "cos_c1", label: "Nombre completo del cliente", type: "text", required: true },
      { id: "cos_c2", label: "Firma del cliente", type: "signature", required: true },
      { id: "cos_c3", label: "Fecha de autorización", type: "date", required: true },
      { id: "cos_c4", label: "Cosmetólogo(a) responsable", type: "text", required: true },
      { id: "cos_c5", label: "Firma responsable", type: "signature", required: true }
    ]
  }
};
