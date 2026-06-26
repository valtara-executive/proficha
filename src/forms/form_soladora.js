export const formSoladora = {
  id: "soladora",
  titulo: "Soladora / Limpia (Medicina Tradicional Mexicana)",
  fundamento_legal: "Práctica de naturaleza espiritual, energética y simbólica (Patrimonio Cultural). NO constituye diagnóstico ni tratamiento médico. (Versión 2026).",
  secciones: [
    {
      id: "datos_generales_sol",
      titulo: "A. Datos Generales",
      campos: [
        { id: "sol_1", label: "Nombre completo", type: "text", required: true },
        { id: "sol_2", label: "Fecha de nacimiento", type: "date" },
        { id: "sol_3", label: "Sexo / Género", type: "select", options: ["Mujer", "Hombre", "Otro"] },
        { id: "sol_4", label: "Teléfono", type: "tel", required: true },
        { id: "sol_5", label: "Lugar de origen o comunidad de referencia", type: "text" },
        { id: "sol_6", label: "Contacto de emergencia", type: "text", required: true }
      ]
    },
    {
      id: "contexto_sol",
      titulo: "B. Contexto Espiritual y Emocional",
      campos: [
        { id: "sol_7", label: "Motivo de la consulta", type: "textarea", required: true },
        { id: "sol_8", label: "¿Desde cuándo percibe esta situación?", type: "text" },
        { id: "sol_9", label: "¿Ha recibido limpias o trabajos tradicionales antes?", type: "radio", options: ["Sí", "No"] },
        { id: "sol_10", label: "Tradición espiritual/religiosa activa (Opcional)", type: "text" },
        { id: "sol_11", label: "¿Hay algún evento de duelo o pérdida reciente?", type: "boolean_text", text_label: "Describir" },
        { id: "sol_12", label: "Nivel de bienestar emocional (1-10)", type: "scale", min: 1, max: 10 }
      ]
    },
    {
      id: "aspectos_fisicos_sol",
      titulo: "C. Aspectos Físicos Relevantes",
      campos: [
        { id: "sol_13", label: "Embarazo actual", type: "boolean_text", text_label: "Trimestre" },
        { id: "sol_14", label: "Alergias a plantas, humo de copal, cítricos o huevo", type: "boolean_text", text_label: "Especificar alergias" },
        { id: "sol_15", label: "Sensibilidad respiratoria (Asma, bronquitis)", type: "radio", options: ["Sí", "No"] },
        { id: "sol_16", label: "Heridas abiertas en piel o piel sensible", type: "radio", options: ["Sí", "No"] }
      ]
    },
    {
      id: "preferencias_sol",
      titulo: "D. Preferencias y Consideraciones",
      campos: [
        { id: "sol_17", label: "¿Prefiere que se le explique cada paso del proceso?", type: "radio", options: ["Sí", "No, prefiero solo recibirlo"] },
        { id: "sol_18", label: "¿Restricción con algún elemento (huevo, copal, hierbas)?", type: "boolean_text", text_label: "Especificar" },
        { id: "sol_19", label: "¿Qué espera sentir o que cambie tras la sesión?", type: "textarea" }
      ]
    }
  ],
  consentimiento: {
    titulo: "ACUERDO DE SERVICIO DE MEDICINA TRADICIONAL MEXICANA Y EXENCIÓN DE RESPONSABILIDAD CIVIL",
    fundamento: "Servicio: Limpia / Trabajo de Soladora (Versión 2026)",
    texto: "Yo, [Nombre del Consultante], mayor de edad, manifiesto:\n\n1. NATURALEZA DEL SERVICIO\nReconozco que la limpia y el trabajo de soladora pertenecen a la tradición de Medicina Tradicional Mexicana, reconocida como patrimonio cultural. Este servicio tiene una naturaleza espiritual, energética y simbólica, y NO constituye diagnóstico médico ni tratamiento de enfermedades.\n\n2. ELEMENTOS UTILIZADOS\nEntiendo que durante la sesión pueden utilizarse elementos como hierbas, huevo, copal, sahumerio, agua bendita u objetos rituales. He informado sobre mis alergias (plantas, humo) y condiciones relevantes.\n\n3. PARTICIPACIÓN CONSCIENTE\nParticipo de forma libre y consciente. Entiendo el carácter simbólico-espiritual del trabajo y lo recibo desde el respeto a la tradición. Puedo detener la sesión en cualquier momento.\n\n4. EXENCIÓN DE RESPONSABILIDAD CIVIL\nLibero a la soladora y al centro de toda responsabilidad civil por las experiencias subjetivas, emocionales o sensoriales que se presenten (llanto, relajación, sueños), ya que son respuestas personales al proceso. Si tengo alergias que no comuniqué, asumo la responsabilidad.\n\n5. NO SUSTITUCIÓN MÉDICA\nEntiendo que este servicio no reemplaza la atención médica o psicológica.\n\n6. CONFIDENCIALIDAD\nLa información compartida es confidencial y será resguardada con respeto.",
    campos: [
      { id: "sol_c1", label: "Nombre completo del consultante", type: "text", required: true },
      { id: "sol_c2", label: "Fecha de autorización", type: "date", required: true },
      { id: "sol_c3", label: "Firma del consultante", type: "signature", required: true },
      { id: "sol_c4", label: "Nombre de la soladora", type: "text", required: true },
      { id: "sol_c5", label: "Firma de la soladora", type: "signature", required: true }
    ]
  }
};
