export const formCoaching = {
  id: "coaching",
  titulo: "Coaching de Vida",
  fundamento_legal: "Servicio de desarrollo personal y facilitación de metas. NO es psicoterapia ni asesoría legal o médica. (Versión 2026).",
  secciones: [
    {
      id: "datos_generales_coa",
      titulo: "A. Datos Generales y Perfil",
      campos: [
        { id: "coa_1", label: "Nombre completo", type: "text", required: true },
        { id: "coa_2", label: "Fecha de nacimiento", type: "date", required: true },
        { id: "coa_3", label: "Edad", type: "number_readonly" },
        { id: "coa_4", label: "Sexo / Género", type: "select", options: ["Mujer", "Hombre", "No binario", "Prefiero no decir"] },
        { id: "coa_5", label: "Teléfono de contacto", type: "tel", required: true },
        { id: "coa_6", label: "Correo electrónico", type: "email" },
        { id: "coa_7", label: "Modalidad de sesión preferida", type: "select", options: ["Presencial", "En línea", "Híbrida"] },
        { id: "coa_8", label: "Ocupación actual", type: "text" },
        { id: "coa_9", label: "Estado civil / situación familiar", type: "text" },
        { id: "coa_10", label: "Nivel de estudios", type: "text" },
        { id: "coa_11", label: "País y ciudad de residencia", type: "text" },
        { id: "coa_12", label: "Idioma principal", type: "text" }
      ]
    },
    {
      id: "contexto_coa",
      titulo: "B. Contexto del Proceso de Coaching",
      campos: [
        { id: "coa_13", label: "Área(s) a trabajar", type: "multiselect", options: ["Carrera profesional", "Relaciones", "Finanzas", "Propósito de vida", "Salud y bienestar", "Creatividad", "Otra"] },
        { id: "coa_14", label: "Objetivo(s) general(es) para el proceso", type: "textarea", required: true },
        { id: "coa_15", label: "¿Qué te llevó a buscar coaching en este momento?", type: "textarea" },
        { id: "coa_16", label: "Experiencias previas con coaching o desarrollo personal", type: "textarea" },
        { id: "coa_17", label: "Expectativas respecto al coach y al proceso", type: "textarea" },
        { id: "coa_18", label: "Disponibilidad semanal (horas para sesiones y tareas)", type: "text" }
      ]
    },
    {
      id: "indicadores_coa",
      titulo: "C. Indicadores de Punto de Partida (Autodiagnóstico)",
      campos: [
        { id: "coa_19", label: "Nivel de satisfacción actual en tu vida (1-10)", type: "scale", min: 1, max: 10 },
        { id: "coa_20", label: "Claridad sobre tus metas actuales (1-10)", type: "scale", min: 1, max: 10 },
        { id: "coa_21", label: "Nivel de energía y motivación general (1-10)", type: "scale", min: 1, max: 10 },
        { id: "coa_22", label: "Obstáculos principales identificados", type: "textarea" },
        { id: "coa_23", label: "Recursos personales a tu favor (habilidades, red de apoyo)", type: "textarea" }
      ]
    }
  ],
  consentimiento: {
    titulo: "ACUERDO DE SERVICIO DE DESARROLLO PERSONAL Y EXENCIÓN DE RESPONSABILIDAD CIVIL",
    fundamento: "Servicio: Coaching de Vida (Versión 2026)",
    texto: "Yo, [Nombre del Consultante], manifiesto:\n\n1. NATURALEZA DEL SERVICIO\nEntiendo que el coaching de vida es un proceso de acompañamiento orientado al desarrollo personal, claridad de metas y activación de recursos internos. El coaching NO es psicoterapia, asesoría legal, consultoría médica ni financiera. El coach no trata condiciones de salud mental.\n\n2. ROL DEL COACH Y DEL CONSULTANTE\nReconozco que el coach es un facilitador y que el responsable principal de los resultados del proceso soy yo. Las decisiones tomadas durante y después del proceso son de mi exclusiva responsabilidad.\n\n3. COMPROMISO CON EL PROCESO\nMe comprometo a participar activamente en las sesiones, a ser honesto(a) en mis respuestas y a realizar las tareas o reflexiones acordadas entre sesiones.\n\n4. DERIVACIÓN PROFESIONAL\nEntiendo que si el coach identifica indicios de condiciones que requieran atención psicológica o médica, me lo comunicará y me orientará para buscar el apoyo profesional adecuado.\n\n5. CONFIDENCIALIDAD\nTodo lo compartido durante las sesiones es estrictamente confidencial, salvo en casos donde exista riesgo inminente para mi vida o la de terceros.\n\n6. EXENCIÓN DE RESPONSABILIDAD CIVIL\nLibero al coach y al centro de toda responsabilidad civil por las decisiones personales, laborales, relacionales o económicas que tome a partir de las reflexiones del proceso de coaching, ya que dichas decisiones son de mi exclusiva autoría y responsabilidad.",
    campos: [
      { id: "coa_c1", label: "Nombre completo del consultante", type: "text", required: true },
      { id: "coa_c2", label: "Fecha de autorización", type: "date", required: true },
      { id: "coa_c3", label: "Firma del consultante", type: "signature", required: true },
      { id: "coa_c4", label: "Nombre del coach responsable", type: "text", required: true },
      { id: "coa_c5", label: "Firma del coach", type: "signature", required: true }
    ]
  }
};
