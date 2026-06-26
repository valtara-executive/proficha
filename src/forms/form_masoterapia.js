export const formMasoterapia = {
  id: "masoterapia",
  titulo: "Masoterapia",
  fundamento_legal: "Servicio de naturaleza complementaria y de bienestar. No constituye diagnóstico médico ni tratamiento clínico. (Marco normativo aplicable a centros de bienestar 2026).",
  secciones: [
    {
      id: "datos_generales_mas",
      titulo: "A. Datos Generales",
      campos: [
        { id: "mas_1", label: "Nombre completo", type: "text", required: true },
        { id: "mas_2", label: "Fecha de nacimiento", type: "date", required: true },
        { id: "mas_3", label: "Edad", type: "number_readonly" },
        { id: "mas_4", label: "Sexo / Género con el que se identifica", type: "select", options: ["Mujer", "Hombre", "No binario", "Prefiero no decir"] },
        { id: "mas_5", label: "Teléfono de contacto", type: "tel", required: true },
        { id: "mas_6", label: "Correo electrónico", type: "email" },
        { id: "mas_7", label: "Nombre contacto de emergencia", type: "text", required: true },
        { id: "mas_8", label: "Teléfono contacto de emergencia", type: "tel", required: true },
        { id: "mas_9", label: "Fecha de primera sesión", type: "date" }
      ]
    },
    {
      id: "perfil_corporal_mas",
      titulo: "B. Perfil Corporal y de Bienestar",
      campos: [
        { id: "mas_10", label: "Talla aproximada (cm)", type: "number" },
        { id: "mas_11", label: "Peso aproximado (kg - opcional)", type: "number" },
        { id: "mas_12", label: "Lateralidad", type: "select", options: ["Diestro", "Zurdo", "Ambidiestro"] },
        { id: "mas_13", label: "Actividad física habitual", type: "boolean_text", text_label: "Tipo y frecuencia" },
        { id: "mas_14", label: "Ocupación o actividad laboral principal", type: "text" },
        { id: "mas_15", label: "Horas promedio sentado/de pie al día", type: "number" }
      ]
    },
    {
      id: "antecedentes_mas",
      titulo: "C. Antecedentes Relevantes",
      campos: [
        { id: "mas_16", label: "Cirugías previas", type: "boolean_text", text_label: "Indicar zona y año aproximado" },
        { id: "mas_17", label: "Fracturas o traumatismos relevantes", type: "boolean_text", text_label: "Especificar" },
        { id: "mas_18", label: "Uso de implantes, prótesis o dispositivos internos", type: "boolean_text", text_label: "Especificar" },
        { id: "mas_19", label: "Embarazo actual o reciente", type: "boolean_text", text_label: "Semanas o meses posparto" },
        { id: "mas_20", label: "Condiciones de piel (heridas, irritaciones, dermatitis)", type: "boolean_text", text_label: "Especificar" },
        { id: "mas_21", label: "Alergias conocidas (aceites, cremas, aromas)", type: "boolean_text", text_label: "Especificar" },
        { id: "mas_22", label: "Medicamentos de uso continuo (que afecten sensibilidad)", type: "boolean_text", text_label: "Especificar" },
        { id: "mas_23", label: "Padecimientos cardiovasculares o circulatorios", type: "boolean_text", text_label: "Especificar" },
        { id: "mas_24", label: "Varices o trombosis diagnosticadas", type: "radio", options: ["Sí", "No"] }
      ]
    },
    {
      id: "motivo_visita_mas",
      titulo: "D. Motivo de la Visita y Preferencias",
      campos: [
        { id: "mas_25", label: "Zona o zonas de interés para la sesión", type: "text", required: true },
        { id: "mas_26", label: "Nivel de tensión percibida (1-10)", type: "scale", min: 1, max: 10 },
        { id: "mas_27", label: "Tiempo aproximado con la molestia", type: "text" },
        { id: "mas_28", label: "Objetivo de la sesión", type: "select", options: ["Relajación", "Bienestar muscular integral", "Recuperación deportiva", "Otro"] },
        { id: "mas_29", label: "Tipo de trabajo preferido", type: "select", options: ["Suave", "Moderado", "Profundo"] },
        { id: "mas_30", label: "Zonas que prefiere NO trabajar", type: "text" },
        { id: "mas_31", label: "Preferencia de aromaterapia/aceites", type: "select", options: ["Sí", "No", "Sin fragancia"] },
        { id: "mas_32", label: "Temperatura del ambiente preferida", type: "text" },
        { id: "mas_33", label: "Música durante la sesión", type: "select", options: ["Con música", "Silencio"] }
      ]
    },
    {
      id: "cuestionario_mas",
      titulo: "E. Entrevista de Bienestar",
      campos: [
        { id: "mas_34", label: "¿Cuál es la razón principal que te trae hoy a la sesión?", type: "textarea" },
        { id: "mas_35", label: "¿Alguna zona del cuerpo especialmente tensa o rígida hoy?", type: "textarea" },
        { id: "mas_36", label: "¿Has recibido masoterapia antes? ¿Con qué frecuencia?", type: "textarea" },
        { id: "mas_37", label: "¿Actividad diaria implica esfuerzo, postura prolongada o repetición?", type: "textarea" },
        { id: "mas_38", label: "¿Cuál es tu expectativa al finalizar esta sesión?", type: "textarea" }
      ]
    }
  ],
  consentimiento: {
    titulo: "ACUERDO DE SERVICIO DE BIENESTAR Y EXENCIÓN DE RESPONSABILIDAD CIVIL",
    fundamento: "Servicio: Masoterapia (Versión 2026)",
    texto: "Yo, [Nombre del Consultante], manifiesto lo siguiente:\n\n1. NATURALEZA DEL SERVICIO\nReconozco que la masoterapia es una práctica de bienestar muscular integral orientada a favorecer el equilibrio corporal, la relajación profunda y el confort físico general. Este servicio NO constituye diagnóstico médico, tratamiento clínico ni prescripción de ningún tipo.\n\n2. INFORMACIÓN PROPORCIONADA\nDeclaro haber informado verazmente al terapeuta sobre mis condiciones físicas actuales, cirugías previas, embarazo (si aplica), alergias y cualquier situación relevante. Entiendo que ocultar información puede derivar en incomodidades.\n\n3. CONSENTIMIENTO EXPRESO\nAutorizo al terapeuta a aplicar técnicas manuales de bienestar muscular integral sobre las zonas indicadas, utilizando el nivel de presión acordado y los productos previamente aprobados por mí.\n\n4. LIBRE PARTICIPACIÓN\nEntiendo que puedo solicitar en cualquier momento detener, modificar o concluir la sesión sin necesidad de justificación.\n\n5. EXENCIÓN DE RESPONSABILIDAD CIVIL\nLibero al terapeuta y al centro de responsabilidad civil por sensaciones de malestar transitorio posterior a la sesión (como leve fatiga o sensibilidad muscular), siempre que se deriven de la técnica correcta y no de negligencia. Asumo la responsabilidad si omití información médica preexistente.\n\n6. PROTECCIÓN DE DATOS\nAutorizo el resguardo confidencial de mis datos para mi historial de sesiones.",
    campos: [
      { id: "mas_c1", label: "Nombre completo del consultante", type: "text", required: true },
      { id: "mas_c2", label: "Fecha de autorización", type: "date", required: true },
      { id: "mas_c3", label: "Firma del consultante", type: "signature", required: true },
      { id: "mas_c4", label: "Nombre del terapeuta", type: "text", required: true },
      { id: "mas_c5", label: "Firma del terapeuta", type: "signature", required: true }
    ]
  }
};
