export const formPodologia = {
  id: "podologia",
  titulo: "Podología",
  fundamento_legal: "NOM-004-SSA3-2012, Ley General de Salud Arts. 77-83, NOM-015-SSA2-2010 (Diabetes), NOM-087-SEMARNAT-SSA1-2002.",
  secciones: [
    {
      id: "ficha_identificacion_pod",
      titulo: "A. Ficha de Identificación",
      campos: [
        { id: "pod_1", label: "Nombre(s) completo(s)", type: "text", required: true },
        { id: "pod_2", label: "Apellido paterno", type: "text", required: true },
        { id: "pod_3", label: "Apellido materno", type: "text" },
        { id: "pod_4", label: "Fecha de nacimiento", type: "date", required: true },
        { id: "pod_5", label: "Edad", type: "number_readonly" },
        { id: "pod_6", label: "Sexo", type: "select", options: ["Hombre", "Mujer"], required: true },
        { id: "pod_7", label: "CURP", type: "text" },
        { id: "pod_8", label: "Ocupación (carga postural)", type: "text" },
        { id: "pod_9", label: "Domicilio completo", type: "textarea" },
        { id: "pod_10", label: "Teléfono de contacto", type: "tel", required: true },
        { id: "pod_11", label: "Correo electrónico", type: "email" },
        { id: "pod_12", label: "Contacto de emergencia", type: "text" },
        { id: "pod_13", label: "Teléfono de emergencia", type: "tel" },
        { id: "pod_14", label: "Médico tratante (Diab/Vasc)", type: "text" },
        { id: "pod_15", label: "Fecha primera consulta", type: "date" },
        { id: "pod_16", label: "Nombre del podólogo(a)", type: "text", required: true },
        { id: "pod_17", label: "Cédula profesional", type: "text" }
      ]
    },
    {
      id: "antecedentes_pod",
      titulo: "B. Antecedentes y Riesgo Vascular",
      campos: [
        { id: "pod_18", label: "¿Familiar 1er grado con diabetes?", type: "boolean_text", text_label: "Parentesco" },
        { id: "pod_19", label: "¿Familiar 1er grado con enf. vascular?", type: "boolean_text", text_label: "Parentesco" },
        { id: "pod_20", label: "¿Familiar 1er grado con reumatismo/gota?", type: "boolean_text", text_label: "Parentesco" },
        { id: "pod_21", label: "Calzado de uso habitual", type: "textarea" },
        { id: "pod_22", label: "Horas bipedestación diaria", type: "number" },
        { id: "pod_23", label: "Deporte de impacto (correr, futbol...)", type: "textarea" },
        { id: "pod_24", label: "Higiene podal (corte, hidratación)", type: "textarea" },
        { id: "pod_25", label: "Tabaquismo (impacto vascular)", type: "radio", options: ["Sí", "No"] },
        { id: "pod_26", label: "Consumo de alcohol", type: "select", options: ["Nunca", "Ocasional", "Frecuente", "Diario"] },
        { id: "pod_27", label: "Diagnóstico de Diabetes Mellitus", type: "boolean_textarea", text_label: "Tipo, años, control/HbA1c" },
        { id: "pod_28", label: "Diagnóstico Enf. Vascular Periférica", type: "boolean_textarea", text_label: "Detalles" },
        { id: "pod_29", label: "Neuropatía Periférica", type: "boolean_textarea", text_label: "Detalles" },
        { id: "pod_30", label: "Enf. Reumatológicas (Artritis, Gota)", type: "boolean_textarea", text_label: "Detalles" },
        { id: "pod_31", label: "Úlceras previas en pies", type: "boolean_textarea", text_label: "Fecha y evolución" },
        { id: "pod_32", label: "Amputación en miembros inferiores", type: "boolean_textarea", text_label: "Nivel y causa" },
        { id: "pod_33", label: "Cirugías previas en pie", type: "boolean_textarea", text_label: "Tipo y fecha" },
        { id: "pod_34", label: "Alergias (Antisépticos, anestesia, látex)", type: "boolean_textarea", text_label: "Especificar" },
        { id: "pod_35", label: "Uso de anticoagulantes/medicamentos", type: "textarea" },
        { id: "pod_36", label: "Infecciones micóticas previas", type: "boolean_textarea", text_label: "Tratamiento y resultado" }
      ]
    },
    {
      id: "evaluacion_pod",
      titulo: "C. Motivo y Evaluación Podológica",
      campos: [
        { id: "pod_37", label: "Motivo principal", type: "select", options: ["Uña encarnada", "Hiperqueratosis/Callos", "Onicomicosis", "Verruga plantar", "Dolor plantar", "Deformidad", "Revisión pie diabético", "Cuidado rutina", "Otro"] },
        { id: "pod_38", label: "Tiempo de evolución", type: "text" },
        { id: "pod_39", label: "Intensidad del dolor (0-10)", type: "scale", min: 0, max: 10 },
        { id: "pod_40", label: "Tratamientos previos intentados", type: "textarea" },
        { id: "pod_41", label: "Inspección general (color, edema, T°)", type: "textarea" },
        { id: "pod_42", label: "Piel (sequedad, maceración, fisuras)", type: "textarea" },
        { id: "pod_43", label: "Uñas (grosor, color, onicocriptosis)", type: "textarea" },
        { id: "pod_44", label: "Deformidades estructurales", type: "multiselect", options: ["Hallux valgus", "Dedos en martillo", "Dedos en garra", "Pie plano", "Pie cavo", "Ninguna"] },
        { id: "pod_45", label: "Marcha y apoyo plantar", type: "textarea" },
        { id: "pod_46", label: "Pulsos periféricos", type: "select", options: ["Presentes normales", "Disminuidos", "Ausentes"] },
        { id: "pod_47", label: "Sensibilidad (Monofilamento)", type: "textarea", placeholder: "Puntos evaluados..." },
        { id: "pod_49", label: "Riesgo de pie diabético (Wagner/Otra)", type: "text" },
        { id: "pod_50", label: "Lesiones activas (Úlceras)", type: "boolean_textarea", text_label: "Ubicación, profundidad y lecho" }
      ]
    },
    {
      id: "tratamiento_pod",
      titulo: "D. Tratamiento y Evolución",
      campos: [
        { id: "pod_53", label: "Diagnóstico podológico", type: "textarea", required: true },
        { id: "pod_54", label: "Nivel de riesgo", type: "select", options: ["Bajo riesgo", "Riesgo moderado", "Alto riesgo", "Pie con lesión activa"] },
        { id: "pod_55", label: "Procedimiento a realizar", type: "textarea", required: true },
        { id: "pod_56", label: "Material y técnica utilizada", type: "textarea" },
        { id: "pod_57", label: "Indicaciones para el hogar", type: "textarea" },
        { id: "pod_58", label: "Recomendaciones de calzado", type: "textarea" },
        { id: "pod_59", label: "Requiere órtesis/plantillas", type: "boolean_text", text_label: "Especificar" },
        { id: "pod_60", label: "¿Referencia médica (Angiólogo/Ortopedia)?", type: "boolean_text", text_label: "Motivo" },
        { id: "pod_61", label: "Frecuencia de revisión", type: "select", options: ["Mensual", "Bimestral", "Trimestral", "Anual", "Según necesidad"] },
        { id: "pod_62", label: "Próxima cita", type: "date" },
        { id: "pod_64", label: "Nota de evolución / Procedimiento actual", type: "textarea" },
        { id: "pod_67", label: "Firma Podólogo", type: "signature" }
      ]
    }
  ],
  consentimiento: {
    titulo: "CARTA DE CONSENTIMIENTO INFORMADO PARA TRATAMIENTO PODOLÓGICO",
    fundamento: "NOM-004-SSA3-2012, NOM-015-SSA2-2010 y LGS Arts. 77-83.",
    texto: "Declaro que el podólogo(a) me ha explicado el procedimiento propuesto (quiropodia, tratamiento de uña encarnada, curación).\n\nEntiendo que:\n1. Los procedimientos conllevan riesgos de molestia o sangrado leve.\n2. En pacientes diabéticos o con insuficiencia vascular, el riesgo de infección y complicaciones es mayor si no se siguen los cuidados.\n3. He notificado verazmente si padezco diabetes o tomo anticoagulantes.\n4. Si presento signos de infección grave, deberé buscar atención médica de urgencia.\n\nOTORGO MI CONSENTIMIENTO informado.",
    campos: [
      { id: "pod_c1", label: "Nombre del paciente o representante", type: "text", required: true },
      { id: "pod_c2", label: "Relación del firmante", type: "select", options: ["Paciente", "Padre", "Madre", "Tutor legal"] },
      { id: "pod_c3", label: "Procedimiento autorizado", type: "textarea", required: true },
      { id: "pod_c4", label: "¿Paciente diabético o con riesgo vascular?", type: "radio", options: ["Sí", "No"] },
      { id: "pod_c5", label: "¿Se informaron precauciones adicionales?", type: "radio", options: ["Sí", "No", "No aplica"] },
      { id: "pod_c6", label: "Firma del paciente o representante", type: "signature", required: true },
      { id: "pod_c7", label: "Firma del podólogo(a)", type: "signature", required: true }
    ]
  }
};
