export const formLogopedia = {
  id: "logopedia",
  titulo: "Terapia de Lenguaje y Audición",
  fundamento_legal: "NOM-004-SSA3-2012, Ley General de Salud Arts. 77-83, Ley para la Inclusión de Personas con Discapacidad.",
  secciones: [
    {
      id: "ficha_identificacion_log",
      titulo: "A. Ficha de Identificación",
      campos: [
        { id: "log_1", label: "Nombre(s) del paciente", type: "text", required: true },
        { id: "log_2", label: "Apellido paterno", type: "text", required: true },
        { id: "log_3", label: "Apellido materno", type: "text" },
        { id: "log_4", label: "Fecha de nacimiento", type: "date", required: true },
        { id: "log_5", label: "Edad", type: "number_readonly" },
        { id: "log_6", label: "Sexo", type: "select", options: ["Hombre", "Mujer"] },
        { id: "log_8", label: "Tutor/Padre (si es menor)", type: "text" },
        { id: "log_9", label: "Domicilio", type: "textarea" },
        { id: "log_10", label: "Teléfono", type: "tel", required: true },
        { id: "log_14", label: "Escuela y grado (si aplica)", type: "text" },
        { id: "log_15", label: "¿Apoyo USAER/Especial?", type: "boolean_text", text_label: "Especificar" },
        { id: "log_16", label: "Referido por", type: "text", placeholder: "Pediatra, escuela..." },
        { id: "log_19", label: "Nombre del terapeuta", type: "text", required: true },
        { id: "log_20", label: "Cédula profesional", type: "text" }
      ]
    },
    {
      id: "antecedentes_log",
      titulo: "B. Antecedentes del Desarrollo",
      campos: [
        { id: "log_21", label: "¿Familiar con dif. de lenguaje/aprendizaje?", type: "boolean_textarea", text_label: "Especificar" },
        { id: "log_22", label: "¿Familiar con sordera/hipoacusia?", type: "boolean_text", text_label: "Parentesco" },
        { id: "log_23", label: "¿Familiar con TEA o TDAH?", type: "boolean_text", text_label: "Parentesco" },
        { id: "log_25", label: "Prematurez (Semanas al nacer)", type: "text" },
        { id: "log_27", label: "Tamiz auditivo neonatal", type: "text", placeholder: "Pasa / No pasa" },
        { id: "log_28", label: "Primeras palabras (meses)", type: "number" },
        { id: "log_29", label: "Primeras frases (meses)", type: "number" },
        { id: "log_31", label: "¿Pérdida/regresión de lenguaje?", type: "boolean_textarea", text_label: "Describir" },
        { id: "log_32", label: "Otitis recurrentes", type: "boolean_textarea", text_label: "Frecuencia" },
        { id: "log_33", label: "Hipoacusia diagnosticada (Auxiliar/Implante)", type: "boolean_textarea", text_label: "Detalles" },
        { id: "log_34", label: "Diagnóstico TEA / TDAH", type: "boolean_textarea", text_label: "Especificar" },
        { id: "log_38", label: "Fisura labiopalatina", type: "boolean_text", text_label: "Estado cirugías" },
        { id: "log_39", label: "Traumatismo o EVC (Afasia adultos)", type: "boolean_textarea", text_label: "Detalles" },
        { id: "log_40", label: "Frenillo lingual corto / Cirugías ORL", type: "boolean_textarea", text_label: "Detalles" }
      ]
    },
    {
      id: "evaluacion_log",
      titulo: "C. Evaluación de Comunicación",
      campos: [
        { id: "log_43", label: "Motivo principal", type: "select", options: ["Retraso lenguaje", "Dislalia (articulación)", "Tartamudez (fluidez)", "Hipoacusia", "TEA", "Afasia (EVC)", "Trastorno voz", "Deglución", "Otro"] },
        { id: "log_48", label: "Nivel de comprensión (Receptivo)", type: "textarea" },
        { id: "log_49", label: "Nivel de expresión (Longitud frases)", type: "textarea" },
        { id: "log_50", label: "Articulación fonemática", type: "textarea", placeholder: "Sonidos alterados..." },
        { id: "log_51", label: "Inteligibilidad", type: "select", options: ["Totalmente inteligible", "Mayormente", "Parcialmente", "No inteligible"] },
        { id: "log_52", label: "Fluidez (Tartamudeo/bloqueos)", type: "textarea" },
        { id: "log_53", label: "Calidad de voz", type: "textarea" },
        { id: "log_55", label: "Habilidades pragmáticas (Uso social)", type: "textarea" },
        { id: "log_56", label: "Estructuras orofaciales", type: "textarea" },
        { id: "log_58", label: "Pruebas estandarizadas aplicadas", type: "textarea", placeholder: "Prueba y puntaje" }
      ]
    },
    {
      id: "diag_plan_log",
      titulo: "D. Plan y Evolución",
      campos: [
        { id: "log_64", label: "Diagnóstico Logopédico / Audiológico", type: "textarea", required: true },
        { id: "log_65", label: "Severidad", type: "select", options: ["Leve", "Moderado", "Severo"] },
        { id: "log_67", label: "Objetivos a corto plazo", type: "textarea" },
        { id: "log_70", label: "Frecuencia de sesiones", type: "select", options: ["1 vez/sem", "2 veces/sem", "3 veces/sem", "Otra"] },
        { id: "log_72", label: "Ejercicios para casa", type: "textarea" },
        { id: "log_73", label: "¿Referencia ORL / Neurología?", type: "boolean_text", text_label: "Motivo" },
        { id: "log_77", label: "Nota de evolución sesión actual", type: "textarea" },
        { id: "log_82", label: "Firma Terapeuta", type: "signature" }
      ]
    }
  ],
  consentimiento: {
    titulo: "CARTA DE CONSENTIMIENTO INFORMADO PARA TERAPIA DE LENGUAJE Y AUDICIÓN",
    fundamento: "NOM-004-SSA3-2012 y Ley para la Inclusión de Personas con Discapacidad.",
    texto: "He sido informado(a) sobre la evaluación y el plan terapéutico propuesto.\n\nEntiendo que:\n1. El progreso depende de la asistencia constante y la práctica en casa.\n2. La terapia puede involucrar manipulación facial externa o intraoral (con guantes).\n3. El expediente es confidencial.\n4. Autorizo el uso de grabaciones de voz/video EXCLUSIVAMENTE para seguimiento clínico interno, NO para redes sociales ni fines académicos sin mi autorización expresa adicional.",
    campos: [
      { id: "log_c1", label: "Nombre del paciente/representante", type: "text", required: true },
      { id: "log_c2", label: "Relación con el paciente", type: "select", options: ["Paciente", "Padre", "Madre", "Tutor"] },
      { id: "log_c3", label: "¿Autoriza grabaciones de voz/video para uso clínico?", type: "radio", options: ["Sí", "No"] },
      { id: "log_c4", label: "¿Autoriza material para fines académicos externos?", type: "radio", options: ["Sí", "No"] },
      { id: "log_c5", label: "Firma del paciente o representante", type: "signature", required: true },
      { id: "log_c6", label: "Firma del terapeuta", type: "signature", required: true }
    ]
  }
};
