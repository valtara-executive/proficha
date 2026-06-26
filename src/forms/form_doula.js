export const formDoula = {
  id: "doula",
  titulo: "Doula / Partera (Acompañamiento Perinatal)",
  fundamento_legal: "Servicio de apoyo emocional e informativo. Rol complementario, NUNCA sustituto del equipo médico u obstétrico. (Versión 2026).",
  secciones: [
    {
      id: "datos_generales_dou",
      titulo: "A. Datos de la Gestante",
      campos: [
        { id: "dou_1", label: "Nombre completo de la gestante", type: "text", required: true },
        { id: "dou_2", label: "Fecha de nacimiento", type: "date", required: true },
        { id: "dou_3", label: "Edad", type: "number_readonly" },
        { id: "dou_4", label: "Teléfono principal", type: "tel", required: true },
        { id: "dou_5", label: "Correo electrónico", type: "email" },
        { id: "dou_6", label: "Nombre del acompañante principal", type: "text", required: true },
        { id: "dou_7", label: "Teléfono del acompañante", type: "tel", required: true },
        { id: "dou_8", label: "Contacto de emergencia adicional", type: "text", required: true }
      ]
    },
    {
      id: "datos_embarazo_dou",
      titulo: "B. Datos del Embarazo y Proceso Perinatal",
      campos: [
        { id: "dou_9", label: "Número de embarazo actual", type: "number", placeholder: "1, 2, 3..." },
        { id: "dou_10", label: "Semanas de gestación actuales", type: "number" },
        { id: "dou_11", label: "Fecha Probable de Parto (FPP)", type: "date", required: true },
        { id: "dou_12", label: "Embarazo", type: "select", options: ["Único", "Múltiple"] },
        { id: "dou_13", label: "Modalidad de parto planificada/deseada", type: "select", options: ["Parto vaginal", "Cesárea", "Aún sin decidir"] },
        { id: "dou_14", label: "Lugar de parto planificado", type: "select", options: ["Hospital privado", "Hospital público", "Clínica de maternidad", "Casa", "Por definir"] },
        { id: "dou_15", label: "Médico obstetra de cabecera", type: "text" },
        { id: "dou_16", label: "¿El equipo médico sabe del acompañamiento de doula?", type: "radio", options: ["Sí", "No", "No aplica"] }
      ]
    },
    {
      id: "antecedentes_dou",
      titulo: "C. Antecedentes Obstétricos y de Salud",
      campos: [
        { id: "dou_17", label: "Partos previos (Cantidad y tipo)", type: "textarea", placeholder: "Ej. 1 parto vaginal, 1 cesárea" },
        { id: "dou_18", label: "Pérdidas gestacionales (Opcional compartir)", type: "textarea" },
        { id: "dou_19", label: "Complicaciones en embarazos anteriores", type: "textarea" },
        { id: "dou_20", label: "Padecimientos crónicos (Diabetes gestacional, HTA)", type: "textarea" },
        { id: "dou_21", label: "Medicamentos indicados por el médico actual", type: "textarea" },
        { id: "dou_22", label: "Alergias conocidas", type: "textarea" },
        { id: "dou_23", label: "Condición de salud mental (Ansiedad, depresión perinatal)", type: "textarea" }
      ]
    },
    {
      id: "plan_parto_dou",
      titulo: "D. Perfil y Preferencias del Plan de Parto",
      campos: [
        { id: "dou_24", label: "Deseos y preferencias para el trabajo de parto", type: "textarea" },
        { id: "dou_25", label: "Manejo del dolor preferido", type: "text" },
        { id: "dou_26", label: "¿Hay alguna intervención médica que desees evitar?", type: "textarea" },
        { id: "dou_27", label: "Planes para la lactancia", type: "select", options: ["Lactancia materna exclusiva", "Fórmula", "Mixta", "Aún no decido"] },
        { id: "dou_28", label: "Planes y apoyo para el posparto inmediato", type: "textarea" }
      ]
    },
    {
      id: "entrevista_dou",
      titulo: "E. Entrevista y Conexión Emocional",
      campos: [
        { id: "dou_29", label: "¿Qué te motivó a buscar una doula/partera?", type: "textarea", required: true },
        { id: "dou_30", label: "¿Qué miedos o inquietudes tienes sobre el parto?", type: "textarea" },
        { id: "dou_31", label: "¿Qué tipo de apoyo específico esperas de mí?", type: "textarea" }
      ]
    }
  ],
  consentimiento: {
    titulo: "ACUERDO DE SERVICIO DE ACOMPAÑAMIENTO PERINATAL Y EXENCIÓN DE RESPONSABILIDAD CIVIL",
    fundamento: "Servicio: Acompañamiento Perinatal — Doula / Partera (Versión 2026)",
    texto: "Yo, [Nombre de la Gestante], manifiesto:\n\n1. NATURALEZA DEL SERVICIO\nEntiendo que la doula/partera brinda apoyo emocional, informativo y físico. La doula NO ejerce funciones médicas, NO realiza diagnósticos ni prescribe medicamentos. Su rol es complementario, nunca sustituto, del equipo obstétrico a cargo de mi atención.\n\n2. COMPLEMENTARIEDAD MÉDICA\nLas decisiones clínicas durante el parto serán tomadas por el equipo médico y por mí, no por la doula.\n\n3. ACOMPAÑAMIENTO FÍSICO\nRecibo de manera libre técnicas de apoyo (masaje, respiración, contacto de bienestar muscular integral), pudiendo detenerlas en cualquier momento.\n\n4. PLAN DE PARTO\nEntiendo que el plan de parto expresa mis deseos, pero su implementación depende de las condiciones clínicas evaluadas por los médicos.\n\n5. EXENCIÓN DE RESPONSABILIDAD CIVIL\nLibero a la doula/partera de responsabilidad por los resultados médicos del parto, la salud del bebé o decisiones clínicas tomadas. La responsabilidad de la doula se limita al apoyo emocional y de bienestar.\n\n6. CONFIDENCIALIDAD Y CONTACTO\nLa información es confidencial. Confirmo que mis datos de emergencia están actualizados.",
    campos: [
      { id: "dou_c1", label: "Nombre de la gestante", type: "text", required: true },
      { id: "dou_c2", label: "Firma de la gestante", type: "signature", required: true },
      { id: "dou_c3", label: "Nombre del acompañante (Si firma)", type: "text" },
      { id: "dou_c4", label: "Firma del acompañante", type: "signature" },
      { id: "dou_c5", label: "Fecha", type: "date", required: true },
      { id: "dou_c6", label: "Nombre de la Doula/Partera", type: "text", required: true },
      { id: "dou_c7", label: "Firma de la Doula/Partera", type: "signature", required: true }
    ]
  }
};
