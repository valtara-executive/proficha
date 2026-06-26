export const formQuiropraxia = {
  id: "quiropraxia",
  titulo: "Quiropráctica",
  fundamento_legal: "Práctica de bienestar musculoesquelético y muscular integral. No constituye tratamiento clínico médico. (Marco normativo de bienestar 2026).",
  secciones: [
    {
      id: "datos_generales_qui",
      titulo: "A. Datos Generales",
      campos: [
        { id: "qui_1", label: "Nombre completo", type: "text", required: true },
        { id: "qui_2", label: "Fecha de nacimiento", type: "date", required: true },
        { id: "qui_3", label: "Edad", type: "number_readonly" },
        { id: "qui_4", label: "Sexo / Género", type: "select", options: ["Mujer", "Hombre", "No binario", "Otro"] },
        { id: "qui_5", label: "Teléfono de contacto", type: "tel", required: true },
        { id: "qui_6", label: "Correo electrónico", type: "email" },
        { id: "qui_7", label: "Contacto de emergencia", type: "text", required: true },
        { id: "qui_8", label: "Teléfono contacto de emergencia", type: "tel", required: true }
      ]
    },
    {
      id: "historial_fisico_qui",
      titulo: "B. Historial Físico Relevante",
      campos: [
        { id: "qui_9", label: "Fracturas o luxaciones previas", type: "boolean_text", text_label: "Zona y año" },
        { id: "qui_10", label: "Cirugías en columna, cuello o articulaciones", type: "boolean_text", text_label: "Especificar" },
        { id: "qui_11", label: "Osteoporosis o baja densidad ósea", type: "radio", options: ["Sí", "No"] },
        { id: "qui_12", label: "Hernias discales diagnosticadas", type: "boolean_text", text_label: "Zona" },
        { id: "qui_13", label: "Estenosis espinal diagnosticada", type: "radio", options: ["Sí", "No"] },
        { id: "qui_14", label: "Uso de implantes metálicos en columna u otras zonas", type: "boolean_text", text_label: "Ubicación" },
        { id: "qui_15", label: "Padecimientos circulatorios o neurológicos", type: "boolean_text", text_label: "Especificar" },
        { id: "qui_16", label: "Medicamentos de uso continuo (anticoagulantes, corticoides)", type: "boolean_text", text_label: "Especificar" },
        { id: "qui_17", label: "Embarazo actual", type: "boolean_text", text_label: "Trimestre" },
        { id: "qui_18", label: "Antecedentes de mareos, vértigo o pérdida de equilibrio", type: "radio", options: ["Sí", "No"] }
      ]
    },
    {
      id: "motivo_habitos_qui",
      titulo: "C. Motivo de Consulta y Hábitos",
      campos: [
        { id: "qui_19", label: "Zona de incomodidad principal", type: "text", required: true },
        { id: "qui_20", label: "Tiempo de evolución", type: "text" },
        { id: "qui_21", label: "Actividades que agravan o alivian la incomodidad", type: "textarea" },
        { id: "qui_22", label: "Nivel de limitación cotidiana (1-10)", type: "scale", min: 1, max: 10 },
        { id: "qui_23", label: "Sesiones quiroprácticas previas", type: "boolean_text", text_label: "¿Cuántas?" },
        { id: "qui_24", label: "Estudios de imagen previos disponibles (solo referencia)", type: "boolean_text", text_label: "Tipo de estudio" },
        { id: "qui_25", label: "Horas frente a pantalla al día", type: "number" },
        { id: "qui_26", label: "Tipo de colchón o superficie de descanso", type: "text" },
        { id: "qui_27", label: "Postura predominante en el trabajo", type: "text" }
      ]
    },
    {
      id: "entrevista_qui",
      titulo: "D. Entrevista",
      campos: [
        { id: "qui_28", label: "¿Qué actividades cotidianas se ven más afectadas?", type: "textarea" },
        { id: "qui_29", label: "¿Practicas algún deporte o actividad física de impacto?", type: "textarea" },
        { id: "qui_30", label: "Notas adicionales del consultante", type: "textarea" }
      ]
    }
  ],
  consentimiento: {
    titulo: "ACUERDO DE SERVICIO DE BIENESTAR Y EXENCIÓN DE RESPONSABILIDAD CIVIL",
    fundamento: "Servicio: Quiropráctica (Versión 2026)",
    texto: "Yo, [Nombre del Consultante], manifiesto:\n\n1. NATURALEZA DEL SERVICIO\nReconozco que el servicio quiropráctico es una práctica de bienestar musculoesquelético orientada a favorecer el movimiento articular, el bienestar muscular integral y el equilibrio postural. No constituye diagnóstico médico ni tratamiento clínico.\n\n2. TÉCNICAS INVOLUCRADAS\nEntiendo que incluye manipulaciones manuales, movilizaciones pasivas y técnicas de bienestar muscular integral. Comprendo que pueden presentarse sonidos articulares (chasquidos), los cuales son esperados.\n\n3. INFORMACIÓN VERAZ\nDeclaro que he comunicado mis antecedentes (fracturas, cirugías, osteoporosis, hernias, implantes, embarazo). Omitir esto puede derivar en efectos no deseados bajo mi responsabilidad.\n\n4. LIBRE PARTICIPACIÓN\nPuedo solicitar detener o modificar la sesión en cualquier momento.\n\n5. EXENCIÓN DE RESPONSABILIDAD CIVIL\nLibero al quiropráctico de responsabilidad por sensaciones transitorias posteriores (leve sensibilidad, fatiga muscular) consecuencia de la técnica. Si oculté condiciones, asumo la total responsabilidad.\n\n6. CONFIDENCIALIDAD\nAutorizo el resguardo de mi información para seguimiento exclusivo de mis sesiones.",
    campos: [
      { id: "qui_c1", label: "Nombre completo del consultante", type: "text", required: true },
      { id: "qui_c2", label: "Fecha de autorización", type: "date", required: true },
      { id: "qui_c3", label: "Firma del consultante", type: "signature", required: true },
      { id: "qui_c4", label: "Nombre del quiropráctico", type: "text", required: true },
      { id: "qui_c5", label: "Firma del quiropráctico", type: "signature", required: true }
    ]
  }
};
