export const formReiki = {
  id: "reiki",
  titulo: "Reiki / Terapia Energética",
  fundamento_legal: "Servicio de naturaleza complementaria y de bienestar holístico. No constituye diagnóstico médico ni intervención psicológica. (Versión 2026).",
  secciones: [
    {
      id: "datos_generales_rei",
      titulo: "A. Datos Generales",
      campos: [
        { id: "rei_1", label: "Nombre completo", type: "text", required: true },
        { id: "rei_2", label: "Fecha de nacimiento", type: "date", required: true },
        { id: "rei_3", label: "Edad", type: "number_readonly" },
        { id: "rei_4", label: "Sexo / Género", type: "select", options: ["Mujer", "Hombre", "No binario", "Prefiero no decir"] },
        { id: "rei_5", label: "Teléfono de contacto", type: "tel", required: true },
        { id: "rei_6", label: "Correo electrónico", type: "email" },
        { id: "rei_7", label: "Contacto de emergencia", type: "text", required: true },
        { id: "rei_8", label: "Teléfono de emergencia", type: "tel", required: true }
      ]
    },
    {
      id: "perfil_energetico_rei",
      titulo: "B. Perfil Energético y Emocional",
      campos: [
        { id: "rei_9", label: "Motivo principal de la visita", type: "textarea", required: true },
        { id: "rei_10", label: "Nivel de bienestar emocional percibido (1-10)", type: "scale", min: 1, max: 10 },
        { id: "rei_11", label: "Nivel de energía percibida (1-10)", type: "scale", min: 1, max: 10 },
        { id: "rei_12", label: "Situaciones de vida relevantes para la sesión", type: "textarea" },
        { id: "rei_13", label: "Experiencias previas con terapias energéticas", type: "boolean_text", text_label: "¿Cuáles y cómo las viviste?" },
        { id: "rei_14", label: "Creencias espirituales o religiosas a considerar (opcional)", type: "textarea" }
      ]
    },
    {
      id: "aspectos_fisicos_rei",
      titulo: "C. Aspectos Físicos Generales y Preferencias",
      campos: [
        { id: "rei_15", label: "Embarazo actual", type: "radio", options: ["Sí", "No", "No aplica"] },
        { id: "rei_16", label: "Marcapasos u otros dispositivos electrónicos", type: "radio", options: ["Sí", "No"] },
        { id: "rei_17", label: "Sensibilidad táctil especial", type: "boolean_text", text_label: "Describir" },
        { id: "rei_18", label: "Preferencia de contacto", type: "select", options: ["Con contacto físico suave", "Sin contacto físico directo"] },
        { id: "rei_19", label: "Objetivo de la sesión", type: "multiselect", options: ["Relajación y equilibrio general", "Liberación emocional", "Claridad mental", "Otro"] }
      ]
    },
    {
      id: "entrevista_rei",
      titulo: "D. Entrevista",
      campos: [
        { id: "rei_20", label: "¿Hay alguna situación emocional/familiar que afecte tu bienestar hoy?", type: "textarea" },
        { id: "rei_21", label: "¿Alguna zona del cuerpo especialmente tensa o cargada?", type: "text" },
        { id: "rei_22", label: "¿Qué esperas sentir o lograr al finalizar hoy?", type: "textarea" }
      ]
    }
  ],
  consentimiento: {
    titulo: "ACUERDO DE SERVICIO DE BIENESTAR Y EXENCIÓN DE RESPONSABILIDAD CIVIL",
    fundamento: "Servicio: Reiki / Terapia Energética (Versión 2026)",
    texto: "Yo, [Nombre del Consultante], manifiesto:\n\n1. NATURALEZA DEL SERVICIO\nReconozco que el Reiki y la terapia energética son prácticas de bienestar holístico que trabajan con la percepción del campo energético del consultante. No constituyen diagnóstico médico, intervención psicológica clínica ni tratamiento de ninguna enfermedad.\n\n2. PROCESO DE LA SESIÓN\nEntiendo que el terapeuta puede trabajar con contacto físico suave o sin contacto físico directo, según lo acordado. Durante la sesión puedo experimentar sensaciones de calor, relajación profunda, imágenes mentales, liberación emocional o adormecimiento ligero, las cuales son respuestas subjetivas habituales.\n\n3. LIBRE ALBEDRÍO Y PARTICIPACIÓN\nEntiendo que los resultados de las sesiones son altamente individuales y que el terapeuta actúa como facilitador, no como agente de cambio externo. Mantengo en todo momento mi autonomía y libre albedrío para detener la sesión si así lo deseo.\n\n4. EXENCIÓN DE RESPONSABILIDAD CIVIL\nLibero al terapeuta y al centro de toda responsabilidad civil derivada de las experiencias subjetivas que pueda tener durante o después de la sesión (revelaciones emocionales, sueños intensos, estados de liberación), dado que estas son respuestas personales al proceso de bienestar. Entiendo que este servicio no reemplaza la atención médica ni psicológica profesional.\n\n5. CONFIDENCIALIDAD\nToda la información compartida durante la sesión es confidencial y no será divulgada sin mi consentimiento.",
    campos: [
      { id: "rei_c1", label: "Nombre completo del consultante", type: "text", required: true },
      { id: "rei_c2", label: "Fecha de autorización", type: "date", required: true },
      { id: "rei_c3", label: "Firma del consultante", type: "signature", required: true },
      { id: "rei_c4", label: "Nombre del terapeuta energético", type: "text", required: true },
      { id: "rei_c5", label: "Firma del terapeuta", type: "signature", required: true }
    ]
  }
};
