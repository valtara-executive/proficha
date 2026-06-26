export const formMedico = {
  id: "medico",
  titulo: "Médico General",
  fundamento_legal: "NOM-004-SSA3-2012 (numerales 8.1 a 8.9), Ley General de Salud Arts. 77-83, y NOM-024-SSA3-2012.",
  secciones: [
    {
      id: "ficha_identificacion",
      titulo: "A. Ficha de Identificación del Paciente",
      campos: [
        { id: "med_1", label: "Nombre(s) completo(s)", type: "text", required: true },
        { id: "med_2", label: "Apellido paterno", type: "text", required: true },
        { id: "med_3", label: "Apellido materno", type: "text", required: false },
        { id: "med_4", label: "Fecha de nacimiento", type: "date", required: true },
        { id: "med_5", label: "Edad", type: "number_readonly" },
        { id: "med_6", label: "Sexo", type: "select", options: ["Hombre", "Mujer"], required: true },
        { id: "med_7", label: "Género con el que se identifica (opcional)", type: "text" },
        { id: "med_8", label: "CURP", type: "text", maxlength: 18 },
        { id: "med_9", label: "RFC (si aplica)", type: "text", maxlength: 13 },
        { id: "med_10", label: "Estado civil", type: "select", options: ["Soltero(a)", "Casado(a)", "Unión libre", "Divorciado(a)", "Viudo(a)"] },
        { id: "med_11", label: "Ocupación", type: "text" },
        { id: "med_12", label: "Escolaridad", type: "select", options: ["Sin escolaridad", "Primaria", "Secundaria", "Bachillerato", "Técnico", "Licenciatura", "Posgrado"] },
        { id: "med_13", label: "Religión (opcional)", type: "text" },
        { id: "med_14", label: "Domicilio completo", type: "textarea", required: true },
        { id: "med_15", label: "Teléfono de contacto principal", type: "tel", required: true },
        { id: "med_16", label: "Teléfono de contacto secundario", type: "tel" },
        { id: "med_17", label: "Correo electrónico", type: "email" },
        { id: "med_18", label: "Nombre de contacto de emergencia", type: "text", required: true },
        { id: "med_19", label: "Parentesco del contacto de emergencia", type: "text" },
        { id: "med_20", label: "Teléfono del contacto de emergencia", type: "tel", required: true },
        { id: "med_21", label: "Tipo de sangre y factor Rh", type: "select", options: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "Desconocido"] },
        { id: "med_22", label: "Institución de afiliación a seguridad social", type: "select", options: ["IMSS", "ISSSTE", "Seguro Popular / IMSS-Bienestar", "Seguro privado", "Ninguna", "Otro"] },
        { id: "med_23", label: "Número de afiliación o póliza", type: "text" },
        { id: "med_24", label: "Médico que envía o refiere", type: "text" },
        { id: "med_25", label: "Fecha de la consulta", type: "date", required: true },
        { id: "med_26", label: "Nombre del médico que atiende", type: "text", required: true },
        { id: "med_27", label: "Cédula profesional del médico", type: "text", required: true }
      ]
    },
    {
      id: "antecedentes_heredofamiliares",
      titulo: "B.1 Antecedentes Heredofamiliares",
      campos: [
        { id: "med_28", label: "¿Familiar de 1er grado con diabetes mellitus?", type: "boolean_text", text_label: "Parentesco" },
        { id: "med_29", label: "¿Familiar de 1er grado con hipertensión arterial?", type: "boolean_text", text_label: "Parentesco" },
        { id: "med_30", label: "¿Familiar de 1er grado con cáncer?", type: "boolean_textarea", text_label: "Tipo de cáncer y parentesco" },
        { id: "med_31", label: "¿Familiar de 1er grado con cardiopatías?", type: "boolean_text", text_label: "Parentesco" },
        { id: "med_32", label: "¿Familiar de 1er grado con enfermedades renales?", type: "boolean_text", text_label: "Parentesco" },
        { id: "med_33", label: "¿Familiar de 1er grado con enfermedades psiquiátricas/neurológicas?", type: "boolean_textarea", text_label: "Especificar" },
        { id: "med_34", label: "¿Familiar de 1er grado con enfermedades autoinmunes?", type: "boolean_textarea", text_label: "Especificar" },
        { id: "med_35", label: "¿Familiar de 1er grado con tuberculosis?", type: "radio", options: ["Sí", "No"] },
        { id: "med_36", label: "Otros antecedentes heredofamiliares relevantes", type: "textarea" }
      ]
    },
    {
      id: "antecedentes_no_patologicos",
      titulo: "B.2 Antecedentes Personales No Patológicos",
      campos: [
        { id: "med_37", label: "Lugar de nacimiento", type: "text" },
        { id: "med_38", label: "Lugar de residencia actual", type: "text" },
        { id: "med_39", label: "Tipo de vivienda", type: "select", options: ["Casa propia", "Casa rentada", "Departamento", "Vivienda compartida", "Otro"] },
        { id: "med_40", label: "Servicios de la vivienda", type: "multiselect", options: ["Agua potable", "Drenaje", "Electricidad", "Gas", "Internet"] },
        { id: "med_41", label: "Número de personas que habitan en el domicilio", type: "number" },
        { id: "med_42", label: "Hacinamiento (>2 personas por habitación)", type: "radio", options: ["Sí", "No"] },
        { id: "med_43", label: "Convivencia con animales", type: "boolean_text", text_label: "Especies" },
        { id: "med_44", label: "Tabaquismo", type: "boolean_text", text_label: "Cigarrillos/día y años de exposición" },
        { id: "med_45", label: "Alcoholismo", type: "select", options: ["Nunca", "Ocasional", "Frecuente", "Diario"] },
        { id: "med_45_desc", label: "Tipo de bebida y cantidad (si aplica)", type: "text" },
        { id: "med_46", label: "Uso de sustancias psicoactivas", type: "boolean_textarea", text_label: "Tipo y frecuencia" },
        { id: "med_47", label: "Actividad física", type: "select", options: ["Sedentario", "Ligera", "Moderada", "Intensa"] },
        { id: "med_47_desc", label: "Tipo y frecuencia semanal", type: "text" },
        { id: "med_48", label: "Hábitos de alimentación (comidas/día, dieta)", type: "textarea" },
        { id: "med_49", label: "Horas de sueño promedio por noche", type: "number" },
        { id: "med_50", label: "Calidad del sueño", type: "select", options: ["Buena", "Regular", "Mala"] },
        { id: "med_51", label: "Esquema de vacunación completo", type: "boolean_textarea", text_label: "Vacunas faltantes" },
        { id: "med_52", label: "Higiene personal y bucal (frecuencia)", type: "text" },
        { id: "med_53", label: "Vida sexual activa (si aplica)", type: "radio", options: ["Sí", "No", "No aplica"] },
        { id: "med_54", label: "Método de planificación familiar utilizado", type: "text" }
      ]
    },
    {
      id: "antecedentes_patologicos",
      titulo: "B.3 Antecedentes Personales Patológicos",
      campos: [
        { id: "med_55", label: "Enfermedades crónicas diagnosticadas", type: "multiselect", options: ["Diabetes mellitus", "Hipertensión arterial", "Dislipidemia", "Hipotiroidismo", "Hipertiroidismo", "Asma", "EPOC", "Insuficiencia renal", "Cardiopatía", "Ninguna", "Otra"] },
        { id: "med_56", label: "Año de diagnóstico por enfermedad", type: "textarea" },
        { id: "med_57", label: "Tratamiento actual (medicamento, dosis, frecuencia)", type: "textarea" },
        { id: "med_58", label: "Cirugías previas", type: "boolean_textarea", text_label: "Tipo, año, hospital" },
        { id: "med_59", label: "Hospitalizaciones previas no quirúrgicas", type: "boolean_textarea", text_label: "Motivo y año" },
        { id: "med_60", label: "Transfusiones sanguíneas previas", type: "boolean_text", text_label: "Año y motivo" },
        { id: "med_61", label: "Alergias a medicamentos", type: "boolean_textarea", text_label: "Fármaco y reacción" },
        { id: "med_62", label: "Alergias alimentarias", type: "boolean_textarea", text_label: "Especificar" },
        { id: "med_63", label: "Alergias ambientales", type: "boolean_textarea", text_label: "Especificar" },
        { id: "med_64", label: "Traumatismos previos relevantes", type: "boolean_textarea", text_label: "Especificar" },
        { id: "med_65", label: "Otros medicamentos (automedicación, herbolaria)", type: "textarea" },
        { id: "med_66", label: "Antecedentes gineco-obstétricos (Mujeres)", type: "textarea", placeholder: "Menarca, ritmo, gestas, partos, cesáreas, FUM..." }
      ]
    },
    {
      id: "padecimiento_actual",
      titulo: "C. Padecimiento Actual / Motivo de Consulta",
      campos: [
        { id: "med_67", label: "Motivo principal de la consulta", type: "textarea", required: true },
        { id: "med_68", label: "Tiempo de evolución", type: "text", placeholder: "Ej. 3 días" },
        { id: "med_69", label: "Inicio del padecimiento", type: "select", options: ["Súbito", "Gradual"] },
        { id: "med_70", label: "Descripción cronológica", type: "textarea" },
        { id: "med_71", label: "Síntomas asociados", type: "textarea" },
        { id: "med_72", label: "Factores que mejoran los síntomas", type: "textarea" },
        { id: "med_73", label: "Factores que empeoran los síntomas", type: "textarea" },
        { id: "med_74", label: "Tratamientos ya intentados y resultados", type: "textarea" },
        { id: "med_75", label: "Intensidad del síntoma principal (0-10)", type: "scale", min: 0, max: 10 }
      ]
    },
    {
      id: "interrogatorio_sistemas",
      titulo: "D. Interrogatorio por Aparatos y Sistemas",
      campos: [
        { id: "med_76", label: "Sistema cardiovascular", type: "boolean_textarea", text_label: "Especificar síntomas" },
        { id: "med_77", label: "Sistema respiratorio", type: "boolean_textarea", text_label: "Especificar síntomas" },
        { id: "med_78", label: "Sistema digestivo", type: "boolean_textarea", text_label: "Especificar síntomas" },
        { id: "med_79", label: "Sistema genitourinario", type: "boolean_textarea", text_label: "Especificar síntomas" },
        { id: "med_80", label: "Sistema neurológico", type: "boolean_textarea", text_label: "Especificar síntomas" },
        { id: "med_81", label: "Sistema musculoesquelético", type: "boolean_textarea", text_label: "Especificar síntomas" },
        { id: "med_82", label: "Piel y anexos", type: "boolean_textarea", text_label: "Especificar síntomas" },
        { id: "med_83", label: "Sistema endocrino", type: "boolean_textarea", text_label: "Especificar síntomas" },
        { id: "med_84", label: "Esfera psicoemocional", type: "boolean_textarea", text_label: "Especificar síntomas" }
      ]
    },
    {
      id: "exploracion_fisica",
      titulo: "E. Exploración Física",
      campos: [
        { id: "med_85", label: "Peso (kg)", type: "number" },
        { id: "med_86", label: "Talla (cm)", type: "number" },
        { id: "med_87", label: "Índice de Masa Corporal (IMC)", type: "number_readonly" },
        { id: "med_88", label: "Presión arterial sistólica (mmHg)", type: "number" },
        { id: "med_89", label: "Presión arterial diastólica (mmHg)", type: "number" },
        { id: "med_90", label: "Frecuencia cardiaca (lpm)", type: "number" },
        { id: "med_91", label: "Frecuencia respiratoria (rpm)", type: "number" },
        { id: "med_92", label: "Temperatura corporal (°C)", type: "number" },
        { id: "med_93", label: "Saturación de oxígeno (%)", type: "number" },
        { id: "med_94", label: "Glucosa capilar (mg/dL)", type: "number" },
        { id: "med_95", label: "Aspecto general del paciente", type: "textarea" },
        { id: "med_96", label: "Exploración de cabeza y cuello", type: "textarea" },
        { id: "med_97", label: "Exploración de tórax y pulmones", type: "textarea" },
        { id: "med_98", label: "Exploración cardiovascular", type: "textarea" },
        { id: "med_99", label: "Exploración abdominal", type: "textarea" },
        { id: "med_100", label: "Exploración de extremidades", type: "textarea" },
        { id: "med_101", label: "Exploración neurológica básica", type: "textarea" },
        { id: "med_102", label: "Exploración de piel y tegumentos", type: "textarea" },
        { id: "med_103", label: "Otros hallazgos relevantes", type: "textarea" }
      ]
    },
    {
      id: "estudios_complementarios",
      titulo: "F. Estudios Complementarios",
      campos: [
        { id: "med_104", label: "¿Se solicitan estudios de laboratorio?", type: "boolean_textarea", text_label: "Especificar cuáles" },
        { id: "med_105", label: "¿Se solicitan estudios de imagen?", type: "boolean_textarea", text_label: "Especificar cuáles" },
        { id: "med_106", label: "Resultados de estudios previos aportados", type: "textarea_file" }
      ]
    },
    {
      id: "diagnostico",
      titulo: "G. Diagnóstico",
      campos: [
        { id: "med_107", label: "Diagnóstico(s) principal(es) CIE-10", type: "text", required: true },
        { id: "med_108", label: "Diagnóstico(s) secundario(s)", type: "textarea" },
        { id: "med_109", label: "Tipo de diagnóstico", type: "select", options: ["Presuncional", "Confirmado"] }
      ]
    },
    {
      id: "plan_tratamiento",
      titulo: "H. Plan de Tratamiento",
      campos: [
        { id: "med_110", label: "Tratamiento farmacológico", type: "textarea", placeholder: "Medicamento, dosis, vía, frecuencia, duración" },
        { id: "med_111", label: "Tratamiento no farmacológico", type: "textarea" },
        { id: "med_112", label: "Referencia a especialista", type: "boolean_text", text_label: "Especialidad y motivo" },
        { id: "med_113", label: "Indicaciones generales al paciente", type: "textarea" },
        { id: "med_114", label: "Signos y síntomas de alarma", type: "textarea" },
        { id: "med_115", label: "Fecha de próxima cita", type: "date" },
        { id: "med_116", label: "Pronóstico", type: "select", options: ["Bueno", "Reservado", "Malo"] }
      ]
    },
    {
      id: "nota_evolucion",
      titulo: "I. Nota de Evolución (Citas subsecuentes)",
      campos: [
        { id: "med_117", label: "Fecha de la nota", type: "date" },
        { id: "med_118", label: "Evolución desde última consulta", type: "textarea" },
        { id: "med_119", label: "Apego al tratamiento", type: "select", options: ["Total", "Parcial", "Nulo"] },
        { id: "med_120", label: "Efectos adversos al tratamiento", type: "boolean_textarea", text_label: "Especificar" },
        { id: "med_121", label: "Signos vitales actuales", type: "textarea" },
        { id: "med_122", label: "Ajustes al plan de tratamiento", type: "textarea" },
        { id: "med_123", label: "Firma del médico", type: "signature" }
      ]
    }
  ],
  consentimiento: {
    titulo: "CARTA DE CONSENTIMIENTO INFORMADO PARA ATENCIÓN MÉDICA GENERAL",
    fundamento: "NOM-004-SSA3-2012, numeral 10; Ley General de Salud Arts. 77-83; Reglamento LGS en Materia de Investigación Arts. 21 y 22.",
    texto: "En la ciudad de [Ciudad], siendo las [Hora] del día [Fecha], yo, [Nombre Paciente/Tutor], identificado(a) con [Identificación], declaro que el profesional de la salud [Nombre Médico], con cédula profesional [Cédula], me ha explicado de manera clara, en lenguaje que comprendo y sin tecnicismos innecesarios, la naturaleza de mi estado de salud actual, así como el procedimiento o tratamiento médico que se me propone realizar.\n\nDeclaro que he sido informado(a) sobre: 1. El diagnóstico presuncional o confirmado. 2. Los objetivos del tratamiento. 3. Los riesgos, molestias y efectos secundarios. 4. Las alternativas disponibles. 5. Que mis dudas fueron respondidas a satisfacción. 6. Que la medicina no garantiza resultados absolutos. 7. Mi derecho a revocar este consentimiento. 8. La confidencialidad de mi expediente. 9. El uso de mis datos personales sensibles.\n\nEn caso de menores de edad, declaro que otorgo este consentimiento en beneficio de su interés superior.\n\nCon base en todo lo anterior, OTORGO MI CONSENTIMIENTO de manera libre, voluntaria e informada.",
    campos: [
      { id: "med_124", label: "Nombre del paciente o representante", type: "text", required: true },
      { id: "med_125", label: "Tipo y número de identificación", type: "text" },
      { id: "med_126", label: "Procedimiento descrito específicamente", type: "textarea", required: true },
      { id: "med_127", label: "¿Se explicaron los riesgos?", type: "radio", options: ["Sí", "No"], required: true },
      { id: "med_128", label: "¿Se explicaron las alternativas?", type: "radio", options: ["Sí", "No"], required: true },
      { id: "med_129", label: "¿El paciente formuló preguntas?", type: "boolean_textarea", text_label: "Resumen de respuestas" },
      { id: "med_130", label: "Relación del firmante", type: "select", options: ["Paciente", "Padre", "Madre", "Tutor legal", "Representante legal"] },
      { id: "med_131", label: "Firma del paciente o representante", type: "signature", required: true },
      { id: "med_132", label: "Firma del médico tratante", type: "signature", required: true },
      { id: "med_133", label: "Firma de testigo 1 (Opcional)", type: "signature" },
      { id: "med_134", label: "Firma de testigo 2 (Opcional)", type: "signature" }
    ]
  }
};
