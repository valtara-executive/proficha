export const formFisioterapia = {
  id: "fisioterapia",
  titulo: "Fisioterapia",
  fundamento_legal: "NOM-004-SSA3-2012, NOM-238-SSA1-2003 (organización y funcionamiento de unidades de rehabilitación, referencia orientativa), Ley General de Salud Arts. 77-83.",
  secciones: [
    {
      id: "ficha_identificacion_fisio",
      titulo: "A. Ficha de Identificación del Paciente",
      campos: [
        { id: "fis_1", label: "Nombre(s) completo(s)", type: "text", required: true },
        { id: "fis_2", label: "Apellido paterno", type: "text", required: true },
        { id: "fis_3", label: "Apellido materno", type: "text" },
        { id: "fis_4", label: "Fecha de nacimiento", type: "date", required: true },
        { id: "fis_5", label: "Edad", type: "number_readonly" },
        { id: "fis_6", label: "Sexo", type: "select", options: ["Hombre", "Mujer"], required: true },
        { id: "fis_7", label: "CURP", type: "text" },
        { id: "fis_8", label: "Ocupación", type: "text" },
        { id: "fis_9", label: "Dominancia manual", type: "select", options: ["Diestro", "Zurdo", "Ambidiestro"] },
        { id: "fis_10", label: "Domicilio completo", type: "textarea" },
        { id: "fis_11", label: "Teléfono de contacto", type: "tel", required: true },
        { id: "fis_12", label: "Correo electrónico", type: "email" },
        { id: "fis_13", label: "Nombre contacto de emergencia", type: "text", required: true },
        { id: "fis_14", label: "Teléfono del contacto de emergencia", type: "tel", required: true },
        { id: "fis_15", label: "Médico que refiere (si aplica)", type: "text" },
        { id: "fis_16", label: "Diagnóstico médico de envío (si aplica)", type: "text" },
        { id: "fis_17", label: "Fecha de la primera consulta", type: "date" },
        { id: "fis_18", label: "Nombre del fisioterapeuta", type: "text", required: true },
        { id: "fis_19", label: "Cédula profesional", type: "text" }
      ]
    },
    {
      id: "antecedentes_fisio",
      titulo: "B. Antecedentes",
      campos: [
        { id: "fis_20", label: "¿Familiar 1er grado con enf. reumatológicas/autoinmunes?", type: "boolean_text", text_label: "Parentesco" },
        { id: "fis_21", label: "¿Familiar 1er grado con enf. neurológicas degenerativas?", type: "boolean_text", text_label: "Parentesco" },
        { id: "fis_22", label: "¿Familiar 1er grado con osteoporosis?", type: "boolean_text", text_label: "Parentesco" },
        { id: "fis_23", label: "Actividad física habitual antes del padecimiento", type: "textarea" },
        { id: "fis_24", label: "Tipo de trabajo (posturas, carga, repetición)", type: "textarea" },
        { id: "fis_25", label: "Práctica deportiva actual o pasada relevante", type: "textarea" },
        { id: "fis_26", label: "Tabaquismo", type: "radio", options: ["Sí", "No"] },
        { id: "fis_27", label: "Consumo de alcohol", type: "select", options: ["Nunca", "Ocasional", "Frecuente", "Diario"] },
        { id: "fis_28", label: "Uso de calzado habitual (tipo, desgaste)", type: "text" },
        { id: "fis_29", label: "Uso de dispositivos de asistencia previos", type: "boolean_text", text_label: "Especificar" },
        { id: "fis_30", label: "Enfermedades crónicas relevantes", type: "textarea", placeholder: "Diabetes, hipertensión, osteoporosis..." },
        { id: "fis_31", label: "Cirugías previas (ortopédicas/neuroquirúrgicas)", type: "boolean_textarea", text_label: "Tipo, fecha, lado afectado" },
        { id: "fis_32", label: "Fracturas previas", type: "boolean_textarea", text_label: "Hueso, fecha, tratamiento" },
        { id: "fis_33", label: "Lesiones deportivas previas relevantes", type: "boolean_textarea", text_label: "Especificar" },
        { id: "fis_34", label: "Tratamientos de fisioterapia previos", type: "boolean_textarea", text_label: "Especificar y resultado" },
        { id: "fis_35", label: "Implantes, prótesis o marcapasos", type: "boolean_textarea", text_label: "Especificar tipo y ubicación" },
        { id: "fis_36", label: "Medicamentos de uso actual", type: "textarea", placeholder: "Antiinflamatorios, anticoagulantes..." },
        { id: "fis_37", label: "Embarazo actual", type: "boolean_text", text_label: "Semanas de gestación" }
      ]
    },
    {
      id: "padecimiento_fisio",
      titulo: "C. Padecimiento Actual",
      campos: [
        { id: "fis_38", label: "Motivo de consulta / región afectada", type: "textarea", required: true },
        { id: "fis_39", label: "Mecanismo de lesión", type: "select", options: ["Traumático", "Por sobreuso", "Postural", "Sin causa identificada"] },
        { id: "fis_40", label: "Fecha de inicio del padecimiento", type: "date" },
        { id: "fis_41", label: "Evolución desde el inicio hasta hoy", type: "textarea" },
        { id: "fis_42", label: "Localización exacta del dolor/limitación", type: "textarea" },
        { id: "fis_43", label: "Tipo de dolor", type: "select", options: ["Punzante", "Quemante", "Sordo", "Eléctrico", "Pulsátil", "Otro"] },
        { id: "fis_44", label: "Intensidad del dolor actual (0-10)", type: "scale", min: 0, max: 10 },
        { id: "fis_45", label: "Intensidad del dolor en el peor momento (0-10)", type: "scale", min: 0, max: 10 },
        { id: "fis_46", label: "Intensidad del dolor en el mejor momento (0-10)", type: "scale", min: 0, max: 10 },
        { id: "fis_47", label: "Factores que aumentan el dolor/limitación", type: "textarea" },
        { id: "fis_48", label: "Factores que disminuyen el dolor/limitación", type: "textarea" },
        { id: "fis_49", label: "Horario de mayor molestia", type: "select", options: ["Matutino", "Vespertino", "Nocturno", "Constante"] },
        { id: "fis_50", label: "Tratamientos previos para este episodio", type: "textarea" },
        { id: "fis_51", label: "Impacto en actividades de la vida diaria", type: "textarea" },
        { id: "fis_52", label: "Impacto en actividad laboral o deportiva", type: "textarea" }
      ]
    },
    {
      id: "evaluacion_fisio",
      titulo: "D. Evaluación Física / Exploración Funcional",
      campos: [
        { id: "fis_53", label: "Inspección visual", type: "textarea", placeholder: "Postura, deformidades, edema, atrofia..." },
        { id: "fis_54", label: "Palpación", type: "textarea", placeholder: "Puntos dolorosos, contracturas, temperatura..." },
        { id: "fis_55", label: "Rango de movimiento activo (grados)", type: "textarea" },
        { id: "fis_56", label: "Rango de movimiento pasivo (grados)", type: "textarea" },
        { id: "fis_57", label: "Fuerza muscular (Escala de Daniels 0-5)", type: "textarea" },
        { id: "fis_58", label: "Pruebas ortopédicas especiales aplicadas", type: "textarea", placeholder: "Lachman, Neer, Phalen..." },
        { id: "fis_59", label: "Evaluación de la marcha", type: "textarea" },
        { id: "fis_60", label: "Evaluación del equilibrio y coordinación", type: "textarea" },
        { id: "fis_61", label: "Evaluación neurológica básica", type: "textarea" },
        { id: "fis_62", label: "Evaluación postural global", type: "textarea" },
        { id: "fis_63", label: "Pruebas funcionales específicas", type: "textarea" }
      ]
    },
    {
      id: "estudios_diag_fisio",
      titulo: "E. Estudios y Diagnóstico Fisioterapéutico",
      campos: [
        { id: "fis_64", label: "Estudios de imagen aportados", type: "textarea" },
        { id: "fis_65", label: "Fecha de los estudios", type: "date" },
        { id: "fis_66", label: "Hallazgos relevantes en estudios", type: "textarea" },
        { id: "fis_67", label: "Diagnóstico médico de base", type: "text" },
        { id: "fis_68", label: "Diagnóstico fisioterapéutico funcional", type: "textarea", required: true },
        { id: "fis_69", label: "Estructuras anatómicas involucradas", type: "textarea" },
        { id: "fis_70", label: "Pronóstico funcional", type: "select", options: ["Favorable", "Reservado", "Limitado"] }
      ]
    },
    {
      id: "plan_tratamiento_fisio",
      titulo: "G. Plan de Tratamiento",
      campos: [
        { id: "fis_71", label: "Objetivos a corto plazo", type: "textarea" },
        { id: "fis_72", label: "Objetivos a largo plazo", type: "textarea" },
        { id: "fis_73", label: "Técnicas y modalidades a utilizar", type: "multiselect", options: ["Terapia manual", "Ejercicio terapéutico", "Electroterapia", "Termoterapia", "Crioterapia", "Punción seca", "Vendaje neuromuscular", "Otras"] },
        { id: "fis_74", label: "Número de sesiones estimado", type: "number" },
        { id: "fis_75", label: "Frecuencia de las sesiones", type: "select", options: ["Diaria", "3 veces por semana", "2 veces por semana", "Semanal"] },
        { id: "fis_76", label: "Ejercicios domiciliarios prescritos", type: "textarea" },
        { id: "fis_77", label: "Precauciones y contraindicaciones", type: "textarea" },
        { id: "fis_78", label: "¿Requiere referencia a otro profesional?", type: "boolean_text", text_label: "Especialidad y motivo" }
      ]
    },
    {
      id: "nota_evolucion_fisio",
      titulo: "H. Nota de Evolución (Sesiones subsecuentes)",
      campos: [
        { id: "fis_79", label: "Número de sesión", type: "number" },
        { id: "fis_80", label: "Fecha de la sesión", type: "date" },
        { id: "fis_81", label: "Intensidad del dolor al inicio (0-10)", type: "scale", min: 0, max: 10 },
        { id: "fis_82", label: "Intensidad del dolor al final (0-10)", type: "scale", min: 0, max: 10 },
        { id: "fis_83", label: "Técnicas aplicadas en esta sesión", type: "textarea" },
        { id: "fis_84", label: "Respuesta del paciente al tratamiento", type: "textarea" },
        { id: "fis_85", label: "Cambios en ROM o fuerza", type: "textarea" },
        { id: "fis_86", label: "Cumplimiento de ejercicios domiciliarios", type: "select", options: ["Total", "Parcial", "Nulo"] },
        { id: "fis_87", label: "Ajustes al plan de tratamiento", type: "textarea" },
        { id: "fis_88", label: "Firma del fisioterapeuta", type: "signature" }
      ]
    }
  ],
  consentimiento: {
    titulo: "CARTA DE CONSENTIMIENTO INFORMADO PARA TRATAMIENTO DE FISIOTERAPIA",
    fundamento: "NOM-004-SSA3-2012 y artículos 77 a 83 de la Ley General de Salud.",
    texto: "Declaro que el fisioterapeuta me ha explicado de manera clara mi condición física actual y el plan de tratamiento propuesto.\n\nEntiendo que:\n1. Los resultados dependen de mi constancia y factores biológicos, no se garantiza un resultado específico.\n2. Las técnicas conllevan riesgos menores (molestia transitoria, enrojecimiento, fatiga).\n3. Debo informar sobre marcapasos, embarazo o toma de anticoagulantes.\n4. Mi expediente es confidencial.\n\nOTORGO MI CONSENTIMIENTO libre y voluntario para proceder con el tratamiento.",
    campos: [
      { id: "fis_c1", label: "Nombre del paciente o representante", type: "text", required: true },
      { id: "fis_c2", label: "Relación del firmante", type: "select", options: ["Paciente", "Padre", "Madre", "Tutor legal"] },
      { id: "fis_c3", label: "Técnicas específicas autorizadas", type: "multiselect", options: ["Terapia manual", "Ejercicio terapéutico", "Electroterapia", "Termoterapia", "Crioterapia", "Punción seca", "Vendaje neuromuscular"] },
      { id: "fis_c4", label: "¿Se informaron contraindicaciones relevantes?", type: "radio", options: ["Sí", "No"] },
      { id: "fis_c5", label: "Firma del paciente o representante", type: "signature", required: true },
      { id: "fis_c6", label: "Firma del fisioterapeuta", type: "signature", required: true }
    ]
  }
};
