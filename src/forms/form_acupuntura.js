export const formAcupuntura = {
  id: "acupuntura",
  titulo: "Acupuntura",
  fundamento_legal: "Práctica de bienestar basada en medicina tradicional oriental. No constituye diagnóstico médico. (Marco normativo de bienestar 2026).",
  secciones: [
    {
      id: "datos_generales_acu",
      titulo: "A. Datos Generales",
      campos: [
        { id: "acu_1", label: "Nombre completo", type: "text", required: true },
        { id: "acu_2", label: "Fecha de nacimiento", type: "date", required: true },
        { id: "acu_3", label: "Edad", type: "number_readonly" },
        { id: "acu_4", label: "Sexo / Género con el que se identifica", type: "select", options: ["Mujer", "Hombre", "No binario", "Prefiero no decir"] },
        { id: "acu_5", label: "Teléfono de contacto", type: "tel", required: true },
        { id: "acu_6", label: "Correo electrónico", type: "email" },
        { id: "acu_7", label: "Nombre contacto de emergencia", type: "text", required: true },
        { id: "acu_8", label: "Teléfono contacto de emergencia", type: "tel", required: true },
        { id: "acu_9", label: "Fecha de primera sesión", type: "date" }
      ]
    },
    {
      id: "antecedentes_acu",
      titulo: "B. Antecedentes de Salud General",
      campos: [
        { id: "acu_10", label: "Padecimientos crónicos (diabetes, hipertensión, epilepsia)", type: "boolean_text", text_label: "Especificar" },
        { id: "acu_11", label: "Cirugías previas y año aproximado", type: "boolean_text", text_label: "Especificar" },
        { id: "acu_12", label: "Uso de marcapasos o dispositivos implantados", type: "radio", options: ["Sí", "No"] },
        { id: "acu_13", label: "Medicamentos de uso continuo (anticoagulantes, etc.)", type: "boolean_text", text_label: "Especificar" },
        { id: "acu_14", label: "Alergias al metal, látex u otros", type: "boolean_text", text_label: "Especificar" },
        { id: "acu_15", label: "Historial de coagulopatías o trastornos de coagulación", type: "radio", options: ["Sí", "No"] },
        { id: "acu_16", label: "Embarazo actual o posibilidad de estarlo", type: "boolean_text", text_label: "Trimestre" },
        { id: "acu_17", label: "Presencia de prótesis metálicas o articulaciones artificiales", type: "boolean_text", text_label: "Especificar" }
      ]
    },
    {
      id: "motivo_acu",
      titulo: "C. Motivo de Consulta Energética y Estilo de Vida",
      campos: [
        { id: "acu_18", label: "Zona o sistema de interés", type: "text", required: true },
        { id: "acu_19", label: "Tiempo de evolución de la incomodidad", type: "text" },
        { id: "acu_20", label: "Sesiones previas de acupuntura", type: "boolean_text", text_label: "¿Cuántas?" },
        { id: "acu_21", label: "Reacciones previas a agujas (mareos, desmayos)", type: "boolean_text", text_label: "Describir" },
        { id: "acu_22", label: "Nivel de estrés percibido (1-10)", type: "scale", min: 1, max: 10 },
        { id: "acu_23", label: "Calidad de sueño", type: "select", options: ["Muy malo", "Malo", "Regular", "Bueno", "Excelente"] },
        { id: "acu_24", label: "Nivel de energía habitual (1-10)", type: "scale", min: 1, max: 10 },
        { id: "acu_25", label: "Alimentación predominante", type: "text" },
        { id: "acu_26", label: "Actividad física", type: "text" },
        { id: "acu_27", label: "Consumo de tabaco, alcohol u otras sustancias", type: "text" },
        { id: "acu_28", label: "Horas de sueño promedio", type: "number" }
      ]
    },
    {
      id: "entrevista_acu",
      titulo: "D. Entrevista",
      campos: [
        { id: "acu_29", label: "¿Cuál es el motivo principal que te trae a esta sesión?", type: "textarea" },
        { id: "acu_30", label: "¿Algún evento emocional o físico significativo antes del malestar?", type: "textarea" },
        { id: "acu_31", label: "¿Tienes alguna zona donde prefieras NO recibir punciones?", type: "text" }
      ]
    }
  ],
  consentimiento: {
    titulo: "ACUERDO DE SERVICIO DE BIENESTAR Y EXENCIÓN DE RESPONSABILIDAD CIVIL",
    fundamento: "Servicio: Acupuntura (Versión 2026)",
    texto: "Yo, [Nombre del Consultante], manifiesto:\n\n1. NATURALEZA DEL SERVICIO\nReconozco que la acupuntura en este centro es una práctica de bienestar basada en la medicina tradicional oriental. No constituye diagnóstico médico ni sustituye atención alópata.\n\n2. PROCEDIMIENTO\nEntiendo que implica la inserción de agujas estériles y desechables de uso único en puntos específicos. Acepto que puedo experimentar ligera presión, hormigueo, calor local o relajación profunda.\n\n3. INFORMACIÓN VERAZ\nDeclaro haber informado con veracidad mis antecedentes, incluyendo anticoagulantes, marcapasos, embarazo y alergias al metal. Omitir esto es un riesgo bajo mi responsabilidad.\n\n4. LIBRE PARTICIPACIÓN\nPuedo retirar mi consentimiento y detener la sesión en cualquier momento.\n\n5. EXENCIÓN DE RESPONSABILIDAD CIVIL\nLibero al practicante de responsabilidad ante reacciones transitorias (hematoma mínimo, somnolencia, sensibilidad) consecuencia de la técnica correcta. Asumo la responsabilidad si oculté información.\n\n6. CONFIDENCIALIDAD\nAutorizo el resguardo de mis datos personales exclusivamente para el seguimiento de mis sesiones.",
    campos: [
      { id: "acu_c1", label: "Nombre completo del consultante", type: "text", required: true },
      { id: "acu_c2", label: "Fecha de autorización", type: "date", required: true },
      { id: "acu_c3", label: "Firma del consultante", type: "signature", required: true },
      { id: "acu_c4", label: "Nombre del practicante responsable", type: "text", required: true },
      { id: "acu_c5", label: "Firma del practicante", type: "signature", required: true }
    ]
  }
};
