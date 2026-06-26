export const formPsicopedagogia = {
  id: "psicopedagogia",
  titulo: "Psicopedagogía",
  fundamento_legal: "Orientación educativa y de aprendizaje. NO constituye dictamen médico ni psiquiátrico. (Versión 2026).",
  secciones: [
    {
      id: "datos_generales_psp",
      titulo: "A. Datos del Consultante",
      campos: [
        { id: "psp_1", label: "Nombre completo del alumno/consultante", type: "text", required: true },
        { id: "psp_2", label: "Fecha de nacimiento", type: "date", required: true },
        { id: "psp_3", label: "Edad", type: "number_readonly" },
        { id: "psp_4", label: "Grado escolar actual", type: "text" },
        { id: "psp_5", label: "Institución educativa", type: "text" },
        { id: "psp_6", label: "Modalidad de atención", type: "select", options: ["Presencial", "En línea"] }
      ]
    },
    {
      id: "datos_tutor_psp",
      titulo: "B. Datos del Padre, Madre o Tutor (Si es menor)",
      campos: [
        { id: "psp_7", label: "Nombre completo del tutor", type: "text" },
        { id: "psp_8", label: "Relación con el menor", type: "text" },
        { id: "psp_9", label: "Teléfono", type: "tel" },
        { id: "psp_10", label: "Correo electrónico", type: "email" },
        { id: "psp_11", label: "Disponibilidad para participar en el proceso", type: "select", options: ["Alta", "Media", "Baja"] }
      ]
    },
    {
      id: "antecedentes_psp",
      titulo: "C. Antecedentes Educativos y Desarrollo",
      campos: [
        { id: "psp_12", label: "Dificultades académicas reportadas", type: "multiselect", options: ["Lectura", "Escritura", "Matemáticas", "Atención", "Organización", "Otra"] },
        { id: "psp_13", label: "¿Tiene algún diagnóstico previo (TDAH, TEA, Dislexia)?", type: "boolean_textarea", text_label: "Emitido por qué especialista" },
        { id: "psp_14", label: "Apoyos anteriores (Psicopedagógicos, lenguaje, etc.)", type: "textarea" },
        { id: "psp_15", label: "Reprobación de grados o materias", type: "boolean_text", text_label: "¿Cuáles?" },
        { id: "psp_16", label: "Cambios frecuentes de escuela", type: "radio", options: ["Sí", "No"] },
        { id: "psp_17", label: "Contexto familiar relevante para el aprendizaje", type: "textarea" }
      ]
    },
    {
      id: "perfil_socioemocional_psp",
      titulo: "D. Perfil Conductual y Socioemocional",
      campos: [
        { id: "psp_18", label: "Motivación hacia el estudio", type: "select", options: ["Baja", "Media", "Alta"] },
        { id: "psp_19", label: "Relación con compañeros y autoridad", type: "textarea" },
        { id: "psp_20", label: "Conductas de evitación escolar (no quiere ir, dolor de estómago)", type: "radio", options: ["Sí", "No"] },
        { id: "psp_21", label: "Horas de pantalla diarias aproximadas", type: "number" },
        { id: "psp_22", label: "Horas de sueño diarias", type: "number" }
      ]
    },
    {
      id: "entrevista_psp",
      titulo: "E. Motivo de Consulta y Entrevista",
      campos: [
        { id: "psp_23", label: "Razón principal de la consulta", type: "textarea", required: true },
        { id: "psp_24", label: "Objetivos del proceso", type: "multiselect", options: ["Mejorar rendimiento", "Desarrollar estrategias", "Evaluación diagnóstica", "Otro"] },
        { id: "psp_25", label: "¿Desde cuándo notan las dificultades?", type: "text" },
        { id: "psp_26", label: "¿Cómo reacciona el alumno ante las tareas o retos?", type: "textarea" }
      ]
    }
  ],
  consentimiento: {
    titulo: "ACUERDO DE SERVICIO PSICOPEDAGÓGICO Y EXENCIÓN DE RESPONSABILIDAD CIVIL",
    fundamento: "Servicio: Psicopedagogía (Versión 2026)",
    texto: "Yo/Nosotros, como representantes del consultante, manifestamos:\n\n1. NATURALEZA DEL SERVICIO\nEntendemos que el servicio está orientado a la detección, comprensión y acompañamiento de procesos de aprendizaje. El psicopedagogo NO realiza diagnósticos médicos ni psiquiátricos. Las observaciones e informes emitidos son de naturaleza educativa y no constituyen dictámenes clínicos.\n\n2. EVALUACIÓN Y PROCESO\nEl proceso puede incluir observaciones, actividades evaluativas y entrevistas. Los resultados se comunicarán de manera respetuosa.\n\n3. COLABORACIÓN INTERDISCIPLINARIA\nSi el psicopedagogo identifica áreas que requieren atención médica o neurológica, nos orientará para buscar dicho apoyo.\n\n4. PARTICIPACIÓN ACTIVA\nNos comprometo a participar activamente y a implementar las estrategias acordadas en casa.\n\n5. CONFIDENCIALIDAD\nLa información es confidencial. No se compartirá información con escuelas u otros terceros sin nuestra autorización expresa.\n\n6. EXENCIÓN DE RESPONSABILIDAD CIVIL\nLiberamos al psicopedagogo de responsabilidad por los resultados académicos del consultante, dado que estos dependen de múltiples factores (esfuerzo, entorno, neurodesarrollo). El servicio ofrece herramientas; los resultados dependen del compromiso del consultante y su familia.",
    campos: [
      { id: "psp_c1", label: "Nombre del consultante (Alumno)", type: "text", required: true },
      { id: "psp_c2", label: "Firma del consultante (Si aplica por edad)", type: "signature" },
      { id: "psp_c3", label: "Nombre del Tutor / Representante", type: "text", required: true },
      { id: "psp_c4", label: "Firma del Tutor", type: "signature", required: true },
      { id: "psp_c5", label: "Fecha", type: "date", required: true },
      { id: "psp_c6", label: "Firma del Psicopedagogo(a)", type: "signature", required: true }
    ]
  }
};
