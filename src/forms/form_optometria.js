export const formOptometria = {
  id: "optometria",
  titulo: "Optometría",
  fundamento_legal: "NOM-004-SSA3-2012, Ley General de Salud Arts. 77-83. Estándares clínicos de práctica optométrica.",
  secciones: [
    {
      id: "ficha_identificacion_opt",
      titulo: "A. Ficha de Identificación",
      campos: [
        { id: "opt_1", label: "Nombre(s) completo(s)", type: "text", required: true },
        { id: "opt_2", label: "Apellido paterno", type: "text", required: true },
        { id: "opt_3", label: "Apellido materno", type: "text" },
        { id: "opt_4", label: "Fecha de nacimiento", type: "date", required: true },
        { id: "opt_5", label: "Edad", type: "number_readonly" },
        { id: "opt_6", label: "Sexo", type: "select", options: ["Hombre", "Mujer"], required: true },
        { id: "opt_7", label: "CURP", type: "text" },
        { id: "opt_8", label: "Ocupación (exigencia visual)", type: "text" },
        { id: "opt_9", label: "Domicilio completo", type: "textarea" },
        { id: "opt_10", label: "Teléfono de contacto", type: "tel", required: true },
        { id: "opt_11", label: "Correo electrónico", type: "email" },
        { id: "opt_12", label: "Nombre contacto de emergencia", type: "text" },
        { id: "opt_13", label: "Teléfono de emergencia", type: "tel" },
        { id: "opt_14", label: "Médico oftalmólogo tratante (si existe)", type: "text" },
        { id: "opt_15", label: "Fecha de primera consulta", type: "date" },
        { id: "opt_16", label: "Nombre del optometrista", type: "text", required: true },
        { id: "opt_17", label: "Cédula profesional", type: "text" },
        { id: "opt_18", label: "Fecha de último examen visual", type: "date" }
      ]
    },
    {
      id: "antecedentes_opt",
      titulo: "B. Antecedentes",
      campos: [
        { id: "opt_19", label: "¿Familiar 1er grado con glaucoma?", type: "boolean_text", text_label: "Parentesco" },
        { id: "opt_20", label: "¿Familiar 1er grado con degeneración macular?", type: "boolean_text", text_label: "Parentesco" },
        { id: "opt_21", label: "¿Familiar 1er grado con cataratas tempranas?", type: "boolean_text", text_label: "Parentesco" },
        { id: "opt_22", label: "¿Familiar 1er grado con enf. retiniana hereditaria?", type: "boolean_text", text_label: "Parentesco" },
        { id: "opt_23", label: "¿Familiar 1er grado con estrabismo/ambliopía?", type: "boolean_text", text_label: "Parentesco" },
        { id: "opt_24", label: "Horas de uso de pantallas al día", type: "number" },
        { id: "opt_25", label: "Uso actual de lentes (armazón/contacto)", type: "boolean_textarea", text_label: "Tipo, graduación y tiempo de uso" },
        { id: "opt_26", label: "Tipo de actividad visual predominante", type: "textarea", placeholder: "Lectura, computadora, conducción..." },
        { id: "opt_27", label: "Exposición a polvo, químicos o radiación", type: "boolean_text", text_label: "Especificar" },
        { id: "opt_28", label: "Uso de protección ocular", type: "radio", options: ["Sí", "No"] },
        { id: "opt_29", label: "Enfermedades sistémicas (Diabetes, HTA, Tiroides)", type: "multiselect", options: ["Diabetes", "Hipertensión", "Enf. Autoinmunes", "Enf. Tiroideas", "Ninguna", "Otra"] },
        { id: "opt_30", label: "Cirugías oculares previas", type: "boolean_textarea", text_label: "Tipo, ojo afectado y fecha" },
        { id: "opt_31", label: "Traumatismos oculares", type: "boolean_textarea", text_label: "Especificar" },
        { id: "opt_32", label: "Diagnóstico oftalmológico previo", type: "boolean_textarea", text_label: "Especificar y tratamiento" },
        { id: "opt_33", label: "Alergias oculares/soluciones de contacto", type: "boolean_textarea", text_label: "Especificar" },
        { id: "opt_34", label: "Medicamentos que afectan visión", type: "textarea", placeholder: "Corticoesteroides, antihistamínicos..." },
        { id: "opt_35", label: "Infecciones oculares recurrentes", type: "boolean_text", text_label: "Frecuencia" }
      ]
    },
    {
      id: "motivo_opt",
      titulo: "C. Motivo de Consulta",
      campos: [
        { id: "opt_36", label: "Motivo principal", type: "select", options: ["Examen visual de rutina", "Disminución agudeza visual", "Dolor ocular", "Ojo rojo", "Visión borrosa lejos", "Visión borrosa cerca", "Fatiga visual", "Cefalea asociada a visión", "Adaptación de lentes", "Otro"] },
        { id: "opt_37", label: "Tiempo de evolución", type: "text" },
        { id: "opt_38", label: "Síntomas asociados", type: "multiselect", options: ["Lagrimeo", "Fotofobia", "Prurito", "Cuerpo extraño", "Visión doble", "Destellos", "Moscas volantes"] },
        { id: "opt_39", label: "Ojo afectado", type: "select", options: ["Ojo derecho", "Ojo izquierdo", "Ambos ojos"] }
      ]
    },
    {
      id: "evaluacion_opt",
      titulo: "D. Evaluación Optométrica",
      campos: [
        { id: "opt_40", label: "Agudeza visual S/C (OD)", type: "text", placeholder: "20/20" },
        { id: "opt_41", label: "Agudeza visual S/C (OI)", type: "text", placeholder: "20/20" },
        { id: "opt_42", label: "Agudeza visual C/C actual (OD)", type: "text" },
        { id: "opt_43", label: "Agudeza visual C/C actual (OI)", type: "text" },
        { id: "opt_44", label: "Refracción objetiva OD", type: "textarea", placeholder: "Esfera, Cilindro, Eje" },
        { id: "opt_45", label: "Refracción objetiva OI", type: "textarea", placeholder: "Esfera, Cilindro, Eje" },
        { id: "opt_46", label: "Refracción subjetiva OD", type: "textarea", placeholder: "Esfera, Cilindro, Eje, Adición" },
        { id: "opt_47", label: "Refracción subjetiva OI", type: "textarea", placeholder: "Esfera, Cilindro, Eje, Adición" },
        { id: "opt_48", label: "Distancia interpupilar (mm)", type: "number" },
        { id: "opt_49", label: "PIO OD (mmHg)", type: "number" },
        { id: "opt_50", label: "PIO OI (mmHg)", type: "number" },
        { id: "opt_51", label: "Motilidad ocular y alineación", type: "textarea" },
        { id: "opt_52", label: "Visión de colores", type: "textarea" },
        { id: "opt_53", label: "Visión binocular/Estereopsis", type: "textarea" },
        { id: "opt_54", label: "Examen segmento anterior (Lámpara hendidura)", type: "textarea" },
        { id: "opt_55", label: "Examen fondo de ojo", type: "textarea" },
        { id: "opt_56", label: "Test película lagrimal", type: "textarea" }
      ]
    },
    {
      id: "diag_plan_opt",
      titulo: "E. Diagnóstico y Prescripción",
      campos: [
        { id: "opt_57", label: "Diagnóstico refractivo", type: "textarea", required: true },
        { id: "opt_58", label: "Diagnóstico de salud ocular adicional", type: "textarea" },
        { id: "opt_59", label: "¿Signos de alarma / Ref. oftalmología?", type: "boolean_textarea", text_label: "Especificar" },
        { id: "opt_60", label: "Prescripción final (Esf, Cil, Eje, Add, DIP)", type: "textarea", required: true },
        { id: "opt_61", label: "Tipo de lente recomendado", type: "select", options: ["Monofocal", "Bifocal", "Progresivo", "Ocupacional", "De contacto"] },
        { id: "opt_62", label: "Tratamientos del lente", type: "multiselect", options: ["Antirreflejante", "Filtro luz azul", "Fotocromático", "Polarizado", "Policarbonato", "Alto índice"] },
        { id: "opt_63", label: "Parámetros lentes de contacto (si aplica)", type: "textarea" },
        { id: "opt_64", label: "Higiene visual / Recomendaciones", type: "textarea" },
        { id: "opt_66", label: "Próximo control visual", type: "date" }
      ]
    },
    {
      id: "evolucion_opt",
      titulo: "F. Nota de Evolución (Subsecuentes)",
      campos: [
        { id: "opt_67", label: "Fecha de seguimiento", type: "date" },
        { id: "opt_68", label: "Motivo del seguimiento", type: "textarea" },
        { id: "opt_69", label: "Cambios en agudeza visual", type: "textarea" },
        { id: "opt_70", label: "Adaptación a la prescripción", type: "select", options: ["Buena", "Regular", "Mala"] },
        { id: "opt_71", label: "Ajustes realizados", type: "textarea" },
        { id: "opt_72", label: "Firma Optometrista", type: "signature" }
      ]
    }
  ],
  consentimiento: {
    titulo: "CARTA DE CONSENTIMIENTO INFORMADO PARA EVALUACIÓN OPTOMÉTRICA",
    fundamento: "NOM-004-SSA3-2012 y Ley General de Salud Arts. 77-83.",
    texto: "Declaro que el optometrista me ha explicado los resultados de mi evaluación visual y el tratamiento propuesto.\n\nEntiendo que:\n1. La optometría no sustituye la valoración médica oftalmológica ante patologías oculares.\n2. El uso de lentes de contacto conlleva riesgos de infección si no se sigue la higiene adecuada.\n3. La graduación visual puede cambiar con el tiempo.\n4. Si se instilan gotas midriáticas, causarán visión borrosa temporal y sensibilidad a la luz (evitar conducir).\n\nOTORGO MI CONSENTIMIENTO para la evaluación y adaptación de lentes.",
    campos: [
      { id: "opt_c1", label: "Nombre del paciente o representante", type: "text", required: true },
      { id: "opt_c2", label: "Relación del firmante", type: "select", options: ["Paciente", "Padre", "Madre", "Tutor legal"] },
      { id: "opt_c3", label: "¿Se utilizaron gotas de dilatación pupilar?", type: "radio", options: ["Sí", "No"] },
      { id: "opt_c4", label: "¿Se recomendó referencia a oftalmología?", type: "radio", options: ["Sí", "No"] },
      { id: "opt_c5", label: "Firma del paciente o representante", type: "signature", required: true },
      { id: "opt_c6", label: "Firma del optometrista", type: "signature", required: true }
    ]
  }
};
